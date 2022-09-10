import "./register.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../Firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const Register = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const createUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(createUser.user);
            await updateProfile(createUser.user, {
                name,
            });

            await setDoc(doc(database, "users", createUser.user.uid), {
                id: createUser.user.uid,
                name,
                email,
            });
            toast.success("Successfully registered!");
        } catch {
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="reg">
            <Card sx={{ minWidth: 275 }}>
                <Typography
                    variant="h5"
                    sx={{ textAlign: "center", mt: "1rem" }}>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <CardContent sx={{ textAlign: "center" }}>
                        <TextField
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            sx={{ width: "100%", mt: "1rem" }}
                        />
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
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            autoComplete="current-password"
                            variant="standard"
                            sx={{ width: "100%", mt: "1rem" }}
                        />
                    </CardContent>
                    <CardActions
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="big"
                            sx={{ width: "100%", mt: "1rem" }}>
                            Sign up
                        </Button>
                    </CardActions>
                </form>
                <p>
                    Already have an account ?
                    <div>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            Login here
                        </Link>
                    </div>
                </p>
            </Card>
        </div>
    );
};
export default Register;
