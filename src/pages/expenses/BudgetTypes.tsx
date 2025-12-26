// React
import { useEffect, useState } from "react";

// Componentes
import ListManagementModal from "../../components/Modals/ListManagementModal/ListManagementModal";

// Interfaces
import type { BudgetsBackendProps, TypesProps } from "./Interfaces";
import type { ListItem } from "../../components/Modals/ListManagementModal/Interfaces";

// Services
import { api } from "../../services/api";

/**
 * Exibe a lista de tipos de orçamentos.
 * @param showTypes Estado que controla a exibição da lista.
 * @param setShowTypes Setter do estado que controla a exibição da lista.
 * @param title Título da lista.
 */
const BudgetTypes = ({ showTypes, setShowTypes, title }: TypesProps) => {
    // Lista de orçamentos
    const [budgets, setBudgets] = useState<ListItem[]>([]);

    /**
     * Carrega a lista de orçamentos cadastrados para esse usuário.
     */
    const getBudgetsList = (): void => {
        api.get("/api/expenses_budgets/").then((response) => {
            let tmpList: ListItem[] = [];

            // Preenche a lista de elementos que será exibida.
            response.data.forEach((data: BudgetsBackendProps) => {
                tmpList.push({
                    id: data.expense_budget_id,
                    displayValue: data.budget,
                });
            });

            setBudgets(tmpList);
        });
    };

    /**
     * Adiciona um novo item à lista de orçamentos.
     * @param value Nome do orçamento.
     */
    const onAdd = (value: string): void => {
        if (value.length == 0) {
            alert("O nome do orçamento não pode ser vazio!");
            return;
        }

        if (budgets.find((item) => item.displayValue == value)) {
            alert("Já existe um orçamento com esse nome!");
            return;
        }

        // Cadastra a nova despesa.
        api.post("/api/expenses_budgets/", {
            budget: value,
        }).finally(() => {
            // Recarrega a lista de orçamentos.
            getBudgetsList();
        });
    };

    /**
     * Deleta o orçamento com o id informado.
     * @param id Id do orçamento que será deletado.
     */
    const onDelete = (id: number): void => {
        api.delete(`/api/expenses_budgets/${id}/`).finally(() => {
            // Recarrega a lista de orçamentos.
            getBudgetsList();
        });
    };

    /**
     * Edita o nome de um orçamento.
     * @param id Id do orçamento a ser editado.
     * @param newValue Novo texto para o orçamento.
     */
    const onEdit = (id: number, newValue: string): void => {
        if (newValue.length == 0) {
            alert("O nome do orçamento não pode ser vazio!");
            return;
        }

        if (budgets.find((item) => item.displayValue == newValue)) {
            alert("Já existe um orçamento com esse nome!");
            return;
        }

        api.put(`/api/expenses_budgets/${id}/`, {
            budget: newValue,
        }).finally(() => {
            // Recarrega a lista de orçamentos.
            getBudgetsList();
        });
    };

    /**
     * Busca os tipos de orçamentos cadastrados para esse usuário ao abrir o modal.
     */
    useEffect(() => {
        if (showTypes == false) return;
        // Carrega a lista de orçamentos.
        getBudgetsList();
    }, [showTypes]);

    return (
        <ListManagementModal
            showModal={showTypes}
            setShowModal={setShowTypes}
            title={title}
            itens={budgets}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    );
};

export default BudgetTypes;
