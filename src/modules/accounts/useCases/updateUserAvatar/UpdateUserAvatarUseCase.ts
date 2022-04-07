import fs from 'fs';
import UserRepository from '../../repositories/implementantions/UserRepository';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { deleteFile } from '../../../../utils/file';

interface IRequest {
	id: string;
	fileName: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: UserRepository
	) {}

	async execute({ fileName, id }: IRequest): Promise<void> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new AppError('Inexistent user');
		}

		if (user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		}

		user.avatar = fileName;

		await this.userRepository.update(id, { avatar: fileName });
	}
}
