import { Request, Response } from 'express';
import { ListCarUseCase } from './listCarsUseCase';
import { container } from 'tsyringe';

export default class ListCarsController {
	async handle(req: Request, res: Response): Promise<Response> {
		const listCarUseCase = container.resolve(ListCarUseCase);

		await listCarUseCase.execute();

		return res.status(200).send();
	}
}
