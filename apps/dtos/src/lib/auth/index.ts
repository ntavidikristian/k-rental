import { IsEmail, IsNotEmpty } from "class-validator";

export class UserCredentials {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}