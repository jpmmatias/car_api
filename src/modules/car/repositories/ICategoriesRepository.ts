import Category from '../entities/Category';
import { Repository } from 'typeorm';

// DTO => Data transfer object
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
