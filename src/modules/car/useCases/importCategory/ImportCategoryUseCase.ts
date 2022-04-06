import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import CategoriesRepository from '../../repositories/implementantions/CategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
	name: string;
	description: string;
}
@injectable()
export class ImportCategoryUseCase {
	constructor(
		@inject('CategoryRepository')
		private categoryRepository: CategoriesRepository
	) {}

	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const categories: IImportCategory[] = [];
			const stream = fs.createReadStream(file.path);

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on('data', async (line) => {
					const [name, description] = line;
					categories.push({ name, description });
				})
				.on('end', () => {
					fs.promises.unlink(file.path);
					resolve(categories);
				})
				.on('error', (err) => {
					fs.promises.unlink(file.path);
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);
		categories.map(async (category) => {
			if (this.categoryDontExists(category.name)) {
				this.categoryRepository.create(category);
			}
		});
	}

	private categoryDontExists(name: string) {
		return !this.categoryRepository.findByName(name) === null ? false : true;
	}
}
