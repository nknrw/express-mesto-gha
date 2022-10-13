const jwt = require('jsonwebtoken');
const AutorizationError = require('../errors/autorization-error');

const { JWT_SECRET = 'super-secret-key' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AutorizationError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AutorizationError('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
