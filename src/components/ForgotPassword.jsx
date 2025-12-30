import React, { useState } from "react";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const submitEmail = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    res.ok ? toast.success(data.message) : toast.error(data.message);
  };

  return (
    <form onSubmit={submitEmail} className="login-card">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};
