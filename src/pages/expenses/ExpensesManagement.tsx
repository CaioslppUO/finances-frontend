// React
import React, { useEffect, useState } from "react";

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
    type ExpensesBackendProps,
    type ExpensesManagementProps,
    type ExpenseTypeBackendProps,
    type NumericCustomProps,
    type PaymentsBackendProps,
} from "./Interfaces";

// Services e Utils
import dayjs, { Dayjs } from "dayjs";
import { api } from "../../services/api";
import { colors } from "../../theme/theme";

/**
 * Formata entradas numéricas de texto para Reais (R$).
 */
const NumericFormatCustom = React.forwardRef<
    HTMLInputElement,
    NumericCustomProps & NumericFormatProps
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

/**
 * Componente que renderiza um input em formato de moeda (R$).
 * @param value Valor digitado no campo.
 * @param setValue Setter do estado que armazena o valor digitado no campo.
 */
function CurrencyInput({
    value,
    setValue,
}: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
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

/**
 * Componente utilizado para exibir o campo "Descrição" da despesa.
 */
const DescriptionField = React.memo(
    ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
        return (
            <TextField
                inputProps={{ maxLength: 50 }}
                fullWidth
                label="Descrição"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                helperText={`${value.length}/50`}
            />
        );
    }
);

/**
 * Componente que exibe o gerenciador de despesas (criação e edição).
 * @param showModal Indica se o modal deve ou não ser exibido.
 * @param setShowModal Setter do estado que controla a exibição do modal.
 * @param selectedDate Data selecionada no calendário.
 * @param onClose Função chamada ao clicar no botão de cancelar ou confirmar.
 */
const ExpensesManagement = ({
    showModal,
    setShowModal,
    onClose,
    expenseIdToEdit,
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

    // Valores
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const [value, setValue] = React.useState("0");

    /**
     * Função chamada ao clicar no botão de confirmar do modal.
     */
    const onConfirm = (): void => {
        if (description.length <= 0) {
            alert("A descrição não pode ser vazia!");
            return;
        }

        if (Number(value) == 0) {
            alert("O valor não pode ser vazio!");
            return;
        }

        if (type == undefined) {
            alert("O tipo não pode ser vazio!");
            return;
        }

        if (budget == undefined) {
            alert("O orçamento não pode ser vazio!");
            return;
        }

        if (payment == undefined) {
            alert("O método de pagamento não pode ser vazio!");
            return;
        }

        // Criação de uma nova despesa
        if (expenseIdToEdit == undefined) {
            api.post("/api/expenses/", {
                description: description,
                value: value,
                date: date?.format("YYYY-MM-DD"),
                fk_type_id: type?.expense_type_id,
                fk_budget_id: budget?.expense_budget_id,
                fk_payment_id: payment?.expense_payment_id,
            }).finally(() => {
                onClose();
            });
        } else {
            // Edição de uma despesa
            api.put(`/api/expenses/${expenseIdToEdit}/`, {
                description: description,
                value: value,
                date: date?.format("YYYY-MM-DD"),
                fk_type_id: type?.expense_type_id,
                fk_budget_id: budget?.expense_budget_id,
                fk_payment_id: payment?.expense_payment_id,
            }).finally(() => {
                onClose();
            });
        }

        // Fecha e limpa o modal.
        setShowModal(false);
    };

    /**
     * Função chamada ao clicar no botão de cancelar do modal.
     */
    const onCancel = (): void => {
        setShowModal(false);
        onClose();
    };

    /**
     * Busca e retorna uma despesa específica do backend.
     * @param id Id da despesa que será pesquisada.
     */
    const fetchExpense = async (id: number): Promise<ExpensesBackendProps> => {
        const response = await api.get(`/api/expenses/${id}/`);
        return response.data;
    };

    /**
     * Preenche os tipos de despesa, orçamentos e métodos de pagamento, ao abrir o modal.
     */
    useEffect(() => {
        // Preenche os tipos, orçamentos e métodos de pagamentos cadastrados para as despesas.
        if (showModal == false) return;

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

        // 'Zera' os tipos selecionados anteriormente.
        if (expenseIdToEdit != undefined) return;
        setType(undefined);
        setBudget(undefined);
        setPayment(undefined);
        setDescription("");
        setValue("0");
        setDate(null);
    }, [showModal]);

    /**
     * Preenche os dados de uma despesa que será editada.
     */
    useEffect(() => {
        if (expenseIdToEdit == undefined) return;

        // 'Zera' os tipos selecionados anteriormente.
        setType(undefined);
        setBudget(undefined);
        setPayment(undefined);
        setDescription("");
        setValue("0");
        setDate(null);

        fetchExpense(expenseIdToEdit).then((expense) => {
            setDescription(expense.description);
            setValue(expense.value);
            setDate(dayjs(expense.date));
            setType(
                types.find((type) => type.expense_type_id == expense.fk_type_id)
            );
            setBudget(
                budgets.find(
                    (budget) => budget.expense_budget_id == expense.fk_budget_id
                )
            );
            setPayment(
                payments.find(
                    (payment) =>
                        payment.expense_payment_id == expense.fk_payment_id
                )
            );
        });
        // console.log("Chegou aqui: ", expenseIdToEdit);
    }, [expenseIdToEdit]);

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
                                    value={date}
                                    onChange={(newDate) => {
                                        setDate(newDate);
                                    }}
                                />
                            </Grid>
                            <Grid size={6}>
                                <CurrencyInput
                                    value={value}
                                    setValue={setValue}
                                />
                            </Grid>
                            <Grid size={12} mt={2.5}>
                                <DescriptionField
                                    value={description}
                                    onChange={setDescription}
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
                                value={type ? type.expense_type_id : ""}
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
                                value={budget ? budget.expense_budget_id : ""}
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
                                    payment ? payment.expense_payment_id : ""
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
                            onClick={onCancel}
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
                            onClick={onConfirm}
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
