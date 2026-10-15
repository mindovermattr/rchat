import { Type } from "@sinclair/typebox";

export const Error = Type.Object({
  statusCode: Type.Number(),
  message: Type.String(),
});
