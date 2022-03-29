import { Specification } from '../models/Specification';
import {
	ICreateSpecificationDTO,
	ISpecificationRepository,
} from './ISpecificationsRepository';

class SpecificationRepository implements ISpecificationRepository {
	private specifications: Specification[];

	constructor() {
		this.specifications = [];
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		const specification: Specification = new Specification(name, description);

		this.specifications.push(specification);
	}

	list(): Specification[] {
		return this.specifications;
	}

	findByName(name: string): Specification | null {
		const specification = this.specifications.find(
			(specification) => specification.name === name
		);

		return specification ? specification : null;
	}
}

export default SpecificationRepository;
