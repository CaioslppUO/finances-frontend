// React
import type React from "react";

export interface ListManagementModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    itens: ListItem[];
    onAdd: (value: string) => void;
    onDelete: (id: number) => void;
}

export interface ListItem {
    id: number;
    displayValue: string;
    isActive: boolean;
}
