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
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/helpers/auth-helper';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Public()
  @ApiBody({ type: AuthRegisterDto })
  @ApiResponse({ type: UserEntity })
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

  @Public()
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async loginUser(@Body(ValidationPipe) body: LoginUserDto) {
    const res = await this.authService.loginUser(body.email, body.password);

    return {
      message: 'login successfully',
      ...res,
    };
  }
}
