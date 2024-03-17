test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdatedAt);
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);

  expect(responseBody.dependencies.database.active_connections).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.2");
});
