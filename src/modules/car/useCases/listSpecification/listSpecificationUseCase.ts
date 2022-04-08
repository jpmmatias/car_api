import SpecificaitonRepository from '@modules/car/infra/typeorm/repositories/SpecificationRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListSpecificationUseCase {
	constructor(
		@inject('SpecificationRepository')
		private specificationRepository: SpecificaitonRepository | null
	) {}
	async execute() {
		if (this.specificationRepository) {
			return await this.specificationRepository.list();
		}
	}
}
