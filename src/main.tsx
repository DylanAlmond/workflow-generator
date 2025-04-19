import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WorkflowProvider from "./components/WorkflowProvider.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <WorkflowProvider>
        <App />
      </WorkflowProvider>
    </ThemeProvider>
  </StrictMode>,
);
