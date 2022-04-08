import SpecificationRepository from '@modules/car/infra/typeorm/repositories/SpecificationRepository';
import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
@injectable()
export class CreateSpecificationUseCase {
	constructor(
		@inject('SpecificationRepository')
		private specificationRepository: SpecificationRepository
	) {}

	async execute(name: string, description: string) {
		if (await this.specificationAlreadyExist(name)) {
			throw new AppError('Specification already exists!');
		}

		await this.specificationRepository.create({ name, description });
	}

	private async specificationAlreadyExist(name: string): Promise<Boolean> {
		const category = await this.specificationRepository.findByName(name);

		if (category) return true;

		return false;
	}
}
