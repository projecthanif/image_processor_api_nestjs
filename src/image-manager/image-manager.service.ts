import { HttpException, Injectable } from '@nestjs/common';
import { File } from 'buffer';
import { Prisma } from 'generated/prisma';
import sharp from 'sharp';
import { CloudinaryManagerService } from 'src/cloudinary-manager/cloudinary-manager.service';
import { DatabaseService } from 'src/database/database.service';
import { deleteFile } from 'src/helpers/image-manager-helper';
import { Transform } from './dto/image-manager.dto';
import { ImageTransformer } from './image.transformer';

@Injectable()
export class ImageManagerService {
  private storage: string;
  constructor(
    private readonly dbService: DatabaseService,
    private readonly cloudinaryService: CloudinaryManagerService,
  ) {
    this.storage = process.env.FILE_STORAGE ?? 'local';
  }

  async all(email: string) {
    const data = await this.dbService.image.findMany({
      where: { user: { email } },
    });

    return data;
  }

  async fetch(id: number, email: string) {
    const data = await this.dbService.image.findUnique({
      where: { id, user: { email } },
    });
    return data;
  }

  async store(email: string, file: Express.Multer.File) {
    console.log(`STORE IN S3 ${process.env.FILE_STORAGE}`);
    if (this.storage == 's3') {
      return await this.storeInCloudinary(email, file);
    }

    return await this.storeLocally(email, file);
  }

  async storeInCloudinary(email: string, file: Express.Multer.File) {
    const cloudinaryResponse =
      await this.cloudinaryService.uploadToCloudinary(file);
    const data: Prisma.ImageCreateInput = {
      user: { connect: { email } },
      link: cloudinaryResponse.secure_url,
    };
    const res = await this.dbService.image.create({
      data: data,
    });

    await deleteFile(file.path);
    return res;
  }

  async storeLocally(email: string, file: Express.Multer.File) {
    const data: Prisma.ImageCreateInput = {
      user: { connect: { email } },
      link: file.path,
    };
    const res = await this.dbService.image.create({
      data: data,
    });

    return res;
  }

  async transform(id: number, email: string, body: Transform) {
    const res = await this.fetch(id, email);
    if (!res) {
      throw new HttpException('This image resource does not exist', 404);
    }
    const imageTransformer = new ImageTransformer(body, res.link);
    const transformerData = await imageTransformer.transform();
    return transformerData;
  }
}
