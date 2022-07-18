import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useState, useRef, useEffect } from "react";
import Announcement from "../../components/user/Announcement";
import Navbar from "../../components/user/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1633414654227-2b5ea828b3ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
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
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 20px;
`;

export default function ProfileUser () {
    const [isActive, setisActive] = useState(false)


  return (
    <div>
    <Announcement />
    <Navbar />
    <Container>
      {isActive ? 
      <Wrapper>
        <Title>Edit Address</Title>
        <Form>
          <Input placeholder="label" />
          <Input placeholder="address" />
          <Input placeholder="city" />
          <Input placeholder="province" />
          <Input placeholder="postal" />
          <Button >Add Address</Button>
        </Form>
      </Wrapper>
      :
      <Wrapper>
        <Title>Account Not Verified</Title>
        <p>please check your email to proceed verification process or input your email below to get new link</p>
        <Form>
          <Input placeholder="email"/>
          <Button >Send New Link</Button>  
        </Form>
      </Wrapper>
    }
    </Container>
    </div>    
  );
};
