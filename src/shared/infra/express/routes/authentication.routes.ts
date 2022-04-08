import { Router } from 'express';
import { requestBodyRequired } from '@shared/infra/express/middlewares/requestBodyRequired';
import { requestFieldsRequired } from '@shared/infra/express/middlewares/requestFieldsRequired';
import AuthenticationController from '@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController';

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController();

authenticationRoutes.post(
	'/sessions',
	requestBodyRequired,
	requestFieldsRequired(['email', 'password']),
	authenticationController.handle
);

export { authenticationRoutes };
