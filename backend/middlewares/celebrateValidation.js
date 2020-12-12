const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const ValidationError = require('../errors/ValidationError');

validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }).unknown(true),
});


validateСardId = celebrate({
  params: Joi.object().keys({
   cardId: Joi.string().alphanum().hex().length(24),
  }),
});


const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});


validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
});


const validateProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});


const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});

module.exports = {
  validateCard,
  validateСardId,
  validateUser,
  validateId,
  validateProfileUpdate,
  validateAvatar
};