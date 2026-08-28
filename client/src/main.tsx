import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

import { context, connectLogger, clearStack } from "@reatom/core";
import { reatomContext } from "@reatom/react";

import App from "./App.tsx";
import "./index.css";

clearStack();
const rootFrame = context.start();
if (import.meta.env.DEV) {
  rootFrame.run(connectLogger);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <reatomContext.Provider value={rootFrame}>
        <App />
      </reatomContext.Provider>
    </MantineProvider>
  </StrictMode>,
);
