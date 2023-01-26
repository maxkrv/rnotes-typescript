import { IUser } from "./IUser";

export interface AuthResponse extends IUser {
	refreshToken: string;
	accessToken: string;
}
