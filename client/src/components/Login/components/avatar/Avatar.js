import React from "react";
import styles from "./styles.module.scss";

function Avatar({ src }) {
  return (
    <div className={styles.container}>
      <img src={src} alt="avatar" className={styles.container_avatar} />
    </div>
  );
}

export default Avatar;
