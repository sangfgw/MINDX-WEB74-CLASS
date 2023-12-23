import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "upload/images"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

export const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
  };
  console.log("imagePath", imagePath);
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    // await fsPromise.unlink(imagePath);
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
