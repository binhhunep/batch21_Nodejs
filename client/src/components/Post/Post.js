import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { Space, Table, Tag } from "antd";
import postsApi from "../../api/services/postsApi";

import postSelectorRemaining from "../../redux/selector/post/postSelector";
import { useDispatch, useSelector } from "react-redux";

function Post() {
  const disPatch = useDispatch();
  const post_selector = useSelector(postSelectorRemaining);

  // const [data, setData] = useState([
  //   {
  //     key: "",
  //     number: "",
  //     plan: "",
  //     description: "",
  //     tags: "",
  //   },
  // ]);
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
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      align: "center",
      width: 300,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 800,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      align: "center",
      width: 300,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";

            if (tag === "loser") {
              color = "volcano";
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
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
          <a>Invite {record.name}</a>
          <a>Delete</a>
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
      tags: [p.status, "to learning reactjs"],
    });
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.container_title}>Daily Planner</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Post;
