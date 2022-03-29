import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
import { ListCategoryUseCase } from './listCategoryUseCase';
import ListCategoryController from './ListCategoryController';

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };
