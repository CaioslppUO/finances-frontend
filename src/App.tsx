// React
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

// Contexto
import { AuthProvider } from "./context/AuthContext/AuthContext";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/despesas"
                                element={<Expenses theme={theme} />}
                            />
                            <Route path="/registrar" element={<Register />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
