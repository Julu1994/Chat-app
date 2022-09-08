import "./login.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="log">
            <Card sx={{ minWidth: 275 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mt: "1rem" }}>
                    Login
                </Typography>
                <CardContent sx={{ textAlign: "center" }}>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        label="Email"
                        sx={{ width: "100%", mt: "1rem" }}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        sx={{ width: "100%", mt: "1rem" }}
                    />
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="big"
                        sx={{ width: "100%", mt: "1rem" }}>
                        Login
                    </Button>
                </CardActions>
                <p>
                    Don't have an account ?
                    <div>
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            Register here
                        </Link>
                    </div>
                </p>
            </Card>
        </div>
    );
};
export default Login;
