import { Response, Request } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { container } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
export default class ImportCategoryController {
	async handle(req: Request, res: Response) {
		const { file } = req;
		if (!file) {
			throw new AppError('Attatch file is required');
		}
		const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
		importCategoryUseCase.execute(file);
		return res.status(204).send();
	}
}
