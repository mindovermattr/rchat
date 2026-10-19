import { Type } from "@sinclair/typebox";

export const ErrorResponse = Type.Object(
  {
    statusCode: Type.Integer(),
    message: Type.String(),
  },
  {
    additionalProperties: false,
  },
);
