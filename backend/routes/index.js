const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users.js');
const { validateUser } = require('../middlewares/celebrateValidation');
const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

router.post('/signup', validateUser, createUser);
router.post('/signin', login);

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, usersRouter);

router.use('*', (res, req, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;

