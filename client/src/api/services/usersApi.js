import axiosClient from "../axiosClient";
import * as types from "../types/types";

const getAllUsers = async () => {
  return await axiosClient
    .get(types.USERS_GETALL)
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

const checkLogin = async (data) => {
  return await axiosClient
    .post(types.USERS_LOGIN, data)
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

const registerUser = async (data) => {
  return await axiosClient
    .post(types.USERS_REGISTER, data)
    .then((res) => {
      const response = res.data;
      return response;
    })
    .catch((error) => {
      const response = error.response.data;
      return response;
    });
};

export { checkLogin, getAllUsers, registerUser };
