import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { injectable, container } from 'tsyringe';

export default class CreateSpecificationController {
	async handle(req: Request, res: Response) {
		const { name, description } = req.body;

		const createSpecificatioUseCase = container.resolve(
			CreateSpecificationUseCase
		);

		await createSpecificatioUseCase.execute(name, description);

		return res.status(201).send();
	}
}
