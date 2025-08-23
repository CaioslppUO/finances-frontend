// Material UI
import { Box } from "@mui/material";
import { BarChart } from "@mui/icons-material";

// Componentes
import Page from "../../components/Page/Page";
import TitleAndSubtitle from "../../components/TitleAndSubtitle/TitleAndSubtitle";

const Login = () => {
    return (
        <Page>
            {/* Container */}
            <Box
                sx={{
                    display: "flex",
                    width: "28%",
                    height: "85vh",
                    borderRadius: 15,
                    backgroundColor: "background.paper",
                    boxShadow: 10,
                    justifyContent: "center",
                }}
            >
                <TitleAndSubtitle
                    title="Login"
                    subtitle="Gerenciador de Despesas"
                    Icon={BarChart}
                    IconColor="secondary"
                />
            </Box>
        </Page>
    );
};

export default Login;
