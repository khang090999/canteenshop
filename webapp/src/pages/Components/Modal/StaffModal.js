import React from "react";
import { Modal } from "react-bootstrap";
import StaffForm from "../../Forms/CrudForm/StaffForm";

const staffModal = props => {
  return (
    <Modal backdrop="static" show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StaffForm
          handleCancel={props.hide}
          initialValues={props.initialValues}
          onSubmit={props.submitStaff}
        />
      </Modal.Body>
    </Modal>
  );
};
export default staffModal;
