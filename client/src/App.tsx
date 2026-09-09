import { reatomComponent } from "@reatom/react";
import { ChatLayout } from "./components/Chat/ChatLayout";
import { Layout } from "./components/Layout";
import { chatRoute, loginRoute } from "./pages";
import { LoginPage } from "./pages/(auth)/login.page";

export const App = reatomComponent(() => {
  return (
    <Layout>
      {loginRoute.exact() && <LoginPage />}
      {chatRoute.exact() && <ChatLayout />}
    </Layout>
  );
});
