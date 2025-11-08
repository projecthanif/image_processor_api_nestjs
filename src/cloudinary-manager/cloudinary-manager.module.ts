import { Module } from '@nestjs/common';
import { CloudinaryManagerService } from './cloudinary-manager.service';

@Module({
  providers: [CloudinaryManagerService],
  exports: [CloudinaryManagerService],
})
export class CloudinaryManagerModule {}
