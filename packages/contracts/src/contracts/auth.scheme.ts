import { Static, Type } from "@sinclair/typebox";
import { Email, Name, Password } from "./common.scheme";
import { SafeUser } from "./user.scheme";

export const RegisterBody = Type.Object(
  {
    email: Email,
    name: Name,
    password: Password,
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

export const LoginBody = Type.Object(
  {
    email: Email,
    password: Password,
  },
  { additionalProperties: false },
);

export const LoginResponse = Type.Object(
  {
    accessToken: Type.String(),
  },
  { additionalProperties: false },
);

export type RegisterBody = Static<typeof RegisterBody>;
export type RegisterResponse = Static<typeof RegisterResponse>;
export type LoginBody = Static<typeof LoginBody>;
export type LoginResponse = Static<typeof LoginResponse>;
