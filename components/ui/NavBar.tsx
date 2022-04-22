import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import React, { useContext } from "react";
import { UiContext } from "../../context";

export const NavBar = () => {
    const { changeTheme, theme } = useContext(UiContext);

    const toggleTheme = () => {
        changeTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <AppBar elevation={1} position="static">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "primary.main",
                    paddingY: "20px",
                }}
            >
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Where in the world?
                    </Typography>
                </Box>
                <Button
                    startIcon={<DarkModeOutlinedIcon />}
                    sx={{ color: "text.primary", textTransform: "capitalize" }}
                    onClick={toggleTheme}
                >
                    Dark Mode
                </Button>
            </Toolbar>
        </AppBar>
    );
};
