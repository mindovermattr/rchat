import { ROUTES } from "@/shared/constants/routes";
import { reatomForm, reatomRoute } from "@reatom/core";

export const registerRoute = reatomRoute({
  path: ROUTES.REGISTER,
  async loader() {
    const registerForm = reatomForm(
      {
        username: "",
        password: "",
        passwordDouble: "",
      },
      {
        validate({ password, passwordDouble }) {
          if (password !== passwordDouble) {
            return "Passwords do not match";
          }
        },
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
