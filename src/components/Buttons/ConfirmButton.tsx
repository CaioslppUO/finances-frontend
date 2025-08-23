// Material UI
import { Button, Grid } from "@mui/material";
import { colors } from "../../theme/theme";

// Interfaces
import type { ConfirmButtonProps } from "./Interfaces";

/**
 * Exibe um botão de confirmação.
 * @param text Texto do botão.
 * @returns Componente que exibe um botão de confirmação.
 */
const ConfirmButton = ({ text }: ConfirmButtonProps) => {
    return (
        <Grid
            container
            mt={6}
            sx={{
                textAlign: "center",
            }}
        >
            <Grid size={12}>
                <Button
                    sx={{
                        backgroundColor: colors.green.strong,
                        color: colors.white.strong,
                        width: "8rem",
                        height: "3.5rem",
                        textTransform: "none",
                        fontSize: 18,
                    }}
                >
                    {text}
                </Button>
            </Grid>
        </Grid>
    );
};

export default ConfirmButton;
