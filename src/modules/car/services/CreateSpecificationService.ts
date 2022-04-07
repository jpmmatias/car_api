import { ISpecificationRepository } from '../repositories/ISpecificationsRepository';
import { AppError } from '../../../errors/AppError';

class CreateCategoryService {
	constructor(
		private name: string,
		private description: string,
		private specificationRepository: ISpecificationRepository
	) {}

	execute() {
		const name = this.name;
		const description = this.description;

		if (this.specificationAlreadyExist()) {
			throw new AppError('Specification already exists!');
		}

		this.specificationRepository.create({ name, description });
	}

	private specificationAlreadyExist() {
		return this.specificationRepository.findByName(this.name) === null
			? false
			: true;
	}
}

export default CreateCategoryService;
