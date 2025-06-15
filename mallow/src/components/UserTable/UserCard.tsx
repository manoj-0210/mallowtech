import React from "react";
import "./UserCard.scss";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserCard = ({user}:{user: any}) => {
  return (
    <div className="user-card">
      <div className="hover-overlay"></div>
      <div className="action-buttons">
        <button className="action-btn btn-edit">
          <FaEdit />
        </button>
        <button className="action-btn btn-delete">
          <FaTrash />
        </button>
      </div>

      <img src={user.avatar} alt={user.first_name} />
      <h3>{user.first_name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
