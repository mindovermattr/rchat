import { ROUTES } from "@/shared/constants/routes";
import { reatomForm, reatomRoute } from "@reatom/core";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const loginRoute = reatomRoute({
  path: ROUTES.LOGIN,
  async loader() {
    const loginForm = reatomForm<LoginForm>(
      {
        email: "",
        password: "",
      },
      {
        schema: loginSchema,
        onSubmit: async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          return { success: true, data: values };
        },
        validateOnBlur: true,
      },
    );

    return { loginForm };
  },
});
