const userRouter = require('express').Router();
<<<<<<< Updated upstream
=======
// eslint-disable-next-line import/no-unresolved
>>>>>>> Stashed changes
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
<<<<<<< Updated upstream
=======
  getUserInfo,
>>>>>>> Stashed changes
  getUserId,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
<<<<<<< Updated upstream
userRouter.get('/me', getUserId);
=======
userRouter.get('/me', getUserInfo);

>>>>>>> Stashed changes
userRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
<<<<<<< Updated upstream
      userId: Joi.string().alphanum().length(24),
=======
      userId: Joi.string().regex(/^[0-9a-f]{24}$/i),
>>>>>>> Stashed changes
    }),
  }),
  getUserId,
);

<<<<<<< Updated upstream
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    }),
  }),
  updateAvatar,
);
=======
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  }),
}), updateAvatar);
>>>>>>> Stashed changes

module.exports = userRouter;
