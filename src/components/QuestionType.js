import React from "react";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";

function QuestionType(props) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.status}
      onHide={props.onSelect}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Question Type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropdownButton
          size="lg"
          title="Select question"
          onSelect={(event) => {
            props.onSelect(event);
          }}
        >
          <Dropdown.Item eventKey="1">Multi select</Dropdown.Item>
          <Dropdown.Item eventKey="2">Single select</Dropdown.Item>
        </DropdownButton>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onSelect}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuestionType;
