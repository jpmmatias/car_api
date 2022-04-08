import { container } from 'tsyringe';
import { ICategoryRepository } from '../../modules/car/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/car/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationRepository } from '../../modules/car/repositories/ISpecificationsRepository';
import SpecificationRepository from '../../modules/car/infra/typeorm/repositories/SpecificationRepository';
import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';
import UserRepository from '../../modules/accounts/infra/typeorm/repositories/UserRepository';

container.registerSingleton<ICategoryRepository>(
	'CategoryRepository',
	CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
	'SpecificationRepository',
	SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
