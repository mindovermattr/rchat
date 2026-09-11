import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Database } from '../db';
import { DATABASE } from '../db/database.constants';
import { users } from '../db/schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(DATABASE) private readonly db: Database,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, payload.sub));

    if (!user) {
      throw new UnauthorizedException();
    }

    const { passwordHash, ...result } = user;

    return result;
  }
}
