const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/auth');
const { emailRegExp, urlRegExp } = require('../utils/regexps');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp)
  })
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(8)
  })
}), login);

module.exports = router;
