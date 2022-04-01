import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
import { ListCategoryUseCase } from './listCategoryUseCase';
import ListCategoryController from './ListCategoryController';

export default () => {
	const categoriesRepository = null;
	//CategoriesRepository.getInstance();

	const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

	const listCategoryController = new ListCategoryController(
		listCategoryUseCase
	);
	return listCategoryController;
};
