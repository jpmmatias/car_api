import 'reflect-metadata';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import CreateUserUseCase from '../CreateUserUseCase/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import UserRepositoryInMemory from '@modules/accounts/infra/typeorm/repositories/UserRepositoryInMemory';

let userRepository: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('AuhtneticateUserUseCase - Authenticate User', () => {
	beforeEach(() => {
		userRepository = new UserRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('should authenticate user', async () => {
		const newUser: ICreateUserDTO = {
			driver_liscence: '1234',
			email: 'email@gmail.com',
			name: 'name',
			password: 'senha',
		};

		await createUserUseCase.execute(newUser);

		const response = await authenticateUserUseCase.execute({
			email: 'email@gmail.com',
			password: 'senha',
		});

		expect(response).toHaveProperty('token');
	});
	it('should not be able to auhtenticate inexistent user', async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: 'email@gmail.com',
				password: 'senha',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to auhtenticate user with wrong password', async () => {
		const newUser: ICreateUserDTO = {
			driver_liscence: '1234',
			email: 'email@gmail.com',
			name: 'name',
			password: 'senha',
		};

		await createUserUseCase.execute(newUser);

		expect(async () => {
			await authenticateUserUseCase.execute({
				email: 'email@gmail.com',
				password: 'senha errada',
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
