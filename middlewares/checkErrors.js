const {
  DocumentNotFoundError,
  CastError,
  ValidationError
} = require('mongoose').Error;
const { AuthenticationError } = require('../utils/errors');
const {
  BAD_REQUEST_STATUS_CODE,
  AUTHENTICATION_ERROR_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DUPLICATION_ERROR_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE
} = require('../utils/statusCodes');

module.exports = (err, req, res, next) => {
  if (err instanceof AuthenticationError) {
    res.status(AUTHENTICATION_ERROR_STATUS_CODE).send({ message: err.message });
  }

  if (err instanceof DocumentNotFoundError) {
    res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Сущность с указанным _id не найдена' });

    return;
  }

  if (err instanceof CastError) {
    res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'В запросе переданы некорректные данные' });

    return;
  }

  if (err.code === 11000) {
    res.status(DUPLICATION_ERROR_STATUS_CODE).send({ message: 'Пользователь с данным email уже существует' });

    return;
  }

  if (err instanceof ValidationError) {
    res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Произошла ошибка валидации переданных данных' });

    return;
  }

  res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });

  next();
};
