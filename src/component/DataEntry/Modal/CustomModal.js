import React from "react";
import { Modal } from "antd";

const CustomModal = ({ open, hideModal, performAction, title, children, okText = "Ok", cancelText = "Cancel" }) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;