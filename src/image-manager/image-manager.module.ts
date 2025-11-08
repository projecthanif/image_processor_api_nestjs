import { Module } from '@nestjs/common';
import { ImageManagerController } from './image-manager.controller';
import { ImageManagerService } from './image-manager.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customFileHelper } from 'src/helpers/image-manager-helper';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryManagerModule } from 'src/cloudinary-manager/cloudinary-manager.module';

@Module({
  imports: [
    DatabaseModule,
    CloudinaryManagerModule,
    MulterModule.register({
      storage: diskStorage({
        destination: process.env.FILE_DIRECTORY,
        filename: customFileHelper,
      }),
    }),
  ],
  controllers: [ImageManagerController],
  providers: [ImageManagerService],
})
export class ImageManagerModule {}
