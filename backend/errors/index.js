const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.sendError = (err, res) => {
  if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'id не удовлетворяет условиям' });
  } else if (err.statusCode === 404) {
    res.status(err.statusCode).send({ message: err.message });
  } else if (err.name === 'ValidationError') {
    const allErr = Object.values(err.errors);
    res.status(400).send({ message: allErr.reduce(((allMessage, item) => allMessage + ((allMessage === '') ? '' : '; ') + item.message), '') });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: `Указаны некорректные данные при обновлении: ${err.message}` });
  } else {
    res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
  }
};


module.exports.errorHandler = (err, next) => {
  if (err.kind === 'ObjectId') {
    next(new ValidationError('id не удовлетворяет условиям'));
  } else if (err.statusCode === 404) {
    next(new NotFoundError('Объект не найден'));
  } else if (err.name === 'ValidationError') {
    const errorTexts = Object.values(err.errors).map((error) => error.message).join(', ')
    next(new ValidationError(errorTexts));
  } else if (err.name === 'ValidatorError') {
    // const errorTexts = Object.values(err.errors).map((error) => error.message).join(', ')
    next(new ValidationError('Ошибка валидации'));
  } else if (err.name === 'CastError') {
    next(new ValidationError(`Указаны некорректные данные при обновлении: ${err.message}`));
  } else {
    next(err);
  }
};