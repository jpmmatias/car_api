import { Specification } from '../../entities/Specification';
import {
	ICreateSpecificationDTO,
	ISpecificationRepository,
} from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationRepository {
	private specifications: Specification[];

	private static INSTANCE: SpecificationRepository;

	constructor() {
		this.specifications = [];
	}

	public static getInstance() {
		if (!SpecificationRepository.INSTANCE) {
			SpecificationRepository.INSTANCE = new SpecificationRepository();
		}

		return SpecificationRepository.INSTANCE;
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
