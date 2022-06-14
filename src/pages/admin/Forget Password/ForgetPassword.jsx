import { Grid } from "@mui/material";
import SimpleForm from "../../../components/admin/simpleForm/SimpleForm";

const ForgetPassword = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
      bgcolor="#ecf0f1"
    >
      <SimpleForm
        headingText="Forgot Password?"
        detailText="Enter your registered email below to receive password reset instruction"
        inputLabel="Email"
        inputType="email"
        buttonText="Send Email"
      />
    </Grid>
  );
};

export default ForgetPassword;
