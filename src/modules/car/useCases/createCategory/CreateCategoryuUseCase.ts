import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: ICategoryRepository
	) {}

	async execute(name: string, description: string): Promise<void> {
		if (await this.categoryAlreadyExist(name)) {
			throw new AppError('Category already exists!');
		}

		await this.categoryRepository.create({ name, description });
	}

	private async categoryAlreadyExist(name: string): Promise<Boolean> {
		const category = await this.categoryRepository.findByName(name);

		if (category) return true;

		return false;
	}
}

export default CreateCategoryUseCase;
