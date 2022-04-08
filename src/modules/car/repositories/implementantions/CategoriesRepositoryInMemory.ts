import Category from '@modules/car/infra/typeorm/entities/Category';
import {
	ICategoryRepository,
	ICreateCateogryDTO,
} from '../ICategoriesRepository';

export class CategoryRepositoryInMemory implements ICategoryRepository {
	categories: Category[] = [];

	async findByName(name: string): Promise<Category | undefined> {
		const category = this.categories.find((category) => category.name === name);
		return category;
	}
	async list(): Promise<Category[]> {
		return this.categories;
	}
	async create({ name, description }: ICreateCateogryDTO): Promise<void> {
		const category = new Category(name, description);
		this.categories.push(category);
	}
}
