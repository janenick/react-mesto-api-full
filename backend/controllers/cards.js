const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const { sendError } = require('../errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .orFail(() => { throw new NotFoundError('Нет карточки с таким id'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      sendError(err, res);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFoundError(404, 'Нет карточки с таким id'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      sendError(err, res);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Нет карточки с таким id'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      sendError(err, res);
    });
};
