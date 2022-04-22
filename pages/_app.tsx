import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { UiProvider } from "../context";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UiProvider>
            <CssBaseline />
            <Component {...pageProps} />
        </UiProvider>
    );
}

export default MyApp;
