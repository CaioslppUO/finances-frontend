// Interfaces
import type { TitleAndSubtitleProps } from "./Interfaces";

// Material UI
import { Grid, Typography } from "@mui/material";

// Cores
import { colors } from "../../theme/theme";

/**
 * Retorna um componente que exibe um título e subtítulo.
 * @param title Título que será exibido no componente.
 * @param subtitle Subtítulo que será exibido, abaixo do título.
 * @param Icon Ícone para ser exibido ao lado (esquerdo) do subtítulo.
 * @param IconColor Cor para exibir o ícone.
 * @returns Componente que exibe um título e um subtítulo.
 */
const TitleAndSubtitle = ({
    title,
    subtitle,
    Icon,
    IconColor,
}: TitleAndSubtitleProps) => {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                textAlign: "center",
                display: "block",
                mt: 6,
            }}
        >
            {/* Título */}
            <Grid size={12}>
                <Typography variant="h3">{title}</Typography>
            </Grid>
            {/* Subtítulo */}
            <Grid container size={12} mt={3}>
                <Grid>
                    <Icon fontSize="large" color={IconColor}></Icon>
                </Grid>
                <Grid>
                    <Typography
                        variant="h5"
                        display="inline"
                        color={colors.grey.strong}
                    >
                        {subtitle}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TitleAndSubtitle;
