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
