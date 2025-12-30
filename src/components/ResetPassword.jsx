import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const resetPassword = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://127.0.0.1:8000/api/auth/reset-password/${token}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <form onSubmit={resetPassword} className="login-card">
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};
