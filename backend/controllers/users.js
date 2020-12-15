const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthError = require('../errors/UnauthError');
const ConflictError = require('../errors/ConflictError');
const { errorHandler } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.status(200).send(user))
    .catch((err) => errorHandler(err, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким e-mail уже существует'));
      } else {
        next(errorHandler(err, next));
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => errorHandler(err, next));
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => errorHandler(err, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        `${NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-dev-secret'}`,
        { expiresIn: '7d' },
      );
      res.send({
        token,
      });
    })
    .catch(() => next(new UnauthError('Введены неверное имя или пароль')));
};
