import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Emoji from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import UserApis from "../Apis/UserApis";

const ChatBox = () => {
  const { ChatUser, User } = useContext(Context);
  const [Messages, setMessages] = useState([]);
  const [SendMessage, setSendMessage] = useState("");

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    UserApis.ShowMessages(ChatUser.conversationId).then((val) => {
      setMessages(val.data.data);
    });
  }, []);

  const handleMessage = (e) => {
    setSendMessage(e.target.value);
  };
  const handleSend = () => {
    const Data = {
      conversationId: ChatUser.conversationId,
      senderId: User.id,
      text: SendMessage,
    };
    setSendMessage("");
    UserApis.SendMessage(Data)
      .then((val) => {
        console.log(val.data.data);
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
          if (val.senderId === User.id) {
            return (
              <Box
                sx={{
                  alignSelf: "flex-end",
                  border: 1,
                  width: 280,
                  borderRadius: 1,
                  p: 1,
                  my: 1.5,
                  bgcolor: "aliceblue",
                }}
              >
                {val.text}
              </Box>
            );
          } else {
            return (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  border: 1,
                  width: 280,
                  borderRadius: 1,
                  p: 1,
                  my: 1.5,
                  // bgcolor:"lightlime"
                }}
              >
                {val.text}
              </Box>
            );
          }
        })}
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
          component="form"
          sx={{
            p: "4px 4px",
            display: "flex",
            alignItems: "center",
            width: isSm ? "100%" : "60vw",
            border: 1,
            borderColor: "divider",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <Emoji />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Type Message"
            value={SendMessage}
            onChange={handleMessage}
            inputProps={{ "aria-label": "Enter Message" }}
          />

          <Divider sx={{ height: 40, m: 1 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px", mx: 3 }}
            aria-label="directions"
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
