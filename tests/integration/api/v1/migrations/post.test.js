import database from "infra/database";

beforeAll(cleanDatabase);
async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}
async function tableExistsVerify() {
  const { rows } = await database.query(
    "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'pgmigrations')",
  );
  if (!rows[0].exists) {
    return false;
  }
  return rows[0].exists;
}
test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);
  const responseBody = await response1.json();

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const response2Body = await response2.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
  expect(response2Body.length).toEqual(0);

  expect(await tableExistsVerify()).toEqual(true);
  const { rows } = await database.query("SELECT id FROM pgmigrations;");
  expect(responseBody.length).toEqual(rows.length);
});
