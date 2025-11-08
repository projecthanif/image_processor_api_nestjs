import { HttpException, Injectable } from '@nestjs/common';
import {
  v2 as Cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

@Injectable()
export class CloudinaryManagerService {
  constructor() {
    Cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    try {
      const options = {
        use_filename: false,
        unique_filename: true,
        overwrite: true,
      };
      const response = await Cloudinary.uploader.upload(file.path, options);
      return response;
    } catch (error) {
      throw new HttpException(error?.message, error?.http_code);
    }
  }

  async uploadToCloudinaryWithStream(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const uploadResponse = Cloudinary.uploader.upload_stream(
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            return reject(new HttpException(error, 500));
          }
          if (!result) {
            return reject(new HttpException('Failed to upload', 500));
          }
          return resolve(result);
        },
      );
      uploadResponse.end(file.buffer);
    });
  }
}
