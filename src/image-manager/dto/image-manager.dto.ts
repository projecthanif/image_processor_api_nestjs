import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class ImageManagerDto {
  @ApiProperty()
  @IsNotEmpty()
  file: Express.Multer.File;
}

enum ImageFormat {
  PNG = 'png',
  JPEG = 'jpeg',
  WEBP = 'webp',
  GIF = 'gif',
  JP2 = 'jp2',
  TIFF = 'tiff',
  AVIF = 'avif',
}

class ResizeDto {
  @IsEmpty()
  @IsNumber()
  @Min(1)
  width: number;

  @IsEmpty()
  @IsNumber()
  @Min(1)
  height: number;
}

class CropDto {
  @IsEmpty()
  @IsNumber()
  @Min(1)
  width: number;

  @IsEmpty()
  @IsNumber()
  @Min(1)
  hieght: number;

  @IsEmpty()
  @IsNumber()
  @Min(1)
  x: number;

  @IsEmpty()
  @IsNumber()
  @Min(1)
  y: number;
}

class ImageFilterDto {
  @IsBoolean()
  @IsEmpty()
  grayscale: boolean;

  @IsBoolean()
  @IsEmpty()
  sepia: boolean;
}

class ImageTransformDto {
  @IsEmpty()
  resize?: ResizeDto;

  @IsEmpty()
  crop?: CropDto;

  @IsEmpty()
  filter?: ImageFilterDto;

  @IsEmpty()
  rotate?: number;

  @IsEmpty()
  @IsEnum(ImageFormat)
  format: string;
}

export class ImageTransformBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  transformations: ImageTransformDto;
}

export type Transform = {
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
    format?: 'png' | 'jpeg' | 'webp' | 'gif' | 'jp2' | 'tiff' | 'avif';

    filters?: {
      grayscale?: boolean;
      sepia?: boolean;
    };
  };
};
