import "./chatList.scss";
import React from "react";
import { useToggle } from "../../context";
import Search from "./search";
import { Avatar } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../Firebase/auth";
import toast from "react-hot-toast";

const ChatList = () => {
    const toggle = useToggle();
    const [findUser, setFindUser] = React.useState("");
    const [user, setUser] = React.useState(null);
    const handleChage = (event) => {
        setFindUser(event.target.value);
    };
    const handleSearch = async () => {
        const userRef = collection(database, "users");
        const q = query(userRef, where("name", "==", findUser));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
            if (!user) {
                toast("User not found");
            }
        } catch {
            toast.error("Something went wrong!");
        }
    };
    const handleKey = (event) => {
        event.code === "Enter" && handleSearch();
    };
    console.log(user, "the user for search ");

    return (
        <div className={toggle ? "list" : "hideList"}>
            <Search onchange={handleChage} onkeydown={handleKey} />
            {user && (
                <div className="user">
                    <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                    <div className="user-info">
                        <p className="user-info-name">{user.name}</p>
                        <p className="user-info-text">hello</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatList;
