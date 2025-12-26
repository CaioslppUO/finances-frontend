// React
import { useEffect, useState } from "react";

// Componentes
import ListManagementModal from "../../components/Modals/ListManagementModal/ListManagementModal";

// Interfaces
import type { ExpenseTypeBackendProps, TypesProps } from "./Interfaces";
import type { ListItem } from "../../components/Modals/ListManagementModal/Interfaces";

// Services
import { api } from "../../services/api";

const ExpensesTypes = ({ showTypes, setShowTypes, title }: TypesProps) => {
    // Lista de despesas
    const [expenses, setExpenses] = useState<ListItem[]>([]);

    /**
     * Carrega a lista de despesas cadastradas para esse usuário.
     */
    const getExpenseTypeList = (): void => {
        api.get("/api/expenses_types/").then((response) => {
            let tmpList: ListItem[] = [];

            // Preenche a lista de elementos que será exibida.
            response.data.forEach((data: ExpenseTypeBackendProps) => {
                tmpList.push({
                    id: data.expense_type_id,
                    displayValue: data.type,
                    isActive: data.is_active,
                });
            });

            // Ordena para exibir primeiro as despesas ativas.
            tmpList.sort((a, b) => {
                if (a.isActive && !b.isActive) return -1;
                if (!a.isActive && b.isActive) return 1;
                return 0;
            });
            setExpenses(tmpList);
        });
    };

    /**
     * Adiciona um novo item à lista de despesas.
     * @param value Nome da despesa
     */
    const onAdd = (value: string): void => {
        if (value.length == 0) {
            alert("O nome da despesa não pode ser vazio!");
            return;
        }

        if (expenses.find((item) => item.displayValue == value)) {
            alert("Já existe uma despesa com esse nome!");
            return;
        }

        // Cadastra a nova despesa.
        api.post("/api/expenses_types/", {
            type: value,
        }).finally(() => {
            // Recarrega a tela de despesas.
            getExpenseTypeList();
        });
    };

    /**
     * Deleta a despesa com o id informado.
     * @param id Id da despesa que será deletada.
     */
    const onDelete = (id: number): void => {
        api.delete(`/api/expenses_types/${id}/`).finally(() => {
            // Recarrega a tela de despesas.
            getExpenseTypeList();
        });
    };

    /**
     * Busca os tipos de despesa cadastrados para esse usuário ao abrir o modal.
     */
    useEffect(() => {
        if (showTypes == false) return;
        // Carrega a lista de despesas.
        getExpenseTypeList();
    }, [showTypes]);

    return (
        <ListManagementModal
            showModal={showTypes}
            setShowModal={setShowTypes}
            title={title}
            itens={expenses}
            onAdd={onAdd}
            onDelete={onDelete}
        />
    );
};

export default ExpensesTypes;
