import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCategoryUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoriesRepository: CategoriesRepository | null
	) {}
	async execute() {
		if (this.categoriesRepository) {
			return await this.categoriesRepository.list();
		}
	}
}
