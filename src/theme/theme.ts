import { createTheme } from "@mui/material/styles";

/**
 * Cores disponíveis para uso na aplicação.
 */
export const colors = {
    background: "#003150",
    blue: {
        strong: "#446FBF",
        light: "#B4D0EF",
    },
    green: {
        strong: "#009A29",
    },
    white: { strong: "#E5E7EB" },
    black: { strong: "#000000" },
    red: { strong: "#f44336" },
    orange: { strong: "#ff9800" },
    grey: { strong: "#565656" },
};

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#E5E7EB",
        },
        secondary: {
            main: colors.green.strong,
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
            default: "#212b38",
            paper: "#141414ff",
        },
    },
});

export default theme;
