// React
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

// Material UI
import { Grid } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";

// Toolpad
import { DashboardLayout } from "@toolpad/core";
import { AppProvider, type Session } from "@toolpad/core/AppProvider";

// Utils
import { colors } from "../../theme/theme";

// Componentes
import ExpensesTable from "./ExpensesTable";
import ExpensesGraph from "./ExpensesGraph";

// Interfaces
import { type ExpensesProps } from "./Interfaces";

// Contexto
import { useAuth } from "../../context/AuthContext/AuthContext";

// Services
import { api } from "../../services/api";

/**
 * Exibe a página de despesas.
 */
const Expenses = ({ theme }: ExpensesProps) => {
    // Contexto de autenticação.
    const auth = useAuth();

    // Navegação
    const navigate = useNavigate();

    // Estado inicial da sessão do usuário logado.
    const [session, setSession] = useState<Session | null>({
        user: {
            name: auth.user?.username,
            email: auth.user?.email,
            // image: "https://avatars.githubusercontent.com/u/37354152?v=4",
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                // Não utilizado.
                // navigate("/login");
            },
            signOut: () => {
                setSession(null);
                auth.logout();
                navigate("/login");
            },
        };
    }, []);

    // Data selecionada no seletor de datas.
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    // Dados para o gráfico de barras
    const [expenses, setExpenses] = useState<number[]>([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);

    /**
     * Atualiza a lista de despesas mensais (gráfico de barras) quando houver atualização de despesa (deleção, inclusão, edição, etc).
     */
    const onExpenseListChange = () => {
        try {
            api.get(
                `api/expenses/year/?year=${selectedDate.getFullYear()}`,
            ).then((response) => {
                setExpenses(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Sempre que o usuário for autenticado, preenche os dados de sessão.
     */
    useEffect(() => {
        if (auth.isAuthenticated) {
            setSession({
                user: {
                    name: auth.user?.username,
                    email: auth.user?.email,
                },
            });
        } else {
            // Envia o usuário para a página de login
            setSession({
                user: {
                    name: undefined,
                    email: undefined,
                },
            });
            navigate("/login");
        }
    }, [auth.isAuthenticated]);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            theme={theme}
            branding={{
                logo: (
                    <img src="../logo.png" alt="Gerenciador de Despesas Logo" />
                ),
                title: "Gerenciador de Despesas",
                homeUrl: "/despesas",
            }}
            navigation={[
                {
                    segment: "despesas",
                    title: "Despesas",
                    icon: <AttachMoney />,
                },
            ]}
        >
            <DashboardLayout defaultSidebarCollapsed>
                {/* Container dos Dados do Dashboard */}
                <Grid
                    container
                    sx={{
                        flex: 1,
                        border: 0,
                        backgroundColor: "#111827",
                    }}
                    pr={0.5}
                >
                    {/* Container interno dos Dados */}
                    <Grid
                        container
                        size={12}
                        p={1}
                        spacing={1.5}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        {/* Container do gráfico de barras */}
                        <Grid
                            container
                            size={12}
                            sx={{
                                backgroundColor: "#111827",
                            }}
                        >
                            <ExpensesGraph
                                setSelectedDate={setSelectedDate}
                                selectedDate={selectedDate}
                                expenses={expenses}
                                setExpenses={setExpenses}
                            />
                        </Grid>
                        {/* Container da tabela de despesas mensais */}
                        <Grid
                            size={12}
                            sx={{
                                backgroundColor: colors.white.strong,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <ExpensesTable
                                date={selectedDate}
                                onExpenseListChange={onExpenseListChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DashboardLayout>
        </AppProvider>
    );
};

export default Expenses;
