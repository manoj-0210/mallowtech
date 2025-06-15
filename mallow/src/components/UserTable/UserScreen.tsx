import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTable, FaThLarge, FaSearch, FaTimes } from "react-icons/fa";
import { TfiList } from "react-icons/tfi";
import "./UserScreen.scss";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createUser, editUser, fetchUsers } from "../../redux/slice/userSlice";
import UserTable from "./UserTable";
import Formmodal from "./Formmodal";
import UserCard from "./UserCard";
import SvgSpinner from "../../SvgFiles/SvgSpinner";
import Header from "./Header";
import Userdelete from "./userdelete";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [isEditId, setIsEditId] = useState(0);
  const [isPagelayout, setPagelayout] = useState(1);
  const [isdelete, setdelete] = useState(false);

  const { usersdata, usersdetail, loading } = useSelector((state: any) => ({
    usersdata: state.users.users,
    usersdetail: state.users,
    loading: state.users.status === "loading",
  }));
  const selectedUser =
    usersdata && usersdata?.find((user: any) => user.id === isEditId);

  const initialValues = selectedUser
    ? {
        firstName: selectedUser.first_name,
        lastName: selectedUser.last_name,
        email: selectedUser.email,
        avatar: selectedUser.avatar,
      }
    : {
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
      };
  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [page]);
  const submituser = (val: any) => {
    if (isEditId > 0) {
      dispatch(editUser({ id: isEditId, updatedUser: val })).then((res) => {
        setIsModalOpen(false);
        const user = res?.payload;
        alert(
          `User Updated:\n\nFirst Name: ${user?.firstName}\nLast Name: ${user?.lastName}\nEmail: ${user?.email}\nUpdated At: ${user?.updatedAt}`
        );
      });
    } else
      dispatch(createUser(val)).then((res) => {
        setIsModalOpen(false);
        const user = res?.payload;
        alert(
          `User Created:\n\nFirst Name: ${user?.firstName}\nLast Name: ${user?.lastName}\nEmail: ${user?.email}\nUpdated At: ${user?.updatedAt}`
        );
      });
    setIsEditId(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const filteredUsers = usersdata.filter(
    (user: User) =>
      user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Formmodal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditId(0);
        }}
        onSubmit={(values) => {
          submituser(values);
          setIsModalOpen(false);
        }}
        initialValues={initialValues}
      />
      <Userdelete
        isOpen={isdelete}
        onClose={() => {
          setdelete(false);
          setIsEditId(0);
        }}
        isEditId={isEditId}
      />
      <Header />
      <div className="user-container">
        <div className="header">
          <h2>Users</h2>
          <div className="search-create">
            <div className="search-box">
              <input
                type="text"
                placeholder="input search text"
                value={searchText}
                onChange={handleSearchChange}
              />
              {searchText ? (
                <FaTimes className="clear-icon" onClick={clearSearch} />
              ) : (
                <FaSearch />
              )}
            </div>
            <button className="create-btn" onClick={() => setIsModalOpen(true)}>
              Create User
            </button>
          </div>
        </div>
        <div className="view-toggle">
          <div
            className={`${isPagelayout === 1 && "active"} button`}
            onClick={() => setPagelayout(1)}
          >
            <FaTable style={{ marginRight: 4 }} /> Table
          </div>
          <div
            className={`${isPagelayout === 2 && "active"} button-2`}
            onClick={() => setPagelayout(2)}
          >
            <TfiList style={{ marginRight: 4 }} /> Card
          </div>
        </div>
        {loading ? (
          <div className="loader">
            <div style={{ marginRight: 40 }}>
              <SvgSpinner width={62} height={62} />
            </div>
          </div>
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div className="no-users">
                <p>No users found</p>
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                {isPagelayout === 1 ? (
                  <UserTable
                    usersdata={filteredUsers}
                    setIsEditId={setIsEditId}
                    setIsModalOpen={setIsModalOpen}
                    setdelete={setdelete}
                  />
                ) : (
                  <div className="card-grid">
                    {filteredUsers?.map((user: any) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        setIsEditId={setIsEditId}
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        setdelete={setdelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {!loading && (
          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
              {"<"}
            </button>
            <button
              className={page === 1 ? "active" : ""}
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button
              className={page === 2 ? "active" : ""}
              onClick={() => setPage(2)}
            >
              2
            </button>

            <button onClick={() => setPage((p) => Math.min(p + 1, 2))}>
              {">"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserScreen;
