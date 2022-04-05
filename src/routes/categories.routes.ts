import { Router } from 'express';
import multer from 'multer';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import CreateCategoryController from '../modules/car/useCases/createCategory/CreateCategoryController';
import {
	listCategoryController,
	importCategoryController,
} from '../modules/car/useCases';

const createCategoryController = new CreateCategoryController();

const categoriesRoutes = Router();

const upload = multer({
	dest: './tmp',
});

categoriesRoutes.get('/', (req, res) => {
	return listCategoryController().handle(req, res);
});

categoriesRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	createCategoryController.handle
);

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
	return importCategoryController().handle(req, res);
});

export { categoriesRoutes };
