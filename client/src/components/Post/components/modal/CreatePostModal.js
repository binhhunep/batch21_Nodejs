import { Modal } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.scss";

import { SiAddthis } from "react-icons/si";
import { NavLink } from "react-router-dom";

import CreateForm from "./components/CreateForm";

function CreatePostModal({ title }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <NavLink to="/Post/create">
        <SiAddthis
          className={styles.container_add}
          onClick={() => setModalVisible(true)}
          style={{
            color: "#1892ff",
            fontSize: "40px",
            margin: " 5px auto",
            cursor: "pointer",
          }}
        />
      </NavLink>
      <Modal
        title="Add plan daily"
        centered
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <CreateForm title={title} onClick={() => setModalVisible(false)} />
      </Modal>
    </>
  );
}

export default CreatePostModal;
