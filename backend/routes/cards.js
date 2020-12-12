const cardsRouter = require('express').Router();
const { validateCard, validateId } = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

cardsRouter.get('/', getCards);

cardsRouter.post('/', validateCard, createCard);

cardsRouter.delete('/:id', validateId, deleteCard);

cardsRouter.put('/:cardId/likes', validateId, likeCard);

cardsRouter.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = cardsRouter;
