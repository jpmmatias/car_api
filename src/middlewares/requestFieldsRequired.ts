import { NextFunction, Request, Response } from 'express';

function isRequiredFieldPresent(body: any, field: string) {
	return !body.hasOwnProperty(field);
}

export const requestFieldsRequired = (fields: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		for (const field of fields) {
			if (isRequiredFieldPresent(req.body, field))
				return res
					.status(400)
					.json({ error: `Bad Request: '${field}' field is required` });
		}

		next();
	};
};
