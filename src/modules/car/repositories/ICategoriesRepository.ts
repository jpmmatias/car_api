import Category from '@modules/car/infra/typeorm/entities/Category';

interface ICreateCateogryDTO {
	name: string;
	description: string;
}

interface ICategoryRepository {
	findByName(name: string): Promise<Category | undefined>;
	list(): Promise<Category[]>;
	create({}: ICreateCateogryDTO): Promise<void>;
}

export { ICategoryRepository, ICreateCateogryDTO };
