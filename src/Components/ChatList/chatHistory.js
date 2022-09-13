import "./chatHistory.scss";
import React from "react";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../Firebase/auth";
import { useFireauth } from "../../context";

const ChatHistory = () => {
    const [history, setHistory] = React.useState([]);
    const activeUser = useFireauth();

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
    return (
        <>
            {Object.entries(history)?.map((list) => {
                return (
                    <div className="history" key={list[0]}>
                        <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                        <div className="history-info">
                            <p className="history-info-name">jewel</p>
                            <p className="history-info-text">hello</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ChatHistory;
