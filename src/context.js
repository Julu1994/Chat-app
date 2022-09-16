import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { useReducer } from "react";
import { auth } from "./Firebase/auth";

const ToggleContext = React.createContext();
const ToggleAction = React.createContext();
const UserContext = React.createContext();
export const ChatContext = React.createContext();

export const useToggle = () => {
    return useContext(ToggleContext);
};
export const useHandler = () => {
    return useContext(ToggleAction);
};
export const useFireauth = () => {
    return useContext(UserContext);
};
// export const useChat = () => {
//     return useContext(ChatContext);
// };

export const Context = ({ children }) => {
    //const deviceWidth = window.innerWidth;
    const [toggle, setToggle] = React.useState(true);
    const [currentUser, setCurrentUser] = React.useState({ name: "jewel" });

    // useEffect(() => {
    //     if (deviceWidth < 900) {
    //         setToggle(false);
    //     }
    // }, [deviceWidth]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);

    const toggleHandler = () => {
        setToggle((value) => !value);
    };
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const reducer = (state, action) => {
        if (action.type === "SWITCH_USER") {
            return {
                chatId:
                    currentUser.uid > action.payload.id
                        ? currentUser.uid + action.payload.id
                        : action.payload.id + currentUser.uid,
                user: action.payload,
            };
        }
    };
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <ToggleContext.Provider value={toggle}>
            <ToggleAction.Provider value={toggleHandler}>
                <UserContext.Provider value={currentUser}>
                    <ChatContext.Provider value={{ info: state, dispatch }}>
                        {children}
                    </ChatContext.Provider>
                </UserContext.Provider>
            </ToggleAction.Provider>
        </ToggleContext.Provider>
    );
};
