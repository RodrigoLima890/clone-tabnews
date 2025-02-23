import { InternalSeverErro, MethodNotAllowedError } from "infra/errors";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandle(error, request, response) {
  const internalSeverErro = new InternalSeverErro({
    cause: error,
    statusCode: error.statusCode,
  });

  console.log(internalSeverErro);
  response.status(internalSeverErro.statusCode).json(internalSeverErro);
}

const controller = {
  erroHandler: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandle,
  },
};

export default controller;
