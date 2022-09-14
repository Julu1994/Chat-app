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
import { ChatContext } from "../../context";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../Firebase/auth";

const Chat = () => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [file, setFile] = React.useState(null);
    const theme = createTheme({
        palette: {
            primary: {
                main: "#003366",
            },
        },
    });
    const { info } = useContext(ChatContext);

    React.useEffect(() => {
        const docRef = doc(database, "messages", info.chatId);
        const unsub = onSnapshot(docRef, (doc) => {
            doc.exists() && setMessages(doc.data().text);
        });
        return () => {
            unsub();
        };
    }, [info.chatId]);

    const sendHandler = (event) => {
        event.preventDefault();
        alert(input);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="chat">
                <div className="chat-main">
                    <div className="chat-messages">
                        {messages.map((text) => {
                            return (
                                <div key={text.id}>
                                    <Avatar
                                        alt={info.user.userDetails?.name}
                                        src="/static/images/avatar/1.jpg"
                                    />
                                    <Messages message={text} />
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
                                onChange={(event) =>
                                    setFile(event.target.files[0])
                                }
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
