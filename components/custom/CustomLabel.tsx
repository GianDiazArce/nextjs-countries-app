import { Box, Typography } from "@mui/material";

interface Props {
    label1: string;
    label2: number | string;
}

export const CustomLabel: React.FC<Props> = ({ label1, label2 }) => {
    return (
        <Box display="flex" gap="5px">
            <Typography textTransform="capitalize" fontWeight={600}>
                {label1}:
            </Typography>
            <Typography fontWeight={200}>{label2}</Typography>
        </Box>
    );
};
