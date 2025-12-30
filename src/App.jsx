import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { Assigned } from "./Buckets/Assigned";
// import { Unassigned } from "./Buckets/Unassigned";
import Dashboard from "./components/Dashboard";
import { Login } from "./components/Login";

import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

// import { SecondCallAttempt } from "./Buckets/SecondCallAttempt";
// import { ThirdCallAttempt } from "./Buckets/ThirdCallAttempt";
// import { Completed } from "./Buckets/Completed";
// import { FollowUp } from "./Buckets/FollowUp";
// import { Prospect } from "./Buckets/Prospect";
// import { DealWon } from "./Buckets/DealWon";
// import { DealLost } from "./Buckets/DealLost";
// import { DoNotDistrub } from "./Buckets/DoNotDistrub";
import { Settings } from "./configuration/Settings";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      {/* <Assigned/> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assigned" element={<Assigned />} />
        <Route path="/unassigned" element={<Assigned />} />
        <Route path="/second-call" element={<Assigned />} />
        <Route path="/third-call" element={<Assigned />} />
        <Route path="/completed" element={<Assigned />} />
        <Route path="/follow-up" element={<Assigned />} />
        <Route path="/prospect" element={<Assigned />} />
        <Route path="/deal-won" element={<Assigned />} />
        <Route path="/deal-lost" element={<Assigned />} />
        <Route path="/dnd" element={<Assigned />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
