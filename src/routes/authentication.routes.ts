import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import AuthenticationController from '../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController();

authenticationRoutes.post(
	'/sessions',
	requestBodyRequired,
	requestFieldsRequired(['email', 'password']),
	authenticationController.handle
);

export { authenticationRoutes };
