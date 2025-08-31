// Material UI
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
import { Add, Delete } from "@mui/icons-material";
import TextInput from "../TextInput/TextInput";

const ListManagementModal = ({
    showModal,
    setShowModal,
}: ListManagementModalProps) => {
    const style = {
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
    };
    return (
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            disableEnforceFocus
        >
            <Grid container sx={style} spacing={1}>
                <Grid size={12} mt={1}>
                    <Typography color="#fff" fontSize={"2rem"} component="h2">
                        Tipos de Despesas
                    </Typography>
                </Grid>
                <Grid container size={12} mt={2}>
                    <Grid sx={{ flex: 1 }}>
                        <TextInput label="Novo Tipo" noType={true} />
                    </Grid>
                    <Grid mr={1}>
                        <Tooltip title="Adicionar novo tipo de despesa">
                            <IconButton>
                                <Add fontSize="large" sx={{ color: "green" }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
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
                <Grid
                    container
                    size={12}
                    pt={5}
                    sx={{
                        justifyContent: "right",
                        // backgroundColor: "green",
                    }}
                >
                    <Grid>
                        <Button
                            sx={{
                                backgroundColor: colors.red.strong,
                                color: colors.white.strong,
                                height: "2.5rem",
                                width: "6rem",
                            }}
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
                            }}
                        >
                            Confirmar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ListManagementModal;
