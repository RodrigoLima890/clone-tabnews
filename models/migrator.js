import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database";

async function createMigrationsOptions(dbClient) {
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: resolve("infra", "migrations"),
    direction: "up",
    log: () => {},
    migrationsTable: "pgmigrations",
  };
  return defaultMigrationsOptions;
}

async function listPendingMigrations() {
  const dbClient = await database.getNewClient();
  try {
    const defaultMigrationsOptions = await createMigrationsOptions(dbClient);
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
    });
    return pendingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPendingMigrations() {
  const dbClient = await database.getNewClient();
  try {
    const defaultMigrationsOptions = await createMigrationsOptions(dbClient);

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  runPendingMigrations,
  listPendingMigrations,
};

export default migrator;
