const { AuthenticationError } = require('../utils/errors');
const {
  OK_STATUS_CODE,
  CREATED_STATUS_CODE
} = require('../utils/statusCodes');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS_CODE).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(CREATED_STATUS_CODE).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findCardById(cardId)
    .then((findedCard) => {
      if (req.user._id === findedCard.owner.toString()) {
        Card.findByIdAndDelete(cardId)
          .then((card) => {
            res.status(OK_STATUS_CODE).send(card);
          })
          .catch(next);
      } else {
        throw new AuthenticationError('У вас недостаточно прав, чтобы удалить карточку с указанным _id');
      }
    })
    .catch(next);
};

module.exports.addCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch(next);
};

module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(OK_STATUS_CODE).send(card))
    .catch(next);
};
