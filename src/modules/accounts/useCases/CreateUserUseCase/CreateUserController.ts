import { Request, Response } from 'express';
import CreateUserUseCase from './CreateUserUseCase';
import { container } from 'tsyringe';

export default class CreateCategoryController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { name, password, email, driver_liscence } = req.body;

		const createUserUseCse = container.resolve(CreateUserUseCase);

		await createUserUseCse.execute(name, password, email, driver_liscence);
		return res.status(201).send();
	}
}
