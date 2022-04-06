import { inject, injectable } from 'tsyringe';
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
		username: string,
		driver_liscence: string
	): Promise<void> {
		await this.userRepository.create({
			name,
			email,
			password,
			username,
			driver_liscence,
		});
	}
}

export default CreateUserUseCase;
