import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';
import { CarRepositoryInMemory } from '@modules/car/repositories/implementantions/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../repositories/implementantions/SpecificationInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe('CreateCarSpecificationUseCase- Create car specification', () => {
	beforeEach(() => {
		carRepositoryInMemory = new CarRepositoryInMemory();
		specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carRepositoryInMemory,
			specificationRepositoryInMemory
		);
	});

	it('should create a car specification successufuly ', async () => {
		carRepositoryInMemory.create({
			brand: 'Teste',
			daily_rate: 30,
			description: 'description',
			fine_amount: 50,
			liscense_plate: 'hasfjlasdhfjklsadhflsad',
			name: 'Carrão',
		});

		specificationRepositoryInMemory.create({
			name: 'Best Specification',
			description: 'Best Description',
		});

		let car = await carRepositoryInMemory.findByName('Carrão');
		const specification = await specificationRepositoryInMemory.findByName(
			'Best Specification'
		);

		await createCarSpecificationUseCase.execute({
			car_id: car?.id!,
			specifications_id: [specification!.id!],
		});

		car = await carRepositoryInMemory.findByName('Carrão');

		expect(car?.specifications[0]?.name).toBe('Best Specification');
	});
});
