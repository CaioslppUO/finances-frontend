import { Divider, Grid, Typography } from "@mui/material";
import { AccountCircle, AttachMoney, BarChart } from "@mui/icons-material";
import { colors } from "../../theme/theme";

const SideBar = () => {
    return (
        <Grid
            container
            sx={{
                width: "95%",
                height: "90vh",
                backgroundColor: colors.white.strong,
                display: "block",
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.5)",
            }}
        >
            {/* Título */}
            <Grid
                container
                size={12}
                pl={0.5}
                pt={0.5}
                sx={{
                    textAlign: "left",
                    justifyContent: "left",
                    // backgroundColor: "yellow",
                }}
            >
                <Grid mt={0.6}>
                    <BarChart
                        sx={{ fontSize: "1.5rem" }}
                        color={"secondary"}
                    ></BarChart>
                </Grid>
                <Grid>
                    <Typography
                        fontSize={"1.5rem"}
                        display="inline"
                        color={colors.black.strong}
                    >
                        Menu
                    </Typography>
                </Grid>
            </Grid>
            {/* Divisor */}
            <Grid container size={12} sx={{ justifyContent: "center" }}>
                <Grid size={11.8}>
                    <Divider color={colors.black.strong} />
                </Grid>
            </Grid>
            {/* Corpo */}
            <Grid
                container
                size={12}
                sx={{
                    // backgroundColor: "green",
                    height: "70%",
                    display: "block",
                }}
            >
                {/* Itens */}
                <Grid
                    container
                    size={12}
                    pl={1}
                    pt={0.5}
                    sx={{
                        textAlign: "left",
                        justifyContent: "left",
                        cursor: "pointer",
                    }}
                >
                    <Grid mt={0.5}>
                        <AttachMoney
                            sx={{ fontSize: "1.1rem" }}
                            color={"secondary"}
                        ></AttachMoney>
                    </Grid>
                    <Grid>
                        <Typography
                            fontSize={"1.1rem"}
                            display="inline"
                            color={colors.black.strong}
                        >
                            Despesas
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {/* Ícone e Nome do Usuário */}
            <Grid container size={12} sx={{ justifyContent: "center" }}>
                <Grid mt={0.5}>
                    <AccountCircle
                        sx={{ fontSize: "1.1rem" }}
                        color={"secondary"}
                    ></AccountCircle>
                </Grid>
                <Grid>
                    <Typography
                        fontSize={"1.1rem"}
                        display="inline"
                        color={colors.black.strong}
                    >
                        Despesas
                    </Typography>
                </Grid>
            </Grid>
            {/* Divisor */}
            <Grid
                container
                size={12}
                sx={{ justifyContent: "center" }}
                mt={0.5}
            >
                <Grid size={11.5}>
                    <Divider color={colors.black.strong} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SideBar;
