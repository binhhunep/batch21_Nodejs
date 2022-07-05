import express from "express";
import AuthController from "../controllers/AuthController";
import Authenthication from "../middleware/Authenthication";
import Authorization from "../middleware/Authorization";
import Log from "../middleware/Log";
const Router = express.Router();

const authRouter = (app) => {
  Router.get("/", Authorization, Authenthication, Log, AuthController.getUser);
  Router.post("/register", AuthController.addUser);
  Router.put("/edit/:id", AuthController.editUser);
  Router.delete("/delete/:id", AuthController.deleteUser);

  return app.use("/api/Auth", Router);
};

module.exports = authRouter;
