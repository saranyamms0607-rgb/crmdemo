import React from 'react'
import { useNavigate } from "react-router-dom";

export const Reports = () => {
     const navigate = useNavigate();
  return (
    <div>
        <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>Reports</div>
  )
}
