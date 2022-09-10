import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import Home from "./Pages/Homepage/home";
import { useFireauth } from "./context";

function App() {
    const userAuth = useFireauth();
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={userAuth ? <Home /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
