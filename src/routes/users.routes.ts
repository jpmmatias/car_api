import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import CreateUserController from '../modules/accounts/useCases/CreateUserUseCase/CreateUserController';
import UpdateUserAvatarController from '../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name', 'password', 'email', 'driver_liscence']),
	createUserController.handle
);

usersRoutes.patch(
	'/avatar',
	ensureAuhtenticated,
	uploadAvatar.single('avatar'),
	updateAvatarController.handle
);

export { usersRoutes };
