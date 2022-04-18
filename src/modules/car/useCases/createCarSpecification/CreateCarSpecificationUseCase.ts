import { ICarsRepository } from '@modules/car/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/car/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Car from '../../infra/typeorm/entities/Car';

interface IDTOCreateCarSpecification {
	car_id: string;
	specifications_ids: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
	constructor(
		@inject('CarsRepository') private carRepository: ICarsRepository,
		@inject('SpecificationRepository')
		private specificationRepository: ISpecificationRepository
	) {}
	async execute({
		car_id,
		specifications_ids,
	}: IDTOCreateCarSpecification): Promise<Car> {
		const carExists = await this.carRepository.findById(car_id);

		if (!carExists) {
			throw new AppError('Car does not exists!');
		}

		const specifications = await this.specificationRepository.findByIds(
			specifications_ids
		);

		carExists.specifications = specifications;

		await this.carRepository.update(carExists.id!, { specifications });

		return carExists;
	}
}
