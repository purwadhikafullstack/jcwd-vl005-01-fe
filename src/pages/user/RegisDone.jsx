import styled from "styled-components";
import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import Axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-weight:bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Formrow = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 10px 5px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export default function RegisDone () {
  const mail = useRef("")
  const [loading, setLoading] = useState(false);


  const onBtnResend = (e) => {
    e.preventDefault()

    const reemail = {
        email : mail.current.value
    }
    setLoading(true)
    Axios.post(process.env.REACT_APP_API + '/auth/refresh', reemail)
    .then((res) => {
      toast.success("New Verification Link Sent To Your Email")
      console.log(res.data)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      toast.error(error.response.data)
      console.log(error)
    })
  }

  return (
    <Container>
      <Wrapper>
        <Title>Registration Succesfull, Status Account : "Unverified"</Title>
        <p>Please Check Your Email to Verify Account</p>
        <p>Input your email below if you want to get new verification link</p>
        <Form>
          <Input ref={mail} placeholder="email"/>
          <Button onClick={onBtnResend}>Send New Email</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

