const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb_full', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const router = require('./routes');

// Слушаем 3000 порт
const { PORT = 3003 } = process.env;
const app = express();

// --> настройки cors
const allowedCors = [
  'https://janenick.students.nomoredomains.rocks',
  'http://janenick.students.nomoredomains.rocks',
  'http://localhost:3000',
];
app.use(cors({
  origin: allowedCors,
}));
// <-- настройки cors

app.use(helmet()); // для простановки security-заголовков для API

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем логгер запросов (его нужно подключить до всех обработчиков роутов)
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

/* обработчики ошибок
подключаем логгер ошибок (его нужно подключить после обработчиков роутов и до обработчиков ошибок)
*/
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
