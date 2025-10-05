export interface ConfirmationModalProps {
    showModal: boolean;
    onConfirm: (idToDelete?: number) => void;
    onCancel: () => void;
    title: string;
    elementID?: number;
}
