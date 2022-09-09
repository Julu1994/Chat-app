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

const Chat = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#003366",
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <div className="chat">
                <div className="chat-messages">
                    <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                    <Messages />
                </div>
                <div className="chat-messages">
                    <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                    <Messages />
                </div>
                <div className="chat-messages">
                    <Avatar alt="Jewel" src="/static/images/avatar/1.jpg" />
                    <Messages />
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Write here" />
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Chat;
