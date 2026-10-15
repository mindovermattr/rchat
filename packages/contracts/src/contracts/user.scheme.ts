import { Type, type Static } from "@sinclair/typebox";

export const SafeUser = Type.Object(
  {
    id: Type.String(),
    email: Type.String(),
    name: Type.String(),
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

export type TSafeUser = Static<typeof SafeUser>;
