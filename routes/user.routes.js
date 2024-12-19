import express, { json, Router } from "express";
import { body, validationResult } from "express-validator";
import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRouter = Router();

userRouter.get("/test", (req, res) => {
  res.send("User tesr Route");
});

// user register page
userRouter.get("/register", (req, res) => {
  res.render("register.ejs");
});

// user register post
userRouter.post(
  "/register",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid data" });
    }
    const { email, username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      email: email,
      username: username,
      password: hashPassword,
    });
    res.redirect("/user/login");
  }
);

//user login page
userRouter.get("/login", (req, res) => {
  res.render("login.ejs");
});

//user login post
userRouter.post(
  "/login",
  body("email").trim().isEmail().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array(), message: "Invalid data" });
    }
    const { email, password } = req.body;
    const userdata = await user.findOne({
      email: email,
    });
    if (!userdata) {
      return res
        .status(404)
        .json({ message: "username or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, userdata.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "username or password is incorrect",
      });
    }

    /* jsonwebtoken */

    const token = jwt.sign(
      {
        userId: userdata._id,
        username: userdata.username,
        email: userdata.email,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.redirect("/home");
  }
);

export default userRouter;
