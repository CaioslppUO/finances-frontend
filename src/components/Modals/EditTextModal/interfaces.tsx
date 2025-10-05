export interface EditTextModalProps {
    showModal: boolean;
    onConfirm: (id: number, newValue: string) => void;
    onCancel: () => void;
    elementID: number;
}
