import type { components } from "@rchat/contracts";
import { instance, protectedInstance } from "./instance";

type RegisterBody = components["schemas"]["RegisterBody"];
type LoginBody = components["schemas"]["LoginBody"];
type RegisterResponse = components["schemas"]["RegisterResponse"];
type LoginResponse = components["schemas"]["LoginResponse"];
type SafeUser = components["schemas"]["SafeUser"];

export const apiRegister = (body: RegisterBody) =>
  instance<RegisterResponse>("/auth/register", { method: "POST", body });

export const apiLogin = (body: LoginBody) =>
  instance<LoginResponse>("/auth/login", { method: "POST", body });

export const apiMe = () => protectedInstance<SafeUser>("/users/me");