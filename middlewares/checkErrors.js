const {
  DocumentNotFoundError,
  CastError,
  ValidationError
} = require('mongoose').Error;
const AuthenticationError = require('../errors/AuthenticationError');
const ForbiddenError = require('../errors/ForbiddenError');
const DuplicationError = require('../errors/DuplicationError');
const {
  BAD_REQUEST_STATUS_CODE,
  AUTHENTICATION_ERROR_STATUS_CODE,
  FORBIDDEN_ERROR_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DUPLICATION_ERROR_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE
} = require('../utils/statusCodes');

module.exports = (err, req, res, next) => {
  if (err instanceof AuthenticationError) {
    res.status(AUTHENTICATION_ERROR_STATUS_CODE).send({ message: err.message });

    return;
  }

  if (err instanceof ForbiddenError) {
    res.status(FORBIDDEN_ERROR_STATUS_CODE).send({ message: err.message });

    return;
  }

  if (err instanceof DuplicationError) {
    res.status(DUPLICATION_ERROR_STATUS_CODE).send({ message: err.message });

    return;
  }

  if (err instanceof DocumentNotFoundError) {
    res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Запрошенный ресурс не найден' });

    return;
  }

  if (err instanceof CastError) {
    res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'В запросе переданы некорректные данные' });

    return;
  }

  if (err instanceof ValidationError) {
    res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Произошла ошибка валидации переданных данных' });

    return;
  }

  res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });

  next();
};
