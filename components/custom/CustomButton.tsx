import React from "react";

import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
    arrowIcon?: boolean;
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const CustomButton: React.FC<Props> = ({
    arrowIcon = false,
    text,
    onClick,
}) => {
    return (
        <Button
            startIcon={
                arrowIcon ? <ArrowBackIcon fontSize="inherit" /> : undefined
            }
            sx={{
                color: "text.primary",
                alignItems: "center",
                paddingX: "28px",
                textTransform: "capitalize",
                fontWeight: 300,
                "&: hover": {
                    backgroundColor: "primary.main",
                },
            }}
            color="primary"
            variant="contained"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};
