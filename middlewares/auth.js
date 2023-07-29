const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');
const { SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthenticationError('Ошибка аутентификации пользователя'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new AuthenticationError('Ошибка аутентификации пользователя'));
  }

  req.user = payload;

  return next();
};
