import { Request, Response } from 'express';
import { ListCategoryUseCase } from './listCategoryUseCase';

export default class ListCategoryController {
	constructor(private listCategoryUseCase: ListCategoryUseCase) {}
	async handle(req: Request, res: Response) {
		const categories = await this.listCategoryUseCase.execute();

		return res.status(200).json({ categories });
	}
}
