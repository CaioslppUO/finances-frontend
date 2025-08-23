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
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    );
};

export default Page;
