import Specifiation from '../models/Specification';

// DTO => Data transfer object
interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	findByName(name: string): Specifiation | null;
	list(): Specifiation[];
	create({}: ICreateSpecificationDTO): void;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
