const router = require('express').Router();
const { DocumentNotFoundError } = require('mongoose').Error;
const authRouter = require('./auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use(authRouter);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new DocumentNotFoundError('Запрошенный ресурс не найден'));
});

module.exports = router;
