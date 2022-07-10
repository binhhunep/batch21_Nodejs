import { Modal } from "antd";

export const error = (error) => {
  Modal.error({
    title: "Adding fail!",
    content: error,
  });
};

export const success = (res) => {
  Modal.success({
    title: "Adding success!",
    content: res,
  });
};
