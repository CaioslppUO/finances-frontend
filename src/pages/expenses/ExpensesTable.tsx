// React
import { useMemo } from "react";

// Table
import {
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleFullScreenButton,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";

// Material UI
import { Add, Settings } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";

// Utils
import { colors } from "../../theme/theme";

// Interfaces
import type { TableData } from "./Interfaces";

const ExpensesTable = ({
    data,
    month,
}: {
    data: TableData[];
    month: string;
}) => {
    const columns = useMemo<MRT_ColumnDef<TableData>[]>(
        () => [
            {
                accessorKey: "date", //simple recommended way to define a column
                header: "Data",
                muiTableHeadCellProps: {
                    style: { color: colors.white.strong },
                }, //custom props
            },
            {
                accessorKey: "description", //simple recommended way to define a column
                header: "Descrição",
                muiTableHeadCellProps: {
                    style: { color: colors.white.strong },
                }, //custom props
            },
            {
                accessorFn: (originalRow) => originalRow.type, // alternate way
                id: "type", //id required if you use accessorFn instead of accessorKey
                header: "Tipo",
                Header: (
                    <i style={{ color: colors.white.strong }}>
                        <Grid container pt={0.2} sx={{ cursor: "pointer" }}>
                            <Grid>
                                <Typography>Tipo</Typography>
                            </Grid>
                            <Grid ml={0.3}>
                                <Settings />
                            </Grid>
                        </Grid>
                    </i>
                ), //optional custom markup
                Cell: ({ cell }) => (
                    <i>{cell.getValue<number>().toLocaleString()}</i>
                ), //optional custom cell render
            },
            {
                accessorFn: (originalRow) => originalRow.budget, // alternate way
                id: "budget", //id required if you use accessorFn instead of accessorKey
                header: "Orçamento",
                Header: (
                    <i style={{ color: colors.white.strong }}>
                        <Grid container pt={0.2} sx={{ cursor: "pointer" }}>
                            <Grid>
                                <Typography>Orçamento</Typography>
                            </Grid>
                            <Grid ml={0.3}>
                                <Settings />
                            </Grid>
                        </Grid>
                    </i>
                ), //optional custom markup
                Cell: ({ cell }) => (
                    <i>{cell.getValue<number>().toLocaleString()}</i>
                ), //optional custom cell render
            },
            {
                accessorFn: (originalRow) => originalRow.payment, // alternate way
                id: "payment", //id required if you use accessorFn instead of accessorKey
                header: "PGTO",
                Header: (
                    <i style={{ color: colors.white.strong }}>
                        <Grid container pt={0.2} sx={{ cursor: "pointer" }}>
                            <Grid>
                                <Typography>PGTO</Typography>
                            </Grid>
                            <Grid ml={0.3}>
                                <Settings />
                            </Grid>
                        </Grid>
                    </i>
                ), //optional custom markup
                Cell: ({ cell }) => (
                    <i>{cell.getValue<number>().toLocaleString()}</i>
                ), //optional custom cell render
            },
            {
                accessorFn: (originalRow) => originalRow.value, // alternate way
                id: "value", //id required if you use accessorFn instead of accessorKey
                header: "Valor",
                Header: (
                    <i style={{ color: colors.white.strong }}>
                        <Grid container pt={0.2}>
                            <Grid>
                                <Typography>Valor</Typography>
                            </Grid>
                        </Grid>
                    </i>
                ), //optional custom markup
                Cell: ({ cell }) => (
                    <i>R$ {cell.getValue<number>().toLocaleString()}</i>
                ), //optional custom cell render
                Footer: ({ table }) => {
                    const total = table
                        .getFilteredRowModel()
                        .rows.reduce((sum, row) => sum + row.original.value, 0);
                    return (
                        <Typography
                            fontWeight="bold"
                            fontSize="0.9rem" // aumenta o tamanho da fonte
                            color={colors.white.strong}
                        >
                            Total: R$ {total.toLocaleString()}
                        </Typography>
                    );
                },
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data, // must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableRowSelection: false, //enable some features
        enableColumnOrdering: false, //enable a feature for all columns
        enableGlobalFilter: false, // turn off a feature
        enableCellActions: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        enableBottomToolbar: false,
        enableTopToolbar: true,
        enableDensityToggle: false,
        enableTableFooter: true,
        muiTableContainerProps: {
            sx: { height: "100%" },
        },
        muiTablePaperProps: {
            sx: {
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 0,
            },
        },
        initialState: {
            density: "compact",
        },
        renderTopToolbarCustomActions: () => (
            <Typography
                variant="h6"
                sx={{ color: colors.white.strong, flexGrow: 1 }}
            >
                Despesas Mensais - {month}
            </Typography>
        ),
        renderToolbarInternalActions: ({ table }) => (
            <>
                {/* Botão customizado */}
                <Tooltip title="Adicionar novo item">
                    <IconButton
                        onClick={() => {
                            console.log("Novo item clicado!");
                        }}
                    >
                        <Add />
                    </IconButton>
                </Tooltip>

                {/* Botões padrão */}
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
            </>
        ),
    });

    return (
        <Grid
            size={12}
            sx={{
                flexGrow: 1,
                height: "100%",
            }}
            // sx={{ height: "100%", backgroundColor: "green" }}
        >
            <MaterialReactTable table={table} />
        </Grid>
    );
};

export default ExpensesTable;
