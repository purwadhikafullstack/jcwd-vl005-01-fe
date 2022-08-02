import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../../redux/adminApiCalls";
import { DataGrid } from "@mui/x-data-grid";
import {
  PermIdentity,
  Home,
  Email,
  Key,
  LocationCity,
  Signpost,
} from "@mui/icons-material";
import "./user.css";
import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Box, Stack, Typography } from "@mui/material";

export default function User() {
  const user = useSelector((state) => state.getuser.user);
  const userObj = Object.assign({}, user[0]);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    fetchUserById(params.userId, dispatch);
  }, [dispatch]);

  const columns = [
    {
      field: "tcode",
      headerName: "Trx Code",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Product",
      width: 200,
      headerAlign: "center",
      align: "center",
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <img className="userListImg" src={params.row.avatar} alt="" />
      //       {params.row.username}
      //     </div>
      //   );
      // },
    },
    {
      field: "qty",
      headerName: "Qty",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <div>
      <Topbar />
      <div className="userWrapper">
        <Sidebar />
        <div className="user">
          <Box height="40%">
            <Typography variant="h4" fontWeight="bold" marginBottom="30px">
              User Info
            </Typography>
            <Stack direction="row">
              <Box flex={1} sx={{ boxShadow: 2, padding: "10px" }}>
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{userObj.username}</span>
                </div>
                <div className="userShowInfo">
                  <Email className="userShowIcon" />
                  <span className="userShowInfoTitle">{userObj.email}</span>
                </div>
                <div className="userShowInfo">
                  <Key className="userShowIcon" />
                  <span className="userShowInfoTitle"></span>
                  {userObj.id}
                </div>
              </Box>
              <Box flex={3} sx={{ boxShadow: 2, padding: "10px" }}>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <Home className="userShowIcon" />
                  <span className="userShowInfoTitle">{userObj.address}</span>
                </div>
                <div className="userShowInfo">
                  <LocationCity className="userShowIcon" />
                  <span className="userShowInfoTitle">{userObj.province}</span>
                </div>
                <div className="userShowInfo">
                  <Signpost className="userShowIcon" />
                  <span className="userShowInfoTitle">{userObj.postal}</span>
                </div>
              </Box>
            </Stack>
            <Typography variant="h4" fontWeight="bold" my="30px">
              User Transaction
            </Typography>
            <DataGrid
              rows={user}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row.tcode}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
