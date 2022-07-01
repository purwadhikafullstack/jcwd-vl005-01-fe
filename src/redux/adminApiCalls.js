// Import Actions from slices
import { getUsers, getUserById } from "./adminManageUser";
import Axios from "axios";

const BASE_URL = process.env.REACT_APP_API;
const token = localStorage.getItem("adminToken");

export const fetchUsers = (dispatch) => {
  Axios.get(BASE_URL + "/admin/getusers", {
    headers: { authorization: token },
  })
    .then((respond) => {
      dispatch(getUsers(respond.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchUserById = (id, dispatch) => {
  Axios.get(BASE_URL + "/admin/getuser/" + id, {
    headers: { authorization: token },
  })
    .then((respond) => {
      dispatch(getUserById(respond.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
