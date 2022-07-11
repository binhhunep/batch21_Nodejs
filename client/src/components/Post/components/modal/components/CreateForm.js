import React, { useState } from "react";

import { Form, Input, Button } from "antd";

import CheckBox from "./components/CheckBox";
import { useDispatch, useSelector } from "react-redux";

import authSelector from "../../../../../redux/selector/auth/authSelector";
import * as postSlice from "../../../../../redux/slice/post/postSlice";
import * as postApi from "../../../../../api/services/postsApi";

import * as ModalResponse from "./components/ModalResponse";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

function CreateForm({ onClick, title }) {
  const disPatch = useDispatch();
  const auth_Selector = useSelector(authSelector);

  const onFinish = async (values) => {
    values.status = status;
    const res = await postApi.createPost({
      data: values,
      token: auth_Selector.token,
    });
    if (!res.success) {
      ModalResponse.error(res.message);
    } else {
      ModalResponse.success(res.message);
      disPatch(postSlice.getPosts(auth_Selector.token));
    }
  };

  const handleStatusClick = (status) => {
    setStatus(status);
  };

  const [status, setStatus] = useState("TO LEARN");
  return (
    <Form
      {...formItemLayout}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Plan Name"
        hasFeedback
        rules={[
          {
            type: "string",
            min: 10,
            message: "Plan name length must be at least 10 chars",
          },
          {
            required: true,
            message: "Please input Plan",
          },
        ]}
      >
        <Input allowClear placeholder="Plan Name" />
      </Form.Item>

      <Form.Item
        name="url"
        label="Link Source"
        hasFeedback
        rules={[
          {
            type: "url",
            message: "Input is not valid url",
          },
          {
            required: true,
            message: "Please input Link Source",
          },
        ]}
      >
        <Input allowClear placeholder="Link Source" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        hasFeedback
        rules={[
          {
            type: "string",
            message: "Input is not valid text",
          },
          {
            required: true,
            message: "Please input description",
            min: 10,
            max: 255,
          },
        ]}
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>

      <Form.Item
        label="Status"
        hasFeedback
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 24,
            offset: 0,
          },
        }}
      >
        <CheckBox
          title={"TO LEARN"}
          onClick={(status) => handleStatusClick(status)}
          checked={status === "TO LEARN" ? true : false}
        />
        <CheckBox
          title={"LEARNING"}
          onClick={(status) => handleStatusClick(status)}
          checked={status === "LEARNING" ? true : false}
        />
        <CheckBox
          title={"LEARNED"}
          onClick={(status) => handleStatusClick(status)}
          checked={status === "LEARNED" ? true : false}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          xs: {
            span: 4,
            offset: 10,
          },
          sm: {
            span: 4,
            offset: 10,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateForm;
