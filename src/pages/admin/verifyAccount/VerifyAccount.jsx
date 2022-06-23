import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

const VerifyAccount = () => {
  const [validToken, setValidToken] = useState(false);
  const params = useParams();

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_API + `/auth/admin/verify-account/${params.token}`
    )
      .then((respond) => {
        setValidToken(true);
        toast.success(respond.data);
      })
      .catch((error) => {
        setValidToken(false);
        toast.error(error.response.data);
      });
  }, []);

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
        <Stack spacing={2} textAlign="center">
          <Typography variant="h3" fontWeight="bold">
            Congratulations!
          </Typography>
          <Typography variant="h4">Account Has Been Verified</Typography>
          <Link
            to="/admin"
            style={{ textAlign: "center", textDecoration: "none" }}
          >
            <Button variant="outlined">Login</Button>
          </Link>
        </Stack>
      ) : (
        <Stack spacing={2} textAlign="center">
          <Typography variant="h3" fontWeight="bold">
            Bad Request
          </Typography>
          <Typography variant="h4">Token Is not Valid</Typography>
        </Stack>
      )}
    </Grid>
  );
};

export default VerifyAccount;
