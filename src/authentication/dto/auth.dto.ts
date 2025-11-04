import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
