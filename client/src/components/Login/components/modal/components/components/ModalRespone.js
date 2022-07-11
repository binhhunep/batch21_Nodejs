import { Modal } from "antd";

export const error = (error) => {
  Modal.error({
    title: "Creating fail!",
    content: error,
  });
};

export const success = (res) => {
  Modal.success({
    title: res.message,
    content: <p style={{ userSelect: "text" }}>{`Your token: ${res.token}`}</p>,
  });
};
