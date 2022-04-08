import 'reflect-metadata';
import CreateCategoryUseCase from './CreateCategoryuUseCase';
import { CategoryRepositoryInMemory } from '@modules/car/repositories/implementantions/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepository: CategoryRepositoryInMemory;

describe('CreateCategoryUseCase - Create Category', () => {
	beforeEach(() => {
		categoryRepository = new CategoryRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
	});

	it('should be able to create new category', async () => {
		await createCategoryUseCase.execute('New Category', 'New Description');

		const category = await categoryRepository.findByName('New Category');
		expect(category?.name).toBe('New Category');
		expect(category?.description).toBe('New Description');
	});

	it('shoud have an id when created', async () => {
		await createCategoryUseCase.execute('New Category', 'New Description');

		const category = await categoryRepository.findByName('New Category');

		expect(category).toHaveProperty('id');
	});

	it('shoud not be able to create user if user already exists', async () => {
		expect(async () => {
			await createCategoryUseCase.execute('New Category', 'New Description');
			await createCategoryUseCase.execute('New Category', 'New Description');
		}).rejects.toBeInstanceOf(AppError);
	});
});
