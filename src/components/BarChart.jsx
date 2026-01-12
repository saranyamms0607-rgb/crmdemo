import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const getColors = () => {
  const css = getComputedStyle(document.documentElement);
  return {
    dark: css.getPropertyValue("--primary-dark").trim(),
    mid: css.getPropertyValue("--primary-mid").trim(),
    light: css.getPropertyValue("--primary-light").trim(),
    textDark: css.getPropertyValue("--text-dark").trim(),
    border: css.getPropertyValue("--border-soft").trim(),
  };
};

const chartDataMap = {
  daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [5, 9, 6, 12, 8, 4, 10],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [45, 52, 39, 60],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [120, 98, 135, 160, 145, 170, 20, 80, 120, 160, 200, 60],
  },
};

export default function BarChart() {
  const [view, setView] = useState("daily");
  const COLORS = getColors();

  const chartData = {
    labels: chartDataMap[view].labels,
    datasets: [
      {
        label: "Leads",
        data: chartDataMap[view].data,
        backgroundColor: COLORS.mid,
        borderColor: COLORS.dark,
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: COLORS.light,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: COLORS.textDark },
      },
    },
    scales: {
      x: {
        ticks: { color: COLORS.textDark },
        grid: { color: COLORS.border },
      },
      y: {
        ticks: { color: COLORS.textDark },
        grid: { color: COLORS.border },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Dropdown */}
      <select
        value={view}
        onChange={(e) => setView(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "8px 12px",
          borderRadius: "8px",
          background: "var(--input-bg)",
          color: "var(--text-dark)",
          border: "1px solid var(--border-soft)",
        }}
      >
        <option value="daily">Daily Leads</option>
        <option value="weekly">Weekly Leads</option>
        <option value="monthly">Monthly Leads</option>
      </select>

      <Bar data={chartData} options={options} />
    </div>
  );
}
