const usersRouter = require('express').Router();
const { validateProfileUpdate, validateAvatar, validateId } = require('../middlewares/celebrateValidation');

const {
  getUsers,
  getUserById,
  getUserMe,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserMe);

usersRouter.get('/:id', validateId, getUserById);

usersRouter.patch('/me', validateProfileUpdate, updateProfile);

usersRouter.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = usersRouter;
