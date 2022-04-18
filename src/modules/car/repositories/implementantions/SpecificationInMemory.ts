import { Specification } from '@modules/car/infra/typeorm/entities/Specification';
import {
	ISpecificationRepository,
	ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

export class SpecificationRepositoryInMemory
	implements ISpecificationRepository
{
	specifications: Specification[] = [];

	async findByName(name: string): Promise<Specification | undefined> {
		const specification = this.specifications.find(
			(specification) => specification.name === name
		);
		return specification;
	}

	async findById(id: string): Promise<Specification | undefined> {
		const specification = this.specifications.find(
			(specification) => specification.id === id
		);
		return specification;
	}

	async list(): Promise<Specification[]> {
		return this.specifications;
	}

	async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specificaiton = new Specification(name, description);
		this.specifications.push(specificaiton);
	}
	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = this.specifications.filter((specification) =>
			ids.includes(specification.id!)
		);

		return specifications;
	}
}
