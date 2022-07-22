import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import {
  Box, Typography, Input, TextField
} from "@mui/material";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  width: 60%;
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
  flex-direction: column;
  flex-wrap: wrap;
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

export default function EditAddress () {
    const [userData, setUserData] = useState([]);
    const userId = useSelector((state) => state.user.status)
    
    useEffect(() => {
        Axios.get(process.env.REACT_APP_API + `/user/${userId}`)
        .then((res) => {
            setUserData(() => res.data);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Wrapper>
          <Title>Edit Address {userId}</Title>
          {userData.map(user => (
          <Form key={user.id}>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Label"
                // ref={refLabel}
                value={user.label} />
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Address"
                // ref={refAddress} 
                value={user.address}/>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert City" 
                // ref={refCity}
                value={user.city}/>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Province" 
                // ref={refProvince}
                value={user.province}/>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Postal Code"
                // ref={refPostal}
                value={user.postal} />
            <Button >Save Address</Button>
          </Form>))}
        </Wrapper>
    )
}