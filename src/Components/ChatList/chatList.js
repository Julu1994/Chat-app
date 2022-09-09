import "./chatList.scss";
import React from "react";
import { useToggle } from "../../context";
import Search from "./search";
import { Avatar } from "@mui/material";

const ChatList = () => {
    const toggle = useToggle();
    return (
        <div className={toggle ? "list" : "hideList"}>
            <Search />
            <div className="user">
                <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                <div className="user-info">
                    <p className="user-info-name">Mahamudur</p>
                    <p className="user-info-text">hello</p>
                </div>
            </div>
        </div>
    );
};

export default ChatList;
