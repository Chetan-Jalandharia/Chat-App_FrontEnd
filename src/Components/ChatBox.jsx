import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Emoji from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserApis from "../Apis/UserApis";
import Context from "../Context";
import socket from "../Config/Socket";
import EmojiPick from "./SubComponents/EmojiPick";

const ChatBox = () => {
  const { ChatUser, User } = useContext(Context);

  const ScrollRef = useRef();
  const [Messages, setMessages] = useState([]);
  const [SendMessage, setSendMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    UserApis.ShowMessages(ChatUser.conversationId).then((val) => {
      setMessages(val.data.data);
    });
  }, [ChatUser]);

  useEffect(() => {
    socket.on("receiveNewMessage", (data) => {
      // console.log("New Message: ", data);
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      ChatUser?.id == arrivalMessage.senderId &&
      setMessages((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage, ChatUser]);

  useEffect(() => {
    ScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages, arrivalMessage]);

  // ------ Handle message send by sender on sender view
  const handleMessage = (e) => {
    setSendMessage(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // ------ Send message to server
  const handleSend = () => {
    const Data = {
      conversationId: ChatUser.conversationId,
      senderId: User.id,
      text: SendMessage,
    };
    setSendMessage("");
    socket.emit("sendMessage", { ...Data, receiverId: ChatUser?.id });
    UserApis.SendMessage(Data)
      .then((val) => {
        setMessages((pre) => [...pre, val.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 63px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        className="chat-area"
        sx={{
          width: "100%",
          overflowY: "auto",
          height: "92%",
          px: 2,
          py: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Messages.map((val, index) => {
          return val.senderId === User.id ? (
            <Box
              ref={ScrollRef}
              key={index}
              sx={{
                alignSelf: "flex-end",
                border: 1,
                borderColor: "divider",
                borderRadius: "15px 15px 0px 15px",
                width: 280,
                maxWidth: 300,
                p: 1.5,
                my: 1.5,
                color: "white",
                fontSize: "17px",
                bgcolor: "#6C9BCF",
                wordBreak: "break-all",
              }}
            >
              {val.text}
            </Box>
          ) : (
            <Box
              ref={ScrollRef}
              key={index}
              sx={{
                alignSelf: "flex-start",
                border: 1,
                Width: 280,
                maxWidth: 300,
                borderRadius: "0px 15px 15px 15px",
                p: 1.5,
                my: 1.5,
                fontSize: "17px",
                bgcolor: "#ECF2FF",
                wordBreak: "break-all",
              }}
            >
              {val.text}
            </Box>
          );
        })}

        {showEmoji && (
          <EmojiPick
            onEmojiClick={(emojiObj, e) => {
              setSendMessage((pre) => pre + emojiObj.emoji);
            }}
          />
        )}
      </Box>
      <Box
        className="chatInput"
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 1,
        }}
      >
        <Paper
          component="div"
          sx={{
            p: "4px 4px",
            display: "flex",
            alignItems: "center",
            width: isSm ? "100%" : "60vw",
            border: 1,
            borderColor: "divider",
          }}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="menu"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <Emoji />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Type Message"
            value={SendMessage}
            onChange={handleMessage}
            onKeyDown={handleEnter}
            inputProps={{ "aria-label": "Enter Message" }}
          />

          <Divider sx={{ height: 40, m: 1 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px", mx: 3 }}
            onClick={handleSend}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatBox;
