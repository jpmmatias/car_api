import { Response, Request } from 'express';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';
import { container } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

export default class UpdateUserAvatarController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user;
		const { file } = req;

		if (!file) {
			throw new AppError('Attatch file is required');
		}

		const fileName = file.filename;

		const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

		updateUserAvatarUseCase.execute({ fileName, id });

		return res.status(204).send();
	}
}
