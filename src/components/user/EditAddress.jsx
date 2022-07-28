import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";
import {
  Box, Typography, Input, TextField
} from "@mui/material";
import Confirmation from './Confirmation'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
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
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default function EditAddress () {
    const [userData, setUserData] = useState([]);
    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const refLabel = useRef('')
    const refAddress = useRef('')
    const refCity = useRef('')
    const refProvince = useRef('')
    const refPostal = useRef('')


    const userId = useSelector((state) => state.user.user_id)
    
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

    const onButtonSaveAddress = (e) => {
        e.preventDefault()
        setConfirm(true)
        setLoading(true)
    }

    const onButtonCancelEdit = () => {
        setConfirm(false)
        setLoading(false)
    }

    const onButtonConfirmSaveAddress = () => {
        setConfirm(false)
        const newaddress = {
          address : refAddress.current.value,
          city : refCity.current.value,
          province : refProvince.current.value,
          postal : refPostal.current.value,
          label : refLabel.current.value 
        }

        Axios.patch(process.env.REACT_APP_API+`/user/${userId}`, newaddress)
        .then((res) => {
          console.log("respond :", res.data)
            setLoading(false)
            toast.success('New Address has been saved')
            })
        .catch((error) => {
            setLoading(false)
            toast.error(error.response.data)
            console.log(error)
        })
    }

    return (
        <Wrapper>
          <Confirmation 
            isConfirm={confirm} 
            title="Change Address Confirmation" 
            onCancel={onButtonCancelEdit} 
            onConfirm={onButtonConfirmSaveAddress}
          />
          <Title>Edit Address</Title>
          {userData.map(user => (
          <Form key={user.id}>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Label"
                inputRef={refLabel}
                defaultValue={user.label} />
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Address"
                inputRef={refAddress} 
                defaultValue={user.address}/>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert City" 
                inputRef={refCity}
                defaultValue={user.city}/>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Province" 
                inputRef={refProvince}
                defaultValue={user.province}/>
            <TextField hiddenLabel 
                variant="filled" 
                placeholder="Insert Postal Code"
                inputRef={refPostal}
                defaultValue={user.postal} />
            <Button onClick={onButtonSaveAddress}>Save Address</Button>
          </Form>))}
        </Wrapper>
    )
}