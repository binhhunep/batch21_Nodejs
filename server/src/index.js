import express from "express";
import ejs from "ejs";
import cors from "cors";
import helmet from "helmet";

import mongoose from "mongoose";

import bodyParser from "body-parser";

import authRouter from "./router/AuthRouter";
import ProductManagementRouter from "./router/ProductManagementRouter";
import UsersRouter from "./router/TodoRouter/UserRouter";
import PostRouter from "./router/TodoRouter/PostRouter";

require("dotenv").config();

//connect mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@batch21nodejsfull.zo5czfu.mongodb.net/?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("connecting mongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

//Dung bodyParser de dich du lieu Json va Urlencoded tra ve req duoi dang JS
// cai nay goi la thu vien build-in middleware - check req dang json vaf urlencoded moi cho qua
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // cho phep luu ca file anh va file gi do de moc ra su dung tren UI
app.use(helmet()); //build-in middleware (15 middleware bao mat server)

//server-side rendering

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.get("/", (req, res) => {
  res.render("home");
});

//Goi API ngan gon
authRouter(app);
ProductManagementRouter(app);
UsersRouter(app);
PostRouter(app);

//Cau hinh PORT cho APP
app.listen(process.env.PORT, () => {
  console.log(`App running on local PORT:${process.env.PORT}`);
});
