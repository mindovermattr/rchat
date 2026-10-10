import type { components } from '@rchat/contracts';

type SafeUser = components['schemas']['SafeUser'];

export function toSafeUser(user: {
  id: string;
  email: string;
  name: string;
  createdAt: Date | string;
}): SafeUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt:
      typeof user.createdAt === 'string'
        ? user.createdAt
        : user.createdAt.toISOString(),
  };
}
