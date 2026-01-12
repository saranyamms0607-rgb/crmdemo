import "../styles/Dashboard.css";
import {
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { Sidebar } from "./Sidebar";
import BarChart from "./BarChart";

export default function Dashboard() {
   const user_role = localStorage.getItem("role");
  console.log(user_role)
  return (
    <div className="dashboard">
      {/* Sidebar */}
      {user_role !="AGENT"&&<aside className="sidebar">
        <Sidebar/>
      </aside>}

      {/* Main Content */}
      <main className="main">
        {/* Top Bar */}
           <div className="header-container">
            <span className="header"><h3>Total Leads</h3><p className="count">1000</p></span>
            <span className="header"><h3>Total Calls</h3><p className="count">25</p></span>
            <span className="header"><h3>Today FollowUp</h3><p>9</p></span></div>
         <div className={user_role === "AGENT" ? "chart-wrapper" : "chart-center"}>
          <div className="chart-card">
            <BarChart />
          </div></div>
      </main>
      
    </div>
  );
}
