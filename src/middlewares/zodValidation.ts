import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";
import { ValidationError } from "../utils/error/customError";

export function validateData(schema: AnyZodObject) {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.errors.map((issue) => ({
					path: issue.path.join("."),
					message: issue.message,
				}));
				throw new ValidationError(errors, "Invalid data");
			}
			throw new Error("Error when validating data");
		}
	};
}
