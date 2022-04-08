import { NextFunction, Request, Response } from 'express';

function isBodyEmptyOrUndefined(body: any) {
	return Object.keys(body).length === 0 || !body;
}

export const requestBodyRequired = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (isBodyEmptyOrUndefined(req.body)) {
		return res
			.status(400)
			.json({ error: 'Bad Request: Body is empty or undeifned' });
	}
	next();
};
