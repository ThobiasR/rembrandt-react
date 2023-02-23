import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function SoldoutPopup({ show }) {
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>test modal</Modal.Body>
      </Modal>
    </>
  );
}
