const { errors } = require('celebrate');
const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const checkErrors = require('../middlewares/checkErrors');

router.use(authRouter);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use(errors());
router.use(checkErrors);

module.exports = router;
