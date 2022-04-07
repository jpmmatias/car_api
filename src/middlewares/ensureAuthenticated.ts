import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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
		throw new Error('Token missing');
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
			throw new Error('User does not exist');
		}

		next();
	} catch (error) {
		throw new Error('Invalid token');
	}
}
