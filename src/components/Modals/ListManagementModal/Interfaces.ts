// React
import type React from "react";

export interface ListManagementModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    itens: ListItem[];
    onAdd: (value: string) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newValue: string) => void;
}

export interface ListItem {
    id: number;
    displayValue: string;
}
