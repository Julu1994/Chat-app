import "./chatList.scss";
import React from "react";
import { useToggle } from "../../context";
import Search from "./search";
import { Avatar } from "@mui/material";

const ChatList = () => {
    const toggle = useToggle();
    const [findUser, setFindUser] = React.useState("");
    const [user, setUser] = React.useState(null);
    const handleChage = (event) => {
        setFindUser(event.target.value);
    };
    console.log(findUser);
    return (
        <div className={toggle ? "list" : "hideList"}>
            <Search props={handleChage} />
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
