import "./chatPage.scss";
import React from "react";
import ChatList from "../../Components/ChatList/chatList";
import Chat from "../../Components/Chat/chat";

const ChatPage = () => {
    return (
        <div className="chatPage">
            <ChatList />
            <Chat />
        </div>
    );
};

export default ChatPage;
