import React, { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
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
import { toast } from "react-toastify";

const Reports = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState("");
  const [data, setData] = useState(null);

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
    const token = localStorage.getItem("adminToken");
    if (!startDate) {
      return toast.error("Please Specify Start Date");
    } else if (!endDate) {
      return toast.error("Please Specify end date");
    } else if (!category) {
      return toast.error("Please specify category");
    }
    const formattedStartdate =
      startDate.getFullYear() +
      "-" +
      (Number(startDate.getMonth()) + 1).toString() +
      "-" +
      startDate.getDate();

    const formattedEndDate =
      endDate.getFullYear() +
      "-" +
      (Number(endDate.getMonth()) + 1).toString() +
      "-" +
      endDate.getDate();

    Axios.get(
      process.env.REACT_APP_API +
        `/admin/report?_category=${category}&_start=${formattedStartdate}&_end=${formattedEndDate}`,
      {
        headers: { authorization: token },
      }
    )
      .then((respond) => {
        console.log(respond.data);
        // setStartDate(null);
        // setEndDate(null);
        // setCategory("");
        setData(respond.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const column = [
    {
      field: "tcode",
      headerName: "Transactions ID",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Date",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user_id",
      headerName: "User ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "grand_total",
      headerName: "Total",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "postal",
      headerName: "Post Code",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "province",
      headerName: "Province",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columnTop3 = [
    {
      field: "total_sold",
      headerName: "Total Sold",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product_id",
      headerName: "Product ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

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
                <MenuItem value="top3">Top 3 Most Sold</MenuItem>
                <MenuItem value="costs">Costs</MenuItem>
                <MenuItem value="numofsales">Number of Sales</MenuItem>
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
          {data ? (
            <Stack height="500px" spacing={1.5} marginTop={2}>
              <Typography
                variant="p"
                fontSize="24px"
                marginBottom="15px"
                textAlign="center"
              >
                Your <strong>{data.category}</strong> within the specified date
                is <strong>{data.amount}</strong>
              </Typography>
              <DataGrid
                rows={data.transactions}
                disableSelectionOnClick
                columns={
                  data.category === "Top 3 Most Sold" ? columnTop3 : column
                }
                getRowId={
                  category === "top3"
                    ? (row) => row.product_id
                    : (row) => row.tcode
                }
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
              />
            </Stack>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Reports;
