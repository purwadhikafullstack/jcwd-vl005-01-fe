import { useDispatch, useSelector } from "react-redux";
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
import { Box, Button, Stack, Typography } from "@mui/material";
import { userRows } from "../../../dummyData";

export default function User() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(process.env.REACT_APP_API + "/admin/getusers", {
      headers: { authorization: token },
    })
      .then((respond) => {
        dispatch(getUsers(respond.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "User",
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
      field: "email",
      headerName: "Email",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
              sx={{
                width: "60px",
                height: "40px",
                textTransform: "capitalize",
                marginRight: "10px",
              }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color={"error"}
              sx={{
                width: 200,
                height: 40,
                textTransform: "capitalize",
              }}
            >
              Deactivate
            </Button>
            {/* <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.user_id)}
            /> */}
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Topbar />
      <div className="userWrapper">
        <Sidebar />
        <div className="user">
          <Box height="500px">
            <Typography variant="h4" fontWeight="bold" marginBottom="30px">
              User Info
            </Typography>
            <Stack direction="row">
              <Box flex={1} sx={{ boxShadow: 2, padding: "10px" }}>
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">Username</span>
                </div>
                <div className="userShowInfo">
                  <Email className="userShowIcon" />
                  <span className="userShowInfoTitle">Email</span>
                </div>
                <div className="userShowInfo">
                  <Key className="userShowIcon" />
                  <span className="userShowInfoTitle">Status</span>
                </div>
              </Box>
              <Box flex={3} sx={{ boxShadow: 2, padding: "10px" }}>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <Home className="userShowIcon" />
                  <span className="userShowInfoTitle">Address</span>
                </div>
                <div className="userShowInfo">
                  <LocationCity className="userShowIcon" />
                  <span className="userShowInfoTitle">Province</span>
                </div>
                <div className="userShowInfo">
                  <Signpost className="userShowIcon" />
                  <span className="userShowInfoTitle">Postal Code</span>
                </div>
              </Box>
            </Stack>
            <Typography variant="h4" fontWeight="bold" my="30px">
              User Transaction
            </Typography>
            <DataGrid
              rows={userRows}
              disableSelectionOnClick
              columns={columns}
              getRowId={(row) => row.id}
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
