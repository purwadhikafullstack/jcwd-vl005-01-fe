import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SimpleForm from "../../../components/admin/simpleForm/SimpleForm";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const [visible, setVisible] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  let adminId;

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_API + `/auth/admin/verify-link/${params.token}`
    )
      .then((respond) => {
        setValidToken(true);
        adminId = respond.data.adminId.toString();
      })
      .catch((error) => {
        setValidToken(false);
      });
  });

  const onBtnChangePass = () => {
    setLoading(true);
    const newPassword = {
      password: passwordRef.current.value,
      confirm_password: confirmPasswordRef.current.value,
      adminId: adminId,
    };

    Axios.patch(
      process.env.REACT_APP_API + "/auth/admin/change-password",
      newPassword
    )
      .then((respond) => {
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        adminId = "";
        toast.success(respond.data);
        setLoading(false);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data);
        setLoading(false);
      });
  };

  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
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
      {validToken ? (
        <Stack
          direction="column"
          spacing={2}
          height="300px"
          width="500px"
          bgcolor="white"
          sx={{ boxShadow: 3, px: "100px", py: "30px" }}
          borderRadius="25px"
          textAlign="center"
        >
          <Typography variant="h4" fontWeight="bold">
            Reset Password
          </Typography>
          <Typography variant="p" fontSize="17px">
            Enter your new password
          </Typography>

          <TextField
            label="Password"
            variant="outlined"
            margin="dense"
            type={visible ? "text" : "password"}
            inputRef={passwordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={showPassword}
                  >
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
            inputRef={confirmPasswordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={showPassword}
                  >
                    {visible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            disabled={loading}
            variant="outlined"
            onClick={onBtnChangePass}
          >
            Change Password
          </Button>
        </Stack>
      ) : (
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" textAlign="center">
            BAD REQUEST
          </Typography>
          <Typography textAlign="center">
            It looks like your link is invalid or already expired
          </Typography>
          <Typography textAlign="center">
            Don't Worry, You can resend Password reset link below{" "}
          </Typography>
          <SimpleForm
            headingText="Resend Password Reset Link"
            detailText="Enter your registered email below to receive password reset instruction"
            inputLabel="Email"
            inputType="email"
            buttonText="Send Me a New Link !"
          />
        </Stack>
      )}
    </Grid>
  );
};

export default ResetPassword;
