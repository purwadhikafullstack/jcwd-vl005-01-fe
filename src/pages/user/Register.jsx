import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import Axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
import {
  IconButton,
  InputAdornment,
  TextField,
  CircularProgress,
  Button
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   disabled
// `;

const Register = () => {
  const usern = useRef("")
  const email = useRef("")
  const passw = useRef("")
  const cpass = useRef("")
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showPassword = () => {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  
  const onButtonRegis = (e) => {
    e.preventDefault()

    const newUser = {
      username : usern.current.value,
      email : email.current.value,
      password : passw.current.value,
      confirm_password : cpass.current.value
    }
    setLoading(true)
    Axios.post(process.env.REACT_APP_API+'/users/regis', newUser)
    .then((res) =>  {
      console.log("res : ", res.data)
      setLoading(false)
      // reset state
      // usern.current.value = ""
      // email.current.value = ""
      // passw.current.value = ""
      // cpass.current.value = ""
      
      toast.success("Registration Successfull")

      navigate('/login')

    }) 
    .catch((error) => {
      toast.error(error.response.data)
      console.log(error)
      setLoading(false)
    })
  }

  // protection
  const token = localStorage.getItem('token')
  if (token) return <Navigate to="/"/>

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          {/* <Input ref={usern} placeholder="username" />
          <Input ref={email} placeholder="email" /> */}
          {/* <Input ref={passw} placeholder="password" /> */}
          {/* <Input ref={cpass} placeholder="confirm password" /> */}
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            inputRef={usern}
            type="email"
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={email}
            type="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            type={visible ? "text" : "password"}
            inputRef={passw}
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
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button 
            variant="contained"
            color="info"
            size="large"
            onClick={onButtonRegis}
            disabled={loading}
            >{loading ? <CircularProgress size={30} color="inherit"/>: "CREATE" }</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
