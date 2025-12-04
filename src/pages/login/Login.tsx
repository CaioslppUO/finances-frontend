// Material UI
import { BarChart } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

// Cores
import { colors } from "../../theme/theme";

// Componentes
import Page from "../../components/Page/Page";
import TextInput from "../../components/TextInput/TextInput";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import TitleAndSubtitle from "../../components/TitleAndSubtitle/TitleAndSubtitle";

const Login = () => {
    return (
        <Page>
            {/* Container */}
            <Box
                sx={{
                    display: "flex",
                    width: "25rem",
                    height: "37rem",
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
                    <Grid size={12} mt={6} px={1}>
                        <TextInput label="Usuário" />
                    </Grid>
                    {/* Senha */}
                    <Grid size={12} mt={6} px={1}>
                        <TextInput label="Senha" isPassword />
                    </Grid>
                    {/* Botão de login */}
                    <Grid size={12} mt={6}>
                        <ConfirmButton text="Entrar" />
                    </Grid>
                    {/* Criar Conta */}
                    <Grid size={12} mt={4} sx={{ textAlign: "center" }}>
                        <Typography
                            display="inline"
                            color={colors.black.strong}
                        >
                            Não possui conta?{" "}
                        </Typography>
                        <Typography
                            display="inline"
                            color={colors.blue.strong}
                            sx={{
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            registre-se!
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Page>
    );
};

export default Login;
