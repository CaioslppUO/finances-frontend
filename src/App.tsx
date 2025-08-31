// Toolpad
import { AppProvider, type Session } from "@toolpad/core/AppProvider";

// React
import { useState, useMemo } from "react";

// Tema
import theme from "./theme/theme";

// Páginas
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
import Expenses from "./pages/expenses/Expenses";
import { AttachMoney } from "@mui/icons-material";

function App() {
    const [session, setSession] = useState<Session | null>({
        user: {
            name: "Caio Cezar",
            email: "caioslppuo@gmail.com",
            image: "https://avatars.githubusercontent.com/u/37354152?v=4",
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: "Caio Cezar",
                        email: "caioslppuo@gmail.com",
                        image: "https://avatars.githubusercontent.com/u/37354152?v=4",
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            theme={theme}
            branding={{
                logo: (
                    <img
                        src="../public/logo.png"
                        alt="Gerenciador de Despesas Logo"
                    />
                ),
                title: "Gerenciador de Despesas",
                homeUrl: "/",
            }}
            navigation={[
                {
                    segment: "despesas",
                    title: "Despesas",
                    icon: <AttachMoney />,
                },
            ]}
        >
            <Expenses />
        </AppProvider>
    );
}

export default App;
