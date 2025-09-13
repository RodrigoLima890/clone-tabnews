import {
  InternalSeverErro,
  MethodNotAllowedError,
  ValidationError,
} from "infra/errors";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onErrorHandle(error, request, response) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error.toJSON());
  }
  const internalSeverErro = new InternalSeverErro({
    cause: error,
    statusCode: error.statusCode,
  });

  response.status(internalSeverErro.statusCode).json(internalSeverErro);
}

const controller = {
  erroHandler: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandle,
  },
};

export default controller;
