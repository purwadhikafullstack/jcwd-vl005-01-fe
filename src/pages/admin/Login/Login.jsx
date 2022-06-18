import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/adminSlice";
import Axios from "axios";
import { toast } from "react-toastify";
import { Link as LinkTo, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const password = useRef("");
  const user = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const onBtnLogin = () => {
    const loginCredential = {
      user: user.current.value,
      password: password.current.value,
    };

    setLoading(true);

    Axios.post(process.env.REACT_APP_API + "/auth/admin/login", loginCredential)
      .then((respond) => {
        toast.info("Login Success");
        setLoading(false);
        const token = respond.headers.authorization.split(" ")[1];
        localStorage.setItem("token", token);
        user.current.value = "";
        password.current.value = "";

        dispatch(login(respond.data));
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
        spacing={1.5}
        height="300px"
        width="500px"
        bgcolor="white"
        sx={{ boxShadow: 3, px: "100px", py: "30px" }}
        borderRadius="25px"
        textAlign="center"
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome to admin page
        </Typography>
        <Typography fontSize="17px">Please login to continue</Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          inputRef={user}
          type="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          type={visible ? "text" : "password"}
          inputRef={password}
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

        <Button variant="outlined" onClick={onBtnLogin} disabled={loading}>
          Login
        </Button>
        <LinkTo to="/admin/forget-password" style={{ textAlign: "center" }}>
          <Link component="button" underline="hover" fontSize={"17px"}>
            Forgotten Password?
          </Link>
        </LinkTo>
      </Stack>
    </Grid>
  );
};

export default Login;
