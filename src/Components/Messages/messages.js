import "./messages.scss";
import React from "react";

const Messages = ({ message }) => {
    return (
        <div className="messages">
            <p className="messages-text">{message}</p>
        </div>
    );
};

export default Messages;
