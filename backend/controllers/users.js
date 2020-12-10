const User = require('../models/user');
const CustomError = require('../errors/CustomError');
const { sendError } = require('../errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => { throw new CustomError(404, 'Нет пользователя с таким id'); })
    .then((user) => res.status(200).send(user))
    .catch((err) => sendError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .orFail(() => { throw new CustomError(404, 'Нет пользователя с таким id'); })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => sendError(err, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .orFail(() => { throw new CustomError(404, 'Нет пользователя с таким id'); })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => sendError(err, res));
};
