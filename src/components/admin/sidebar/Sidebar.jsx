import "./sidebar.css";
import {
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  ExitToApp,
  Settings,
  Dashboard,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/adminSlice";
import { toast } from "react-toastify";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#555",
});

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onBtnLogout = () => {
    localStorage.removeItem("adminToken");
    dispatch(logout());
    navigate("/admin");
    toast.info("Logout Success!");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="upperSidebar">
          <ul className="sidebarList">
            <StyledLink to="/admin/home" className="link">
              <li
                className="sidebarListItem"
                style={
                  location.pathname === "/admin/home"
                    ? { backgroundColor: "#cecef3", borderRadius: "10px" }
                    : null
                }
              >
                <Dashboard className="sidebarIcon" />
                Dashboard
              </li>
            </StyledLink>
            <StyledLink to="/admin/products" className="link">
              <li
                className="sidebarListItem"
                style={
                  location.pathname === "/admin/products"
                    ? { backgroundColor: "#cecef3", borderRadius: "10px" }
                    : null
                }
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </StyledLink>
            <StyledLink to="/admin/users" className="link">
              <li
                className="sidebarListItem"
                style={
                  location.pathname === "/admin/users"
                    ? { backgroundColor: "#cecef3", borderRadius: "10px" }
                    : null
                }
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </StyledLink>
            <StyledLink to="/admin/transactions" className="link">
              <li
                className="sidebarListItem"
                style={
                  location.pathname === "/admin/transactions"
                    ? { backgroundColor: "#cecef3", borderRadius: "10px" }
                    : null
                }
              >
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </StyledLink>
            <StyledLink to="/admin/reports" className="link">
              <li
                className="sidebarListItem"
                style={
                  location.pathname === "/admin/reports"
                    ? { backgroundColor: "#cecef3", borderRadius: "10px" }
                    : null
                }
              >
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </StyledLink>
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="lowerSidebar">
          <li className="sidebarListItem">
            <Settings className="sidebarIcon" />
            Settings
          </li>
          <li className="sidebarListItem" onClick={onBtnLogout}>
            <ExitToApp className="sidebarIcon" />
            Logout
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
