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
export const useFireauth = () => {
    return useContext(UserContext);
};

export const Context = ({ children }) => {
    const deviceWidth = window.innerWidth;
    const [toggle, setToggle] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState({ name: "jewel" });

    useEffect(() => {
        if (deviceWidth < 900) {
            setToggle(false);
        }
    }, [deviceWidth]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);

    const toggleHandler = () => {
        setToggle((value) => !value);
    };
    return (
        <ToggleContext.Provider value={toggle}>
            <ToggleAction.Provider value={toggleHandler}>
                <UserContext.Provider value={currentUser}>
                    {children}
                </UserContext.Provider>
            </ToggleAction.Provider>
        </ToggleContext.Provider>
    );
};
