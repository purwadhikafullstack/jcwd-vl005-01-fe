import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import SimpleForm from "../../../components/admin/simpleForm/SimpleForm";

const ForgetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/home");
    }
  });

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
