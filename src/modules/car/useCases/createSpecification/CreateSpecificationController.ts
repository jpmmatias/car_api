import { Request, Response } from 'express';
import { createSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {
	constructor(private createSpecificatioUseCase: createSpecificationUseCase) {}

	handle(req: Request, res: Response) {
		const { name, description } = req.body;

		this.createSpecificatioUseCase.execute(name, description);

		return res.status(201).send();
	}
}
