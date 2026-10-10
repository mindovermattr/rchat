import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { components } from '@rchat/contracts';
import { UsersService } from './users.service';
import { toSafeUser } from './safe-user';

type SafeUser = components['schemas']['SafeUser'];

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: { user: { id: string } }): Promise<SafeUser> {
    return this.usersService
      .findById(req.user.id)
      .then((user) => toSafeUser(user));
  }
}
