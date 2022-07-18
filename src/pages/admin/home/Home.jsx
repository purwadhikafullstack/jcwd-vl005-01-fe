import Chart from "../../../components/admin/chart/Chart";
import FeaturedInfo from "../../../components/admin/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData";
import WidgetSm from "../../../components/admin/widgetSm/WidgetSm";
import WidgetLg from "../../../components/admin/widgetLg/WidgetLg";
import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { useSelector } from "react-redux";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { status } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === "unverified") {
      navigate("/admin/resendtoken");
    }
  });
  return (
    <div>
      <Topbar />
      <div className="homeWrapper">
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart
            data={userData}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </div>
  );
}
