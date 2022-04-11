import { Router } from 'express';
import { requestBodyRequired } from '@shared/infra/express/middlewares/requestBodyRequired';
import { requestFieldsRequired } from '@shared/infra/express/middlewares/requestFieldsRequired';
import CreateCarController from '@modules/car/useCases/createCarUseCase/CreateCarController';
import { ensureAuhtenticated } from '@shared/infra/express/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import ListCarsController from '../../../../modules/car/useCases/listCars/listCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarsController();

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

carsRoutes.get('/', listCarController.handle);

export { carsRoutes };
