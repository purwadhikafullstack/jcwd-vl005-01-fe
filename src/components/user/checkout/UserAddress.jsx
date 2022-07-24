import { Box, FormControl, Input, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Axios from "axios";
import {  connect, useSelector } from "react-redux"

const styledTitle = styled.h3`
    font-size: 24px;
    font-weight: 200;
`

const Hr = styled.hr`
  border: none;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const titleForm = styled.h5`
    font-size: 15px;
    font-weight: 200;
`

const CustomButton = styled.button`
  width: 20%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const OutlineButton = styled.button`
    width: 20%;
    padding: 10px;
    color: white;
    font-weight: 600;
    border: filled;
`

class UserAddress extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            deleteId: '',
            alertDelete: false,
            dbSum: [],
            user: this.props.user,
            delivery: null,
            dbAddress: [],
            deliveryAddress: []
        }
    }

    componentDidMount () {

    }

    getAddress = () => {
        Axios.get(process.env.REACT_APP_API+`/user/address/${this.state.user}`)
        .then((response) => {
            this.setState({dbAddress: response.data})
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })
    }

    addAddress = () => {
        Axios.post(process.env.REACT_APP_API+`user/address`)
        .then((response) => {
            alert("Succesfully Add Address");
            // this.setState({deliveryAddress: address})
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })
    }

    printAddress = () => {
        return(
            <Box display='flex' flexDirection='column'>
                <styledTitle>Delivery Address</styledTitle>
                <Hr/>
                <FormControl>
                    <Select>
                        {this.state.dbAddress.map((item,index) => {
                            return(
                                <MenuItem>
                                    <Box display='flex' flexDirection='column'>
                                        {item.label}
                                        {item.address}
                                    </Box>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Stack>
                    <CustomButton>SAVE ADDRESS</CustomButton>
                    <CustomButton onClick={() => this.AddressForm()}>ADD NEW ADDRESS</CustomButton>
                </Stack>
            </Box>
        )
    }

    AddressForm = () => {
        return(
            <Box>
                <titleForm>Address Information</titleForm>
                <Box marginBottom='30px'>
                    <Hr/>
                    <FormControl>
                        <TextField label="Label" fullWidth required helperText="Please input the label of the address"/>
                    </FormControl>
                    <Hr/>
                    <FormControl>
                        <TextField label="Address" fullWidth required />
                    </FormControl>
                    <Hr/>
                    <FormControl>
                        <TextField label="Post Code" fullWidth required helperText="E.g 23873"/>
                    </FormControl>
                    <Hr/>
                    <Stack spacing={5} direction='row'>
                        <FormControl>
                            <TextField label="City" fullWidth required/>
                        </FormControl>
                        <FormControl>
                            <TextField label="Province" fullWidth required/>
                        </FormControl>
                    </Stack>
                    <Hr/>
                    <Stack spacing={5} direction='row'>
                        <FormControl>
                            <TextField label="Latitude" fullWidth required helperText="E.g -6.26979813"/>
                        </FormControl>
                        <FormControl>
                            <TextField label="Longitude" fullWidth required helperText="E.g 6.26979813"/>
                        </FormControl>
                    </Stack>
                </Box>
                <CustomButton>SAVE ADDRESS</CustomButton>
            </Box>
        )
    }

    render() {
        return(
            <Box padding='10px' marginTop='10px'>
                {
                    this.state.dbAddress.length == 0 ?
                    this.AddressForm()
                    : 
                    this.printAddress()
                }
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user_id,
  })

export default connect(mapStateToProps, null)(UserAddress);