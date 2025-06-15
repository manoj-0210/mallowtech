import React from "react";
import { IoMdLogOut } from "react-icons/io";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user_mail = localStorage.getItem("user_mail");
  return (
    <div>
      <header className="user-table-header">
        <div>{user_mail}</div>
        <div
          style={{ marginTop: 6 }}
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
        >
          <IoMdLogOut />
        </div>
      </header>
    </div>
  );
};
export default Header;
