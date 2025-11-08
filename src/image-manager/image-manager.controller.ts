import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  Body,
  UploadedFile,
  ParseFilePipe,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ImageManagerService } from './image-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/authentication/auth.guard';
import { User } from 'src/user/user.decorator';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ImageManagerDto } from './dto/image-manager.dto';

@UseGuards(AuthGuard)
@Controller('images')
export class ImageManagerController {
  constructor(private readonly imageService: ImageManagerService) {}

  @Get()
  async images(@User() user) {
    return this.imageService.all(user.username);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: ImageManagerDto })
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @User() user,
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    const email = user?.username;
    if (!email) {
      throw new HttpException('Internal Server Error', 500);
    }
    return await this.imageService.store(email, file);
  }
}
