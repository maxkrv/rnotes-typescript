import { IUser } from "./IUser";

export interface AuthResponse extends IUser {
	refreshtoken: string;
	accesstoken: string;
}
