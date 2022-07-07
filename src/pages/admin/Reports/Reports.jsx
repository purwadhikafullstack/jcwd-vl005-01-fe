import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import {
  TextField,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Topbar from "../../../components/admin/topbar/Topbar";
import "./reports.css";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");

  const startDateHandleChange = (newValue) => {
    setStartDate(newValue);
  };
  const endDateHandleChange = (newValue) => {
    setEndDate(newValue);
  };

  const categoryHandleChange = (e) => {
    setCategory(e.target.value);
  };

  const onBtnGenerate = (startDate, endDate, category) => {
    if (!startDate || !endDate) return;
    console.log("START DATE :", startDate.toLocaleDateString());
    console.log("END DATE :", endDate.toLocaleDateString());
    console.log("Category :", category);
  };
  return (
    <div>
      <Topbar />
      <div className="reportsWrapper">
        <Sidebar />
        <div className="reports">
          <Typography mb="20px">Select Period : </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1} sx={{ width: "500px" }} direction="row">
              <DesktopDatePicker
                label="Select Start Date"
                inputFormat="MM/dd/yyyy"
                value={startDate}
                onChange={startDateHandleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Select end Date"
                inputFormat="MM/dd/yyyy"
                value={endDate}
                onChange={endDateHandleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <Typography my="20px">Select Category : </Typography>
          <Box sx={{ width: "200px" }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={categoryHandleChange}
              >
                <MenuItem value="revenue">Revenue</MenuItem>
                <MenuItem value="profit">Profit</MenuItem>
                <MenuItem value="top 3 most sold">Top 3 Most Sold</MenuItem>
                <MenuItem value="costs">Costs</MenuItem>
                <MenuItem value="number of sales">Number of Sales</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="outlined"
            onClick={() => onBtnGenerate(startDate, endDate, category)}
            sx={{ marginTop: "20px" }}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
