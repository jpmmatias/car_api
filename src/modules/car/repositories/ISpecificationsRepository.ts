import { Specification } from '../entities/Specification';

// DTO => Data transfer object
interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	findByName(name: string): Specification | null;
	list(): Specification[];
	create({}: ICreateSpecificationDTO): void;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
