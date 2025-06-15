import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("eve.holt@reqres.in");
  const [password, setPassword] = useState<string>("cityslicka");
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_mail", email);
      navigate("/user");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-wrapper">
          <FaUser className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="input-wrapper">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <span>Remember me</span>
        </label>
        <button type="submit" className="button">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
