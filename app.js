import express, { json } from "express";
import router from "./routes/user.routes.js";
import indexRouter from "./routes/index.routes.js";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
app.use(json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/",indexRouter)
app.use("/user", router);
app.listen(3000, connectToDB(), () => {
  console.log("App is running at \n http://localhost:3000/");
});
