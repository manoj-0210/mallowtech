import React from "react";
import { IoMdLogOut } from "react-icons/io";
import "./Header.scss";

const Header = () => {
  return (
    <div>
      <header className="user-table-header">
        <div>manoj</div>
        <div style={{marginTop:6}}>
          <IoMdLogOut />
        </div>
      </header>
    </div>
  );
};
export default Header;
