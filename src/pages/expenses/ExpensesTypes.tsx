// React
import { useEffect, useState } from "react";

// Componentes
import ListManagementModal from "../../components/Modals/ListManagementModal/ListManagementModal";

// Interfaces
import type { ExpenseTypeBackendProps, TypesProps } from "./Interfaces";
import type { ListItem } from "../../components/Modals/ListManagementModal/Interfaces";

// Services
import { api } from "../../services/api";

/**
 * Exibe a lista de tipos de despesas.
 * @param showTypes Estado que controla a exibição da lista.
 * @param setShowTypes Setter do estado que controla a exibição da lista.
 * @param title Título da lista.
 */
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
                });
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
     * Edita o nome de uma despesa.
     * @param id Id da despesa a ser editada.
     * @param newValue Novo texto para a despesa.
     */
    const onEdit = (id: number, newValue: string): void => {
        api.put(`/api/expenses_types/${id}/`, {
            type: newValue,
        }).finally(() => {
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
            onEdit={onEdit}
        />
    );
};

export default ExpensesTypes;
