import express from "express";

import bodyParser from "body-parser";

import authRouter from "./router/AuthRouter";
import ProductManagementRouter from "./router/ProductManagementRouter";

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Goi API ngan gon
authRouter(app);
ProductManagementRouter(app);

//Cau hinh PORT cho APP
app.listen(process.env.PORT, () => {
  console.log(`App running on local PORT:${process.env.PORT}`);
});
