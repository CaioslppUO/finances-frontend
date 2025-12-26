// Componentes
import ListManagementModal from "../../components/Modals/ListManagementModal/ListManagementModal";

// Interfaces
import type { TypesProps } from "./Interfaces";

const BudgetTypes = ({ showTypes, setShowTypes, title }: TypesProps) => {
    return (
        <ListManagementModal
            showModal={showTypes}
            setShowModal={setShowTypes}
            title={title}
            itens={[]}
            onAdd={() => {}}
            onDelete={() => {}}
            onEdit={() => {}}
        />
    );
};

export default BudgetTypes;
