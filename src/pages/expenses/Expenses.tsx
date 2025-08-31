// Material UI
import { Grid } from "@mui/material";

// Toolpad
import { DashboardLayout } from "@toolpad/core";

// Utils
import { colors } from "../../theme/theme";

// Componentes
import ExpensesTable from "./ExpensesTable";

// Interfaces
import type { TableData } from "./Interfaces";

const Expenses = () => {
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
    ];

    return (
        <DashboardLayout>
            <Grid
                container
                sx={{
                    flex: 1,
                    border: 0,
                    backgroundColor: colors.background,
                }}
            >
                <Grid
                    container
                    size={12}
                    p={1}
                    spacing={0.5}
                    sx={{
                        alignItems: "center",
                    }}
                >
                    <Grid
                        container
                        size={12}
                        sx={{
                            height: "55%",
                            backgroundColor: colors.background,
                        }}
                    ></Grid>
                    <Grid
                        size={12}
                        sx={{
                            height: "45%",
                            backgroundColor: colors.white.strong,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ExpensesTable data={data} />
                    </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Expenses;
