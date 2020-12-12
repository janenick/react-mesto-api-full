const errorHandler =  (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  console.log('errorHandler.err: ', err);
  res
    .status(statusCode)
    /*
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
    */
    .send({ err});
  next();
}

module.exports = errorHandler;