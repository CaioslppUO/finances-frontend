// React
import { useEffect, useState } from "react";

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

// Services
import { api } from "../../services/api";

/**
 * Componente responsável por exibir o gráfico das despesas mensais.
 * @param setSelectedDate Função para definir a data selecionada.
 */
const ExpensesGraph = ({
    setSelectedDate,
    expenses,
    setExpenses,
}: ExpensesGraphProps) => {
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
        setSelectedDate(data.toDate());
    };

    /**
     * Handler para o clique em um barra do gráfico.
     * @param event Evento do mouse.
     * @param params Parâmetros do gráfico.
     */
    const handleBarClick = (
        event: React.MouseEvent,
        params: { dataIndex: number }
    ) => {
        const monthIndex = params.dataIndex;

        // Define a data como o mês clicado
        const selected = dayjs().year(year).month(monthIndex).startOf("month");

        handleDateChange(selected);
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
                barLabel: (value) => formatCurrency(value.value),
            },
        ],
        height: 350,
    };

    // Atualiza os dados sempre que o ano mudar.
    useEffect(() => {
        try {
            api.get(`api/expenses/year/?year=${year}`).then((response) => {
                setExpenses(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, [year]);

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
                        value={dayjs().set("month", month).startOf("month")}
                    />
                </Grid>
            </Grid>
            <Grid size={12}>
                <BarChart
                    {...chartProps}
                    grid={{ horizontal: true }}
                    onItemClick={handleBarClick}
                    sx={{ backgroundColor: "#1d1c1c" }}
                />
            </Grid>
        </Grid>
    );
};

export default ExpensesGraph;
