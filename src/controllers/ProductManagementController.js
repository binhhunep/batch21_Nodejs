/* CONTROLLER DUNG DE XU LY LOGIC CHO SERVER */

import { date } from "joi";
import ProductManagementModel from "../models/ProductManagementModel";
import Product from "../validation/Product";

const getProducts = (req, res) => {
  const products = ProductManagementModel.Products;
  return res
    .status(200)
    .json({ success: true, message: "Get all products", data: products });
};

const createProduct = (req, res) => {
  const products = ProductManagementModel.Products;
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    status: { active: req.body.active, inactive: req.body.inactive },
    date: req.body.date,
  };

  const { error } = Product.validateProduct(product);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const currentProduct = products.find((p) => {
    p.name === req.body.name;
  });
  console.log("currentProduct", products);
  if (currentProduct) {
    return res.status(400).json({
      success: false,
      message: "Product exists!",
      data: currentProduct,
    });
  }
  products.push(product);
  return res.status(200).json({
    success: true,
    message: "Product create success!",
    data: product,
  });
};
const editProduct = (req, res) => {};
const deleteProduct = (req, res) => {};
const viewDetailProduct = (req, res) => {};

module.exports = {
  getProducts: getProducts,
  createProduct: createProduct,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
  viewDetailProduct: viewDetailProduct,
};
