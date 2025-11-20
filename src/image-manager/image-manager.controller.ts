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
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ImageManagerService } from './image-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/authentication/auth.guard';
import { User } from 'src/user/user.decorator';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import {
  ImageManagerDto,
  ImageTransformBodyDto,
  type Transform,
} from './dto/image-manager.dto';

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
    const email: string = user?.username as string;
    if (!email) {
      throw new HttpException('Internal Server Error', 500);
    }
    return await this.imageService.store(email, file);
  }

  @Post(':id/transform')
  @ApiBody({ type: ImageTransformBodyDto })
  @ApiConsumes('application/json')
  async transform(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) body: ImageTransformBodyDto,
    @User() user,
  ) {
    const email: string = user.username as string;

    const data: Transform = body as Transform;
    const transformed = await this.imageService.transform(id, email, data);
    return transformed;
  }
}
