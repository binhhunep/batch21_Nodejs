import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

function ButtonC({ src }) {
  return (
    <div className={styles.container_form_content}>
      <Button
        className={styles.container_form_button}
        type="primary"
        htmlType="submit"
      >
        Log in
      </Button>
      <div
        style={{
          display: "flex",
          width: "250px",
        }}
      >
        <p className={styles.container_form_or}>Or</p>
        <NavLink to={"/register"} className={styles.container_form_register}>
          &nbsp; register now!
        </NavLink>
      </div>
    </div>
  );
}

export default ButtonC;
