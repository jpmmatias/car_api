import { Router } from 'express';
import { requestBodyRequired } from '@shared/infra/express/middlewares/requestBodyRequired';
import { requestFieldsRequired } from '@shared/infra/express/middlewares/requestFieldsRequired';
import CreateCarController from '@modules/car/useCases/createCarUseCase/CreateCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', requestBodyRequired, createCarController.handle);

export { carsRoutes };
