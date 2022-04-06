import { Router } from 'express';
import multer from 'multer';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import {
	CreateCategoryController,
	ImportCategoryController,
	ListCategoryController,
} from '../modules/car/useCases';

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

const categoriesRoutes = Router();

const upload = multer({
	dest: './tmp',
});

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	createCategoryController.handle
);

categoriesRoutes.post(
	'/import',
	upload.single('file'),
	importCategoryController.handle
);

export { categoriesRoutes };
