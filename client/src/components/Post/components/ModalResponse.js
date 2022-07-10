import { Modal } from "antd";

export const error = (error) => {
  Modal.error({
    title: "Update fail!",
    content: error,
  });
};

export const success = (res) => {
  Modal.success({
    title: "update success!",
    content: res,
  });
};
