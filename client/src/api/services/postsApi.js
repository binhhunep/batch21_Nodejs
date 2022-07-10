import axiosClient from "../axiosClient";
import * as types from "../types/types";

const getAllPosts = async (token) => {
  return await axiosClient
    .get(types.POSTS_GETALL, {
      headers: {
        Authorization: "Bearer ".concat(token),
      },
    })
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

const createPost = async (data) => {
  return await axiosClient
    .post(types.POSTS_CREATE, data.data, {
      headers: {
        Authorization: "Bearer ".concat(data.token),
      },
    })
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

const updatePost = async (data) => {
  console.log(data);
  return await axiosClient
    .put(`${types.POSTS_UPDATE}/${data.post.post.idObj}`, data.newPost, {
      headers: {
        Authorization: "Bearer ".concat(data.post.token),
      },
    })
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

const deletePost = async (data) => {
  return await axiosClient
    .delete(`${types.POSTS_DELETE}/${data.post.post.idObj}`, {
      headers: {
        Authorization: "Bearer ".concat(data.post.token),
      },
    })
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

export { getAllPosts, createPost, updatePost, deletePost };
