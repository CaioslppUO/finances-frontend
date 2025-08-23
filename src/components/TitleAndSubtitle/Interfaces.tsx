// Material UI
import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

/**
 * Propriedades do componente TitleAndSubtitle.
 */
export interface TitleAndSubtitleProps {
    /** Título que será exibido no componente */
    title: string;

    /** Subtítulo que será exibido, abaixo do título */
    subtitle: string;

    /** Ícone para ser exibido ao lado (esquerdo) do subtítulo */
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };

    /** Cor para exibir o ícone */
    IconColor:
        | "inherit"
        | "action"
        | "disabled"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
        | undefined;
}
