import { container } from 'tsyringe';
import { ICategoryRepository } from '../../modules/car/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/car/repositories/implementantions/CategoriesRepository';

container.registerSingleton<ICategoryRepository>(
	'CategoryRepository',
	CategoriesRepository
);
