import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import {
  NotificationsNone,
  Language,
  Settings,
  Verified,
  Add,
  GppMaybe,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

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
          <span>
            {adminData.status === "verified" ? (
              <Tooltip title="Account Verified" placement="bottom-end">
                <IconButton color="primary">
                  <Verified fontSize="medium" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Account Unverified" placement="bottom-end">
                <IconButton color="warning">
                  <GppMaybe fontSize="medium" />
                </IconButton>
              </Tooltip>
            )}
          </span>
          <Link to="/admin/register" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Add />}
              sx={{ textTransform: "capitalize" }}
            >
              Create New Account
            </Button>
          </Link>

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
