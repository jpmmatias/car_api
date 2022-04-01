import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';

export class ListCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository | null) {}
	execute() {
		if (this.categoriesRepository) {
			return this.categoriesRepository.list();
		}
	}
}
