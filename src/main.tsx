// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Material UI
import { ThemeProvider, CssBaseline } from "@mui/material";

// Temas
import theme from "./theme/theme";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* aplica normalização de estilos */}
            <App />
        </ThemeProvider>
    </StrictMode>
);
