import React from "react";
import "./UserTable.scss";

const UserTable = ({
  usersdata,
  setIsModalOpen,
  setIsEditId,
  setdelete,
}: {
  usersdata: any;
  setIsModalOpen: any;
  setIsEditId: any;
  setdelete: any;
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
    <table className="user-table">
      <thead>
        <tr style={{ backgroundColor: "#6666662b" }}>
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
                  <a href="">{user.email}</a>
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
                <button
                  className="delete-btn"
                  onClick={() => handledelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default UserTable;
