import { container } from 'tsyringe';
import { ICategoryRepository } from '../../modules/car/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/car/repositories/implementantions/CategoriesRepository';
import { ISpecificationRepository } from '../../modules/car/repositories/ISpecificationsRepository';
import SpecificationRepository from '../../modules/car/repositories/implementantions/SpecificationRepository';

container.registerSingleton<ICategoryRepository>(
	'CategoryRepository',
	CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
	'SpecificationRepository',
	SpecificationRepository
);
