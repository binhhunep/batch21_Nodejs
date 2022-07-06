import React from "react";
import styles from "./styles.module.scss";

function Title({ title }) {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
    </div>
  );
}

export default Title;
