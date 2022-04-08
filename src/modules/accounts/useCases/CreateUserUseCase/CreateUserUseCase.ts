import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository
	) {}

	async execute({
		name,
		email,
		password,
		driver_liscence,
	}: ICreateUserDTO): Promise<void> {
		if (await this.userAlreadyExist(email)) {
			throw new AppError('User already exist!');
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
