// React
import type React from "react";

export interface ListManagementModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
}
