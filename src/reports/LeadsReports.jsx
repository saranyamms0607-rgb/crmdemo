import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/reports/leads/";

export default function LeadsReports() {
  const navigate = useNavigate();
  const [type, setType] = useState("daily");
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromWeek, setFromWeek] = useState("");
  const [toWeek, setToWeek] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [data, setData] = useState([]);

  const fetchReport = async () => {
    let params = { type };

    if (type === "daily") params.date = date;
    if (type === "custom-date") {
      params.from_date = fromDate;
      params.to_date = toDate;
    }
    if (type === "custom-week") {
      params.from_week = fromWeek;
      params.to_week = toWeek;
    }
    if (type === "custom-month") {
      params.from_month = fromMonth;
      params.to_month = toMonth;
    }

    const res = await axios.get(API, { params },
       {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
    );
    setData(res.data.data);
  };

  return (
    <div style={{ background: "var(--cream-bg)", padding: 20 }}>
       <div className="btn">
            <button className="back-btn" onClick={() => {navigate(-1);}}>
                  ← Back
                </button>
            </div>

      <h2>MMS-GGS · Lead Performance</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="custom-date">Date</option>
          <option value="custom-week">Week</option>
          <option value="custom-month">Month</option>
        </select>

        {type === "daily" && <input type="date" onChange={e => setDate(e.target.value)} />}

        {type === "custom-date" && (
          <>
            <input type="date" onChange={e => setFromDate(e.target.value)} />
            <input type="date" onChange={e => setToDate(e.target.value)} />
          </>
        )}

        {type === "custom-week" && (
          <>
            <input type="week" onChange={e => setFromWeek(e.target.value)} />
            <input type="week" onChange={e => setToWeek(e.target.value)} />
          </>
        )}

        {type === "custom-month" && (
          <>
            <input type="month" onChange={e => setFromMonth(e.target.value)} />
            <input type="month" onChange={e => setToMonth(e.target.value)} />
          </>
        )}

        <button onClick={fetchReport}>Apply</button>
      </div>

      <table border="1" cellPadding="6" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Email</th>
            <th>Branch</th>
            <th>TL</th>
            <th>Total Calls</th>
            <th>Connects</th>
            <th>Non Connects</th>
            <th>Connectivity %</th>
            <th>Productivity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.agent_name}</td>
              <td>{r.email}</td>
              <td>{r.location}</td>
              <td>{r.team_leader || "-"}</td>
              <td>{r.total_calls}</td>
              <td>{r.connects}</td>
              <td>{r.non_connects}</td>
              <td>{r.connectivity_percent}%</td>
              <td>{r.productivity_per_head}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
