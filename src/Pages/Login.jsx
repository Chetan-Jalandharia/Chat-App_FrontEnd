import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import form from "../assets/css/Form.module.css";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import UserApis from "../Apis/UserApis";
import Context from "../Context";
import { Toast, errorAlert } from "../Config/Alerts";

const Login = () => {
  const { User, setUser } = useContext(Context);

  const Navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = React.useState(false);

  const [Data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    UserApis.Login(Data)
      .then((val) => {
        setLoading(false);
        setUser({
          id: val.data.data._id,
          name: val.data.data.name,
          email: val.data.data.email,
          image: val.data.data.image,
        });

        sessionStorage.setItem("auth", val.data.token);

        setTimeout(() => {
          Navigate("/");
        }, 1000);
        Toast.fire({
          icon: "success",
          title: "Login successfully",
        });
      })
      .catch((err) => {
        errorAlert.fire()
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%) ",
        }}
      >
        <Box
          className={form.FormBox}
          sx={{
            width: isSm ? "99vw" : 570,
            minHeight: "55dvh",
            maxHeight: "65dvh",
            border: 0.2,
            borderRadius: 2,
            mx: 2,
          }}
        >
          <Box
            className={form.FormTitle}
            sx={{
              pt: 2,
            }}
          >
            Login
          </Box>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                className={form.FormInput}
                placeholder="&#x2709; E-Mail"
                value={Data.email}
                onChange={handleInput}
              />

              <input
                type="password"
                name="password"
                id="password"
                className={form.FormInput}
                placeholder="&#x1F441; Password"
                value={Data.password}
                onChange={handleInput}
              />

              <Box sx={{ width: "90%", margin: "auto", mt: 5 }}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  loading={loading}
                >
                  Submit
                </LoadingButton>
              </Box>
            </form>
          </Box>
          <Typography
            fontSize={14}
            color={"blue"}
            textAlign={"center"}
            sx={{
              my: 4,
              cursor: "pointer",
            }}
            onClick={() => {
              Navigate("/signup");
            }}
          >
            Don't have an Account? Register
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
