import { Request, Response } from 'express';
import { ListCarUseCase } from './listCarsUseCase';
import { container } from 'tsyringe';

interface IRequestOptions {
	category_id?: string;
	brand?: string;
	name?: string;
}
export default class ListCarsController {
	async handle(
		req: Request<
			{},
			{},
			{},
			{
				brand: string;
				name: string;
				category_id: string;
			}
		>,
		res: Response
	): Promise<Response> {
		const listCarUseCase = container.resolve(ListCarUseCase);
		let cars;

		if (!req.query) {
			cars = await listCarUseCase.execute();
			return res.status(200).json({ cars });
		}

		const { brand, name, category_id } = req.query;

		cars = await listCarUseCase.execute({ brand, name, category_id });

		return res.status(200).json({ cars });
	}
}
