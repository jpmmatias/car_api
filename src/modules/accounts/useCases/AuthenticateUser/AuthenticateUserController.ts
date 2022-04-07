import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default class AuthenticationController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { password, email } = req.body;

		const authenticationUserUseCase = container.resolve(
			AuthenticateUserUseCase
		);

		const { token, user } = await authenticationUserUseCase.execute(
			email,
			password
		);
		return res.status(200).json({ user, token });
	}
}
