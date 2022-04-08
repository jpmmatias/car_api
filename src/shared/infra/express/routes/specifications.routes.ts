import { Router } from 'express';
import { ensureAuhtenticated } from '@shared/infra/express/middlewares/ensureAuthenticated';
import { requestBodyRequired } from '@shared/infra/express/middlewares/requestBodyRequired';
import { requestFieldsRequired } from '@shared/infra/express/middlewares/requestFieldsRequired';
import {
	ListSpecificationsController,
	CreateSpecificationController,
} from '../../../../modules/car/useCases';

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
