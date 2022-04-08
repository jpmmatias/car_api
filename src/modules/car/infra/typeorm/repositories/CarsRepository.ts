import Car from '@modules/car/infra/typeorm/entities/Car';
import { getRepository, Repository } from 'typeorm';
import {
	ICarsRepository,
	IDTOCreateCar,
} from '@modules/car/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
	repository: Repository<Car>;

	constructor() {
		this.repository = getRepository(Car);
	}

	async create({
		name,
		description,
		brand,
		daily_rate,
		fine_amount,
		liscense_plate,
		available,
		category_id,
	}: IDTOCreateCar): Promise<void> {
		const car = this.repository.create({
			name,
			description,
			brand,
			daily_rate,
			fine_amount,
			liscence_plate: liscense_plate,
			available,
			category_id,
		});
		await this.repository.save(car);
	}

	async list(): Promise<Car[]> {
		const cars = await this.repository.find();
		return cars;
	}

	async findByName(name: string): Promise<Car | undefined> {
		const car = await this.repository.findOne({ name });
		return car;
	}

	async findByLiscencePlate(liscencePlate: string): Promise<Car | undefined> {
		const car = await this.repository.findOne({
			liscence_plate: liscencePlate,
		});
		return car;
	}
}

export default CarsRepository;
