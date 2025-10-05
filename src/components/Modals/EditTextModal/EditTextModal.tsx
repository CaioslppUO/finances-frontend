// React
import { useEffect, useState } from "react";

// Material UI
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";

// Interfaces
import type { EditTextModalProps } from "./interfaces";

// Temas
import { colors } from "../../../theme/theme";

/**
 * Exibe um modal simples para editar um valor textual.
 * @param showModal Indica se o modal deve ou não ser exibido.
 * @param setShowModal Define o estado da variavel showModal.
 * @param onConfirm Função executada ao confirmar a edição do valor.
 */
const EditTextModal = ({
    showModal,
    onConfirm,
    onCancel,
    elementID,
}: EditTextModalProps) => {
    const [newValue, setNewValue] = useState<string>("");

    /**
     * Reseta os estados do modal sempre que ele abre novamente.
     */
    useEffect(() => {
        setNewValue("");
    }, [showModal]);

    /**
     * Função executada ao cancelar a edição.
     */
    const onCancelClick = (): void => {
        onCancel();
    };

    /**
     * Função executada ao confirmar o novo valor.
     */
    const onConfirmClick = (): void => {
        onConfirm(elementID, newValue);
    };

    return (
        <Modal open={showModal} onClose={() => onCancel()} disableEnforceFocus>
            <Grid
                container
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "20rem",
                    height: "14rem",
                    bgcolor: "#1d1c1c",
                    border: "1px solid #000",
                    boxShadow: 24,
                    px: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "0.5rem",
                    display: "block",
                }}
                spacing={1}
            >
                {/* Título */}
                <Grid size={12} mt={1}>
                    <Typography color="#fff" fontSize={"1.8rem"} component="h2">
                        Novo Valor
                    </Typography>
                </Grid>
                {/* Input */}
                <Grid mt={2.5}>
                    <TextField
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        label=""
                    />
                </Grid>
                {/* Botões de ação */}
                <Grid
                    container
                    size={12}
                    pt={3}
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <Grid>
                        <Button
                            sx={{
                                backgroundColor: colors.red.strong,
                                color: colors.white.strong,
                                height: "2.5rem",
                                width: "6rem",
                                textTransform: "none",
                            }}
                            onClick={onCancelClick}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            sx={{
                                backgroundColor: colors.green.strong,
                                color: colors.white.strong,
                                height: "2.5rem",
                                width: "6rem",
                                textTransform: "none",
                            }}
                            onClick={onConfirmClick}
                        >
                            Confirmar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default EditTextModal;
