import { unlink } from 'fs/promises';
import { extname } from 'path';

export const customFileHelper = (req, file: Express.Multer.File, callback) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname);
  const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
  callback(null, filename);
};

export const deleteFile = async (filePath: string) => {
  try {
    await unlink(filePath);
    console.log('File deleted successfullly');
  } catch (error) {
    console.error(error);
  }
};
