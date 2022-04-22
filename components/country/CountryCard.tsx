import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import React from "react";

interface Props {
    src: string;
    alt: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export const CountryCard: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    alt,
    src,
    onClick,
}) => {
    return (
        <Card
            sx={{
                backgroundColor: "primary.main",
                boxShadow: "0px 0px 14px 2px rgba(0, 0, 0, .3)",
                width: "100%",
                height: "100%",
            }}
            elevation={0}
            onClick={onClick}
        >
            <CardActionArea
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    height: "100%",
                }}
            >
                <CardMedia height="50%" src={src} alt={alt} component="img" />
                <CardContent sx={{}}>{children}</CardContent>
            </CardActionArea>
        </Card>
    );
};
