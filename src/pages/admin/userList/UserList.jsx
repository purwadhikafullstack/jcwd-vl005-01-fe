import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { getUsers } from "../../../redux/adminManageUser";
import { Button } from "@mui/material";
import StyledModal from "../../../components/admin/StyledModal";
import { toast } from "react-toastify";

export default function UserList() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getuser.users);
  const [open, setOpen] = useState(false);
  const [id, SetId] = useState(null);

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

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const onBtnDeactivate = (user_id) => {
    setOpen(true);
    SetId(user_id);
  };

  const onConfirmDeactivate = (id) => {
    const token = localStorage.getItem("token");
    Axios.get(process.env.REACT_APP_API + "/admin/deactivate-user/" + id, {
      headers: { authorization: token },
    })
      .then((respond) => {
        toast.success(respond.data);
        setOpen(false);
        Axios.get(process.env.REACT_APP_API + "/admin/getusers", {
          headers: { authorization: token },
        })
          .then((respond) => {
            dispatch(getUsers(respond.data));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const columns = [
    {
      field: "user_id",
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
              to={"/admin/user/" + params.row.user_id}
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
              onClick={() => onBtnDeactivate(params.row.user_id)}
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
      <div className="userlistWrapper">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={userData}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.user_id}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
          />
          <StyledModal
            open={open}
            onClose={(e) => setOpen(false)}
            onCancel={(e) => setOpen(false)}
            onConfirm={() => onConfirmDeactivate(id)}
            text="deactivate this user ?"
          />
        </div>
      </div>
    </div>
  );
}
