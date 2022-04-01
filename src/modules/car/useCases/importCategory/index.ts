import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { ImportCategoryController } from './ImportCategoryController';
import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';

export default () => {
	const categoryRepository = new CategoriesRepository();
	const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

	const importCategoryController = new ImportCategoryController(
		importCategoryUseCase
	);
	return importCategoryController;
};
