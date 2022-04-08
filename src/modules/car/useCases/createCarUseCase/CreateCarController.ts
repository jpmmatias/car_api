import { Request, Response } from 'express';
import { CreateCarUseCase } from './CreateCarUseCase';
import { container } from 'tsyringe';

export default class CreateCarController {
	async handle(req: Request, res: Response): Promise<Response> {
		const {
			name,
			description,
			brand,
			daily_rate,
			fine_amount,
			liscense_plate,
			available,
			category_id,
		} = req.body;

		const createCarUseCase = container.resolve(CreateCarUseCase);

		await createCarUseCase.execute({
			name,
			description,
			brand,
			daily_rate,
			fine_amount,
			liscense_plate,
			available,
			category_id,
		});

		return res.status(201).send();
	}
}
