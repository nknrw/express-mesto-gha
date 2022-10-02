const userRouter = require('express').Router();

const {
  getUsers,
  createUser,
  getUserId,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:userId', getUserId);
userRouter.patch('/me', updateProfile);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
