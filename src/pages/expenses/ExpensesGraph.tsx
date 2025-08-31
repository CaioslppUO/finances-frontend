// Material UI
import { Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { BarChart, type BarChartProps } from "@mui/x-charts";

// Utils
import { colors } from "../../theme/theme";
import { formatCurrency } from "../../utils/Utils";

// Interfaces
import type { ExpensesGraphProps } from "./Interfaces";

/**
 * Componente responsável por exibir o gráfico das despesas mensais.
 */
const ExpensesGraph = ({ expenses }: ExpensesGraphProps) => {
    const months: string[] = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
    ];

    const chartProps: BarChartProps = {
        xAxis: [
            {
                data: months,
                scaleType: "band",
            },
        ],
        yAxis: [
            {
                scaleType: "linear",
                min: 0,
                width: 90,
                valueFormatter: formatCurrency,
            },
        ],
        series: [
            {
                label: "Total",
                data: expenses,
                valueFormatter: formatCurrency,
            },
        ],
        height: 400,
    };

    return (
        <Grid container sx={{ flex: 1 }}>
            <Grid
                size={12}
                container
                sx={{
                    height: "13%",
                    backgroundColor: colors.blue.strong,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                pl={1}
                pr={1}
            >
                <Grid>
                    <Typography variant="h5">Despesas</Typography>
                </Grid>
                <Grid>
                    <DatePicker views={["month", "year"]} />
                </Grid>
            </Grid>
            <Grid size={12}>
                <BarChart
                    {...chartProps}
                    grid={{ horizontal: true }}
                    sx={{ backgroundColor: "#1d1c1c" }}
                />
            </Grid>
        </Grid>
    );
};

export default ExpensesGraph;
