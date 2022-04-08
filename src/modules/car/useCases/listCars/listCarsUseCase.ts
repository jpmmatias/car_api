import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';

@injectable()
export class ListCarUseCase {
	constructor(
		@inject('CarsRepository') private carsRepository: ICarsRepository
	) {}
	async execute() {
		return await this.carsRepository.list();
	}
}
