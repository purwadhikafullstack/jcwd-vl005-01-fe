import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import styled from "styled-components";

const AlertCancelBtn = styled.button`
  width: 100;
  padding: 10px;
  height:40px;
  background-color: #edf2f7;
  color: #2d374d;
  border:none;
  border-radius: 10px;
`

const AlertConfrimBtn = styled.button`
  width: 100;
  padding: 10px;
  height:40px;
  background-color: #e53e3e;
  color: white;
  border:none;
  border-radius: 10px;
`

function Confirmation (props) {
    return (
        <Dialog
            open={props.isOpen}
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure? You can't undo this action afterwards.
            </DialogContentText>
            <DialogActions>
                <AlertCancelBtn onClick={props.onCancel}>Cancel</AlertCancelBtn>
                <AlertConfrimBtn onClick={props.onConfirm}>Confirm</AlertConfrimBtn>
            </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default Confirmation;