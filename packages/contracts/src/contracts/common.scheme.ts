import { Type } from "@sinclair/typebox";

export const Email = Type.String({
  format: "email",
  maxLength: 255,
  example: "user@example.com",
});

export const Name = Type.String({
  maxLength: 255,
  minLength: 4,
});

export const Password = Type.String({
  minLength: 8,
  maxLength: 24,
});
