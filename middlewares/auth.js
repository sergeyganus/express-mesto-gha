const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');
const {
  AUTHENTICATION_ERROR_STATUS_CODE
} = require('../utils/statusCodes');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(AUTHENTICATION_ERROR_STATUS_CODE).send({ message: 'Ошибка аутентификации пользователя' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(AUTHENTICATION_ERROR_STATUS_CODE).send({ message: 'Ошибка аутентификации пользователя' });
  }

  req.user = payload;

  return next();
};
