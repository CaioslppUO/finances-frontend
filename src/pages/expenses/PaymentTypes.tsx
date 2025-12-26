// React
import { useEffect, useState } from "react";

// Componentes
import ListManagementModal from "../../components/Modals/ListManagementModal/ListManagementModal";

// Interfaces
import type { PaymentsBackendProps, TypesProps } from "./Interfaces";
import type { ListItem } from "../../components/Modals/ListManagementModal/Interfaces";

// Services
import { api } from "../../services/api";

/**
 * Exibe a lista de métodos de pagamento.
 * @param showTypes Estado que controla a exibição da lista.
 * @param setShowTypes Setter do estado que controla a exibição da lista.
 * @param title Título da lista.
 */
const PaymentTypes = ({ showTypes, setShowTypes, title }: TypesProps) => {
    // Lista de métodos de pagamento
    const [payments, setPayments] = useState<ListItem[]>([]);

    /**
     * Carrega a lista de métodos de pagamento cadastrados para esse usuário.
     */
    const getPaymentsList = (): void => {
        api.get("/api/expenses_payments/").then((response) => {
            let tmpList: ListItem[] = [];

            // Preenche a lista de elementos que será exibida.
            response.data.forEach((data: PaymentsBackendProps) => {
                tmpList.push({
                    id: data.expense_payment_id,
                    displayValue: data.payment,
                });
            });

            setPayments(tmpList);
        });
    };

    /**
     * Adiciona um novo item à lista de métodos de pagamento.
     * @param value Nome do novo método de pagamento.
     */
    const onAdd = (value: string): void => {
        if (value.length == 0) {
            alert("O nome da meio de pagamento não pode ser vazio!");
            return;
        }

        if (payments.find((item) => item.displayValue == value)) {
            alert("Já existe um meio de pagamento com esse nome!");
            return;
        }

        // Cadastra o novo método de pagamento.
        api.post("/api/expenses_payments/", {
            payment: value,
        }).finally(() => {
            // Recarrega a tela de métodos de pagamento.
            getPaymentsList();
        });
    };

    /**
     * Deleta o método de pagamento com o id informado.
     * @param id Id do método de pagamento que será deletada.
     */
    const onDelete = (id: number): void => {
        api.delete(`/api/expenses_payments/${id}/`).finally(() => {
            // Recarrega a lista de métodos de pagamento.
            getPaymentsList();
        });
    };

    /**
     * Edita o nome de um método de pagamento.
     * @param id Id do método de pagamento a ser editado.
     * @param newValue Novo texto para o método de pagamento.
     */
    const onEdit = (id: number, newValue: string): void => {
        if (newValue.length == 0) {
            alert("O nome da meio de pagamento não pode ser vazio!");
            return;
        }

        if (payments.find((item) => item.displayValue == newValue)) {
            alert("Já existe um meio de pagamento com esse nome!");
            return;
        }

        api.put(`/api/expenses_payments/${id}/`, {
            payment: newValue,
        }).finally(() => {
            // Recarrega a lista de métodos de pagamento.
            getPaymentsList();
        });
    };

    /**
     * Busca os métodos de pagamento cadastrados para esse usuário ao abrir o modal.
     */
    useEffect(() => {
        if (showTypes == false) return;
        // Carrega a lista de métodos de pagamento.
        getPaymentsList();
    }, [showTypes]);

    return (
        <ListManagementModal
            showModal={showTypes}
            setShowModal={setShowTypes}
            title={title}
            itens={payments}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    );
};

export default PaymentTypes;
