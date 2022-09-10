import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import Home from "./Pages/Homepage/home";
import { Context } from "./context";
import { useAuth } from "./context";

function App() {
    const userAuth = useAuth();
    return (
        <Context>
            <Router>
                <Header />

                <Routes>
                    <Route path="/" element={userAuth ? <Home /> : <Login />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </Context>
    );
}

export default App;
