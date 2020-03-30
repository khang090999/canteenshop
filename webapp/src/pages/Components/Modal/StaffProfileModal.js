import React from "react";
import { Modal } from "react-bootstrap";
import StaffProfileForm from "../../Forms/CrudForm/StaffProfileForm";

const staffModal = props => {
  return (
    <Modal backdrop="static" show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StaffProfileForm
          handleCancel={props.hide}
          initialValues={props.initialValues}
          onSubmit={props.submitStaff}
        />
      </Modal.Body>
    </Modal>
  );
};
export default staffModal;
