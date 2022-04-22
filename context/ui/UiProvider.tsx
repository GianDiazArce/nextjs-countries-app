import { useReducer, PropsWithChildren, useEffect, useState } from "react";
import { IThemeType } from "../../interfaces";
import { UiContext, uiReducer } from "./";
import { ThemeProvider, Theme } from "@mui/material";
import { darkTheme, lightTheme } from "../../theme";

export interface UiState {
    theme: IThemeType;
}

const UI_INITIAL_STATE: UiState = {
    theme: "dark",
};

export const UiProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const [currentTheme, setCurrentTheme] = useState(lightTheme);

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";

        const selectedTheme: Theme = theme === "light" ? lightTheme : darkTheme;

        setCurrentTheme(selectedTheme);
    }, []);

    useEffect(() => {
        const theme = state.theme === "dark" ? darkTheme : lightTheme;
        setCurrentTheme(theme);
    }, [state.theme]);

    const changeTheme = (theme: IThemeType) => {
        dispatch({
            type: "[Ui] - Change Theme",
            payload: theme === "dark" ? "dark" : "light",
        });
        localStorage.setItem("theme", theme === "dark" ? "dark" : "light");
    };

    return (
        <UiContext.Provider
            value={{
                ...state,
                changeTheme,
            }}
        >
            <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
        </UiContext.Provider>
    );
};
