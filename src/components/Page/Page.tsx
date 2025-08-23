// React
import type React from "react";

// Material UI
import { Box } from "@mui/material";

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.default",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
            }}
        >
            {children}
        </Box>
    );
};

export default Page;
