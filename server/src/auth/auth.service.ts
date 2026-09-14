import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!user || !isPasswordValid) {
      return null;
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async register(data: { email: string; name: string; password: string }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      email: data.email,
      name: data.name,
      passwordHash,
    });

    const { passwordHash: _ignored, ...safe } = user;
    const { accessToken } = await this.getAccessToken(safe);

    return { user: safe, access_token: accessToken };
  }

  async getAccessToken(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
