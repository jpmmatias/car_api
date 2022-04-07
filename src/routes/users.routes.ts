import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import CreateUserController from '../modules/accounts/useCases/CreateUserUseCase/CreateUserController';
import AuthenticationController from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticationController = new AuthenticationController();

usersRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name', 'password', 'email', 'driver_liscence']),
	createUserController.handle
);

usersRoutes.post(
	'/auth',
	requestBodyRequired,
	requestFieldsRequired(['email', 'password']),
	authenticationController.handle
);

export { usersRoutes };
