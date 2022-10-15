/* eslint-disable import/no-unresolved */
const express = require('express');
const mongoose = require('mongoose');
<<<<<<< Updated upstream
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('./controllers/users');

const NotFoundError = require('./errors/not-found-error');
const ServerError = require('./errors/server-error');

const auth = require('./middlewares/auth');
=======
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const ServerError = require('./errors/server-err');
>>>>>>> Stashed changes

const { PORT = 3000 } = process.env;

const app = express();

<<<<<<< Updated upstream
=======
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
// eslint-disable-next-line no-undef
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
});

async function start(req, res, next) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    next(new ServerError('Ошибка сервера'));
  }
}

start();

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63397ba0971baaf93952946a',
//   };

//   next();
// });
>>>>>>> Stashed changes

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
