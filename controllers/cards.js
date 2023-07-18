const Card = require('../models/card');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE
} = require('../utils/statusCodes');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS_CODE).send(cards))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Карточек нет в базе данных' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });

        return;
      }

      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Произошла ошибка валидации переданных данных' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Карточка с указанным _id не найдена' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные при удалении карточки' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.addCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Передан несуществующий _id карточки' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(RESOURCE_NOT_FOUND_STATUS_CODE).send({ message: 'Передан несуществующий _id карточки' });

        return;
      }

      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });

        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({ message: 'Ошибка по умолчанию' });
    });
};
