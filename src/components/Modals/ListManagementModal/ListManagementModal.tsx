// React
import { useState } from "react";

// Material UI
import { Add, Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
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
import { colors } from "../../../theme/theme";

// Interfaces
import type { ListManagementModalProps } from "./Interfaces";

// Componentes
import TextInput from "../../TextInput/TextInput";
import EditTextModal from "../EditTextModal/EditTextModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

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
    const [idToEdit, setIdToEdit] = useState<number | undefined>(undefined);
    const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

    /**
     * Função executada ao clicar no botão de cancelar.
     */
    const onCancelClick = (): void => {
        setShowModal(false);
    };

    /**
     * Função executada ao clicar no botão editar.
     * @param id ID do elemento a ser editado.
     */
    const onEditClick = (id: number): void => {
        setIdToEdit(id);
    };

    /**
     * Função executada ao clicar no botão deletar.
     * @param id ID do elemento a ser deletado.
     */
    const onDeleteClick = (id: number): void => {
        setIdToDelete(id);
    };

    /**
     * Função executada ao confirmar a deleção de um elemento.
     * @param id ID do elemento a ser deletado.
     */
    const onConfirmDelete = (id: number | undefined): void => {
        setIdToDelete(undefined);
        if (id == undefined) return;
        console.log("Deletado elemento de ID: ", id);
    };

    /**
     * Função executada ao confirmar a edição.
     * @param id ID do elemento a ser editado.
     * @param newValue Novo valor do elemento a ser editado.
     */
    const onConfirmEdit = (id: number, newValue: string): void => {
        console.log(
            `Valor alterado de 'Line item ${id}' para '${newValue}' com sucesso!`
        );
        setIdToEdit(undefined);
    };

    /**
     * Função chamada ao cancelar a edição.
     */
    const onCancelEdit = (): void => {
        setIdToEdit(undefined);
    };

    /**
     * Função chamada ao cancelar a deleção.
     */
    const onCancelDelete = (): void => {
        setIdToDelete(undefined);
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
                                    <Grid container>
                                        <Grid>
                                            <IconButton
                                                onClick={() =>
                                                    onEditClick(value)
                                                }
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid>
                                            <IconButton
                                                onClick={() =>
                                                    onDeleteClick(value)
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
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
                {/* Modal de edição de textos */}
                <EditTextModal
                    showModal={idToEdit != undefined}
                    onConfirm={onConfirmEdit}
                    onCancel={onCancelEdit}
                    elementID={idToEdit == undefined ? -1 : idToEdit}
                />
                {/* Modal de confirmação de exclusão */}
                <ConfirmationModal
                    showModal={idToDelete != undefined}
                    onConfirm={onConfirmDelete}
                    onCancel={onCancelDelete}
                    title="Cofirmar exclusão?"
                    elementID={idToDelete}
                />
            </Grid>
        </Modal>
    );
};

export default ListManagementModal;
