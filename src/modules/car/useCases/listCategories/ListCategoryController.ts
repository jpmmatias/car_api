import { Request, Response } from 'express';
import { ListCategoryUseCase } from './listCategoryUseCase';
import { container } from 'tsyringe';

export default class ListCategoryController {
	async handle(req: Request, res: Response) {
		const listCategoryUseCase = container.resolve(ListCategoryUseCase);
		const categories = await listCategoryUseCase.execute();

		return res.status(200).json({ categories });
	}
}
