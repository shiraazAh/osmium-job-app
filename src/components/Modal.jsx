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
      <Button
        type="primary"
        onClick={showModal}
        style={{
          background: "radial-gradient(circle at center, #54A0FF, #3081D0)",
          border: "none",
          color: "white",
        }}
      >
        Delete
      </Button>
      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Confirm"
        okButtonProps={{
          style: {
            background: "radial-gradient(circle at center, #54A0FF, #3081D0)",
          },
        }}
      >
        <p>Are you sure you want to delete this item</p>
      </Modal>
    </>
  );
}
