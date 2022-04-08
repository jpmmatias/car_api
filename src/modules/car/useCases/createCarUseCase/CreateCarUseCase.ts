import {
	ICarsRepository,
	IDTOCreateCar,
} from '@modules/car/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCarUseCase {
	constructor(
		@inject('CarsRepository') private carRepository: ICarsRepository
	) {}
	async execute(data: IDTOCreateCar): Promise<void> {
		if (await this.carAlreadyExists(data.liscense_plate)) {
			throw new AppError('Car already exists');
		}
		await this.carRepository.create(data);
	}

	async carAlreadyExists(liscence_plate: string): Promise<boolean> {
		const car = await this.carRepository.findByLiscencePlate(liscence_plate);
		if (car) {
			return true;
		}
		return false;
	}
}
