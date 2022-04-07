import User from '../../entities/User';
import { getRepository, Repository } from 'typeorm';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
	repository: Repository<User>;
	private static INSTANCE: UserRepository;

	constructor() {
		this.repository = getRepository(User);
	}

	public static getInstance(): UserRepository {
		if (!UserRepository.INSTANCE) {
			UserRepository.INSTANCE = new UserRepository();
		}

		return UserRepository.INSTANCE;
	}

	async create({
		name,
		email,
		password,
		driver_liscence,
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			email,
			password,
			name,
			driver_liscence,
		});
		await this.repository.save(user);
	}

	async findByEmail(email: string) {
		return await this.repository.findOne({ email });
	}

	async findById(id: string) {
		return await this.repository.findOne({ id });
	}
}

export default UserRepository;
