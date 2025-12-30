import React from 'react'
import { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiPhoneCall,
  FiRepeat,
  FiCheckCircle,
  FiClock,
  FiUserPlus,
  FiTrendingUp,
  FiTrendingDown,
  FiSlash,
  FiClipboard,
  FiLogOut,
  FiUserMinus,
  FiSettings,
  FiChevronDown,
  FiChevronUp
} from "react-icons/fi";
import Logo from '../assets/mms-logo-gold.png';
import { NavLink } from "react-router-dom";
import '../styles/Dashboard.css';

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




export const Sidebar = ({ selectedStatus, onStatusChange }) => {
  const [openLeads, setOpenLeads] = useState(false);
  const navigate = useNavigate();

const handleStatusSelect = (status) => {
  onStatusChange(status);   // updates state + URL
  setOpenLeads(false);
};



  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/auth/logout/", {
        method: "POST",
      });
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/"); // go back to login
    } catch {
      toast.error("Logout failed");
    }
  };
  return (
    <div>
       <div className="logo-sidebar"><img src={Logo} alt="Logo" /></div>

                <nav className="sidebar-nav">
      <a className="active">
        <FiHome /> Dashboard
      </a>

      {/* Leads Dropdown */}
      <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setOpenLeads(!openLeads)}
          >
            <FiUsers />
            <span>Leads</span>
            {openLeads ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {openLeads && (
            <div className="dropdown-menu">
              {[
                { label: "Unassigned", value: "unassigned", icon: <FiUserMinus /> },
                { label: "Assigned", value: "assigned", icon: <FiClipboard /> },
                { label: "Second Call Attempt", value: "second-attempt", icon: <FiPhoneCall /> },
                { label: "Third Call Attempt", value: "third-attempt", icon: <FiRepeat /> },
                { label: "Completed", value: "completed", icon: <FiCheckCircle /> },
                { label: "Follow Up", value: "followup", icon: <FiClock /> },
                { label: "Prospect", value: "prospect", icon: <FiUserPlus /> },
                { label: "Deal Won", value: "deal-won", icon: <FiTrendingUp /> },
                { label: "Deal Lost", value: "deal-lost", icon: <FiTrendingDown /> },
                { label: "DND", value: "dnd", icon: <FiSlash /> },
              ].map((item) => (
                <button
                  key={item.value}
                  className={`dropdown-item ${
                    selectedStatus === item.value ? "active" : ""
                  }`}
                  onClick={() => handleStatusSelect(item.value)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>



      <NavLink to="/settings" className={({ isActive }) =>
                `dropdown-item ${isActive ? "active" : ""}`
              }>
                <FiSettings />
                <span>Settings</span>
              </NavLink>
    </nav>

       
               <button className="logout" onClick={handleLogout}>
                 <FiLogOut /> Logout
               </button> 
    </div>
  )
}
