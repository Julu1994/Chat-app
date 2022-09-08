import React, { useContext, useEffect } from "react";

const ToggleContext = React.createContext();
const ToggleAction = React.createContext();

export const useToggle = () => {
    return useContext(ToggleContext);
};
export const useHandler = () => {
    return useContext(ToggleAction);
};

export const Context = ({ children }) => {
    const deviceWidth = window.innerWidth;
    const [toggle, setToggle] = React.useState(true);

    useEffect(() => {
        if (deviceWidth < 900) {
            setToggle(false);
        }
    }, [deviceWidth]);

    const toggleHandler = () => {
        setToggle((value) => !value);
    };
    return (
        <ToggleContext.Provider value={toggle}>
            <ToggleAction.Provider value={toggleHandler}>
                {children}
            </ToggleAction.Provider>
        </ToggleContext.Provider>
    );
};
