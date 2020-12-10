const Card = require('../models/card');
const CustomError = require('../errors/CustomError');
const { sendError } = require('../errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .orFail(() => { throw new CustomError(404, 'Нет карточки с таким id'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      sendError(err, res);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new CustomError(404, 'Нет карточки с таким id'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      sendError(err, res);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new CustomError(404, 'Нет карточки с таким id'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      sendError(err, res);
    });
};
