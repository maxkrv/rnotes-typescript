import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
	@IsEmail()
	public email: string;

	@IsString()
	@MinLength(6)
	public password: string;
}
