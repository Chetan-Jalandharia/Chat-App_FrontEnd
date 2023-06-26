import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import ContactMenu from "../Components/ContactMenu";
import ChatArea from "../Components/ChatArea";
import EmptyAlert from "../Components/SubComponents/EmptyAlert";
import Context from "../Context";
import socket from "../Config/Socket";

const HomePage = () => {
  const { zi, User } = useContext(Context);
  const auth = sessionStorage.getItem("auth");

  useEffect(() => {
    // --------- set user status to online when user logedIn
    if (auth) {
      socket.emit("setStatus", { userId: User.id,socketId:socket.id });
    }
  }, [auth]);

 
  return (
    <>
      {auth ? (
        <Box sx={{ minWidth: 300, maxWidth: "100vw", display: "flex" }}>
          <ContactMenu className={"users-list"} />
          {(zi.view && <ChatArea className={"chat-box"} />) || <EmptyAlert />}
        </Box>
      ) : (
        <Box sx={{ width: "100vw", height: "100dvh" }}></Box>
      )}
    </>
  );
};

export default HomePage;
