import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const Navigate = useNavigate();
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (!auth) {
      Navigate("/login");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
