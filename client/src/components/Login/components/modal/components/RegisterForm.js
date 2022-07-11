import { Form, Input, Button } from "antd";
import React from "react";

import * as usersApi from "../../../../../api/services/usersApi";

import * as ModalRespone from "./components/ModalRespone";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 4,
      offset: 10,
    },
    sm: {
      span: 4,
      offset: 10,
    },
  },
};

const RegisterModal = ({ onClick }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const res = await usersApi.registerUser(values);
    console.log(res);
    if (!res.success) {
      ModalRespone.error(res.message);
    } else {
      ModalRespone.success(res);
      onClick();
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input allowClear placeholder="binhhunep@gmail.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password allowClear placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password allowClear placeholder="Password confirm" />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="FirstName"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your FirstName!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Binh" />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="LastName"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your LastName!",
            whitespace: true,
          },
        ]}
      >
        <Input allowClear placeholder="Doan Thanh" />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterModal;
