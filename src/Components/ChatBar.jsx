import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import Context from "../Context";

const ChatBar = () => {
  const { setzi, ChatUser } = useContext(Context);
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "#2C88B3", height: 63 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <ArrowBack
            sx={{ mr: 1, fontSize: 20 }}
            onClick={() => {
              setzi({
                B1: 1,
                B2: 0,
              });
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              ml: 6,
              flexGrow: 1,
              fontWeight: 500,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {ChatUser?.name}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={ChatUser?.name}>
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar alt={ChatUser?.name} src={ChatUser?.image} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ChatBar;
