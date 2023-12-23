// import fsPromise from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import { uploadImage } from "../utils/upload.js";
import fs from "fs";
config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadImageController = async (req, res, next) => {
  const filenames = req.files;
  const filePaths = filenames.map((filename) => filename.path);

  const result = await Promise.all(
    filePaths.map((filePath) => {
      return uploadImage(filePath);
    })
  );
  const image = result.map((item) => item.secure_url);
  filePaths.forEach((filePath) => fs.unlinkSync(filePath));

  return res.json({
    message: "Upload successfully",
    result: {
      image,
    },
  });
};
