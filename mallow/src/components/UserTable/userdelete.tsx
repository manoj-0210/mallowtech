import React from "react";
import Modal from "react-modal";
import "./Userdelete.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { deleteUser } from "../../redux/slice/userSlice";

Modal.setAppElement("#root");

type UserProps = {
  isOpen: boolean;
  onClose: () => void;
  isEditId?: number;
};

const Userdelete = ({ isOpen, onClose, isEditId }: UserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handlecancel = () => {
    onClose();
  };
  const handledelete = () => {
    dispatch(deleteUser(isEditId || 0)).then((res) => {
      onClose();
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
      style={{ content: { width: "350px", height: "90px" } }}
    >
      <div className="modal-content">
        <div>Are you sure you want to delete?</div>
        <div>This action cannot be undone.</div>

        <div className="can-app-btn-wrap">
          <button onClick={() => handlecancel()} className="button-1-delete">
            Cancel
          </button>
          <button
            className="button-2-delete"
            onClick={() => {
              handledelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default Userdelete;
