export interface EditTextModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: (newValue: string) => void;
}
