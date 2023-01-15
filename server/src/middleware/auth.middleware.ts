import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpExeption";
import { User } from "@prisma/client";
import TokenService from "../services/token.service";
import { prisma } from "../utils/prisma";

const authMiddleware = async (
	req: Request & { user?: User },
	res: Response,
	next: NextFunction
) => {
	try {
		const Authorization = req.header("Authorization")?.split("Bearer ")[1];

		if (Authorization) {
			const verificationResponse = await TokenService.validateAccessToken<User>(
				Authorization
			);
			const userId = verificationResponse?.id;

			const findUser = await prisma.user.findUnique({
				where: { id: Number(userId) },
			});

			if (findUser) {
				req.user = findUser;
				next();
			} else {
				next(new HttpException(401, "Wrong authentication token"));
			}
		} else {
			next(new HttpException(404, "Authentication token missing"));
		}
	} catch (error) {
		next(new HttpException(401, "Wrong authentication token"));
	}
};

export default authMiddleware;
