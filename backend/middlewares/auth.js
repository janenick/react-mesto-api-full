const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthError = require('../errors/UnauthError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthError('С токеном что-то не так');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-dev-secret'}`);
  } catch (err) {
    throw new UnauthError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
