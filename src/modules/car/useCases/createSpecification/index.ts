import SpecificationRepository from '../../repositories/implementantions/SpecificationRepository';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { CreateSpecificationController } from './CreateSpecificationController';

export default () => {
	const specificationRepository = new SpecificationRepository();
	const createSpecificationUseCase = new CreateSpecificationUseCase(
		specificationRepository
	);

	const createSpecificationController = new CreateSpecificationController(
		createSpecificationUseCase
	);
	return createSpecificationController;
};
