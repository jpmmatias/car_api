import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';

export class ListCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository) {}
	execute() {
		return this.categoriesRepository.list();
	}
}
