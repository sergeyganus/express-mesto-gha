const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE
} = require('../utils/statusCodes');
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar
      })
        .then((user) => res.status(CREATED_STATUS_CODE).send(user))
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });

      res.status(OK_STATUS_CODE).send({ token });
    })
    .catch(next);
};