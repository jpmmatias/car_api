import Car from '@modules/car/infra/typeorm/entities/Car';

interface IDTOCreateCar {
	name: string;
	description: string;
	daily_rate: number;
	fine_amount: number;
	liscense_plate: string;
	available?: boolean;
	brand: string;
	category_id?: string;
}

interface ICarsRepository {
	findByName(name: string): Promise<Car | undefined>;
	findByLiscencePlate(liscencePlate: string): Promise<Car | undefined>;
	listAvailbale(
		brand?: string,
		name?: string,
		category_id?: string
	): Promise<Car[]>;
	create({}: IDTOCreateCar): Promise<void>;
}

export { ICarsRepository, IDTOCreateCar };
