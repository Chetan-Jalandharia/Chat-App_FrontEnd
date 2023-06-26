import { Box, Tab, Tabs } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import React, { Suspense, useContext, useEffect, useState } from "react";
import HomeBar from "./HomeBar";
import UserBox from "./SubComponents/UserBox";
import Context from "../Context";
import UserApis from "../Apis/UserApis";
import socket from "../Config/Socket";

const ContactMenu = () => {
  const { zi, User } = useContext(Context);
  const [value, setValue] = useState(0);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [Data, setData] = useState([]);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  socket.on("statusUpdate", (data) => {
    setStatusUpdate(!statusUpdate)
    console.log(value, " : ", statusUpdate," : ",data)
  });
  
  useEffect(() => {
    console.log(" update");
    // console.log(value);

    if (value == 0) {
      UserApis.ShowConversations(User.id)
        .then((val) => {
          setData(val.data.data);
          console.log("first data: ", val.data.data);
        })
        .catch((err) => {
          console.log("error occurs: " + err);
        });
    } else if (value == 1) {
      UserApis.AllUsers()
        .then((val) => {
          setData(val.data.data);
          console.log("second data: ", val.data.data);
        })
        .catch((err) => {
          console.log("error occurs: " + err);
        });
    }
  }, [value, statusUpdate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Suspense fallback={<h1>loading....</h1>}>
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box
              sx={{
                py: 2,
                // border: 1,
                // borderColor: "divider",
                minHeight: "85vh",
                // bgcolor:"red"
              }}
            >
              {children}
            </Box>
          )}
        </div>
      </Suspense>
    );
  }

  return (
    <>
      <Box
        sx={{
          width: isSm ? "100%" : "40vw",
          height: "100vh",
          backgroundColor: "aliceblue",
          zIndex: zi?.B1,
          boxShadow: "none",
        }}
      >
        <HomeBar />
        <Box sx={{ border: 1, borderColor: "divider" }}>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Chat" />
            <Tab label="People" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {value == 0 &&
            Data?.map((val, index) => {
              return <UserBox key={index} data={val} />;
            })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {value == 1 &&
            Data?.map((val, index) => {
              return <UserBox key={index} data={val} />;
            })}
        </TabPanel>
      </Box>
    </>
  );
};

export default ContactMenu;
