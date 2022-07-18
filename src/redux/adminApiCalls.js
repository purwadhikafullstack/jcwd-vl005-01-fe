// Import Actions from slices
import { getUsers, getUserById } from "./adminManageUser";
import { getTransactions } from "./adminManageTransactions";
import Axios from "axios";

const BASE_URL = process.env.REACT_APP_API;

const getToken = () => {
  return localStorage.getItem("adminToken");
};

export const fetchUsers = (dispatch) => {
  Axios.get(BASE_URL + "/admin/getusers", {
    headers: { authorization: getToken() },
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
    headers: { authorization: getToken() },
  })
    .then((respond) => {
      dispatch(getUserById(respond.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchTransactions = (dispatch) => {
  Axios.get(BASE_URL + "/admin/transactions", {
    headers: { authorization: getToken() },
  })
    .then((respond) => {
      dispatch(getTransactions(respond.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
