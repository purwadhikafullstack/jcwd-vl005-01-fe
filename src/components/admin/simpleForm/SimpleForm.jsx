import { Button, Stack, TextField, Typography } from "@mui/material";

const SimpleForm = (props) => {
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
      />

      <Button variant="outlined">{props.buttonText}</Button>
    </Stack>
  );
};

export default SimpleForm;
