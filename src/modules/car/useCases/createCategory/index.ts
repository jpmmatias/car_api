import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
import CreateCategoryUseCase from './CreateCategoryuUseCase';
import CreateCategoryController from './CreateCategoryController';

export default () => {
	const categoriesRepository = new CategoriesRepository();

	const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

	const createCategoryController = new CreateCategoryController(
		createCategoryUseCase
	);

	return createCategoryController;
};
