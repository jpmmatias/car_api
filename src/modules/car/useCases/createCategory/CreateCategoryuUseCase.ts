import { ICategoryRepository } from '../../repositories/ICategoriesRepository';
class CreateCategoryUseCase {
	constructor(private categoryRepository: ICategoryRepository) {}

	async execute(name: string, description: string): Promise<void> {
		if (await this.categoryAlreadyExist(name)) {
			throw new Error('Category already exists!');
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
