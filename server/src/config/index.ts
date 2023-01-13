import * as dotenv from "dotenv";

dotenv.config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
	NODE_ENV,
	PORT,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	CLIENT_URL,
	SERVER_URL,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASSWORD,
} = process.env;
