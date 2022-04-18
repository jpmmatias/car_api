import Car from '@modules/car/infra/typeorm/entities/Car';
import Specification from '@modules/car/infra/typeorm/entities/Specification';

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

interface IOptionsUpdate {
	name?: string;
	descripion?: string;
	dayli_rate?: string;
	fine_amout?: number;
	brand?: string;
	category_id?: string;
	specifications?: Specification[];
}

interface ICarsRepository {
	findByName(name: string): Promise<Car | undefined>;
	findById(id: string): Promise<Car | undefined>;
	findByLiscencePlate(liscencePlate: string): Promise<Car | undefined>;
	listAvailbale(
		brand?: string,
		name?: string,
		category_id?: string
	): Promise<Car[]>;
	create({}: IDTOCreateCar): Promise<void>;
	update(id: string, options: IOptionsUpdate): Promise<void>;
}

export { ICarsRepository, IDTOCreateCar, IOptionsUpdate };
