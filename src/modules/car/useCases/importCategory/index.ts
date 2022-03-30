import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { ImportCategoryController } from './ImportCategoryController';
import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';

const categoryRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);

const importCategoryController = new ImportCategoryController(
	importCategoryUseCase
);

export { importCategoryController };
