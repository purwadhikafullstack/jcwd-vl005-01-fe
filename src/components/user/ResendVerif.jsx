import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useRef, useState } from 'react'
import { useSelector } from "react-redux";
import Axios from 'axios'
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";

const Wrapper = styled.div`
  width: 45%;
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
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-top: 20px;
// `;

export default function ResendVerif () {
    const emailinput = useSelector((state) => state.user.email)
    const [loading, setLoading] = useState(false)

    const onBtnSendNVL = (e) => {
        e.preventDefault()

        const checkEmail = {
            email : emailinput
        }
        // console.log(email); 
        setLoading(true)
        Axios.post(process.env.REACT_APP_API + '/auth/refresh', checkEmail)
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
      <Wrapper>
        <Title>Account Not Verified</Title>
        <p>Please check your email to proceed verification process or click button below to get new link</p>
        <Form>
          {/* <Input placeholder="email"/> */}
          <Button
           disabled={loading} onClick={onBtnSendNVL}
            variant="contained"
            color="info"
            size="large"
           >{loading ? <CircularProgress size={30} color="inherit"/>: "Send New Verification Link" }</Button>  
        </Form>
      </Wrapper>
    )
}