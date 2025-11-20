import sharp, { Region } from 'sharp';
import { Transform } from './dto/image-manager.dto';
import { randomUUID } from 'crypto';

export class ImageTransformer {
  constructor(
    private body: Transform,
    private fileLink: string,
  ) {}

  async transform() {
    const imageTransformer = sharp(this.fileLink);
    const transformer = this.body.transformations;
    const resize = transformer.resize;
    if (resize) {
      const data = this.resize(resize);
      imageTransformer.resize(data);
    }

    if (transformer.rotate) {
      imageTransformer.rotate(transformer.rotate);
    }

    if (transformer.crop) {
      const extract: Region = this.crop(transformer.crop) as Region;

      imageTransformer.extract(extract);
    }

    if (transformer.filters?.grayscale) {
      imageTransformer.grayscale();
    }

    if (transformer.filters?.sepia) {
      imageTransformer.modulate({
        saturation: 0.5,
        hue: 30,
      });
    }

    if (transformer.format) {
      imageTransformer.toFormat(transformer.format);
    }

    const fileName =
      'transformed_' + randomUUID().toString() + '.' + transformer.format;

    await imageTransformer.toFile(`transformed/${fileName}`);

    return {
      message: 'Image transformed successfully',
      fileName,
      url: `/transformed/${fileName}`,
    };
  }

  private resize({ width, height }: { width?: number; height?: number }) {
    let size = {};
    if (width) {
      size = { ...size, width };
    }
    if (height) {
      size = { ...size, height };
    }
    return size;
  }

  private crop({
    width,
    height,
    x,
    y,
  }: {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
  }) {
    let extract = {};

    if (width) {
      extract = { width };
    }

    if (height) {
      extract = { ...extract, height };
    }

    if (x) {
      extract = { ...extract, left: x };
    }

    if (y) {
      extract = { ...extract, top: y };
    }

    return extract;
  }
}
