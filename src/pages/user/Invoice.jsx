import React, { useState, useRef, useEffect } from "react";
import {
  Box, Accordion, AccordionSummary, Typography, AccordionDetails, Input, TextField, Button
} from "@mui/material";
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import Axios from "axios";
import FileDownloadIcon from '@mui/icons-material/FileDownload';


export default function Invoice () {
    const params = useParams();
    const userData = useSelector((state) => state.user)
    const [invoiceData, setInvoiceData] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState([]);

    useEffect(() => {
        Axios.get(process.env.REACT_APP_API + `/printinvoice/${params.invoiceN}`)
        .then((res) => {
            setInvoiceData(() => res.data);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        Axios.get(process.env.REACT_APP_API + `/invoicedetail/${params.invoiceN}`)
        .then((res) => {
            setInvoiceDetail(() => res.data);
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const saveInvoice = () => {
        
        Axios.get(process.env.REACT_APP_API+`/downloadinvoice/${params.invoiceN}`)
        .then((res) => {
            console.log("respond :", res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // protection
    const token = localStorage.getItem('token')
    if (!token) return <Navigate to="/"/>

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
            {invoiceData.map((invoice) => (
            <Box
                border={1}
                width={900}
                height="99vh"
                display="flex"
                flexDirection="column"
                >
                <Box  flex={4} display="flex" padding={2}>
                    <Box flex={1} backgroundColor="#808E49">
                        <Typography marginTop={20} marginLeft={2} fontWeight="bold" fontSize="50px">INSTORE</Typography>
                        <Typography marginLeft={2} fontSize="22px">Sent From : {invoice.warehouse_city}, {invoice.warehouse_province}</Typography>
                    </Box>
                    <Box border={1} padding={3} flex={1}>
                        <Button onClick={saveInvoice}><FileDownloadIcon/> Download Invoice</Button>
                        <Typography fontSize="30px" marginTop={5} align="right">Invoice : {invoice.tcode}</Typography>
                        <Typography fontSize="20px" align="right">Created : {invoice.date}</Typography>
                        <Typography marginTop={5} fontSize="20px" align="right">Username : {userData.username}</Typography>
                        <Typography fontSize="20px" align="right">Email : {userData.email}</Typography>
                        <Typography fontSize="20px" align="right">Shipping Address : {invoice.address}, {invoice.city}, {invoice.province}, {invoice.postal}</Typography>
                    </Box>
                </Box>
                
                <Box flex={3} display="flex" padding={3}>
                    <Box borderBottom={1}  flex={3}>
                        <Typography fontWeight="bold" fontSize="20px" >Item</Typography>
                        {invoiceDetail.map((invodet) => (
                        <Typography borderTop={1} fontSize="20px" >{invodet.name}</Typography>))}
                    </Box>
                    <Box borderBottom={1} flex={1}>
                        <Typography fontWeight="bold" fontSize="20px" align="right">Qty</Typography>
                        {invoiceDetail.map((invodet) => (
                        <Typography borderTop={1} fontSize="20px" align="right">{invodet.qty}</Typography>))}
                    </Box>
                    <Box borderBottom={1} flex={1}>
                        <Typography fontWeight="bold" fontSize="20px" align="right">Unit Price</Typography>
                        {invoiceDetail.map((invodet) => (
                        <Typography borderTop={1} fontSize="20px" align="right">Rp {parseInt(invodet.price).toLocaleString('de')}</Typography>))}
                    </Box>
                </Box>
                <Box flex={3} display="flex" padding={3}>
                    <Box flex={3}>
                        <Typography borderBottom={1} fontWeight="bold" fontSize="20px" align="left">Grand Total</Typography>
                    </Box>
                    <Box flex={3} >
                        <Typography borderBottom={1} fontWeight="bold" fontSize="20px" align="right">Rp {parseInt(invoice.grand_total).toLocaleString('de')}</Typography>
                    </Box>
                </Box>
            </Box>))}
        </Box>
    )
}