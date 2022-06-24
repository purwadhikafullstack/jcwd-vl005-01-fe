import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { getUsers } from "../../../redux/adminManageUser";

export default function UserList() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getuser.users);
  // console.log("USERDATA :", userData);
  // const [data, setData] = useState(userRows);

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

  const columns = [
    { field: "user_id", headerName: "ID", width: 150 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <img className="userListImg" src={params.row.avatar} alt="" />
      //       {params.row.username}
      //     </div>
      //   );
      // },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/" + params.row.user_id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              // onClick={() => handleDelete(params.row.user_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      {/* <h1>Hello</h1> */}
      <Topbar />
      <div className="userlistWrapper">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={userData}
            // disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.user_id}
            // pageSize={10}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
