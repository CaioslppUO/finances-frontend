// Material UI
import { Button, Grid } from "@mui/material";
import { colors } from "../../theme/theme";

// Interfaces
import type { ConfirmButtonProps } from "./Interfaces";

/**
 * Exibe um botão de confirmação.
 * @param text Texto do botão.
 * @param onClick Função executada ao confirmar.
 * @returns Componente que exibe um botão de confirmação.
 */
const ConfirmButton = ({ text, onClick }: ConfirmButtonProps) => {
    return (
        <Grid
            container
            sx={{
                textAlign: "center",
            }}
        >
            <Grid size={12}>
                <Button
                    type="button"
                    sx={{
                        backgroundColor: colors.green.strong,
                        color: colors.white.strong,
                        width: "8rem",
                        height: "3.5rem",
                        textTransform: "none",
                        fontSize: 18,
                    }}
                    onClick={onClick}
                >
                    {text}
                </Button>
            </Grid>
        </Grid>
    );
};

export default ConfirmButton;
