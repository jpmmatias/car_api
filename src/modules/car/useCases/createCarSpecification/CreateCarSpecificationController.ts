import { Request, Response } from 'express';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';
import { container } from 'tsyringe';

export default class CreateCarSpecificationController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { car_id, specification_ids } = req.body;

		const createCarSpecificationController = container.resolve(
			CreateCarSpecificationUseCase
		);

		await createCarSpecificationController.execute({
			car_id,
			specifications_ids: specification_ids,
		});

		return res.status(201).send();
	}
}
