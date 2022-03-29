import { ICategoryRepository } from '../repositories/ICategoriesRepository';
class CreateCategoryService {
	constructor(
		private name: string,
		private description: string,
		private categoryRepository: ICategoryRepository
	) {}

	execute() {
		const name = this.name;
		const description = this.description;

		if (this.categoryAlreadyExist()) {
			throw new Error('Category already exists!');
		}

		this.categoryRepository.create({ name, description });
	}

	private categoryAlreadyExist() {
		return this.categoryRepository.findByName(this.name) === null
			? false
			: true;
	}
}

export default CreateCategoryService;
