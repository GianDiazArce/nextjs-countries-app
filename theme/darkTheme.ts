import { createTheme } from "@mui/material";
import { colors } from "./colors";


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: colors.dark.background
        },
        primary: {
            main: colors.dark.elements,
        },
        text: {
            primary: colors.dark.text,
        },
    },
    typography: {
        fontFamily: 'Nunito Sans, sans-serif',
        allVariants: {
            color: colors.dark.text,
        }
    },
});

