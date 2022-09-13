import "./chatHistory.scss";
import React from "react";
import { Avatar } from "@mui/material";

const ChatHistory = () => {
    return (
        <div className="history">
            <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
            <div className="history-info">
                <p className="history-info-name">jewel</p>
                <p className="history-info-text">hello</p>
            </div>
        </div>
    );
};

export default ChatHistory;
