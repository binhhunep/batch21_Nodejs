import UserModel from "../../models/TodoModel/UserModel";
import UserValidation from "../../validation/TodoValidation/UserValidation";
import argon2 from "argon2"; //add thu vien hashpassword
import jwt from "jsonwebtoken"; //add thu vien tao token
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json({
      success: true,
      message: "Get all user!",
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internet server error!",
    });
  }
};

const registerUser = async (req, res) => {
  const user = { username: req.body.username, password: req.body.password };

  //check missing params

  if (!user.username || !user.password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user information!" });
  }

  //validate user information

  const { error } = UserValidation(user);
  if (error) {
    return res.status(400).json({
      success: false,
      message: `${error.details[0].message}`,
    });
  }

  //check user exist
  try {
    const currentUser = await UserModel.findOne({ username: user.username });
    if (currentUser) {
      return res.status(400).json({
        success: false,
        message: `User already exist!`,
      });
    }

    //hash password

    const hashedPassword = await argon2.hash(user.password);
    let newUser = new UserModel({
      username: user.username,
      password: hashedPassword,
    });
    await newUser.save();

    //return token

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    //success

    return res.status(200).json({
      success: true,
      message: "User created success!",
      data: newUser,
      token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internet server error!",
    });
  }
};

const checkLogin = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  //check validation req.body
  const { error } = UserValidation(user);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: `${error.details[0].message}` });
  }

  //check user exist (khi goi den database phai dung try and catch de bat loi khi db sup hoac bi ngat mang)
  try {
    const users = await UserModel.find();
    const currentUser = users.find((u) => u.username === user.username);
    if (!currentUser) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });
    }

    //check password exist (chu y khi dung argon2.verify thi cung da goi de goi API cua thu vien argon2 nen bat//
    //buoc phai dung await xu ly bat dong bo //

    const checkPassword = await argon2.verify(
      currentUser.password,
      user.password
    );

    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });
    }

    //return token

    const accessToken = jwt.sign(
      { userId: currentUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    //success
    return res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: user,
      token: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internet server error!",
    });
  }
};

module.exports = {
  getUsers: getUsers,
  registerUser: registerUser,
  checkLogin: checkLogin,
};
