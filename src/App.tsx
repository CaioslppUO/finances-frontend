// Toolpad
import { type Session } from "@toolpad/core/AppProvider";

// React
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Expenses from "./pages/expenses/Expenses";

// Tema
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

// Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    const [session, setSession] = useState<Session | null>({
        user: {
            name: "Caio Cezar",
            email: "caioslppuo@gmail.com",
            // image: "https://avatars.githubusercontent.com/u/37354152?v=4",
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: "Caio Cezar",
                        email: "caioslppuo@gmail.com",
                        // image: "https://avatars.githubusercontent.com/u/37354152?v=4",
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/despesas"
                            element={
                                <Expenses
                                    theme={theme}
                                    authentication={authentication}
                                    session={session}
                                />
                            }
                        />
                        <Route path="/registrar" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
