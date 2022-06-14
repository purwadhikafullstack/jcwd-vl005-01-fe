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
import { Link } from "react-router-dom";
import { styled } from "@mui/material";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#555",
});

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="upperSidebar">
          <ul className="sidebarList">
            <StyledLink to="/admin/home" className="link">
              <li className="sidebarListItem">
                <Dashboard className="sidebarIcon" />
                Dashboard
              </li>
            </StyledLink>
            <StyledLink to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </StyledLink>
            <StyledLink to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </StyledLink>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
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
          <li className="sidebarListItem">
            <ExitToApp className="sidebarIcon" />
            Logout
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
