import { Router } from 'express';
import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import {
	ListSpecificationsController,
	CreateSpecificationController,
} from '../modules/car/useCases';

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationRoutes.get(
	'/',
	ensureAuhtenticated,
	listSpecificationController.handle
);

specificationRoutes.post(
	'/',
	ensureAuhtenticated,
	requestBodyRequired,
	requestFieldsRequired(['name']),
	createSpecificationController.handle
);

export { specificationRoutes };
