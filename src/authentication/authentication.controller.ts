import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto, LoginUserDto } from './dto/auth.dto';
import { Prisma } from 'generated/prisma';
import { UserEntity } from './entities/user.entities';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async registerUser(@Body(ValidationPipe) body: AuthRegisterDto) {
    const data: Prisma.UserCreateInput = {
      email: body.email,
      name: body.name,
      password: body.password,
    };
    const res = await this.authService.registerUser(data);
    return new UserEntity(res);
  }

  @Post('login')
  async loginUser(@Body(ValidationPipe) body: LoginUserDto) {
    return await this.authService.loginUser(body.email, body.password);
  }
}
