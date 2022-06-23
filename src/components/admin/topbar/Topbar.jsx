import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import {
  NotificationsNone,
  Language,
  Settings,
  Verified,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

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
          <span style={{ marginLeft: "30px" }}>
            {adminData.status === "verified" ? (
              <Tooltip title="Account Verified" placement="bottom-end">
                <IconButton color="primary">
                  <Verified fontSize="medium" />
                </IconButton>
              </Tooltip>
            ) : (
              adminData.status
            )}
          </span>
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
