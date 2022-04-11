import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';

interface IRequestOptions {
	category_id?: string;
	brand?: string;
	name?: string;
}
@injectable()
export class ListCarUseCase {
	constructor(
		@inject('CarsRepository') private carsRepository: ICarsRepository
	) {}
	async execute(options?: IRequestOptions) {
		if (!options) {
			return await this.carsRepository.listAvailbale();
		}
		const { brand, name, category_id } = options;
		return await this.carsRepository.listAvailbale(brand, name, category_id);
	}
}
