import { IUser } from "./IUser";

export interface AuthResponse extends IUser {
	refreshtoken: string;
	accesstoken: string;
}

export interface AuthQuery {
	email: string;
	password: string;
}
