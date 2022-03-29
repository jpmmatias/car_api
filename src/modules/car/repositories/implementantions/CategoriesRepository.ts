import Category from '../../models/Category';
import {
	ICategoryRepository,
	ICreateCateogryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
	private categories: Category[] = [];

	private static INSTANCE: CategoriesRepository;

	private constructor() {
		this.categories = [];
	}

	public static getInstance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository();
		}

		return CategoriesRepository.INSTANCE;
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

		return category ? category : null;
	}
}

export default CategoriesRepository;
