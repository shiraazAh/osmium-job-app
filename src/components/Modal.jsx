import React, { useState } from "react";
import { Button, Modal } from "antd";

export default function ConfirmModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="main-button-modal" type="primary" onClick={showModal}>
        Delete
      </Button>
      <Modal
        className="confirm-button-modal"
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
      >
        <p>Are you sure you want to delete this item</p>
      </Modal>
    </>
  );
}
