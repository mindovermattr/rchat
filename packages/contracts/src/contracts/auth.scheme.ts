import { Static, Type } from "@sinclair/typebox";
import { Email } from "./common.scheme";
import { SafeUser } from "./user.scheme";

export const RegisterBody = Type.Object(
  {
    email: Email,
    name: Type.String(),
    password: Type.String(),
  },
  { additionalProperties: false },
);

export const LoginBody = Type.Object(
  {
    email: Email,
    password: Type.String(),
  },
  { additionalProperties: false },
);

export const RegisterResponse = Type.Object(
  {
    user: SafeUser,
    accessToken: Type.String(),
  },
  { additionalProperties: false },
);

export type RegisterBody = Static<typeof RegisterBody>;
export type LoginBody = Static<typeof LoginBody>;
export type RegisterResponse = Static<typeof RegisterResponse>;
