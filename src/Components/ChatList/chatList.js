import "./chatList.scss";
import React from "react";
import { useToggle } from "../../context";

const ChatList = () => {
    const toggle = useToggle();
    return <div className={toggle ? "list" : "hideList"}>ChatList</div>;
};

export default ChatList;
