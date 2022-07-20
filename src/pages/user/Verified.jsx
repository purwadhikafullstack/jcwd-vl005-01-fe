import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
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

export default function VerifPage () {
    const Navigate = useNavigate();
    const params = useParams();
    const [validToken, setValidToken] = useState(false);
    
    useEffect(() => {
      Axios.get(
        process.env.REACT_APP_API + `/auth/verify/${params.token}`
      )
        .then((respond) => {
          setValidToken(true);
        })
        .catch((error) => {
          setValidToken(false);
        });
    });

    const proceed = () => {
        Navigate('/')
    }

  return (
    <Container>
      {validToken ? 
      <Wrapper>
        <Title>VERIFICATION DONE</Title>
        <p>Thank you for verifying your email account and now your good to go</p>
        <Button onClick={proceed}>Proceed to Homepage</Button>
      </Wrapper>
      :<Wrapper>
        <Title>INVALID / EXPIRED LINK</Title>
        <p>It looks like your link was invalid or expired, you still can log in to your account and verify later</p>
        <Button onClick={proceed}>Proceed to Homepage</Button>
      </Wrapper>
      }
    </Container>
  );
};

