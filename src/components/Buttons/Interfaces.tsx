/**
 * Propriedades do componente ConfirmButton.
 */
export interface ConfirmButtonProps {
    /** Texto que será exibido no botão */
    text: string;

    // Função executada ao confirmar
    onClick: () => void;
}
