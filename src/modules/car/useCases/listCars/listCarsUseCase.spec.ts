import 'reflect-metadata';
import { CarRepositoryInMemory } from '@modules/car/repositories/implementantions/CarsRepositoryInMemory';
import { ListCarUseCase } from './listCarsUseCase';
import { CategoryRepositoryInMemory } from '@modules/car/repositories/implementantions/CategoriesRepositoryInMemory';

let listCarsUseCase: ListCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let categoryRepository: CategoryRepositoryInMemory;

describe('ListCarsUseCase- List all cars', () => {
	beforeEach(() => {
		carRepositoryInMemory = new CarRepositoryInMemory();
		listCarsUseCase = new ListCarUseCase(carRepositoryInMemory);
		categoryRepository = new CategoryRepositoryInMemory();
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

		const cars = await listCarsUseCase.execute();

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

	it('Should filter depending on catergory', async () => {
		await categoryRepository.create({
			name: 'Best name',
			description: 'best description',
		});

		const category = await categoryRepository.findByName('Best name');

		await carRepositoryInMemory.create({
			name: 'Carro 1',
			description: 'Carrão',
			brand: 'Marcar',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'xxxxx',
			category_id: category!.id,
		});

		await carRepositoryInMemory.create({
			name: 'Carro 2',
			description: 'Carrinho',
			brand: 'Ferrari',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'yyyyy',
			category_id: category!.id,
		});

		await carRepositoryInMemory.create({
			name: 'Carro 3',
			description: 'Carrinho',
			brand: 'Ferrari',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'zzzzz',
		});

		const cars = await listCarsUseCase.execute({ category_id: category!.id });

		expect(cars.length).toBe(2);
		expect(cars[0].category_id).toBe(category!.id);
		expect(cars[1].category_id).toBe(category!.id);
	});

	it('Should filter depending on name', async () => {
		await carRepositoryInMemory.create({
			name: 'Carrão',
			description: 'Carrão',
			brand: 'Marcar',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'xxxxx',
		});

		await carRepositoryInMemory.create({
			name: 'Carrão',
			description: 'Carrinho',
			brand: 'Ferrari',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'yyyyy',
		});

		await carRepositoryInMemory.create({
			name: 'Carrinho',
			description: 'Carrinho',
			brand: 'Ferrari',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'zzzzz',
		});

		const cars = await listCarsUseCase.execute({ name: 'Carrão' });

		expect(cars.length).toBe(2);
		expect(cars[0].name).toBe('Carrão');
		expect(cars[1].name).toBe('Carrão');
	});

	it('Should filter depending on brand', async () => {
		await carRepositoryInMemory.create({
			name: 'Carro 1',
			description: 'Carrão',
			brand: 'Ferrari',
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

		await carRepositoryInMemory.create({
			name: 'Carro 3',
			description: 'Carrinho',
			brand: 'Honda',
			daily_rate: 30,
			fine_amount: 1234,
			liscense_plate: 'zzzzz',
		});

		const cars = await listCarsUseCase.execute({ brand: 'Ferrari' });

		expect(cars.length).toBe(2);
		expect(cars[0].brand).toBe('Ferrari');
		expect(cars[1].brand).toBe('Ferrari');
	});
});
