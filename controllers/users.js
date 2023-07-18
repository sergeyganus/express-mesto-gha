const User = require('../models/user');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE
} = require('../utils/statusCodes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK_STATUS_CODE).send(users))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Пользователей нет в базе данных' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Пользователь по указанному _id не найден' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'В запросе переданы некорректные данные' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });

        return;
      }

      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Произошла ошибка валидации переданных данных' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Пользователь с указанным _id не найден' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Пользователь с данным идентификатором не найден' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'В запросе переданы некорректные данные' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};
