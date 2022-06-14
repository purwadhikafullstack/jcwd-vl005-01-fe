import { Link as LinkTo } from "react-router-dom";
import {
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
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
          type="email"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />

        <Button variant="outlined">Login</Button>
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
