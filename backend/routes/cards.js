const cardsRouter = require('express').Router();
const { validateCard, validateСardId } = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

cardsRouter.get('/', getCards);

cardsRouter.post('/', validateCard, createCard);

cardsRouter.delete('/:cardId', validateСardId, deleteCard);

cardsRouter.put('/:cardId/likes', validateСardId, likeCard);

cardsRouter.delete('/:cardId/likes', validateСardId, dislikeCard);

module.exports = cardsRouter;
