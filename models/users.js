const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
<<<<<<< Updated upstream
    default: 'Исследователь океана',
=======
    default: 'Исследователь',
>>>>>>> Stashed changes
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
<<<<<<< Updated upstream
    select: false,
=======
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator:
        validator.isURL,
      message: 'Неверный формат ссылки',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator:
        validator.isEmail,
      message: 'Неверный формат почты',
    },
>>>>>>> Stashed changes
  },
});

module.exports = mongoose.model('user', userSchema);
