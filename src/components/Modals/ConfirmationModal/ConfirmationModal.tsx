// Material UI
import { Button, Grid, Modal, Typography } from "@mui/material";

// Interfaces
import type { ConfirmationModalProps } from "./interfaces";

// Temas
import { colors } from "../../../theme/theme";

/**
 * Exibe um modal simples para confirmar ou não uma ação.
 * @param showModal Indica se o modal deve ou não ser exibido.
 * @param onConfirm Função executada ao confirmar o modal.
 * @param onCancel Função executada ao cancelar o modal.
 * @param title Título do modal.
 * @param idToDelete ID do elemento que recebeu a confirmação.
 */
const ConfirmationModal = ({
    showModal,
    onConfirm,
    onCancel,
    title,
    elementID,
}: ConfirmationModalProps) => {
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
        onConfirm(elementID);
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
                    width: "24rem",
                    height: "12rem",
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
                        {title}
                    </Typography>
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
                            Não
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
                            Sim
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ConfirmationModal;
