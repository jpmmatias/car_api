import SpecificationRepository from '../../repositories/implementantions/SpecificationRepository';
import { injectable, inject } from 'tsyringe';
@injectable()
export class CreateSpecificationUseCase {
	constructor(
		@inject('SpecificationRepository')
		private specificationRepository: SpecificationRepository
	) {}

	async execute(name: string, description: string) {
		if (await this.specificationAlreadyExist(name)) {
			throw new Error('Specification already exists!');
		}

		await this.specificationRepository.create({ name, description });
	}

	private async specificationAlreadyExist(name: string): Promise<Boolean> {
		const category = await this.specificationRepository.findByName(name);

		if (category) return true;

		return false;
	}
}
