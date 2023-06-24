import React, { useContext } from "react";
import { Box, Avatar, Typography, styled } from "@mui/material";
import Context from "../../Context";
import UserApis from "../../Apis/UserApis";
import Badge from "@mui/material/Badge";

const UserBox = ({ data }) => {
  const { setzi, setChatUser, User } = useContext(Context);
  // console.log(data);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: data.isOnline?"#44b700":"gray",
      color: "#44b700",
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        content: '""',
      },
    },
  }));

  if (data.members) {
    let conversationId = data._id;
    data = data?.members?.find((val) => val._id !== User.id);
    data.conversationId = conversationId;
  }

  const chat = async (user) => {
    if (!user.conversationId) {
      const data = {
        senderId: User.id,
        receiverId: user._id,
      };
      const res = await UserApis.NewConversation(data);
      user.conversationId = res.data.data._id;
    }
    setzi({
      B1: 0,
      B2: 1,
      view: true,
    });
    setChatUser({
      name: user?.name,
      email: user?.email,
      image: user?.image,
      conversationId: user?.conversationId,
    });
  };

  return (
    <>
      <Box
        sx={{
          border: 1.7,
          borderRadius: 1,
          margin: 1,
          p: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "aliceblue",
        }}
        onClick={() => {
          chat(data);
        }}
      >
        <Box
          sx={{
            ml: 5,
            mr: 4,
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={data?.name} src={data?.image} />
          </StyledBadge>
        </Box>
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography size={38}>{data?.name}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default UserBox;
