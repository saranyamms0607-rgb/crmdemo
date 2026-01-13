import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import BarChart from "./BarChart";
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/crm/leads/count/"; // adjust if needed

export default function UserDashBoard({setToday}) {
  const user_role = localStorage.getItem("role");
  const token = localStorage.getItem("access");
  const navigate =useNavigate();

  const [stats, setStats] = useState({
    total_leads: 0,
    total_calls: 0,
    today_followups: 0,
  });

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard count error", error);
    }
  };

  return (
    <div className="user-dashboard">
      {/* Sidebar */}
      {user_role !== "AGENT" && (
        <aside className="user-sidebar">
          <Sidebar />
        </aside>
      )}

      {/* Main Content */}
      <main className="user-main">
        {/* Header Stats */}
        <div className="user-stats">
          <div className="user-stat-card">
            <h4>Total Leads</h4>
            <span>{stats.total_leads}</span>
          </div>

          <div className="user-stat-card">
            <h4>Total Calls</h4>
            <span>{stats.total_calls}</span>
          </div>

          <div className="user-stat-card" onClick={()=>{setToday(true)
                navigate("/assigned?status=followup") }}>
            <h4>Today FollowUps</h4>
            <span>{stats.today_followups}</span>
          </div>
        </div>

        {/* Chart */}
        <div className={user_role === "AGENT" ? "user-chart-wrap" : "user-chart-center"}>
          <div className="user-chart-card">
            <BarChart />
          </div>
        </div>
      </main>
    </div>
  );
}
