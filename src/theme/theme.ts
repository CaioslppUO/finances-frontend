import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#446FBF",
        },
        secondary: {
            main: "#009A29",
        },
        error: {
            main: "#f44336",
        },
        warning: {
            main: "#ff9800",
        },
        info: {
            main: "#2196f3",
        },
        success: {
            main: "#4caf50",
        },
        background: {
            default: "#003150",
            paper: "#ffffff",
        },
    },
});

export default theme;
