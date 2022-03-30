import { Response, Request } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
export class ImportCategoryController {
	constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

	handle(req: Request, res: Response) {
		const { file } = req;
		if (!file) {
			throw new Error('Attatch file is required');
		}
		this.importCategoryUseCase.execute(file);
		return res.status(204).send();
	}
}
