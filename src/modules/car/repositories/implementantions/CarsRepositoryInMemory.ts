import Car from '@modules/car/infra/typeorm/entities/Car';
import { ICarsRepository, IDTOCreateCar } from '../ICarsRepository';

export class CarRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];

	async findByName(name: string): Promise<Car | undefined> {
		const car = this.cars.find((car) => car.name === name);
		return car;
	}

	async findByLiscencePlate(liscencePlate: string): Promise<Car | undefined> {
		const car = this.cars.find((car) => car.liscence_plate === liscencePlate);
		return car;
	}

	async list(): Promise<Car[]> {
		return this.cars.filter((car) => car.available === true);
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
		const car = new Car(
			brand,
			daily_rate,
			description,
			fine_amount,
			liscense_plate,
			name,
			available,
			category_id
		);
		this.cars.push(car);
	}
}
