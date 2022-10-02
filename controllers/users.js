const User = require('../models/users');

// const DATA_ERROR = 400;
// const SERVER_ERROR = 500;
// const NOT_FOUND_ERROR = 404;

const dataError = (res) => res.status(400).send({ message: 'Переданы некорректные данные' });
const serverError = (res) => res.status(500).send({ message: 'На сервере произошла ошибка' });
const notFoundError = (res) => res.status(404).send({ message: 'Пользователь по указанному _id не найден' });

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => serverError(res, err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        dataError(res);
      } else {
        serverError(res);
      }
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        notFoundError(res);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        notFoundError(res);
      } else {
        serverError(res);
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        dataError(res);
      } else {
        serverError(res);
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        dataError(res);
      } else {
        serverError(res);
      }
    });
};
