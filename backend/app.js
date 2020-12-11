const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler')

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb_full', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// было ранее так // const { usersRouter, cardsRouter } = require('./routes');
const router = require('./routes');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  req.user = {
    _id: '5fd21f9c6965cc6250f768e7', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log('req', req);
  next();
});
*/

app.use('/', router);

app.use(errorHandler);


app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
