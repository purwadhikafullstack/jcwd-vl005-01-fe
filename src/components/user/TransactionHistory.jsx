
import styled from "styled-components";
import { mobile } from "../../responsive";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import {
  Box, Accordion, AccordionSummary, Typography, AccordionDetails, Input, TextField, Button, CircularProgress
} from "@mui/material";
import { toast } from "react-toastify";
import Axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';

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
  margin-bottom: 10px;
`;

export default function TransactionHistory () {
    const Navigate = useNavigate();
    const [invoice, setInvoiceData] = useState([]);
    const userId = useSelector((state) => state.user.user_id)
    
    useEffect(() => {
        Axios.get(process.env.REACT_APP_API + `/invoice/${userId}`)
        .then((res) => {
            setInvoiceData(() => res.data);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Wrapper>
          <Title>Transaction History</Title>
          <Box 
            height={350} 
            border={1} 
            display="flex" 
            padding={2}>
            {invoice.length ? 
            <Box display="flex" flexDirection="column">
              {invoice.map((invoice, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="transaction-history"
                  sx={{ display:"flex", flexDirection:"row", justifyContent:"space-between" }}
                >
                  <Typography>{invoice.date} / {invoice.tcode}</Typography>
                  <Typography textTransform="capitalize" marginLeft={22}>Status : {invoice.status}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {invoice.status === "Approved" ?  
                  <Button onClick={()=>window.open(`/invoice/${invoice.tcode}`,'_blank')}>See Full Invoice <AdfScannerIcon/></Button> : 
                  <Typography color="red">Transaction Still in Process by Admin <CircularProgress size={10} color="error"/></Typography> }
                   {/* <Button onClick={click}>See Full Invoice <AdfScannerIcon/></Button> : null } */}
                </AccordionDetails>
              </Accordion>
              ))}
            </Box>
            :
            <Box color="red">No Transaction Has Been Made</Box>}
          </Box>
        </Wrapper>
    )
}