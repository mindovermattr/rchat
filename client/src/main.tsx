import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { clearStack, connectLogger, context } from "@reatom/core";
import { reatomContext } from "@reatom/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
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
