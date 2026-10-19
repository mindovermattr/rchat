import { Type, type Static } from "@sinclair/typebox";
import { Email, Name } from "./common.scheme";

export const SafeUser = Type.Object(
  {
    id: Type.String(),
    email: Email,
    name: Name,
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

export type SafeUser = Static<typeof SafeUser>;
