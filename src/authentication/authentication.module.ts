import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/helpers/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      useClass: AuthGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AuthenticationModule {}
