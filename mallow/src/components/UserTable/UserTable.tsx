import React from "react";
import "./UserTable.scss";

const UserTable = ({
  usersdata,
  setIsModalOpen,
  setIsEditId,
}: {
  usersdata: any;
  setIsModalOpen: any;
  setIsEditId: any;
}) => {
  const handleEdit = (val: any) => {
    setIsModalOpen(true);
    setIsEditId(val);
  };
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {usersdata &&
          usersdata?.map((user: any) => (
            <tr key={user.id}>
              <td>
                <div className="user-email">
                  <img src={user.avatar} alt={user.first_name} />
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default UserTable;
