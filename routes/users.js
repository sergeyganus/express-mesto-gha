const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar
} = require('../controllers/users');
const { urlRegExp } = require('../utils/regexps');

router.get('/', getUsers);
router.get('/me', getUserProfile);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
  })
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
}), updateUserProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp)
  })
}), updateUserAvatar);

module.exports = router;
