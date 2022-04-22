import { Autocomplete, styled, Box, alpha } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ICountryResp } from "../../interfaces";
import { SyntheticEvent } from "react";

interface Props {
    countries: ICountryResp[];
    onChange?:
        | ((
              event: SyntheticEvent<Element, Event>,
              value: ICountryResp | null
          ) => void)
        | undefined;
}

const SearchInput = styled("input")(({ theme }) => ({
    color: theme.palette.text.primary,
    width: "100%",
    backgroundColor: "transparent",
    padding: "5px",
    border: "none",
    paddingLeft: "10px",
    "&:focus": {
        border: "none",
        outline: "none",
    },
    "&::placeholder ": {
        color: alpha(theme.palette.text.primary, 0.8),
    },
}));

export const CustomSearch: React.FC<Props> = ({
    countries,
    onChange,
}: Props) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={countries}
            sx={{ width: "100%", py: "2em", maxWidth: "480px" }}
            onChange={onChange}
            isOptionEqualToValue={(option, value) =>
                option.label === value.label
            }
            renderInput={(params) => (
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                        backgroundColor: "primary.main",
                        p: "10px 30px",
                        width: "100%",
                        borderRadius: "8px",
                    }}
                    ref={params.InputProps.ref}
                >
                    <SearchOutlinedIcon />
                    <SearchInput
                        type="text"
                        placeholder="Search for a country..."
                        {...params.inputProps}
                    />
                </Box>
            )}
        />
    );
};
