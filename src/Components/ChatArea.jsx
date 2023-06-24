import React, { useContext } from "react";
import { useMediaQuery, useTheme, Box } from "@mui/material";
import Context from "../Context";
import ChatBar from "./ChatBar";
import ChatBox from "./ChatBox";
const ChatArea = () => {
  const { zi} = useContext(Context);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        sx={{
          width: isSm ? "100%" : "60vw",
          height: "100vh",
          backgroundColor: "white",
          position: isSm ? "absolute" : "relative",
          zIndex: zi?.B2,
          top: 0,
          left: 0,
          borderColor: "gray",
          display:"flex",
          flexDirection:"column"
        }}
        borderLeft={1}
      >
        <ChatBar />
        <ChatBox/>
      </Box>
    </>
  );
};

export default ChatArea;
