import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import NavLogo from "@mui/icons-material/MapsUgcOutlined";
import Context from "../Context";
const HomeBar = () => {
  const { User } = useContext(Context);
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "#457A92" }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <NavLogo sx={{ mr: 1, fontSize: 35 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Chatty
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0, pl: "a" }}>
            <Tooltip title={User.name}>
              <IconButton onClick={() => {}}>
                <Avatar alt={User.name} src={User.image} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HomeBar;
