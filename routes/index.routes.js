import express, { Router } from "express";
import { upload } from "../config/multer.config.js";
import { uploadFile } from "../config/cloudinary.config.js";
import { auth } from "../middlewares/auth.js";
import file from "../models/files.model.js";

const indexRouter = Router();

indexRouter.get("/home", auth, async (req, res) => {
  try {
    const userFiles = await file.find({
      user: req.user.userId,
    });
    console.log(userFiles);
    res.render("home.ejs", {
      files: userFiles,
      user:req.user.username
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data", error });
  }
});

indexRouter.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = req.file.path;
    const result = await uploadFile(filePath);

    const newFile = await file.create({
      path: result.url,
      originalname: result.original_filename,
      user: req.user.userId,
    });

    res.json(newFile);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
});


export default indexRouter;

// indexRouter.get("/download/:path", auth, async (req, res) => {
//   const loggedInUserId = req.user.userId;
//   const path = req.params.path;

//   const files = await file.findOne({
//     user:loggedInUserId,
//     path:path
//   }) 
  
//   if(!file){
//     return res.status(401).json({
//       message:"NOOOOOOOOOOOOOOOOOooooo"
//     })
//   }
// });