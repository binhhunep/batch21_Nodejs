import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { Form } from "antd";

import * as usersApi from "../../api/services/usersApi";

import Title from "./components/title/Title";
import Avatar from "./components/avatar/Avatar";
import InputC from "./components/input/Input";

import RegisterModal from "./components/modal/RegisterModal";

import * as authSlice from "../../redux/slice/auth/authSlice";

function Login() {
  const disPatch = useDispatch();

  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const checkUsername = (username) => {
    setUser({ ...user, username: username });
  };
  const checkPassword = (password) => {
    setUser({ ...user, password: password });
  };
  const loginClick = async () => {
    const res = await usersApi.checkLogin(user);
    if (res.success === false) {
      setError(res.message);
      setIsSuccess(false);
    } else {
      setError(res.message);
      setIsSuccess(!isSuccess);
      disPatch(authSlice.default.actions.getUser(res));
    }
  };

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
          <InputC
            onChange={(username) => {
              checkUsername(username);
            }}
            label={"Username"}
            icon={"UserOutlined"}
            error={""}
          />
        </Form.Item>
        <Form.Item name="password">
          <InputC
            onChange={(password) => {
              checkPassword(password);
            }}
            label={"Password"}
            icon={"LockOutlined"}
            error={error}
          />
        </Form.Item>
        <Form.Item>
          <RegisterModal onClick={loginClick} />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
