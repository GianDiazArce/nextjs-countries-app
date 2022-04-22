import { createContext } from "react";
import { IThemeType } from "../../interfaces";

interface ContextProps {
    theme: IThemeType;
    changeTheme: (theme: IThemeType) => void;
}

export const UiContext = createContext({} as ContextProps);
