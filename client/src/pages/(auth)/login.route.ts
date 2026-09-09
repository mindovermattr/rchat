import { ROUTES } from "@/shared/constants/routes";
import { reatomForm, reatomRoute } from "@reatom/core";

export const loginRoute = reatomRoute({
  path: ROUTES.LOGIN,
  async loader() {
    const loginForm = reatomForm(
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
          console.log("Submitting login form:", values);
          await new Promise((r) => setTimeout(r, 1000));
          return { success: true };
        },
        validateOnBlur: true,
      },
    );

    return { loginForm };
  },
});
