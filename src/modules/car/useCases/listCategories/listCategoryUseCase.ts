import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';

export class ListCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository | null) {}
	async execute() {
		if (this.categoriesRepository) {
			return await this.categoriesRepository.list();
		}
	}
}
