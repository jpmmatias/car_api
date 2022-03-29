import { NextFunction, Request, Response, Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import CategoriesRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (req, res) => {
	const categories = categoriesRepository.list();

	return res.status(200).json({ categories });
});

categoriesRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	(req, res) => {
		const { name, description } = req.body;

		const createCategoryService = new CreateCategoryService(
			name,
			description,
			categoriesRepository
		);

		createCategoryService.execute();

		return res.status(201).send();
	}
);

export { categoriesRoutes };
