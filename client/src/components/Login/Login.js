import React from "react";
import { Button, Form } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

import Title from "./components/title/Title";
import Avatar from "./components/avatar/Avatar";
import InputC from "./components/input/Input";
import ButtonC from "./components/button/Button";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <Title title={"Welcome"} />
      </div>
      <div className={styles.container_avatar}>
        <Avatar src={"images/avatar.jpg"} />
      </div>
      <Form
        name="normal_login"
        className={styles.container_form}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item>
          <InputC label={"Username"} icon={"UserOutlined"} error={""} />
        </Form.Item>
        <Form.Item name="password">
          <InputC label={"Password"} icon={"LockOutlined"} error={""} />
        </Form.Item>
        <Form.Item>
          <ButtonC />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
