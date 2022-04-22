import Head from "next/head";
import React, { PropsWithChildren } from "react";
import { NavBar } from "../ui";

interface Props {
    title: string;
    description: string;
}

export const Layout: React.FC<PropsWithChildren<Props>> = ({
    title,
    description,
    children,
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <meta name="og:title" content={title} />
                <meta name="og:description" content={description} />
            </Head>
            <NavBar />
            <main>{children}</main>
        </>
    );
};
