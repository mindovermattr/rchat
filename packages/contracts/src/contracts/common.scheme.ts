import { Type, type Static } from "@sinclair/typebox";

export const Email = Type.String({
  format: "email",
  maxLength: 255,
  example: "user@example.com",
});

export type Email = Static<typeof Email>;
