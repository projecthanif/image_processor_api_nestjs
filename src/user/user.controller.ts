import { Controller } from '@nestjs/common';
import { User } from './user.decorator';

@Controller()
export class UserController {
  user(@User() user): any {
    return user;
  }
}
