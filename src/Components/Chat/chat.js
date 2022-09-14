import "./chat.scss";
import React from "react";
import Messages from "../Messages/messages";
import {
    Avatar,
    Button,
    createTheme,
    IconButton,
    ThemeProvider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useContext } from "react";
import { ChatContext, useFireauth } from "../../context";
import {
    arrayUnion,
    doc,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { database, storage } from "../../Firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";

const Chat = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [url, setUrl] = React.useState(null);
    const { info } = useContext(ChatContext);
    const uniqueId =
        Math.floor(Math.random() * 500) *
        Math.floor(Math.random() * 1000) *
        Math.random();

    console.log(info.chatId, "info.chatId");
    const activeUser = useFireauth();
    const theme = createTheme({
        palette: {
            primary: {
                main: "#003366",
            },
        },
    });

    React.useEffect(() => {
        const docRef = doc(database, "messages", info.chatId);
        const unsub = onSnapshot(docRef, (doc) => {
            doc.exists() && setMessages(doc.data().text);
        });
        return () => {
            unsub();
        };
    }, [info.chatId]);

    const fileHandler = (event) => {
        const imgFile = event.target.files[0];
        const imgRef = ref(storage, `Images/${uniqueId}`);
        const uploadTask = uploadBytesResumable(imgRef, imgFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast.success("Image upload is " + progress + "% done");
            },
            () => {
                toast.error("Upload faild");
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                });
            }
        );
    };
    const sendHandler = async (event) => {
        event.preventDefault();
        if (url) {
            await updateDoc(doc(database, "messages", info.chatId), {
                text: arrayUnion({
                    id: uniqueId,
                    senderId: activeUser.uid,
                    file: url,
                    date: Timestamp.now(),
                }),
            });
        } else {
            await updateDoc(doc(database, "messages", info.chatId), {
                text: arrayUnion({
                    id: uniqueId,
                    messages: input,
                    senderId: activeUser.uid,
                    date: Timestamp.now(),
                }),
            });

            await updateDoc(doc(database, "chat", activeUser.uid), {
                [info.chatId + ".lastText"]: {
                    messages: input,
                },
                [info.chatId + ".date"]: serverTimestamp(),
            });
            await updateDoc(doc(database, "chat", info.user.id), {
                [info.chatId + ".lastText"]: {
                    messages: input,
                },
                [info.chatId + ".date"]: serverTimestamp(),
            });
        }
        setInput("");
        setUrl(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="chat">
                <div className="chat-main">
                    <div className="chat-messages">
                        {messages?.map((text) => {
                            return (
                                <div key={text.id}>
                                    <Avatar
                                        alt="No name"
                                        src="/static/images/avatar/1.jpg"
                                    />
                                    <Messages message={"hi"} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="chat-input">
                    <form onSubmit={sendHandler}>
                        <input
                            type="text"
                            placeholder="Write here"
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label">
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={fileHandler}
                            />
                            <PhotoCamera />
                        </IconButton>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                            endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Chat;
