import React, { useRef, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { Button, Stack, TextField, Typography } from "@mui/material";

const SimpleForm = (props) => {
  const [loading, setLoading] = useState(false);
  const email = useRef("");

  const onBtnSendEmail = () => {
    const data = {
      email: email.current.value,
    };

    setLoading(true);

    Axios.post(process.env.REACT_APP_API + "/auth/admin/forget-password", data)
      .then((respond) => {
        toast.success(respond.data);
        setLoading(false);
        email.current.value = "";
      })
      .catch((error) => {
        toast.error(error.response.data);
        setLoading(false);
      });
  };

  return (
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
        {props.headingText}
      </Typography>
      <Typography variant="p" fontSize="17px">
        {props.detailText}
      </Typography>

      <TextField
        id="outlined-basic"
        label={props.inputLabel}
        variant="outlined"
        type={props.inputType}
        inputRef={email}
      />

      <Button variant="outlined" disabled={loading} onClick={onBtnSendEmail}>
        {props.buttonText}
      </Button>
    </Stack>
  );
};

export default SimpleForm;
