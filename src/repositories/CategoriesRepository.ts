import Category from '../models/Category';
import {
	ICategoryRepository,
	ICreateCateogryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
	private categories: Category[] = [];

	constructor() {
		this.categories = [];
	}

	create({ name, description }: ICreateCateogryDTO): void {
		const category: Category = new Category(name, description);

		this.categories.push(category);
	}

	ist(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category | null {
		const category = this.categories.find((category) => category.name === name);

		return category ? category : null;
	}
}

export default CategoriesRepository;
