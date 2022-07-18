import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  styled,
  ButtonGroup,
  Stack,
} from "@mui/material";

// Custom Component
const CustomModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledModal = ({ open, onClose, onCancel, onConfirm, text }) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Box height="200px" width="300px" bgcolor="white" borderRadius={5} p={3}>
        <Stack alignItems="center" spacing="50px">
          <Typography id="modal-modal-title" variant="h4" fontWeight="bold">
            Hold On
          </Typography>
          <Typography id="modal-modal-title" variant="p">
            Are you sure want to {text}
          </Typography>
          <ButtonGroup>
            <Button onClick={onConfirm}>Confirm</Button>
            <Button onClick={onCancel} color="error">
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </CustomModal>
  );
};

export default StyledModal;
