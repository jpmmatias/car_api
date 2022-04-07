import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository
	) {}

	async execute(
		name: string,
		email: string,
		password: string,
		driver_liscence: string
	): Promise<void> {
		if (await this.userAlreadyExist(email)) {
			throw Error('User already exist!');
		}
		const passwordHash = await hash(password, 8);

		await this.userRepository.create({
			name,
			email,
			password: passwordHash,
			driver_liscence,
		});
	}

	async userAlreadyExist(email: string) {
		const user = await this.userRepository.findByEmail(email);
		if (user) {
			return true;
		}
		return false;
	}
}

export default CreateUserUseCase;
