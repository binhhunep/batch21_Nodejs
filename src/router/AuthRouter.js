import express from "express";
import AuthController from "../controllers/AuthController";

const Router = express.Router();

const authRouter = (app) => {
  Router.get("/", AuthController.getUser);
  Router.post("/register", AuthController.addUser);
  Router.put("/edit/:id", AuthController.editUser);

  return app.use("/api/Auth", Router);
};

module.exports = authRouter;
