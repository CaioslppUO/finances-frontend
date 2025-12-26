// React
import React, { useEffect, useState, type HTMLAttributes } from "react";

// Material UI
import { DatePicker } from "@mui/x-date-pickers";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";

// Formatação numérica
import { NumericFormat, type NumericFormatProps } from "react-number-format";

// Interfaces
import {
    type BudgetsBackendProps,
    type ExpensesManagementProps,
    type ExpenseTypeBackendProps,
    type PaymentsBackendProps,
} from "./Interfaces";

// Services
import { api } from "../../services/api";
import TextInput from "../../components/TextInput/TextInput";
import { colors } from "../../theme/theme";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<
    HTMLInputElement,
    CustomProps & NumericFormatProps
>(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value, // Envia o valor puro (ex: "1250.50")
                    },
                });
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
        />
    );
});

function CurrencyInput() {
    const [value, setValue] = React.useState("0");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            label="Valor da Despesa"
            value={value}
            onChange={handleChange}
            name="valor"
            InputProps={{
                // O "as any" aqui é necessário porque o MUI e o react-number-format
                // possuem pequenas divergências nas definições de refs de input
                inputComponent: NumericFormatCustom as any,
            }}
            fullWidth
        />
    );
}

const ExpensesManagement = ({
    showModal,
    setShowModal,
}: ExpensesManagementProps) => {
    // Tipos Disponíveis
    const [types, setTypes] = useState<ExpenseTypeBackendProps[]>([]);
    const [budgets, setBudgets] = useState<BudgetsBackendProps[]>([]);
    const [payments, setPayments] = useState<PaymentsBackendProps[]>([]);

    // Tipos selecionados
    const [type, setType] = useState<ExpenseTypeBackendProps | undefined>(
        undefined
    );
    const [budget, setBudget] = useState<BudgetsBackendProps | undefined>(
        undefined
    );
    const [payment, setPayment] = useState<PaymentsBackendProps | undefined>(
        undefined
    );

    const [description, setDescription] = useState<string>("");

    /**
     * Preenche os tipos de despesa, orçamentos e métodos de pagamento, ao abrir o modal.
     */
    useEffect(() => {
        if (showModal == false) return;

        // 'Zera' os tipos selecionados anteriormente.
        setType(undefined);
        setBudget(undefined);
        setPayment(undefined);

        // Tipos de despesas
        api.get("/api/expenses_types/").then((response) => {
            setTypes(response.data);
        });

        // Tipos de orçamentos
        api.get("/api/expenses_budgets/").then((response) => {
            setBudgets(response.data);
        });

        // Métodos de pagamento
        api.get("/api/expenses_payments/").then((response) => {
            setPayments(response.data);
        });
    }, [showModal]);

    return (
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            disableEnforceFocus
        >
            {/* Container externo */}
            <Grid
                container
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "36rem",
                    height: "31rem",
                    bgcolor: "#1d1c1c",
                    border: "1px solid #000",
                    boxShadow: 24,
                    px: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "0.5rem",
                    display: "block",
                    overflow: "auto",
                }}
                spacing={1}
            >
                {/* Título */}
                <Grid size={12} mt={1}>
                    <Typography color="#fff" fontSize={"2rem"} component="h2">
                        Cadastrar Despesa
                    </Typography>
                </Grid>
                {/* Identificadores */}
                <Grid container size={12}>
                    <Grid size={12} mt={1}>
                        <Typography
                            color="#fff"
                            fontSize={"1.3rem"}
                            component="h5"
                        >
                            ---- Identificação ----
                        </Typography>
                        <Grid
                            container
                            size={12}
                            mt={3}
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Grid size={5.5}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    label="Data da Despesa"
                                />
                            </Grid>
                            <Grid size={6}>
                                <CurrencyInput />
                            </Grid>
                            <Grid size={12} mt={2.5}>
                                <TextField
                                    inputProps={{ maxLength: 50 }}
                                    fullWidth
                                    label="Descrição"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    helperText={`${description.length}/${50}`}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Seletores de Tipos */}
                <Grid container size={12}>
                    <Grid size={12} mt={1}>
                        <Typography
                            color="#fff"
                            fontSize={"1.3rem"}
                            component="h5"
                        >
                            ---- Tipo, Orçamento e Pagamento ----
                        </Typography>
                    </Grid>
                    {/* Tipos de despesa */}
                    <Grid size={4} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="select-expense-type-label">
                                Tipo de Despesa
                            </InputLabel>
                            <Select
                                labelId="select-expense-type-label"
                                id="select-expense-type"
                                value={
                                    type == undefined
                                        ? types[0]?.expense_type_id
                                        : type.expense_type_id
                                }
                                label="Tipo de Despesa"
                                onChange={(value) => {
                                    setType(
                                        types.find(
                                            (item) =>
                                                item.expense_type_id ==
                                                Number(value.target.value)
                                        )
                                    );
                                }}
                            >
                                {types.map((type, index) => (
                                    <MenuItem value={type.expense_type_id}>
                                        {`${index + 1} - ${type.type}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Tipos de orçamento */}
                    <Grid size={4} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="select-expense-budget-label">
                                Orçamento
                            </InputLabel>
                            <Select
                                labelId="select-expense-budget-label"
                                id="select-expense-budget"
                                value={
                                    budget == undefined
                                        ? budgets[0]?.expense_budget_id
                                        : budget.expense_budget_id
                                }
                                label="Orçamento"
                                onChange={(value) => {
                                    setBudget(
                                        budgets.find(
                                            (item) =>
                                                item.expense_budget_id ==
                                                Number(value.target.value)
                                        )
                                    );
                                }}
                            >
                                {budgets.map((budget, index) => (
                                    <MenuItem value={budget.expense_budget_id}>
                                        {`${index + 1} - ${budget.budget}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Métodos de Pagamento */}
                    <Grid size={4} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="select-expense-payment-label">
                                Método de Pagamento
                            </InputLabel>
                            <Select
                                labelId="select-expense-payment-label"
                                id="select-expense-payment"
                                value={
                                    payment == undefined
                                        ? payments[0]?.expense_payment_id
                                        : payment.expense_payment_id
                                }
                                label="Método de Pagamento"
                                onChange={(value) => {
                                    setPayment(
                                        payments.find(
                                            (item) =>
                                                item.expense_payment_id ==
                                                Number(value.target.value)
                                        )
                                    );
                                }}
                            >
                                {payments.map((payment, index) => (
                                    <MenuItem
                                        value={payment.expense_payment_id}
                                    >
                                        {`${index + 1} - ${payment.payment}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {/* Botões de Ação */}
                <Grid
                    container
                    size={12}
                    pt={5}
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <Grid>
                        <Button
                            sx={{
                                backgroundColor: colors.red.strong,
                                color: colors.white.strong,
                                height: "2.5rem",
                                width: "6rem",
                                textTransform: "none",
                            }}
                            onClick={() => {}}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            sx={{
                                backgroundColor: colors.green.strong,
                                color: colors.white.strong,
                                height: "2.5rem",
                                width: "6rem",
                                textTransform: "none",
                            }}
                            onClick={() => {}}
                        >
                            Confirmar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ExpensesManagement;
