import "./chatList.scss";
import React from "react";
import { useToggle } from "../../context";
import Search from "./search";

const ChatList = () => {
    const toggle = useToggle();
    return (
        <div className={toggle ? "list" : "hideList"}>
            <Search />
            ChatList
        </div>
    );
};

export default ChatList;
