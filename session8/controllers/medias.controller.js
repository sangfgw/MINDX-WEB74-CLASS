// import fsPromise from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import * as fs from "fs";
config();

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageController = async (req, res, next) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  const imagesUrl = [];
  let isSavedCloud = false;
  let isFilesUpload = Array.isArray(req.files) && req.files.length > 0;

  if (isFilesUpload) {
    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, options);
        imagesUrl.push(result.secure_url);
        isSavedCloud = true;
        await fs.unlinkSync(file.path);
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  res.json({
    message: `Upload image ${isFilesUpload && isSavedCloud ? "successfully" : "failed"}`,
    result: imagesUrl,
    status: isFilesUpload && isSavedCloud ? 201 : 400
  });
};
