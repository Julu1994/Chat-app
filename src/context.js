import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { auth } from "./Firebase/auth";

const ToggleContext = React.createContext();
const ToggleAction = React.createContext();
const UserContext = React.createContext();

export const useToggle = () => {
    return useContext(ToggleContext);
};
export const useHandler = () => {
    return useContext(ToggleAction);
};
export const useAuth = () => {
    return useContext(UserContext);
};

export const Context = ({ children }) => {
    const deviceWidth = window.innerWidth;
    const [toggle, setToggle] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState({});

    useEffect(() => {
        if (deviceWidth < 900) {
            setToggle(false);
        }
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, [deviceWidth]);

    const toggleHandler = () => {
        setToggle((value) => !value);
    };
    console.log(currentUser, "the current user");
    return (
        <UserContext.Provider value={currentUser}>
            <ToggleContext.Provider value={toggle}>
                <ToggleAction.Provider value={toggleHandler}>
                    {children}
                </ToggleAction.Provider>
            </ToggleContext.Provider>
        </UserContext.Provider>
    );
};
