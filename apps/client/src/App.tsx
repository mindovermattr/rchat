import { reatomComponent } from "@reatom/react";
import { ChatLayout } from "./components/Chat/ChatLayout";
import { Layout } from "./components/Layout";
import { chatRoute, loginRoute, registerRoute } from "./pages";
import { LoginPage } from "./pages/(auth)/login.page";
import { RegisterPage } from "./pages/(auth)/register.page";

export const App = reatomComponent(() => {
  return (
    <Layout>
      {loginRoute.exact() && <LoginPage />}
      {registerRoute.exact() && <RegisterPage />}
      {chatRoute.exact() && <ChatLayout />}
    </Layout>
  );
});
