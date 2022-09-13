import "./chatList.scss";
import React from "react";
import { useFireauth, useToggle } from "../../context";
import Search from "./search";
import { Avatar } from "@mui/material";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { database } from "../../Firebase/auth";
import toast from "react-hot-toast";

const ChatList = () => {
    const toggle = useToggle();
    const [findUser, setFindUser] = React.useState("");
    const [user, setUser] = React.useState(null);
    const activeUser = useFireauth();
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
        } catch {
            toast.error("Something went wrong!");
        }
        if (!user) {
            toast("User not found");
        }
    };
    const handleKey = (event) => {
        event.code === "Enter" && handleSearch();
    };

    const handleConnect = async () => {
        const userIds =
            activeUser.uid > user.id
                ? activeUser.uid + user.id
                : user.id + activeUser.uid;
        try {
            const docRef = doc(database, "messages", userIds);
            const userChat = await getDoc(docRef);
            if (userChat.exists()) {
                console.log("Document data:", userChat.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch {
            toast.error("Something went wrong!!");
        }
    };

    return (
        <div className={toggle ? "list" : "hideList"}>
            <Search onchange={handleChage} onkeydown={handleKey} />
            {user && (
                <div className="user" onClick={handleConnect}>
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
