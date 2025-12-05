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
    white: { strong: "#E4E4E4" },
    black: { strong: "#000000" },
    red: { strong: "#f44336" },
    orange: { strong: "#ff9800" },
    grey: { strong: "#565656" },
};

const theme = createTheme({
    palette: {
        primary: {
            main: colors.blue.strong,
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
            default: colors.background,
            paper: "#ffffff",
        },
    },
    colorSchemes: {
        dark: {
            palette: {
                primary: {
                    main: colors.blue.strong,
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
                    default: colors.black.strong,
                    paper: "#141414ff",
                },
            },
        },
    },
});

export default theme;
