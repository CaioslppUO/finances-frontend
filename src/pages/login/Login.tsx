// Material UI
import { Box, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/icons-material";

// Cores
import { colors } from "../../theme/theme";

// Componentes
import Page from "../../components/Page/Page";
import TextInput from "../../components/TextInput/TextInput";
import TitleAndSubtitle from "../../components/TitleAndSubtitle/TitleAndSubtitle";

const Login = () => {
    return (
        <Page>
            {/* Container */}
            <Box
                sx={{
                    display: "flex",
                    width: "27%",
                    height: "80vh",
                    borderRadius: 2,
                    backgroundColor: colors.white.strong,
                    boxShadow: 10,
                    justifyContent: "center",
                }}
            >
                <Grid
                    container
                    sx={{
                        display: "block",
                        width: "100%",
                    }}
                >
                    {/* Título */}
                    <Grid size={12}>
                        <TitleAndSubtitle
                            title="Login"
                            subtitle="Gerenciador de Despesas"
                            Icon={BarChart}
                            IconColor="secondary"
                        />
                    </Grid>
                    {/* Usuário */}
                    <Grid size={12} mt={6}>
                        <TextInput label="Usuário" />
                    </Grid>
                    {/* Senha */}
                    <Grid size={12} mt={6}>
                        <TextInput label="Senha" isPassword />
                    </Grid>
                </Grid>
            </Box>
        </Page>
    );
};

export default Login;
