import React, { useState, useEffect } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useLocation } from "react-router-dom";
import "../styles/global.css";

const LoginPage = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Nếu đường dẫn là /register thì hiển thị giao diện đăng ký
    if (location.pathname === "/register") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  return (
    <div
      c
      className={`container ${
        isActive ? "active" : ""
      } fixed top-0 right-0 bottom-0 z-[1000]`}
      id="container"
    >
      <Register setIsActive={setIsActive} />
      <Login setIsActive={setIsActive} />
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button onClick={() => setIsActive(false)}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button onClick={() => setIsActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
