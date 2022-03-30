import { Multer } from 'multer';
import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';

export class ImportCategoryUseCase {
	constructor(private categoryRepository: CategoriesRepository) {}
	execute(file: Express.Multer.File) {
		console.log(file);
	}
}
