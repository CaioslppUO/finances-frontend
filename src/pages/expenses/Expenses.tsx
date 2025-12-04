// React
import { useState } from "react";

// Material UI
import { Grid } from "@mui/material";
import { AttachMoney } from "@mui/icons-material";

// Toolpad
import { AppProvider } from "@toolpad/core/AppProvider";

// Toolpad
import { DashboardLayout } from "@toolpad/core";

// Utils
import { colors } from "../../theme/theme";

// Componentes
import ExpensesTable from "./ExpensesTable";
import ExpensesGraph from "./ExpensesGraph";

// Interfaces
import { months, type ExpensesProps, type TableData } from "./Interfaces";

/**
 * Exibe a página de despesas.
 */
const Expenses = ({ session, theme, authentication }: ExpensesProps) => {
    // Mês selecionado no seletor de datas.
    const [selectedMonth, setSelectedMonth] = useState<number>(
        new Date().getMonth()
    );

    // Dados para a tabela de despesas mensais
    const data: TableData[] = [
        {
            date: "25/08/2025",
            description: "Compra de salgados na padaria do PTI",
            type: "Conta",
            budget: "Lazer",
            payment: "Cartão Inter",
            value: 32.25,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "28/10/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
        {
            date: "27/08/2025",
            description: "Reposição de Remédios",
            type: "Conta",
            budget: "Custo Fixo",
            payment: "Cartão Inter",
            value: 25.31,
        },
    ];

    // Dados para o gráfico de barras
    const expenses = [
        1200.25, 950.31, 1100.27, 1350.83, 980.01, 1500.15, 1250.22, 1400.33,
        1000.513, 1600.12, 1300.54, 1450.13,
    ];

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
            <DashboardLayout defaultSidebarCollapsed>
                {/* Container dos Dados do Dashboard */}
                <Grid
                    container
                    sx={{
                        flex: 1,
                        border: 0,
                        backgroundColor: colors.background,
                    }}
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
                                backgroundColor: colors.background,
                            }}
                        >
                            <ExpensesGraph
                                expenses={expenses}
                                setSelectedMonth={setSelectedMonth}
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
                                data={data}
                                month={months[selectedMonth].complete}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DashboardLayout>
        </AppProvider>
    );
};

export default Expenses;
