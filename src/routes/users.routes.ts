import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import CreateUserController from '../modules/accounts/useCases/CreateUserUseCase/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name', 'password', 'email', 'driver_liscence']),
	createUserController.handle
);

export { usersRoutes };
