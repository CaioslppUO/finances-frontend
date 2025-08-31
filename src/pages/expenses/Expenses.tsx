// Material UI
import { Grid } from "@mui/material";

// Toolpad
import { DashboardLayout } from "@toolpad/core";

// Utils
import { colors } from "../../theme/theme";

const Expenses = () => {
    return (
        <DashboardLayout>
            <Grid
                container
                sx={{
                    flex: 1,
                    border: 0,
                    backgroundColor: colors.grey.strong,
                }}
            >
                <Grid
                    container
                    size={12}
                    p={1}
                    spacing={0.5}
                    sx={{
                        alignItems: "center",
                    }}
                >
                    <Grid
                        size={12}
                        sx={{
                            height: "65%",
                            backgroundColor: "#e7dfffff",
                        }}
                    ></Grid>
                    <Grid
                        size={12}
                        sx={{
                            height: "35%",
                            backgroundColor: colors.white.strong,
                        }}
                    ></Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Expenses;
