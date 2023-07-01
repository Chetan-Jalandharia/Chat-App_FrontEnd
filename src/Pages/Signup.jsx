import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import UserApis from "../Apis/UserApis";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import form from "../assets/css/Form.module.css";
import { useNavigate } from "react-router-dom";
import { Toast, errorAlert } from "../Config/Alerts";

const Signup = () => {
  const Navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = React.useState(false);
  const [User, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    image: "",
  });

  const handleFocus = (e) => {
    e.target.setAttribute("Focused", "true");
  };

  const handleInput = (e) => {
    setUser((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    setUser((pre) => ({
      ...pre,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", User.name);
    formdata.append("email", User.email);
    formdata.append("password", User.password);
    formdata.append("image", User.image);

    UserApis.Register(formdata)
      .then((val) => {
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: "SignUp successfull",
        });
      })
      .catch((err) => {
        errorAlert.fire();
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
            width: isSm ? "99vw" : 580,
            maxHeight: "80dvh",
            minHeight: "60dvh",
            border: 0.2,
            borderRadius: 2,
            mx: 2,
          }}
        >
          <Box className={form.FormTitle}>Sign Up</Box>
          <Box>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                className={form.FormInput}
                placeholder="&#61447; Name"
                value={User?.name}
                onBlur={handleFocus}
                pattern="^([a-zA-Z\s]){2,30}$"
                required
                onChange={handleInput}
              />

              <input
                type="email"
                name="email"
                id="email"
                className={form.FormInput}
                placeholder="&#x2709; E-Mail"
                value={User?.email}
                onBlur={handleFocus}
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                required
                onChange={handleInput}
              />

              <input
                type="password"
                name="password"
                id="password"
                className={form.FormInput}
                placeholder="&#x1F441; Password"
                required
                onBlur={handleFocus}
                value={User?.password}
                onChange={handleInput}
              />
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                className={form.FormInput}
                placeholder="&#x2611; Confirm Password"
                value={User?.cpassword}
                onBlur={handleFocus}
                pattern={User.password}
                required
                onChange={handleInput}
              />

              <Box>
                <label
                  htmlFor="pic"
                  className={form.FormInput}
                  style={{ color: "rgb(103, 99, 100)" }}
                >
                  &#x1f4c4;{" "}
                  {User.image ? User.image.name : "Select Profile Picture"}
                  <input
                    style={{ zIndex: -1, position: "absolute" }}
                    type="file"
                    name="image"
                    id="pic"
                    onChange={handleImage}
                    required
                  />
                </label>
              </Box>

              <Box sx={{ width: "90%", margin: "auto", mt: 5 }}>
                <LoadingButton
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                  loading={loading}
                >
                  Submit
                </LoadingButton>
              </Box>
            </form>
            <Typography
              fontSize={14}
              color={"blue"}
              textAlign={"center"}
              sx={{
                my: 3,
                cursor: "pointer",
              }}
              onClick={() => {
                Navigate("/login");
              }}
            >
              Already have an Account? Signin
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
