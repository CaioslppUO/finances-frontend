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
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import {
    Grid,
    IconButton,
    Tooltip,
    Typography,
    type SvgIconTypeMap,
} from "@mui/material";

// Utils
import { colors } from "../../theme/theme";

// Interfaces
import type { ExpensesTableProps, TableData } from "./Interfaces";

/**
 * Função responsável por criar uma coluna simples para a tabela.
 * @param key ID único para a coluna.
 * @param header Nome que será utilizado para exibir a coluna.
 * @param color Cor de exibição do nome da coluna.
 * @returns Coluna para a tabela.
 */
const getSimpleColumn = (
    key: string,
    header: string,
    color: string
): MRT_ColumnDef<TableData> => {
    return {
        accessorKey: key,
        header: header,
        muiTableHeadCellProps: {
            style: { color: color },
        },
    };
};

/**
 * Função responsável por criar uma coluna complexa para a tabela.
 * @param id ID único para a coluna.
 * @param header Nome que será utilizado para exibir a coluna.
 * @param color Cor de exibição do nome da coluna.
 * @param Icon Ícone para exibir ao lado do header.
 * @returns Coluna para a tabela.
 */
const getComplexColumn = (
    id: string,
    header: string,
    color: string,
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
): MRT_ColumnDef<TableData> => {
    return {
        accessorFn: (originalRow) => originalRow.type,
        id: id,
        header: header,
        Header: (
            <i style={{ color: color }}>
                <Grid container pt={0.2} sx={{ cursor: "pointer" }}>
                    <Grid>
                        <Typography>{header}</Typography>
                    </Grid>
                    <Grid ml={0.3}>{Icon && <Icon />}</Grid>
                </Grid>
            </i>
        ),
        Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>,
    };
};

/**
 * Componente responsável por exibir a tabela de despesas mensais.
 * @param data Dados para exibir na tabela.
 * @param month Mês sobre os quais são referentes os dados.
 */
const ExpensesTable = ({ data, month }: ExpensesTableProps) => {
    const columns = useMemo<MRT_ColumnDef<TableData>[]>(
        () => [
            getSimpleColumn("date", "Data", colors.white.strong),
            getSimpleColumn("description", "Descrição", colors.white.strong),
            getComplexColumn("type", "Tipo", colors.white.strong, Settings),
            getComplexColumn(
                "budger",
                "Orçamento",
                colors.white.strong,
                Settings
            ),
            getComplexColumn("payment", "PGTO", colors.white.strong, Settings),
            {
                accessorFn: (originalRow) => originalRow.value,
                id: "value",
                header: "Valor",
                Header: (
                    <i style={{ color: colors.white.strong }}>
                        <Grid container pt={0.2}>
                            <Grid>
                                <Typography>Valor</Typography>
                            </Grid>
                        </Grid>
                    </i>
                ),
                Cell: ({ cell }) => (
                    <i>R$ {cell.getValue<number>().toLocaleString()}</i>
                ),
                Footer: ({ table }) => {
                    const total = table
                        .getFilteredRowModel()
                        .rows.reduce((sum, row) => sum + row.original.value, 0);
                    return (
                        <Typography
                            fontWeight="bold"
                            fontSize="0.9rem"
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
        data,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: false,
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
        >
            <MaterialReactTable table={table} />
        </Grid>
    );
};

export default ExpensesTable;
