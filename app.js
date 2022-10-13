const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('./controllers/users');

const NotFoundError = require('./errors/not-found-error');
const ServerError = require('./errors/server-error');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

async function main(req, res, next) {
  try {
    mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    next(new ServerError('Произошла ошибка'));
  }
}

main();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));

// mongoose.connect('mongodb://localhost:27017/mestodb', {
//   useNewUrlParser: true,
// });

// app.use('/*', (req, res) => {
//   res.status(404).json({ message: 'Тут ничего нет :(' });
// });

// app.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`App listening on port ${PORT}`);
// });
