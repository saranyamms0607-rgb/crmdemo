import React from "react";
import { useNavigate } from "react-router-dom";
import ImportLeads from "./ImportLeads";
import ExportLeads from "./ExportLeads";
import "../styles/Settings.css";
import { FiUser } from "react-icons/fi";



export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-wrapper">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
         {/* import csv */}
      <div className="settings-container">
        <div className="settings-card">
          <h3>Import Leads</h3>
          <p>Upload leads using CSV file</p>
          <ImportLeads />
        </div>

         {/* export CSV */}
        <div className="settings-card">
          <h3>Export Leads</h3>
          <p>Download all leads as CSV</p>
          <ExportLeads />
        </div>

       {/* User List */}
        <div className="settings-card" id="settings-card" onClick={()=>navigate("/adduser")} >
          <h3>Add Users</h3>
         <FiUser size={100} />
        </div>
        
      </div>
    </div>
  );
};


