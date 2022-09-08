import React, { useContext } from "react";

const ToggleContext = React.createContext();
const ToggleAction = React.createContext();

export const useToggle = () => {
    return useContext(ToggleContext);
};
export const useHandler = () => {
    return useContext(ToggleAction);
};

export const Context = ({ children }) => {
    const [toggle, setToggle] = React.useState(true);

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
