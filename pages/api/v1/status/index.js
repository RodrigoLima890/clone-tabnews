import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalSeverErro, MethodNotAllowedError } from "infra/errors";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandle,
});

async function getHandler(request, response) {
  const updateAt = new Date().toISOString();

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;
  const versionDatabaseResult = await database.query("SHOW server_version;");
  const versionDatabase = versionDatabaseResult.rows[0].server_version;
  const databaseName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname= $1;",
    values: [databaseName],
  });
  const opneedConnectionsValue = openedConnectionsResult.rows[0].count;
  const activeConnections = (
    await database.query(
      "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';",
    )
  ).rowCount;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: versionDatabase,
        max_connections: parseInt(maxConnections),
        active_connections: activeConnections,
        opened_connections: opneedConnectionsValue,
      },
    },
  });
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandle(error, request, response) {
  const internalSeverErro = new InternalSeverErro({
    cause: error,
  });

  console.log("\n Erro dentro do next-connect");
  console.log(internalSeverErro);

  response.status(500).json(internalSeverErro);
}
