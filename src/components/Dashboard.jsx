import "../styles/Dashboard.css";
import {
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { Sidebar } from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <Sidebar/>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Bar */}
        <header className="topbar">
          <div className="search">
            <FiSearch />
            <input placeholder="Search..." />
          </div>

          <div className="actions">
            <FiBell />
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
            />
          </div>
        </header>

        {/* Welcome */}
        <section className="welcome">
          <h1>Welcome Back, John!</h1>
          <p>Here’s an overview of your CRM activities</p>
        </section>

        {/* Stats */}
        <section className="stats">
          <div className="card">
            <h3>10,582</h3>
            <p>Total Leads</p>
            <span className="up">+2.3%</span>
          </div>

          <div className="card">
            <h3>5,215</h3>
            <p>Active Deals</p>
            <span className="up">+3.8%</span>
          </div>

          <div className="card">
            <h3>3,152</h3>
            <p>Tasks Due</p>
            <span className="up">+1.5%</span>
          </div>

          <div className="card">
            <h3>$1,258,940</h3>
            <p>Revenue This Month</p>
            <span className="up">+8.9%</span>
          </div>
        </section>

        {/* Content Grid */}
        <section className="grid">
          {/* Pipeline */}
          <div className="panel">
            <h2>Sales Pipeline</h2>

            <div className="pipeline">
              <div>New Leads <span>4,256</span></div>
              <div>Qualified <span>2,752</span></div>
              <div>Proposal <span>1,783</span></div>
              <div>Closed <span>582</span></div>
            </div>

            <div className="pipeline-footer">
              <p>Conversion Rate <b>13.7%</b></p>
              <p>Avg Deal Size <b>$12,850</b></p>
            </div>
          </div>

          {/* Tasks */}
          <div className="panel">
            <h2>Upcoming Tasks</h2>

            <ul className="tasks">
              <li>Follow up with Acme Corp <span>9:04 AM</span></li>
              <li>Send proposal to Beta Inc <span>3h ago</span></li>
              <li>Call Charlie Smith <span>1 day ago</span></li>
              <li>Review contract for Delta LLC <span>2 days ago</span></li>
            </ul>
          </div>

          {/* Leads Overview */}
          <div className="panel">
            <h2>Leads Overview</h2>

            <div className="leads-stats">
              <div>
                <h3>254</h3>
                <p>New Leads</p>
              </div>
              <div>
                <h3>1,856</h3>
                <p>Qualified</p>
              </div>
              <div>
                <h3>5M+</h3>
                <p>Converted</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
