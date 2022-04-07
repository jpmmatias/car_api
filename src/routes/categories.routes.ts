import { Router } from 'express';
import multer from 'multer';
import { ensureAuhtenticated } from '../middlewares/ensureAuthenticated';
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

categoriesRoutes.get('/', ensureAuhtenticated, listCategoryController.handle);

categoriesRoutes.post(
	'/',
	ensureAuhtenticated,
	requestBodyRequired,
	requestFieldsRequired(['name']),
	createCategoryController.handle
);

categoriesRoutes.post(
	'/import',
	ensureAuhtenticated,
	upload.single('file'),
	importCategoryController.handle
);

export { categoriesRoutes };
