import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title, label } = props;
  return (
    <Modal
      title={title}
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
    >
      <p>{label}</p>
    </Modal>
  );
};

export default CustomModal;