import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";

const ResendToken = () => {
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("DATA :", data);

  useEffect(() => {
    if (data.status === "verified") {
      navigate("/admin");
    }
  });

  const onBtnLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(logout());
    navigate("/admin");
    toast.info("Logout Success!");
  };

  const onBtnResendToken = () => {
    setLoading(true);
    Axios.get(
      process.env.REACT_APP_API + "/auth/admin/refresh-token/" + data.admin_id
    )
      .then((respond) => {
        setLoading(false);
        toast.success(respond.data);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data);
      });
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={2}>
        <Typography variant="h2">Please Verify Your Account first</Typography>
        <Button
          variant="contained"
          onClick={onBtnResendToken}
          disabled={loading}
        >
          Resend Email
        </Button>
        <Button variant="outlined" color="warning" onClick={onBtnLogout}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
};

export default ResendToken;
