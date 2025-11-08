import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ImageManagerModule } from './image-manager/image-manager.module';
import { CloudinaryManagerModule } from './cloudinary-manager/cloudinary-manager.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authentication/auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    ImageManagerModule,
    CloudinaryManagerModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './upload'),
      serveRoot: '/upload',
      exclude: ['/src'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
