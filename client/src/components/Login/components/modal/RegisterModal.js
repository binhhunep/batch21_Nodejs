import { Button, Modal } from "antd";
import React, { useState } from "react";

import ButtonC from "../button/Button";
import RegisterForm from "./components/RegisterForm";

const RegisterModal = ({ onClick }) => {
  const [modal2Visible, setModal2Visible] = useState(false);
  return (
    <>
      <ButtonC
        type="primary"
        registerClick={() => setModal2Visible(true)}
        onClick={onClick}
      />

      <Modal
        title="Finish below form to register new user"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
        footer={null}
      >
        <RegisterForm
          onClick={() => {
            setModal2Visible(false);
          }}
        />
      </Modal>
    </>
  );
};

export default RegisterModal;
