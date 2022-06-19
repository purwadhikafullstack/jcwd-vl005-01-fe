import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

export default function Topbar() {
  const adminData = useSelector((state) => state.admin);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamanAdmin</span>
        </div>
        <div className="topRight">
          <h5>Welcome, {adminData.username}</h5>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}
