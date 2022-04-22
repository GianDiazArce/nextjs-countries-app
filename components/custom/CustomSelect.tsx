import { styled } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
    value?: string | number | readonly string[] | undefined;
}

const Select = styled("select")(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    opacity: 0.8,
    padding: "10px 15px",
    border: 0,
    outline: 0,
    scrollBehavior: "smooth",
    minWidth: "200px",
    borderRadius: "2px",
}));

export const CustomSelect: React.FC<PropsWithChildren<Props>> = ({
    placeholder = "",
    children,
    ...rest
}) => {
    return (
        <Select {...rest}>
            <option value="all">
                {placeholder?.length <= 1 ? "Select..." : placeholder}
            </option>
            {children}
        </Select>
    );
};
