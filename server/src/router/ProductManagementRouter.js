import express from "express";
import ProductManagementController from "../controllers/ProductManagementController";

const Router = express.Router();

const ProductManagementRouter = (app) => {
  Router.get("/", ProductManagementController.getProducts);
  Router.post("/create", ProductManagementController.createProduct);
  Router.put("/edit/:id", ProductManagementController.editProduct);
  Router.delete("/delete", ProductManagementController.deleteProduct);
  Router.get("/viewDetail", ProductManagementController.viewDetailProduct);

  return app.use("/api/Product", Router);
};

module.exports = ProductManagementRouter;
