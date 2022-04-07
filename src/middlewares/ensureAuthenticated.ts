import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import UserRepository from '../modules/accounts/repositories/implementantions/UserRepository';

interface IPayload {
	sub: string;
}

export async function ensureAuhtenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError('Token missing', 401);
	}

	const [, token] = authHeader.split(' ');

	try {
		const { sub } = jwt.verify(
			token,
			'a2e63ee01401aaeca78be023dfbb8c59'
		) as IPayload;
		const userRepository = new UserRepository();
		const user = userRepository.findById(sub);

		if (!user) {
			throw new AppError('User does not exist', 401);
		}

		next();
	} catch (error) {
		throw new AppError('Invalid token', 401);
	}
}
