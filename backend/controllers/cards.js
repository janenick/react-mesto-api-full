const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorHandler } = require('../errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};


module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, next));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.remove()
          .then((removeCard) => res.status(200).send({ data: removeCard }));
      } else {
        throw new ForbiddenError('Вы не можете удалить данную карточку');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  console.log('likeCard.req', req);
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Карточка не найдена'); })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
