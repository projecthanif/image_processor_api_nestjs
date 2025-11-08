import { SetMetadata } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const hashPassword = async (
  password: string,
  saltOrRounds: number = 10,
): Promise<string> => {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

const verifyHashPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isTrue = await bcrypt.compare(password, hashedPassword);
  return isTrue;
};

const IS_PUBLIC_KEY = 'isPublic';
const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export { hashPassword, verifyHashPassword, Public, IS_PUBLIC_KEY };
