// React
import React from "react";

// Gráficos
import { BarChart, type BarChartProps } from "@mui/x-charts";
import { Grid, Typography } from "@mui/material";
import { colors } from "../../theme/theme";
import { DatePicker } from "@mui/x-date-pickers";

const ExpensesGraph: React.FC = () => {
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

    const expenses: (number | null)[] = [
        1200, 950, 1100, 1350, 980, 1500, 1250, 1400, 1000, 1600, 1300, 1450,
    ];

    const formatCurrency = (value: number | null) =>
        value !== null
            ? new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              }).format(value)
            : "";

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
                    {/* <Typography variant="h5">Data</Typography> */}
                    <DatePicker views={["month", "year"]} />
                </Grid>
            </Grid>
            <Grid size={12}>
                <BarChart
                    {...chartProps}
                    grid={{ horizontal: true }}
                    sx={{ backgroundColor: "#1d1c1c" }} // Fundo cinza claro com cantos arredondados
                />
            </Grid>
        </Grid>
    );
};

export default ExpensesGraph;
