import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpExeption";
import { User } from "@prisma/client";

const activateMiddleware = async (
	req: Request & { user?: User },
	res: Response,
	next: NextFunction,
) => {
	try {
		const { user } = req;

		if (user?.isActivated) {
			next();
		} else {
			next(new HttpException(401, "User is not activated"));
		}
	} catch (error) {
		next(new HttpException(401, "Wrong authentication token"));
	}
};

export default activateMiddleware;
