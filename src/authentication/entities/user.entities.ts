import { Exclude, Expose } from 'class-transformer';

export class UserEntity {
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;

  constructor(partial: any) {
    Object.assign(this, partial);
  }
}
