import { useState } from "react";
import Context from "./index";

export default ({ children }) => {
  const [zi, setzi] = useState({
    B1: 1,
    B2: 0,
    view: false,
  });
  const [User, setUser] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
  });
  const [ChatUser, setChatUser] = useState({
    id:"",
    name: "",
    email: "",
    image: "",
  });

  return (
    <Context.Provider
      value={{ zi, setzi, User, setUser, ChatUser, setChatUser }}
    >
      {children}
    </Context.Provider>
  );
};
