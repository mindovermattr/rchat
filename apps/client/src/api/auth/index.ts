import type { components } from "@rchat/contracts";
import { instance, protectedInstance } from "../instance";

type RegisterBody = components["schemas"]["RegisterBody"];
type LoginBody = components["schemas"]["LoginBody"];
type RegisterResponse = components["schemas"]["RegisterResponse"];
type LoginResponse = components["schemas"]["LoginResponse"];
type SafeUser = components["schemas"]["SafeUser"];

export const register = (body: RegisterBody) =>
  instance<RegisterResponse>("/auth/register", { method: "POST", body });

export const login = (body: LoginBody) =>
  instance<LoginResponse>("/auth/login", { method: "POST", body });

export const findMe = () => protectedInstance<SafeUser>("/users/me");