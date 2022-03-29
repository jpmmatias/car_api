import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import {
	createCategoryController,
	listCategoryController,
} from '../modules/car/useCases';

const categoriesRoutes = Router();

categoriesRoutes.get('/', (req, res) => {
	return listCategoryController.handle(req, res);
});

categoriesRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	(req, res) => {
		return createCategoryController.handle(req, res);
	}
);

export { categoriesRoutes };
