import React from "react";
import { Button, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import {  TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const ActionBtn = styled.button`
  width: 100;
  height: 40px;
  border: 1px solid #008080;
  background-color: white;
  margin-right: 10px;
`

export default function RowCategory({item, index, onDelete, onEdit}) {
    return (
        <TableRow key={item.categoryId}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{item.categoryName}</TableCell>
            <TableCell>
                <ActionBtn onClick={onDelete}><DeleteIcon sx={{color: '#008080'}}/></ActionBtn>
                <ActionBtn><EditIcon sx={{color: '#008080'}} onClick={onEdit}/></ActionBtn>
            </TableCell>
        </TableRow>
    )
}

export function RowCategoryEdit({item, onCancel,handleInputChange, saveEdit}){
    return(
        <TableRow key={item.categoryId}>
            <TableCell>#</TableCell>
            <TableCell>
                <TextField fullWidth label="Category Name" id="categoryName" defaultValue={item.categoryName} onChange={handleInputChange}/>
            </TableCell>
            <TableCell>
                <IconButton color="success" variant="contained" onClick={saveEdit}><DoneIcon/></IconButton>
                <IconButton color="error" variant="contained" onClick={onCancel}><CloseIcon/></IconButton>
            </TableCell>
        </TableRow>
    )
}