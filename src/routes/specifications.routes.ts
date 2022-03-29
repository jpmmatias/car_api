import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import SpecificationRepository from '../modules/car/repositories/SpecificationRepository';
import CreateSpecificationService from '../modules/car/services/CreateSpecificationService';

const specificationRoutes = Router();
const specificationsRepository = new SpecificationRepository();

specificationRoutes.get('/', (req, res) => {
	const specifications = specificationsRepository.list();

	return res.status(200).json({ specifications });
});

specificationRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	(req, res) => {
		const { name, description } = req.body;

		const createSpecifiactionService = new CreateSpecificationService(
			name,
			description,
			specificationsRepository
		);

		createSpecifiactionService.execute();

		return res.status(201).send();
	}
);

export { specificationRoutes };
