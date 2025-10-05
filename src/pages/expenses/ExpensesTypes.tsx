// Componentes
import ListManagementModal from "../../components/Modals/ListManagementModal/ListManagementModal";

// Interfaces
import type { TypesProps } from "./Interfaces";

const ExpensesTypes = ({ showTypes, setShowTypes, title }: TypesProps) => {
    return (
        <ListManagementModal
            showModal={showTypes}
            setShowModal={setShowTypes}
            title={title}
        />
    );
};

export default ExpensesTypes;
