const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike
} = require('../controllers/cards');
const { urlRegExp } = require('../utils/regexps');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp)
  }).unknown(true)
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
  })
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
  })
}), addCardLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
  })
}), deleteCardLike);

module.exports = router;
