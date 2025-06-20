import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
