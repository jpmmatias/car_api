import Category from '../models/Category';

// DTO => Data transfer object
interface ICreateCateogryDTO {
	name: string;
	description: string;
}

interface ICategoryRepository {
	findByName(name: string): Category | null;
	list(): Category[];
	create({}: ICreateCateogryDTO): void;
}

export { ICategoryRepository, ICreateCateogryDTO };
