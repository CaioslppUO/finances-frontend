// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
import { Box, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/icons-material";

// Cores
import { colors } from "../../theme/theme";

// Componentes
import Page from "../../components/Page/Page";
import TextInput from "../../components/TextInput/TextInput";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import TitleAndSubtitle from "../../components/TitleAndSubtitle/TitleAndSubtitle";

// Services
import { api } from "../../services/api";

const Register = () => {
    // Navegação
    const navigate = useNavigate();

    // Dados
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /**
     * Verifica se todos os campos foram preenchidos corretamente.
     */
    const validateFields = () => {
        if (username.length <= 0) {
            alert("Preencha o nome de usuário!");
            return false;
        }
        if (email.length <= 0) {
            alert("Preencha o email!");
            return false;
        }
        if (password.length < 8) {
            alert("A senha precisa ter pelo menos 8 caracteres!");
            return false;
        }
        return true;
    };

    /**
     * Função executada ao clicar em registrar.
     */
    const onRegisterClick = async () => {
        if (!validateFields()) return new Promise<void>((resolve) => resolve());

        return api
            .post("/api/users/", {
                username: username,
                email: email,
                password: password,
            })
            .then(() => {
                alert("Usuário cadastrado com sucesso!");
                navigate("/login");
            })
            .catch(() => {
                alert("Erro ao cadastrar usuário!");
            });
    };

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
                            title="Criar Conta"
                            subtitle="Gerenciador de Despesas"
                            Icon={BarChart}
                            IconColor="secondary"
                        />
                    </Grid>
                    {/* Usuário */}
                    <Grid size={12} mt={4} px={1}>
                        <TextInput
                            text={username}
                            setText={setUsername}
                            label="Usuário"
                        />
                    </Grid>
                    {/* E-mail */}
                    <Grid size={12} mt={4} px={1}>
                        <TextInput
                            text={email}
                            setText={setEmail}
                            label="E-Mail"
                        />
                    </Grid>
                    {/* Senha */}
                    <Grid size={12} mt={4} px={1}>
                        <TextInput
                            text={password}
                            setText={setPassword}
                            label="Senha"
                            isPassword
                        />
                    </Grid>
                    {/* Botão de login */}
                    <Grid size={12} mt={4}>
                        <ConfirmButton
                            onClick={onRegisterClick}
                            text="Registrar"
                        />
                    </Grid>
                    {/* Criar Conta */}
                    <Grid size={12} mt={4} sx={{ textAlign: "center" }}>
                        <Typography
                            display="inline"
                            color={colors.black.strong}
                        >
                            Já possui conta?{" "}
                        </Typography>
                        <Typography
                            display="inline"
                            color={colors.blue.strong}
                            sx={{
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/login")}
                        >
                            Faça login!
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Page>
    );
};

export default Register;
