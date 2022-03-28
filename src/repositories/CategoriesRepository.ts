import Category from '../models/Category';

// DTO => Data transfer object
interface ICreateCateogryDTO {
	name: string;
	description: string;
}

class CategoriesRepository {
	private categories: Category[] = [];

	constructor() {
		this.categories = [];
	}

	create({ name, description }: ICreateCateogryDTO): void {
		const category: Category = new Category(name, description);

		this.categories.push(category);
	}

	list(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category | null {
		const category = this.categories.find((category) => category.name === name);

		if (!category) {
			return null;
		}

		return category;
	}
}

export default new CategoriesRepository();
