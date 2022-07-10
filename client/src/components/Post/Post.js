import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, Input, Space, Tag } from "antd";

import styles from "./styles.module.scss";

import postSelectorRemaining from "../../redux/selector/post/postSelector";

import authSelectorRemaining from "../../redux/selector/auth/authSelector";

import CreatePostModal from "./components/modal/CreatePostModal";

import * as postSlice from "../../redux/slice/post/postSlice";

import * as postsApi from "../../api/services/postsApi";

import * as ModalResponse from "./components/ModalResponse";

function Post() {
  const disPatch = useDispatch();

  const post_selector = useSelector(postSelectorRemaining);
  const auth_selector = useSelector(authSelectorRemaining);

  const [isEdit, setIsEdit] = useState(false);
  const [key, setKey] = useState(0);
  const [valueInput, setValueInput] = useState({
    title: "",
    description: "",
    url: "",
    status: "",
  });

  const handleEditClick = async (post) => {
    setIsEdit(!isEdit);
    setKey(post.post.key);
  };

  const handleSaveClick = async (post) => {
    const res = await postsApi.updatePost({ post: post, newPost: valueInput });
    if (res.success === false) {
      ModalResponse.error(res.message);
    } else {
      ModalResponse.success(res.message);
      setIsEdit(!isEdit);
      setKey(0);
      disPatch(postSlice.getPosts(post.token));
      setValueInput({ title: "", description: "", url: "", status: "" });
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValueInput({ ...valueInput, [name]: value });
  };

  const handleDeleteClick = async (post) => {
    const res = await postsApi.deletePost({ post: post });
    disPatch(postSlice.getPosts(post.token));
    console.log(res);
  };

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      width: 100,
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Plan Name",
      dataIndex: "plan",
      key: "plan",
      align: "center",
      width: 300,
      render: (text, item) =>
        item.key === key ? (
          <Input name="title" onChange={(e) => handleOnChange(e)} />
        ) : (
          <p>{text}</p>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 500,
      render: (text, item) =>
        item.key === key ? (
          <Input name="description" onChange={(e) => handleOnChange(e)} />
        ) : (
          <p>{text}</p>
        ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      align: "center",
      width: 300,
      render: (text, item) =>
        item.key === key ? (
          <Input name="url" onChange={(e) => handleOnChange(e)} />
        ) : (
          <p>{text}</p>
        ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      width: 200,
      render: (status, item) => (
        <>
          {status.map((status) => {
            let color = "";
            if (status === "LEARNED") {
              color = "volcano";
            } else if (status === "LEARNING") {
              color = "geekblue";
            } else if (status === "TO LEARN") {
              color = "green";
            }

            return item.key === key ? (
              <Input
                key={item.key}
                name="status"
                onChange={(e) => handleOnChange(e)}
              />
            ) : (
              <Tag key={item.key} color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {!isEdit ? (
            <a
              onClick={() =>
                handleEditClick({ post: record, token: auth_selector.token })
              }
            >
              edit {record.name}
            </a>
          ) : (
            <a
              onClick={() =>
                handleSaveClick({ post: record, token: auth_selector.token })
              }
            >
              save {record.name}
            </a>
          )}
          <a
            onClick={() =>
              handleDeleteClick({ post: record, token: auth_selector.token })
            }
            style={{ color: "red" }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const posts = post_selector.data.data;

  const data = [];

  posts?.map((p, index) => {
    return data.push({
      key: index + 1,
      number: index + 1,
      plan: p.title,
      description: p.description,
      source: p.url,
      status: [p.status],
      idObj: p._id,
    });
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Daily Planner</h1>
      <CreatePostModal />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default Post;
