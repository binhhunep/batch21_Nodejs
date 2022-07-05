/* CONTROLLER DUNG DE XU LY LOGIC CHO SERVER */

import UserModel from "../models/UserModel";
import validation from "../validation/validation";
import { v4 as uuidv4 } from "uuid";

const getUser = (req, res) => {
  const users = UserModel.Users;
  return res.status(200).json({
    success: true,
    message: "Get all user success!",
    Data: users,
  });
};

const addUser = async (req, res) => {
  const users = UserModel.Users;
  const user = {
    id: uuidv4(),
    name: req.body.name,
    age: parseInt(req.body.age),
  };
  const { error } = validation.validateUser(user);
  if (error) {
    return res.status(400).json({
      success: false,
      message: `${error.details[0].message}`,
    });
  } else {
    const currentUser = users.find((u) => u.name === user.name);
    console.log("currentUser", currentUser);
    console.log("Users", users);

    if (currentUser) {
      return res.status(400).json({
        success: false,
        message: `username exist`,
      });
    }
    users.push(user);
    return res.status(200).json({
      success: true,
      message: "Add new user success!",
      Data: user,
    });
  }
};

const editUser = async (req, res) => {
  const users = UserModel.Users;
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found!",
    });
  } else {
    const userUpdate = {
      id: parseInt(req.params.id),
      name: req.body.name,
      age: parseInt(req.body.age),
    };

    const { error } = validation.validateUser(userUpdate);
    if (error) {
      return res.status(400).json({
        success: false,
        message: `${error}`,
      });
    }
    users.splice(id - 1, 1, userUpdate);
    console.log(users);
    return res.status(200).json({
      success: true,
      message: "Update user success!",
      data: userUpdate,
    });
  }
};

const deleteUser = async (req, res) => {
  const users = UserModel.Users;
  const id = toString(req.params.id);
  const user = users.find((u) => {
    u.id === id;
  });
  if (user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  users.splice(id - 1, 1);
  return res
    .status(200)
    .json({ success: true, message: "Delete user success" });
};

module.exports = {
  getUser: getUser,
  addUser: addUser,
  editUser: editUser,
  deleteUser: deleteUser,
};
