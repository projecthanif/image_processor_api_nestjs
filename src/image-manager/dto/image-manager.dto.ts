import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ImageManagerDto {
  @ApiProperty()
  @IsNotEmpty()
  file: Express.Multer.File;
}

export class ImageTransformDto {
  @IsNotEmpty()
  transform: Transform;
}

type Transform = {
  transformations: {
    resize?: {
      width?: number;
      height?: number;
    };
    crop?: {
      width?: number;
      height?: number;
      x?: number;
      y?: number;
    };
    rotate?: number;
    format?: string;
    filters?: {
      grayscale?: boolean;
      sepia?: boolean;
    };
  };
};
