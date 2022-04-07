import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../repositories/IUserRepository';
import User from '../../entities/User';
import { AppError } from '../../../../errors/AppError';

interface IAuthenticationPromiseResult {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository
	) {}

	async execute(
		email: string,
		password: string
	): Promise<IAuthenticationPromiseResult> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Email or password incorrect', 401);
		}

		const correctPassword = await compare(password, user.password);

		if (!correctPassword) {
			throw new AppError('Email or password incorrect', 401);
		}

		const token = jwt.sign({ user }, 'a2e63ee01401aaeca78be023dfbb8c59', {
			subject: user.id,
			expiresIn: '1d',
		});

		return { user: { email: user.email, name: user.name }, token };
	}
}

export default AuthenticateUserUseCase;
