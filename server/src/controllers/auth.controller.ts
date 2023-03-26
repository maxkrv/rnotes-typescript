import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { CreateAuthDto } from "../dtos/auth.dto";
import { validationResult } from "express-validator";
import { HttpException } from "../exceptions/HttpExeption";

const MAX_AGE = 1000 * 60 * 60 * 24 * 30;

class AuthController {
	public register = async (
		req: Request<{}, {}, CreateAuthDto>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(new HttpException(400, errors.array()[0].msg));
			}

			const userData = await AuthService.register(req.body);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: MAX_AGE,
				httpOnly: true,
			});
			res.json(userData);
		} catch (error) {
			next(error);
		}
	};

	public login = async (
		req: Request<{}, {}, CreateAuthDto>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(new HttpException(400, errors.array()[0].msg));
			}

			const userData = await AuthService.login(req.body);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: MAX_AGE,
				httpOnly: true,
			});
			res.json(userData);
		} catch (error) {
			next(error);
		}
	};

	public logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies;
			await AuthService.logout(refreshToken);
			res.clearCookie("refreshToken");

			res.status(201).json({ message: "success" });
		} catch (error) {
			next(error);
		}
	};

	public activate = async (
		req: Request<{ link: string }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			await AuthService.activate(req.params.link);

			return res.json({ message: "success" });
		} catch (error) {
			next(error);
		}
	};

	public refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies;
			const userData = await AuthService.refresh(refreshToken);

			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: MAX_AGE,
				httpOnly: true,
			});
			res.json(userData);
		} catch (error) {
			next(error);
		}
	};
}

export default new AuthController();
