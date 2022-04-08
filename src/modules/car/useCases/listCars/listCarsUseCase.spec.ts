import 'reflect-metadata';
import { CarRepositoryInMemory } from '@modules/car/repositories/implementantions/CarsRepositoryInMemory';
import { ListCarUseCase } from './listCarsUseCase';

let listCarsUseCase: ListCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('ListCarsUseCase- List all cars', () => {
	beforeEach(() => {
		carRepositoryInMemory = new CarRepositoryInMemory();
		listCarsUseCase = new ListCarUseCase(carRepositoryInMemory);
	});
	it('should list all available cars succefuly', async () => {
		await carRepositoryInMemory.create({
			name: 'Carro 1',
			description: 'Carrão',
			brand: 'Marcar',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'xxxxx',
		});

		await carRepositoryInMemory.create({
			name: 'Carro 2',
			description: 'Carrinho',
			brand: 'Ferrari',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'yyyyy',
		});

		const cars = await listCarsUseCase.handle();

		expect(cars.length).toBe(2);
		expect(cars[0].name).toBe('Carro 1');
		expect(cars[1].name).toBe('Carro 2');
	});
	it('Do not should list all unavailable cars ', async () => {
		await carRepositoryInMemory.create({
			name: 'Carro 1',
			description: 'Carrão',
			brand: 'Marcar',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'xxxxx',
			available: false,
		});

		await carRepositoryInMemory.create({
			name: 'Carro 2',
			description: 'Carrinho',
			brand: 'Ferrari',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'yyyyy',
		});

		const cars = await listCarsUseCase.execute();

		expect(cars.length).toBe(1);
		expect(cars[0].name).toBe('Carro 2');
	});
});
