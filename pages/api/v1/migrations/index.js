import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import controller from "infra/controllers";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.erroHandler);

async function createMigrationsOptions(dbClient) {
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  return defaultMigrationsOptions;
}

async function getHandler(request, response) {
  const dbClient = await database.getNewClient();
  try {
    const defaultMigrationsOptions = await createMigrationsOptions(dbClient);
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
    });
    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  const dbClient = await database.getNewClient();
  try {
    const defaultMigrationsOptions = await createMigrationsOptions(dbClient);

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}
