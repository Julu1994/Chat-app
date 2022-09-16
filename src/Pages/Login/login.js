import "./login.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/auth";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfull Login");
            navigate("/");
        } catch {
            toast.error("Something went worng!");
        }
    };
    return (
        <div className="log">
            <Typography
                variant="h3"
                sx={{ textAlign: "center", mb: "3rem", color: "#000080" }}>
                MyChat
            </Typography>
            <Card sx={{ minWidth: 275 }}>
                <form onSubmit={handleSubmit}>
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
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            size="big"
                            type="submit"
                            sx={{
                                width: "100%",
                                mt: "1rem",
                                backgroundColor: "#000080",
                            }}>
                            Login
                        </Button>
                    </CardActions>
                </form>
                <p style={{ fontSize: ".8rem", paddingBottom: "1rem" }}>
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
