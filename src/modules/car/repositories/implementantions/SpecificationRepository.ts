import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import {
	ICreateSpecificationDTO,
	ISpecificationRepository,
} from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationRepository {
	repository: Repository<Specification>;

	private static INSTANCE: SpecificationRepository;

	constructor() {
		this.repository = getRepository(Specification);
	}

	public static getInstance() {
		if (!SpecificationRepository.INSTANCE) {
			SpecificationRepository.INSTANCE = new SpecificationRepository();
		}

		return SpecificationRepository.INSTANCE;
	}

	async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create({ name, description });

		await this.repository.save(specification);
	}

	async list(): Promise<Specification[]> {
		return await this.repository.find();
	}

	async findByName(name: string): Promise<Specification | undefined> {
		const specification = this.repository.findOne({ name });

		return specification;
	}
}

export default SpecificationRepository;
