import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { CloudinaryManagerService } from 'src/cloudinary-manager/cloudinary-manager.service';
import { DatabaseService } from 'src/database/database.service';
import { deleteFile } from 'src/helpers/image-manager-helper';

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
}
