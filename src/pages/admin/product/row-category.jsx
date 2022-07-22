import React from "react";
import { Button, IconButton, Stack, TextField } from "@mui/material";
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
            <TableCell >{item.categoryName}</TableCell>
            <TableCell align="center">
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button onClick={onDelete} variant="contained" color="error" size="small"><DeleteIcon/></Button>
                    <Button variant="contained" color="warning" onClick={onEdit} size="small"><EditIcon/></Button>
                </Stack>
            </TableCell>
        </TableRow>
    )
}

export function RowCategoryEdit({item, onCancel,handleInputChange, saveEdit}){
    return(
        <TableRow key={item.categoryId}>
            <TableCell>#</TableCell>
            <TableCell>
                <TextField size="small" fullWidth label="Category Name" id="categoryName" defaultValue={item.categoryName} onChange={handleInputChange}/>
            </TableCell>
            <TableCell>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <IconButton color="success" variant="contained" onClick={saveEdit}><DoneIcon/></IconButton>
                    <IconButton color="error" variant="contained" onClick={onCancel}><CloseIcon/></IconButton>
                </Stack>
            </TableCell>
        </TableRow>
    )
}