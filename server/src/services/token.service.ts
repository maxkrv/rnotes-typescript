import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config";
import { prisma } from "../utils/prisma";

class TokenService {
	// TODO add types for payload
	public generateTokens = (
		payload: any
	): { accessToken: string; refreshToken: string } => {
		const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
			expiresIn: "30m",
		});
		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
			expiresIn: "30d",
		});

		return {
			accessToken,
			refreshToken,
		};
	};

	public saveToken = async (userId: number, refreshToken: string) => {
		const tokenData = await prisma.token.findUnique({
			where: {
				userId,
			},
		});

		if (tokenData) {
			return prisma.token.update({
				where: {
					userId,
				},
				data: {
					refreshToken,
				},
			});
		}

		return prisma.token.create({
			data: {
				refreshToken,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
	};

	public removeToken = async (refreshToken: string) => {
		return prisma.token.delete({
			where: {
				refreshToken,
			},
		});
	};

	public validateAccessToken = <T>(token: string): T | null => {
		try {
			return jwt.verify(token, JWT_ACCESS_SECRET as string) as T;
		} catch (e) {
			return null;
		}
	};

	public validateRefreshToken = <T>(token: string): T | null => {
		try {
			return jwt.verify(token, JWT_REFRESH_SECRET as string) as T;
		} catch (e) {
			return null;
		}
	};

	public findToken = async (token: string) => {
		return prisma.token.findUnique({
			where: {
				refreshToken: token,
			},
		});
	};
}

export default new TokenService();
