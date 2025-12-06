// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

// Contexto
import { useAuth } from "../../context/AuthContext/AuthContext";

// Services
import { api } from "../../services/api";

const Login = () => {
    // Usuário e senha
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Navegação
    const navigate = useNavigate();

    // Autenticação
    const auth = useAuth();

    /**
     * Realiza login na API.
     * @param username Nome de usuário.
     * @param password Senha.
     */
    const doLogin = async (): Promise<void> => {
        if (username.length == 0 || password.length == 0) {
            alert("Digite seu login e senha!");
            return;
        }

        try {
            const response = await api.post("/api/login/", {
                username,
                password,
            });
            // Login bem sucedido. Armazena o contexto de login.
            auth.login(response.data);
            // Navega para a página principal.
            navigate("/despesas");
        } catch (error: any) {
            alert("Usuário ou senha inválidos");
        }
    };

    /**
     * Tenta fazer login com os dados já registrados no localstorage, caso existam.
     */
    useEffect(() => {
        const data = localStorage.getItem("authData");
        if (data) {
            auth.login(JSON.parse(data));
            navigate("/despesas");
        }
    }, []);

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
                        <TextInput
                            label="Usuário"
                            text={username}
                            setText={setUsername}
                        />
                    </Grid>
                    {/* Senha */}
                    <Grid size={12} mt={6} px={1}>
                        <TextInput
                            label="Senha"
                            isPassword
                            text={password}
                            setText={setPassword}
                        />
                    </Grid>
                    {/* Botão de login */}
                    <Grid size={12} mt={6}>
                        <ConfirmButton onClick={doLogin} text="Entrar" />
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
                            onClick={() => navigate("/registrar")}
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
