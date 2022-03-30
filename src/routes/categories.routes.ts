import { Router } from 'express';
import multer from 'multer';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import {
	createCategoryController,
	listCategoryController,
} from '../modules/car/useCases';
import { importCategoryController } from '../modules/car/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
	dest: './tmp',
});

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

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
	return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
