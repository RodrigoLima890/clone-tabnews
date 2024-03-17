import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_POST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    client.end();
    return result;
  } catch (erro) {
    console.log(erro.message());
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
