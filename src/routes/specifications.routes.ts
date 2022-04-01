import { Router } from 'express';
import { requestBodyRequired } from '../middlewares/requestBodyRequired';
import { requestFieldsRequired } from '../middlewares/requestFieldsRequired';
import SpecificationRepository from '../modules/car/repositories/implementantions/SpecificationRepository';
import CreateSpecificationService from '../modules/car/services/CreateSpecificationService';
import { createSpecificationController } from '../modules/car/useCases';

const specificationRoutes = Router();
const specificationsRepository = SpecificationRepository.getInstance();

specificationRoutes.get('/', (req, res) => {
	const specifications = specificationsRepository.list();

	return res.status(200).json({ specifications });
});

specificationRoutes.post(
	'/',
	requestBodyRequired,
	requestFieldsRequired(['name']),
	(req, res) => {
		return createSpecificationController().handle(req, res);
	}
);

export { specificationRoutes };
