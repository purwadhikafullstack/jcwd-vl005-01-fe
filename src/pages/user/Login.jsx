import styled from "styled-components";
import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import Axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { login } from "../../redux/userSlice";

// import { Visibility, VisibilityOff } from "@mui/icons-material";

import { mobile } from "../../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  font-weight:bold;
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
  width: 40%;
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

export default function Login () {
  const usern = useRef("")
  const passw = useRef("")
  // const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onButtonLogin = (e) => {
        e.preventDefault()
        const loginuser = {
            usernameOrEmail : usern.current.value,
            password : passw.current.value
        }
        
        setLoading(true)
        Axios.post(process.env.REACT_APP_API+'/auth/user/login', loginuser)
        .then((res) => {
            console.log("respond :", res.data)
            setLoading(false)
            const servertoken = res.data.token
            // const servertoken = res.headers.userToken.split(" ")[1]
            // const serverid = res.data.user_id
            console.log(servertoken);

            // save token to localstorage
            localStorage.setItem("token", servertoken)
            // localStorage.setItem("id", serverid)

            // // save user data to global state
            dispatch(login(res.data))

            // if success
            toast.success("Login Success")

            // redirect to home page
            navigate("/")
        })
        .catch((error) => {
            setLoading(false)
            toast.error(error.data)
            console.log(error)
        })
  }

    // protection
    const token = localStorage.getItem('token')
    if (token) return <Navigate to="/"/>

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input ref={usern} placeholder="Username or Email" />
          <Input ref={passw} placeholder="Password" type="password"/>
          <Button onClick={onButtonLogin}>LOGIN</Button>
          <Link href="http://localhost:3000/user/forget-pass">RESET PASSWORD?</Link>
          <Link href="http://localhost:3000/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

