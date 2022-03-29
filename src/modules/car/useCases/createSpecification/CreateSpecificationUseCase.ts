import SpecificationRepository from '../../repositories/implementantions/SpecificationRepository';
export class CreateSpecificationUseCase {
	constructor(private specificationRepository: SpecificationRepository) {}

	execute(name: string, description: string) {
		if (this.specificationAlreadyExist(name)) {
			throw new Error('Specification already exists!');
		}

		this.specificationRepository.create({ name, description });
	}

	private specificationAlreadyExist(name: string) {
		return this.specificationRepository.findByName(name) === null
			? false
			: true;
	}
}
