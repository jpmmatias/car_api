import Car from '@modules/car/infra/typeorm/entities/Car';
import { getRepository, Repository } from 'typeorm';
import {
	ICarsRepository,
	IDTOCreateCar,
	IOptionsUpdate,
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

	async listAvailbale(
		brand?: string,
		name?: string,
		category_id?: string
	): Promise<Car[]> {
		if (brand) {
			return this.repository.find({
				where: {
					available: true,
					brand,
				},
			});
		}

		if (name) {
			return this.repository.find({
				where: {
					available: true,
					name,
				},
			});
		}

		if (category_id) {
			return this.repository.find({
				where: {
					available: true,
					category_id,
				},
			});
		}

		return this.repository.find({
			where: {
				available: true,
			},
		});
	}

	async findByName(name: string): Promise<Car | undefined> {
		const car = await this.repository.findOne({ name });
		return car;
	}

	async findById(id: string): Promise<Car | undefined> {
		const car = await this.repository.findOne({ id });
		return car;
	}

	async findByLiscencePlate(liscencePlate: string): Promise<Car | undefined> {
		const car = await this.repository.findOne({
			liscence_plate: liscencePlate,
		});
		return car;
	}

	async update(id: string, { ...options }: IOptionsUpdate) {
		await this.repository.update(id, { ...options });
	}
}

export default CarsRepository;
