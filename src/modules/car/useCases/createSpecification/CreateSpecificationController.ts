import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {
	constructor(private createSpecificatioUseCase: CreateSpecificationUseCase) {}

	handle(req: Request, res: Response) {
		const { name, description } = req.body;

		this.createSpecificatioUseCase.execute(name, description);

		return res.status(201).send();
	}
}
