// Material UI
import { Grid, TextField } from "@mui/material";

// Interfaces
import type { TextInputProps } from "./Interfaces";

/**
 * Componente que exibe um input de texto.
 * @param label Título do input.
 * @param isPassword Indica se o campo é uma senha ou não.
 * @returns Componente que exibe um input de texto.
 */
const TextInput = ({ label, isPassword }: TextInputProps) => {
    return (
        <Grid
            container
            sx={{
                display: "flex",
                textAlign: "center",
            }}
        >
            <Grid size={12}>
                <TextField
                    label={label}
                    variant="standard"
                    type={isPassword ? "password" : "email"}
                    sx={{ width: "90%" }}
                />
            </Grid>
        </Grid>
    );
};

export default TextInput;
