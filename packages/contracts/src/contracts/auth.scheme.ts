import { Type } from "@sinclair/typebox";
import { SafeUser } from "./user.scheme";

export const RegisterBody = Type.Object({
  email: Type.String(),
  name: Type.String(),
  password: Type.String(),
});

export const LoginBody = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export const RegisterResponse = Type.Object({
  user: SafeUser,
  accessToken: Type.String(),
});


