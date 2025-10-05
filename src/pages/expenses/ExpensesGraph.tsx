// React
import { useState } from "react";

// Material UI
import { Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { BarChart, type BarChartProps } from "@mui/x-charts";
import type { PickerValue } from "@mui/x-date-pickers/internals";

// Utils
import dayjs from "dayjs";
import { colors } from "../../theme/theme";
import { formatCurrency } from "../../utils/Utils";

// Interfaces
import { months, type ExpensesGraphProps } from "./Interfaces";

/**
 * Componente responsável por exibir o gráfico das despesas mensais.
 * @param expenses Lista de despesas mensais.
 * @param setSelectedMonth Função para definir o mês selecionado.
 */
const ExpensesGraph = ({ expenses, setSelectedMonth }: ExpensesGraphProps) => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    /**
     * Handler para a alteração de data do calendário.
     * @param data Nova data selecionada.
     */
    const handleDateChange = (data: PickerValue): void => {
        if (data === null) return;
        setMonth(data.month());
        setYear(data.year());
        setSelectedMonth(data.month());
    };

    const chartProps: BarChartProps = {
        xAxis: [
            {
                data: months.map((month) => month.abbreviation),
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
        height: 350,
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
                    <Typography variant="h5">Despesas - {year}</Typography>
                </Grid>
                <Grid>
                    <DatePicker
                        views={["month", "year"]}
                        onAccept={handleDateChange}
                        defaultValue={dayjs()
                            .set("month", month - 1)
                            .startOf("month")}
                    />
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
