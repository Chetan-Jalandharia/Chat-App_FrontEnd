import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import ContactMenu from "../Components/ContactMenu";
import ChatArea from "../Components/ChatArea";
import EmptyAlert from "../Components/SubComponents/EmptyAlert";
import Context from "../Context";
import socket from "../Config/Socket";

const HomePage = () => {
  const { zi, setzi, User } = useContext(Context);
  const auth = sessionStorage.getItem("auth");

  useEffect(() => {
    // --------- set user status to online when user logedIn
    if (auth) {
      socket.emit("setStatus", { userId: User.id, socketId: socket.id });
    }
  }, [auth]);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    setzi({ B1: 1, B2: 0, view: false });
  };

  useEffect(() => {
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

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
