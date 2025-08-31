/**
 * Propridades do componente TextInput.
 */
export interface TextInputProps {
    /** Título do campo */
    label: string;

    /** Boolean que indica se o campo é ou não uma senha */
    isPassword?: boolean;

    /** Indica que não é para usar nenhum tipo específico */
    noType?: boolean;
}
