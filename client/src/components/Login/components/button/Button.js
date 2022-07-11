import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import authSlice from "../../../../redux/slice/auth/authSlice";

function ButtonC({ src, onClick, registerClick }) {
  const handleLoginClick = () => {
    onClick();
  };
  const handleRegisterClick = () => {
    registerClick();
  };
  return (
    <div className={styles.container_form_content}>
      <NavLink to="/post">
        <Button
          className={styles.container_form_button}
          type="primary"
          htmlType="submit"
          onClick={handleLoginClick}
        >
          Log in
        </Button>
      </NavLink>
      <div
        style={{
          display: "flex",
          width: "250px",
        }}
      >
        <p className={styles.container_form_or}>Or</p>
        <p
          className={styles.container_form_register}
          onClick={handleRegisterClick}
        >
          &nbsp; register now!
        </p>
      </div>
    </div>
  );
}

export default ButtonC;
