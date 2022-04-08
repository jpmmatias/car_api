import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import UserRepository from '@modules/accounts/infra/typeorm/repositories/UserRepository';

interface IPayload {
	sub: string;
}

export async function ensureAdmin(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { id } = req.user;

	const userRepository = new UserRepository();
	const user = await userRepository.findById(id);

	if (!user?.admin) {
		throw new AppError('User is not admin', 403);
	}

	next();
}
