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
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { database } from "../../Firebase/auth";
import toast from "react-hot-toast";
import ChatHistory from "./chatHistory";

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
            if (!userChat.exists()) {
                await setDoc(doc(database, "messages", userIds), {
                    text: [],
                });
                await updateDoc(doc(database, "chat", activeUser.uid), {
                    [userIds + ".userDetails"]: {
                        id: user.id,
                        name: user.name,
                    },
                    [userIds + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(database, "chat", user.id), {
                    [userIds + ".userDetails"]: {
                        id: activeUser.uid,
                        name: activeUser.displayName,
                    },
                    [userIds + ".date"]: serverTimestamp(),
                });
            } else {
                console.log("No such document!");
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
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
                    </div>
                </div>
            )}
            <ChatHistory />
        </div>
    );
};

export default ChatList;
