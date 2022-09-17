import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { ChatContext, useFireauth, useHandler } from "../../context";
import { Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/auth";
import toast from "react-hot-toast";
import { AccountCircle } from "@mui/icons-material";
const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const toggleHandler = useHandler();
    const userAuth = useFireauth();
    const { info } = React.useContext(ChatContext);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        try {
            signOut(auth);
            toast.success("Successfull Logout");
        } catch {
            toast.error("Something went wrong");
        }
    };
    const deviceWidth = () => {
        return window.innerWidth > 900;
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
                            <AiOutlineDoubleLeft />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 3,
                            display: { xs: "flex", md: "none" },
                        }}>
                        {window.innerWidth > 900 && (
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href=""
                                sx={{
                                    mr: 2,
                                    mt: ".3rem",
                                    flexGrow: 0,
                                    fontSize: ".9rem",
                                    fontFamily: "Arial",
                                    fontWeight: 300,
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}>
                                {info.user.name}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {userAuth && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}>
                                    <MenuItem onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </Menu>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href=""
                                    sx={{
                                        mr: 2,
                                        fontSize: ".9rem",
                                        flexGrow: 3,
                                        fontFamily: "Arial",
                                        fontWeight: 300,
                                        letterSpacing: ".1rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}>
                                    {deviceWidth() && userAuth.displayName}
                                </Typography>
                            </div>
                        )}
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
                        {info.user.name && (
                            <Avatar
                                alt={info.user.name}
                                src=""
                                sx={{ mr: "1rem" }}
                            />
                        )}
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                mt: ".3rem",
                                flexGrow: 0,
                                fontFamily: "Arial",
                                fontWeight: 300,
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
