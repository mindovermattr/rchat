import { ROUTES } from "@/shared/constants/routes";
import { reatomForm, reatomRoute } from "@reatom/core";
import z from "zod";

const registrationSchema = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export const registerRoute = reatomRoute({
  path: ROUTES.REGISTER,
  async loader() {
    const registerForm = reatomForm<RegistrationForm>(
      {
        email: "",
        password: "",
      },
      {
        schema: registrationSchema,
        onSubmit: async (values) => {
          console.log("Submitting register form:", values);
          await new Promise((r) => setTimeout(r, 1000));
          return { success: true };
        },
        validateOnBlur: true,
      },
    );

    return { registerForm };
  },
});
