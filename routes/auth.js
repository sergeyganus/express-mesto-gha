const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createUser,
  login
} = require('../controllers/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8)
  }).unknown(true)
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(8)
  })
}), login);

module.exports = router;
