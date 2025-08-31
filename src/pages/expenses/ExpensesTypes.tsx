// Componentes
import ListManagementModal from "../../components/ListManagementModal/ListManagementModal";

// Interfaces
import type { ExpensesTypesProps } from "./Interfaces";

const ExpensesTypes = ({
    showExpensesTypes,
    setShowExpensesTypes,
}: ExpensesTypesProps) => {
    return (
        <ListManagementModal
            showModal={showExpensesTypes}
            setShowModal={setShowExpensesTypes}
        />
    );
};

export default ExpensesTypes;
