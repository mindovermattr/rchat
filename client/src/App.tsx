import { reatomComponent } from "@reatom/react";
import { ChatLayout } from "./components/Chat/ChatLayout";
import { Layout } from "./components/Layout";
import { chatRoute, loginRoute } from "./routes";

export const App = reatomComponent(() => {
  return (
    <Layout>
      {loginRoute.exact() && <div>asd</div>}
      {chatRoute.exact() && <ChatLayout />}
    </Layout>
  );
});
