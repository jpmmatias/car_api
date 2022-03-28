import { NextFunction, Request, Response, Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import CategoriesRepository from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

function validateCategoryCreation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { name } = req.body;

	const categoryAlreadyExist = CategoriesRepository.findByName(name);

	if (categoryAlreadyExist) {
		return res.status(400).json({ error: 'Category already exist' });
	}

	next();
}

categoriesRoutes.get('/', (req, res) => {
	const categories = CategoriesRepository.list();

	return res.status(200).json({ categories });
});

categoriesRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	validateCategoryCreation,
	(req, res) => {
		const { name, description } = req.body;

		CategoriesRepository.create({ name, description });

		return res.status(201).send();
	}
);

export { categoriesRoutes };
