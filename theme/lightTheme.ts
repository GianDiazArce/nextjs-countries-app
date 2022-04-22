import { createTheme } from "@mui/material";
import { colors } from "./colors";


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: colors.light.background
        },
        primary: {
            main: colors.light.elements,
        },
        text: {
            primary: colors.light.text,
        }
    },
    typography: {
        fontFamily: 'Nunito Sans, sans-serif',
        allVariants: {
            color: colors.light.text,
        }
    },
});

