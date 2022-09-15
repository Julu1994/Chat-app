import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { ChatContext, useFireauth, useHandler } from "../../context";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/auth";
import toast from "react-hot-toast";
const Header = () => {
    const toggleHandler = useHandler();
    const userAuth = useFireauth();
    const { info } = React.useContext(ChatContext);

    const logout = () => {
        try {
            signOut(auth);
            toast.success("Successfull Logout");
        } catch {
            toast.error("Something went wrong");
        }
    };
    return (
        <AppBar
            position="absolute"
            sx={{ backgroundColor: "#003366", boxShadow: "none" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={toggleHandler}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {userAuth && (
                            <Button
                                variant="contained"
                                size="small"
                                color="inherit"
                                onClick={logout}
                                sx={{ mr: "2rem", color: "#003366" }}>
                                Logout
                            </Button>
                        )}
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0, mr: "2rem" }}>
                                <Avatar alt="Avater" src="" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 2,
                            display: { xs: "none", md: "flex" },
                        }}></Box>
                    <Box
                        sx={{
                            flexGrow: 2,
                            display: { xs: "none", md: "flex" },
                        }}>
                        <Avatar alt="Avater" src="" sx={{ mr: ".8rem" }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                flexGrow: 3,
                                fontFamily: "Arial",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            {info.user.name}
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
