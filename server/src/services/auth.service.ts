import { compare, hashSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../utils/prisma";
import { HttpException } from "../exceptions/HttpExeption";
import TokenService from "./token.service";
import { CreateAuthDto } from "../dtos/auth.dto";
import MailService from "./mail.service";
import { CLIENT_URL } from "../config";
import { UserDto } from "../dtos/user.dto";

class AuthService {
	public register = async (userData: CreateAuthDto) => {
		const candidate = await prisma.user.findUnique({
			where: {
				email: userData.email,
			},
		});
		if (candidate)
			throw new HttpException(400, "User with this email already exists");

		const activationLink = uuidv4();
		const user = await prisma.user.create({
			data: {
				email: userData.email,
				password: hashSync(userData.password, 7),
				activationLink,
			},
		});

		await MailService.sendActivationMail(
			userData.email,
			`${CLIENT_URL}/activate/${activationLink}`
		);
		const tokens = TokenService.generateTokens({
			id: user.id,
			email: user.email,
			isActivated: user.isActivated,
		});
		await TokenService.saveToken(user.id, tokens.refreshToken);

		return {
			...tokens,
			user: { id: user.id, email: user.email, isActivated: user.isActivated },
		};
	};

	public login = async (userData: CreateAuthDto) => {
		const user = await prisma.user.findUnique({
			where: {
				email: userData.email,
			},
		});
		if (!user) throw new HttpException(404, "User not found");
		if (!user.isActivated)
			throw new HttpException(400, "Please activate your account");

		const isPasswordEquals = await compare(userData.password, user.password);
		if (!isPasswordEquals) throw new HttpException(400, "Invalid password");

		const tokens = TokenService.generateTokens({
			id: user.id,
			email: user.email,
			isActivated: user.isActivated,
		});
		await TokenService.saveToken(user.id, tokens.refreshToken);

		return {
			...tokens,
			user: { id: user.id, email: user.email, isActivated: user.isActivated },
		};
	};

	public logout = async (refreshToken: string) => {
		const token = await prisma.token.findUnique({
			where: {
				refreshToken,
			},
		});
		if (!token) throw new HttpException(404, "Token not found");

		await TokenService.removeToken(token.refreshToken);
	};

	public activate = async (activationLink: string) => {
		const user = await prisma.user.findUnique({
			where: {
				activationLink: activationLink,
			},
		});
		if (!user) throw new HttpException(404, "User not found");

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				isActivated: true,
			},
		});
	};

	public refresh = async (refreshToken: string) => {
		if (!refreshToken) throw new HttpException(401, "Unauthorized");

		const userData = TokenService.validateRefreshToken<UserDto>(refreshToken);
		const tokenFromDb = await TokenService.findToken(refreshToken);
		if (!tokenFromDb || !userData)
			throw new HttpException(404, "Token not found");

		const user = await prisma.user.findUnique({
			where: {
				id: userData.id,
			},
		});
		if (!user) throw new HttpException(404, "User not found");

		const tokens = TokenService.generateTokens({
			id: user.id,
			email: user.email,
			isActivated: user.isActivated,
		});
		await TokenService.saveToken(user.id, tokens.refreshToken);

		return {
			...tokens,
			user: {
				id: userData.id,
				email: userData.email,
				isActivated: userData.isActivated,
			},
		};
	};
}

export default new AuthService();
