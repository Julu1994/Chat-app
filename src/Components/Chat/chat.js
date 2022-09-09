import "./chat.scss";
import React from "react";
import Messages from "../Messages/messages";
import { Avatar } from "@mui/material";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-messages">
                <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                <Messages />
            </div>
            <div className="chat-messages">
                <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                <Messages />
            </div>
            <div className="chat-messages">
                <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                <Messages />
            </div>
        </div>
    );
};

export default Chat;
