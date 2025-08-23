// Material UI
import { Grid } from "@mui/material";

// Componentes
import Page from "../../components/Page/Page";

const Expenses = () => {
    return (
        <Page>
            <Grid
                container
                sx={{
                    width: "100%",
                    height: "100vh",
                }}
            >
                {/* Sidebar */}
                <Grid
                    container
                    size={1.5}
                    sx={{ backgroundColor: "blue" }}
                ></Grid>
                {/* Conteúdo */}
                <Grid
                    container
                    size={10.5}
                    p={1}
                    spacing={0.5}
                    sx={{
                        alignItems: "center",
                        backgroundColor: "green",
                    }}
                >
                    <Grid
                        size={12}
                        sx={{ height: "57vh", backgroundColor: "purple" }}
                    ></Grid>
                    <Grid
                        size={12}
                        sx={{ height: "38vh", backgroundColor: "red" }}
                    ></Grid>
                </Grid>
            </Grid>
        </Page>
    );
};

export default Expenses;
