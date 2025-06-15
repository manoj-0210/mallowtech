import React from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Formmodal.scss";

Modal.setAppElement("#root"); // Required for accessibility

type UserProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => void;
  initialValues: UserFormValues;
  isEdit?: boolean;
};

export type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  id?: number; 
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  avatar: Yup.string().url("Invalid URL").required("Required"),
});

const Formmodal: React.FC<UserProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isEdit = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">
        <h2>{isEdit ? "Edit User" : "Create New User"}</h2>
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <label>
            * First Name
            <Field
              name="firstName"
              className="input"
              placeholder="Please enter first name"
            />
            <ErrorMessage name="firstName" component="div" className="error" />
          </label>

          <label>
            * Last Name
            <Field
              name="lastName"
              className="input"
              placeholder="Please enter last name"
            />
            <ErrorMessage name="lastName" component="div" className="error" />
          </label>

          <label>
            * Email
            <Field
              name="email"
              className="input"
              placeholder="Please enter email"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </label>

          <label>
            * Profile Image Link
            <Field
              name="avatar"
              className="input"
              placeholder="Please enter profile image link"
            />
            <ErrorMessage name="avatar" component="div" className="error" />
          </label>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn cancel">
              Cancel
            </button>
            <button type="submit" className="btn submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Formmodal;
