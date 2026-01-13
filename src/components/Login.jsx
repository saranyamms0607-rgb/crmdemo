import "../styles/Login.css";
import { toast } from "react-toastify";
import React, { useState ,useEffect} from "react";
import Logo from "../assets/mms-logo-gold.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import quotes from "../data/Quotes.json";

export const Login = () => {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();
  const [quote, setQuote] = useState({
          title: "",
          content: ""
        });
  useEffect(() => {
  const token = localStorage.getItem("access");

  if (token) {
    navigate("/assigned");
  }
}, [navigate]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
            // Save tokens (NO UI change)
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("role", data.role);
            localStorage.setItem("email", email); // remember user
            
            
            toast.success(data.message);

            setTimeout(() => {
              navigate("/assigned");
            }, 800);
          }
    else {
            toast.error(data.message);
          }

        //  Example redirect (enable when ready)
        // window.location.href = "/assigned";


    } catch (error) {
      console.log("Server error. Try again later." + error.message);
    } finally {
      setLoading(false);
    }
  };
  

        
      
  return (
    <div className="login-page">
      {/* LEFT BRAND PANEL */}
      <div className="brand-panel">
        <div className="brand-content">
          <div className="logo"><img src={Logo} alt="Logo" />
          <span className="logo-text">Mediamatic Studio</span></div>

          <h1>{quote.title}</h1>
          <p>{quote.content}</p>

          <div className="stats">
            <div className="stat">
              <h3>10K+</h3>
              <span>Active Users</span>
            </div>
            <div className="stat">
              <h3>99.9%</h3>
              <span>Uptime</span>
            </div>
            <div className="stat">
              <h3>5M+</h3>
              <span>Deals Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="form-panel">
        <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue to your CRM</p>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group password-group">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "password": "text"}
              
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>


        <div className="actions">
          {/* <label className="remember">
            <input type="checkbox" /> Remember me
          </label> */}
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        {/* {message && <p className="login-message">{message}</p>} */}

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Logining..." : "Login"}
        </button>

        <div className="footer">© 2025 Mediamatic Studio CRM</div>
      </form>
      </div>
    </div>
  );
}

