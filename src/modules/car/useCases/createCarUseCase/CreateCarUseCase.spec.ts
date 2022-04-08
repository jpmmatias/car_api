import 'reflect-metadata';
import { CreateCarUseCase } from './CreateCarUseCase';
import { CarRepositoryInMemory } from '@modules/car/repositories/implementantions/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import CreateCategoryUseCase from '../createCategory/CreateCategoryuUseCase';

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('CreateCarUseCase - Create car', () => {
	beforeEach(() => {
		carRepositoryInMemory = new CarRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
	});
	it('should create a car successufuly ', async () => {
		await createCarUseCase.execute({
			brand: 'Honda',
			daily_rate: 30,
			description: 'Best red car',
			fine_amount: 50,
			liscense_plate: '124312',
			name: 'Civic',
		});

		const car = await carRepositoryInMemory.findByName('Civic');

		expect(car?.name).toBe('Civic');
		expect(car?.available).toBe(true);
		expect(car?.category_id).toBe(undefined);
	});

	it('should not create car with existentent liscence_plate', async () => {
		expect(async () => {
			await createCarUseCase.execute({
				brand: 'Honda',
				daily_rate: 30,
				description: 'Best red car',
				fine_amount: 50,
				liscense_plate: '124312',
				name: 'Civic',
			});

			await createCarUseCase.execute({
				brand: 'Honda',
				daily_rate: 30,
				description: 'Best red car',
				fine_amount: 50,
				liscense_plate: '124312',
				name: 'Civic',
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
