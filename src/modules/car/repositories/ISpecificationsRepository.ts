import { Specification } from '../entities/Specification';

// DTO => Data transfer object
interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	findByName(name: string): Promise<Specification | undefined>;
	list(): Promise<Specification[]>;
	create({}: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
