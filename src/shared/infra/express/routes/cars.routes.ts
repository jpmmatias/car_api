import { Router } from 'express';
import { requestBodyRequired } from '@shared/infra/express/middlewares/requestBodyRequired';
import { requestFieldsRequired } from '@shared/infra/express/middlewares/requestFieldsRequired';
import CreateCarController from '@modules/car/useCases/createCarUseCase/CreateCarController';
import { ensureAuhtenticated } from '@shared/infra/express/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
	'/',
	ensureAuhtenticated,
	ensureAdmin,
	requestBodyRequired,
	requestFieldsRequired([
		'name',
		'description',
		'brand',
		'fine_amount',
		'liscense_plate',
		'daily_rate',
	]),
	createCarController.handle
);

export { carsRoutes };
