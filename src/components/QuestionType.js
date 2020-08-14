import React, { useState } from "react";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";

function QuestionType(props) {
  const [show, setShow] = useState(props.status);

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <Modal
      //   {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropdownButton
          // as={ButtonGroup}
          size="lg"
          title="Drop large"
          onSelect={(event) => {
            handleClose();
            props.onSelect(event);
          }}
        >
          <Dropdown.Item eventKey="1">Multi select</Dropdown.Item>
          <Dropdown.Item eventKey="2">Single select</Dropdown.Item>
        </DropdownButton>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionType;
