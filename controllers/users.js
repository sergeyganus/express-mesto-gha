const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const { OK_STATUS_CODE } = require('../utils/statusCodes');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK_STATUS_CODE).send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователя с указанным _id не существует'))
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch(next);
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователя с указанным _id не существует'))
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Произошла ошибка валидации переданных данных'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователя с указанным _id не существует'))
    .then((user) => res.status(OK_STATUS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Произошла ошибка валидации переданных данных'));
      } else {
        next(err);
      }
    });
};
