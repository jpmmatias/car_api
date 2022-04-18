import { Specification } from '@modules/car/infra/typeorm/entities/Specification';

// DTO => Data transfer object
interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	findByName(name: string): Promise<Specification | undefined>;
	findById(id: string): Promise<Specification | undefined>;
	list(): Promise<Specification[]>;
	create({}: ICreateSpecificationDTO): Promise<void>;
	findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
