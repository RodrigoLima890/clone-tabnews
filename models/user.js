import database from "infra/database.js";
import { ValidationError, NotFoundError } from "infra/errors";

async function findOneByUsername(username) {
  const userFound = await runSelectQuery(username);
  return userFound;

  async function runSelectQuery(username) {
    const results = await database.query({
      text: `SELECT
              *
            FROM
              users
            WHERE
              LOWER(username) = LOWER($1)
            LIMIT 1
          ;`,
      values: [username],
    });
    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O username informado não foi encontrado no sistema",
        action: "Verifique se o username está digitado corretamente",
      });
    }
    return results.rows[0];
  }
}

async function create(userInputValues) {
  await validateCredentials(userInputValues.email, userInputValues.username);
  const newClient = await runInsertQuery(userInputValues);
  return newClient;

  async function validateCredentials(email, username) {
    const results = await database.query({
      text: `SELECT
              email
            FROM
              users
            WHERE
              LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)
          ;`,
      values: [username, email],
    });
    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "Usuario ou Email já esta sendo utilizado",
        action: "Deve ser utilizado outro Usuario ou Email para o cadastro",
      });
    }
  }

  async function runInsertQuery(userInputValues) {
    const results = await database.query({
      text: `INSERT INTO 
          users (username, email, password)
        VALUES 
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return results.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
};

export default user;
