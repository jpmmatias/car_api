import Category from '@modules/car/infra/typeorm/entities/Category';
import { getRepository, Repository } from 'typeorm';
import {
	ICategoryRepository,
	ICreateCateogryDTO,
} from '../../../repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoryRepository {
	repository: Repository<Category>;
	private static INSTANCE: CategoriesRepository;

	constructor() {
		this.repository = getRepository(Category);
	}

	public static getInstance(): CategoriesRepository {
		if (!CategoriesRepository.INSTANCE) {
			CategoriesRepository.INSTANCE = new CategoriesRepository();
		}

		return CategoriesRepository.INSTANCE;
	}

	async create({ name, description }: ICreateCateogryDTO): Promise<void> {
		const category = this.repository.create({
			description,
			name,
		});
		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();
		return categories;
	}

	async findByName(name: string): Promise<Category | undefined> {
		const category = await this.repository.findOne({ name });
		return category;
	}
}

export default CategoriesRepository;
