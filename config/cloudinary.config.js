import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration

const uploadFile = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Fixed the environment variable name
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto:low" },
        { fetch_format: "auto" },
      ],
    });

    console.log(uploadResult);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });

    return uploadResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { uploadFile };
