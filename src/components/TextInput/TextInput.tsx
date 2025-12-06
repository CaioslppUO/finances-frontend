// Material UI
import { Grid, TextField } from "@mui/material";

// Interfaces
import type { TextInputProps } from "./Interfaces";
import { colors } from "../../theme/theme";

/**
 * Componente que exibe um input de texto.
 * @param label Título do input.
 * @param isPassword Indica se o campo é uma senha ou não.
 * @param noType Indica para não usar nenhum tipo específico.
 * @param text Estado que controla o texto exibido.
 * @param setText Setter do estado que controla o texto exibido.
 * @returns Componente que exibe um input de texto.
 */
const TextInput = ({
    label,
    isPassword,
    noType,
    text,
    setText,
}: TextInputProps) => {
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
                    variant="outlined"
                    type={isPassword ? "password" : noType ? "text" : "email"}
                    onChange={(event) => {
                        setText(event.target.value);
                    }}
                    value={text}
                    sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: colors.blue.light,
                            borderRadius: "0.8rem", // pode ser número (theme.spacing) ou px
                            "& fieldset": {
                                borderWidth: "0.5px", // borda mais fina
                                borderColor: "rgba(0,0,0,0.2)", // borda menos visível
                            },
                            "&:hover fieldset": {
                                borderWidth: "0.5px", // borda mais fina
                                borderColor: "rgba(0,0,0,0.3)", // borda ao passar o mouse
                            },
                            "&.Mui-focused fieldset": {
                                borderWidth: "0.5px", // borda mais fina
                                borderColor: "rgba(0,0,0,0.5)", // borda ao focar
                            },
                        },
                        "& .MuiOutlinedInput-input": {
                            color: colors.black.strong, // cor do texto digitado
                        },
                        "& .MuiInputLabel-root": {
                            color: colors.black.strong, // cor do label quando não focado
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.black.strong, // cor do label quando focado
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default TextInput;
