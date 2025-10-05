// Material UI
import { Add, Delete } from "@mui/icons-material";
import {
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Tooltip,
    Typography,
} from "@mui/material";

// Utils
import { colors } from "../../theme/theme";

// Interfaces
import type { ListManagementModalProps } from "./Interfaces";

// Componentes
import TextInput from "../TextInput/TextInput";

/**
 * Exibe um modal com uma lista de itens e a possibilidade de adicionar ou remover itens.
 * @param showModal Define se o modal deve ser exibido.
 * @param setShowModal Define o estado da variavel showModal.
 * @param title Título do modal.
 * @returns Componente que exibe o modal.
 */
const ListManagementModal = ({
    showModal,
    setShowModal,
    title,
}: ListManagementModalProps) => {
    /**
     * Função executada ao clicar no botão de cancelar.
     */
    const onCancelClick = (): void => {
        setShowModal(false);
    };

    return (
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            disableEnforceFocus
        >
            {/* Container externo */}
            <Grid
                container
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "26rem",
                    height: "41rem",
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
                    <Typography color="#fff" fontSize={"2rem"} component="h2">
                        {title}
                    </Typography>
                </Grid>
                {/* Cadastro de novos tipos */}
                <Grid container size={12} mt={2}>
                    <Grid sx={{ flex: 1 }}>
                        <TextInput label="Novo tipo" noType={true} />
                    </Grid>
                    <Grid mr={1}>
                        <Tooltip title="Adicionar novo tipo de despesa">
                            <IconButton>
                                <Add fontSize="large" sx={{ color: "green" }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                {/* Tipos já registrados */}
                <Grid size={12} mt={2}>
                    <List
                        sx={{
                            width: "100%",
                            height: "26rem",
                            maxHeight: "26rem",
                            bgcolor: "background.paper",
                            borderRadius: "0.5rem",
                            p: 1.5,
                            overflowY: "auto",
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                            <ListItem
                                key={value}
                                disableGutters
                                secondaryAction={
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={`Line item ${value}`} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                {/* Botões de ação */}
                <Grid
                    container
                    size={12}
                    pt={5}
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
                            Fechar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ListManagementModal;
