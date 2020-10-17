import React from "react";
import { Modal } from "react-bootstrap";
import CancelForm from "../../Forms/CrudForm/CancelForm";

const cancelModal = props => {
  return (
    <Modal backdrop="static" show={props.show} onHide={props.hide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CancelForm
          handleCancel={props.hide}
          onSubmit={props.submitCancel}
        />
      </Modal.Body>
    </Modal>
  );
};
export default cancelModal;
