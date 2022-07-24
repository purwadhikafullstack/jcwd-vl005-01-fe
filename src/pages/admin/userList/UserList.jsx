import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Button } from "@mui/material";
import StyledModal from "../../../components/admin/StyledModal";
import { toast } from "react-toastify";
import { fetchUsers } from "../../../redux/adminApiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getuser.users);
  const [open, setOpen] = useState(false);
  const [id, SetId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const onBtnDeactivate = (user_id, user_status) => {
    setOpen(true);
    SetId(user_id);
    setStatus(user_status);
  };

  const onConfirmDeactivate = (id) => {
    const token = localStorage.getItem("adminToken");
    Axios.get(process.env.REACT_APP_API + "/admin/deactivate-user/" + id, {
      headers: { authorization: token },
    })
      .then((respond) => {
        setOpen(false);
        toast.success(respond.data);
        fetchUsers(dispatch);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const onConfirmActivate = (id) => {
    const token = localStorage.getItem("adminToken");
    Axios.get(process.env.REACT_APP_API + "/admin/activate-user/" + id, {
      headers: { authorization: token },
    })
      .then((respond) => {
        setOpen(false);
        toast.success(respond.data);
        fetchUsers(dispatch);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

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
            <Link
              to={"/admin/user/" + params.row.id}
              style={{ textDecoration: "none", fontSize: "10px" }}
            >
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
            </Link>
            <Button
              variant="outlined"
              color={"error"}
              sx={{
                width: 200,
                height: 40,
                textTransform: "capitalize",
              }}
              onClick={() => onBtnDeactivate(params.row.id, params.row.status)}
            >
              {params.row.status === "active" ? "Deactivate" : "Activate"}
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
      <div className="userlistWrapper">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={userData}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
          <StyledModal
            open={open}
            onClose={(e) => setOpen(false)}
            onCancel={(e) => setOpen(false)}
            onConfirm={
              status === "active"
                ? () => onConfirmDeactivate(id)
                : () => onConfirmActivate(id)
            }
            text="Perform this action ?"
          />
        </div>
      </div>
    </div>
  );
}
