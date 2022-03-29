import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
import CreateCategoryUseCase from './CreateCategoryuUseCase';
import CreateCategoryController from './CreateCategoryController';

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(
	createCategoryUseCase
);

export { createCategoryController };
