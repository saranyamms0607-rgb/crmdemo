import React from "react";
import { useNavigate } from "react-router-dom";
import ImportLeads from "./ImportLeads";
import ExportLeads from "./ExportLeads";
import "../styles/Settings.css";

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-wrapper">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="settings-container">
        <div className="settings-card">
          <h3>Import Leads</h3>
          <p>Upload leads using CSV file</p>
          <ImportLeads />
        </div>

        <div className="settings-card">
          <h3>Export Leads</h3>
          <p>Download all leads as CSV</p>
          <ExportLeads />
        </div>
      </div>
    </div>
  );
};


