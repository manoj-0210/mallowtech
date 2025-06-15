import React from "react";
import "./UserCard.scss";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserCard = ({
  user,
  setIsModalOpen,
  setIsEditId,
  isModalOpen,
  setdelete,
  isdelete
}: {
  user: any;
  setIsModalOpen: any;
  setIsEditId: any;
  isModalOpen: boolean;
  setdelete: any;
  isdelete: boolean;
}) => {
  const handleEdit = (val: any) => {
    setIsModalOpen(true);
    setIsEditId(val);
  };
  const handledelete = (val: any) => {
    setdelete(true);
    setIsEditId(val);
  };
  return (
    <div className="user-card">
      {!isModalOpen && !isdelete && (
        <div className="action-buttons">
          <button
            className="action-btn btn-edit"
            onClick={() => handleEdit(user.id)}
          >
            <FaEdit />
          </button>
          <button
            className="action-btn btn-delete"
            onClick={() => handledelete(user.id)}
          >
            <FaTrash />
          </button>
        </div>
      )}

      <img src={user.avatar} alt={user.first_name} />
      <h3>{user.first_name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;
