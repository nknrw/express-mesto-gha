<<<<<<< Updated upstream
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const ServerError = require('../errors/server-error');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(new ServerError(err.message)));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
        return;
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }
      next(new ServerError(err.message));
    });
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
        return;
=======
/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const AuthorizationError = require('../errors/authorization-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
// eslint-disable-next-line import/no-unresolved
// const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');

const { JWT_SECRET = 'super-secret-key' } = process.env;

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthorizationError('Неправильные почта или пароль'));
    }
    const matched = await user.comparePassword(password);
    if (!matched) {
      return next(new AuthorizationError('Неправильные почта или пароль'));
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });
    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError('Ошибка сервера'));
  }
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => next(new ServerError('Ошибка сервера')));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send(user);
>>>>>>> Stashed changes
      }
      return next(new NotFoundError('Пользователь не найден'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
<<<<<<< Updated upstream
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(new ServerError(err.message));
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(new ServerError(err.message));
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(new ServerError(err.message));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
        return;
      }
      next(new ServerError(err.message));
=======
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError('Пользователь с таким email уже существует'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      }
      return next(new ServerError('Ошибка сервера'));
>>>>>>> Stashed changes
    });
};
