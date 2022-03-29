import { ICategoryRepository } from '../../repositories/ICategoriesRepository';
class CreateCategoryUseCase {
	constructor(private categoryRepository: ICategoryRepository) {}

	execute(name: string, description: string) {
		if (this.categoryAlreadyExist(name)) {
			throw new Error('Category already exists!');
		}

		this.categoryRepository.create({ name, description });
	}

	private categoryAlreadyExist(name: string) {
		return this.categoryRepository.findByName(name) === null ? false : true;
	}
}

export default CreateCategoryUseCase;
