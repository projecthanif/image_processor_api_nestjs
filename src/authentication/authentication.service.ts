import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { hashPassword, verifyHashPassword } from '../helpers/auth-helper';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entities';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(body: Prisma.UserCreateInput) {
    const checkRes = await this.checkUserExists(body.email);
    if (checkRes?.email) {
      throw new HttpException('User with this email already exist', 400);
    }
    const password = await hashPassword(body.password);
    const res = await this.dbService.user.create({
      data: { ...body, password },
    });

    return res;
  }

  async loginUser(email: string, password: string) {
    const user = await this.checkUserExists(email);
    const verifyRes = await verifyHashPassword(password, user!.password);
    if (!verifyRes) {
      throw new HttpException('Email or password incorrect', 400);
    }

    const payload = { sub: user!.id, username: user!.email };

    const token = await this.jwtService.signAsync(payload);

    return {
      data: {
        user: new UserEntity(user),
        token,
      },
    };
  }

  async checkUserExists(email: string) {
    const res = await this.dbService.user.findUnique({
      where: { email },
    });
    return res;
  }
}
