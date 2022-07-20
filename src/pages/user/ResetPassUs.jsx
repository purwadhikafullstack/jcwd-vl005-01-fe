import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IconButton,
  InputAdornment,
  TextField,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export default function RPUser () {
  const npass = useRef("")
  const cpass = useRef("")
  const email = useRef("")
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userId;

  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_API + `/auth/user/verify-resetpass/${params.token}`
    )
      .then((respond) => {
        setValidToken(true);
        userId = respond.data.userId.toString();
      })
      .catch((error) => {
        setValidToken(false);
      });
  });

  const onButtonCP = (e) => {
        e.preventDefault()
        
        const newpassword = {
            password : npass.current.value,
            confirm_password : cpass.current.value,
            userId : userId,
        }
        console.log(newpassword);
        setLoading(true)
        Axios.patch(process.env.REACT_APP_API + '/auth/user/change-password', newpassword)
        .then((res) => {
            console.log("respond :", res.data)
            setLoading(false)
            
            // if success
            toast.success(res.data)

            // redirect to loginpage
            navigate('/login')
        })
        .catch((error) => {
            toast.error(error.response.data)
            console.log(error)
            setLoading(false)
        })
  }

  const onBtnSendFP = (e) => {
        e.preventDefault()

        const checkEmail = {
            email : email.current.value
        }
        console.log(email); 
        setLoading(true)
        Axios.post(process.env.REACT_APP_API + '/auth/user/forget-password', checkEmail)
        .then((respond) => {
            console.log(respond.data)
            setLoading(false)

            toast.info(respond.data)
        })
        .catch((error) => {
            setLoading(false)
            toast.error(error.response.data)
            console.log(error)
        })
  }

  return (
    <Container>
      {validToken ? 
      <Wrapper>
        <Title>RESET PASSWORD</Title>
        <p>Insert New Password</p>
        <Form>
          {/* <Input ref={npass} type="password" placeholder="New Password" /> */}
          {/* <Input ref={cpass} type="password" placeholder="Confirm Password"/> */}
          <TextField
            label="Password"
            variant="outlined"
            type={visible ? "text" : "password"}
            inputRef={npass}
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
            label="Password"
            variant="outlined"
            type={visible ? "text" : "password"}
            inputRef={cpass}
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
          <Button onClick={onButtonCP}>{loading ? <CircularProgress size={30} color="inherit"/>: "CHANGE PASSWORD"}</Button>
        </Form>
      </Wrapper>
      :
      <Wrapper>
        <Title>INVALID / EXPIRED LINK</Title>
        <p>Please re-insert your email to receive reset password instruction.</p>
        <Form>
          <Input ref={email} placeholder="Insert Email"/>
          <Button onClick={onBtnSendFP}>{loading ? <CircularProgress size={30} color="inherit"/>: "GET NEW LINK"}</Button>
        </Form>
      </Wrapper>
      }
    </Container>
  );
};

