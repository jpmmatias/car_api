import User from '../../infra/typeorm/entities/User';
import { ICreateUserDTO, IUserRepository } from '../IUserRepository';
import IUpateUserDTO from '../../dtos/IUpdateUserDTO';

class UserRepositoryInMemory implements IUserRepository {
	users: User[];

	constructor() {
		this.users = [];
	}

	async create({
		name,
		email,
		password,
		driver_liscence,
	}: ICreateUserDTO): Promise<void> {
		const user = new User(name, email, password, driver_liscence);
		this.users.push(user);
	}

	async update(id: string, { ...options }: IUpateUserDTO) {
		const user = this.users.find((user) => user.id === id);
		Object.assign(user, options);
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email);
		return user;
	}

	async findById(id: string) {
		const user = this.users.find((user) => user.id === id);
		return user;
	}
}

export default UserRepositoryInMemory;
