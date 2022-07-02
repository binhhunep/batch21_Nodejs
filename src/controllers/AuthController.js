/* CONTROLLER DUNG DE XU LY LOGIC CHO SERVER */

import UserModel from "../models/UserModel";
import validation from "../validation/validation";

const getUser = (req, res) => {
  const users = UserModel.Users;
  return res.send({
    success: true,
    message: "Get all user success!",
    Data: users,
  });
};

const addUser = async (req, res) => {
  const users = UserModel.Users;

  const user = await {
    id: users.length + 1,
    name: req.body.name,
    age: parseInt(req.body.age),
  };
  const { error } = validation.validateUser(user);
  if (error) {
    return res.status(400).json({
      success: false,
      message: `${error.details[0].message}`,
      Data: user,
    });
  }
  users.push(user);
  return res.status(200).json({
    success: true,
    message: "Add new user success!",
    Data: user,
  });
};

const editUser = async (req, res) => {
  const users = UserModel.Users;
  const user = users.findOne((u) => {
    u.id === parseInt(req.params.id);
  });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found!",
      Data: user,
    });
  }
};

module.exports = { getUser: getUser, addUser: addUser, editUser: editUser };
