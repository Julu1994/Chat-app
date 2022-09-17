import "./chatHistory.scss";
import React from "react";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../Firebase/auth";
import { ChatContext, useFireauth, useHandler } from "../../context";
import { useContext } from "react";

const ChatHistory = () => {
    const [history, setHistory] = React.useState([]);
    const activeUser = useFireauth();
    const { dispatch } = useContext(ChatContext);
    const chatHandler = useHandler();

    useEffect(() => {
        const getChatHistory = () => {
            const unsub = onSnapshot(
                doc(database, "chat", activeUser.uid),
                (doc) => {
                    setHistory(doc.data());
                }
            );
            return () => {
                unsub();
            };
        };
        activeUser.uid && getChatHistory();
    }, [activeUser.uid]);
    console.log(Object.entries(history), "the history...");

    const handleSwitch = (user) => {
        dispatch({ type: "SWITCH_USER", payload: user });
        if (window.innerWidth < 900) {
            chatHandler();
        }
    };
    return (
        <>
            {Object.entries(history)
                ?.sort((x, y) => y[1].date - x[1].date)
                .map((list) => {
                    return (
                        <div
                            className="history"
                            key={list[0]}
                            onClick={() => handleSwitch(list[1].userDetails)}>
                            <Avatar
                                alt={list[1].userDetails.name}
                                src="/static/images/avatar/1.jpg"
                            />
                            <div className="history-info">
                                <p className="history-info-name">
                                    {list[1].userDetails.name}
                                </p>
                                <p className="history-info-text">
                                    {list[1].lastText?.messages}
                                </p>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default ChatHistory;
