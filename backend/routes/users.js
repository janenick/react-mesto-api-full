const usersRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  getUserMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

usersRouter.get('/', getUsers);

usersRouter.get('/:id', getUserById);

usersRouter.get('/me', getUserMe);

usersRouter.patch('/me', updateProfile);

usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
