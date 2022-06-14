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
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

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
          inputRef={confirmPasswordRef}
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

        <Button disabled={loading} variant="outlined">
          Change Password
        </Button>
      </Stack>
    </Grid>
  );
};

export default ResetPassword;
