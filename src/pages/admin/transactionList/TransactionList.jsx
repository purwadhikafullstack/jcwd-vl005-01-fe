import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Topbar from "../../../components/admin/topbar/Topbar";
import "./transactionList.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { fetchTransactions } from "../../../redux/adminApiCalls";
import { Button } from "@mui/material";
import StyledModal from "../../../components/admin/StyledModal";
import Axios from "axios";
import { toast } from "react-toastify";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(
    (state) => state.transactions.transactionsList
  );
  const [tcode, setTcode] = useState(null);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);

  useEffect(() => {
    fetchTransactions(dispatch);
  }, [dispatch]);

  const onBtnTrigger = (tcode, text) => {
    setOpen(true);
    setTcode(tcode);
    setAction(text);
  };

  const onConfirmApprove = (tcode) => {
    const token = localStorage.getItem("adminToken");
    Axios.get(
      process.env.REACT_APP_API + "/admin/approve-transaction/" + tcode,
      {
        headers: { authorization: token },
      }
    )
      .then((respond) => {
        setOpen(false);
        toast.success(respond.data);
        fetchTransactions(dispatch);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const onConfirmReject = (tcode) => {
    const token = localStorage.getItem("adminToken");
    Axios.get(
      process.env.REACT_APP_API + "/admin/reject-transaction/" + tcode,
      {
        headers: { authorization: token },
      }
    )
      .then((respond) => {
        setOpen(false);
        toast.success(respond.data);
        fetchTransactions(dispatch);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const columns = [
    {
      field: "tcode",
      headerName: "Id",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Transaction Date",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "id",
      headerName: "User ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product_id",
      headerName: "Product ID",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "grand_total",
      headerName: "Total",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="outlined"
              value="approve"
              sx={{
                textTransform: "capitalize",
                marginRight: "10px",
              }}
              onClick={(e) =>
                onBtnTrigger(params.row.tcode, e.currentTarget.value)
              }
              disabled={params.row.status === "Approved" ? true : false}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              value="reject"
              color={"error"}
              sx={{
                textTransform: "capitalize",
              }}
              onClick={(e) =>
                onBtnTrigger(params.row.tcode, e.currentTarget.value)
              }
              disabled={params.row.status === "Rejected" ? true : false}
            >
              Reject
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar />
      <div className="transactionlistWrapper">
        <Sidebar />
        <div className="transactionList">
          <DataGrid
            rows={transactionsList}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.tcode}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
          <StyledModal
            open={open}
            onClose={(e) => setOpen(false)}
            onCancel={(e) => setOpen(false)}
            text="Perform this action ?"
            onConfirm={
              action === "approve"
                ? () => onConfirmApprove(tcode)
                : () => onConfirmReject(tcode)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
