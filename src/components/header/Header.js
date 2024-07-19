import React from "react";
import "./style.css";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div
        className="header-logo-container"
        onClick={() => navigate("/services")}
      >
        <img
          alt="admin"
          className="header-logo"
          src={require("../../images/logo.png")}
        />
        <span className="header-company">MST Entertainment</span>
      </div>
      <UserInfo />
    </div>
  );
}

export default Header;
