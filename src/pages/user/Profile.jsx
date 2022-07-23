import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import {
  Box, Accordion, AccordionSummary, Typography, AccordionDetails, Input, TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Announcement from "../../components/user/Announcement";
import Navbar from "../../components/user/Navbar";
import ResendVerif from "../../components/user/ResendVerif";
import EditAddress from "../../components/user/EditAddress";

const Container = styled.div`
  width: 100vw;
  height: 86vh;
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

// const Input = styled.input`
//   flex: 1;
//   width: 80%;
//   margin: 20px 10px 0px 0px;
//   padding: 10px;
// `;

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
    const isActive = useSelector((state) => state.user.status)

    // protection
    const token = localStorage.getItem('token')
    if (!token) return <Navigate to="/"/>

  return (
    <div>
    <Announcement />
    <Navbar />
    <Container>
      {isActive === "active" ?
      <Box width={1200} display="flex" >
        <EditAddress/>
        <Wrapper>
          <Title>Transaction History</Title>
          <Box 
            height={350} 
            border={1} 
            display="flex" 
            padding={2}>
            <Box display="flex" flexDirection="column">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="transaction-history"
                >
                  <Typography>11-05-2020 / B5743</Typography>
                  <Typography marginLeft={25}>Status : Pending</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> 1. shoes</Typography>
                  <Typography> 2. jacket</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
            {/* <Box color="red">No Transaction Has Been Made</Box> */}
          </Box>
        </Wrapper>
      </Box> 
      :
      <ResendVerif/>
    }
    </Container>
    </div>    
  );
};
