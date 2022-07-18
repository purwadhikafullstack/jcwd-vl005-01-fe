import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirm_passwordRef = useRef("");
  const navigate = useNavigate();

  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const onBtnRegister = () => {
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirm_password: confirm_passwordRef.current.value,
    };

    setLoading(true);

    Axios.post(process.env.REACT_APP_API + `/auth/admin/register`, newUser)
      .then((respond) => {
        setLoading(false);
        setVisible(false);
        toast.info(respond.data);
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirm_passwordRef.current.value = "";
        navigate("/admin/home");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data);
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
      bgcolor="#ecf0f1"
    >
      <Stack
        direction="column"
        spacing={2}
        height="450px"
        width="500px"
        bgcolor="white"
        sx={{ boxShadow: 3, px: "100px", py: "30px" }}
        borderRadius="25px"
        textAlign="center"
      >
        <Typography variant="h4" fontWeight="bold">
          Create New Admin Account
        </Typography>
        <Typography variant="p" fontSize="17px">
          Please fill in the form below
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          margin="dense"
          type="text"
          inputRef={usernameRef}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="dense"
          type="email"
          inputRef={emailRef}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="dense"
          type={visible ? "text" : "password"}
          inputRef={passwordRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton color="primary" size="large" onClick={showPassword}>
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="dense"
          type={visible ? "text" : "password"}
          inputRef={confirm_passwordRef}
        />

        <Button variant="outlined" onClick={onBtnRegister} disabled={loading}>
          {loading ? "loading" : "Register"}
        </Button>
      </Stack>
    </Grid>
  );
};

export default Register;
