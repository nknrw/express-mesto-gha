<<<<<<< Updated upstream
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
=======
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');

const { JWT_SECRET = 'super-secret-key' } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return next(new AuthorizationError('Необходима авторизация'));
    }

    req.user = payload;

    next();
  } else {
    return next(new AuthorizationError('Необходима авторизация'));
  }
>>>>>>> Stashed changes
};

module.exports = auth;
