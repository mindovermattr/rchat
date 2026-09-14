import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { Database } from '../db';
import { DATABASE } from '../db/database.constants';
import { users } from '../db/schemes/user.schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE) private readonly db: Database) {}

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  }

  async findById(id: string) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));

    return user;
  }

  async create(data: { email: string; name: string; passwordHash: string }) {
    const [user] = await this.db.insert(users).values(data).returning();

    return user;
  }
}
