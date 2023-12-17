import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "upload/images"));
  },
  filename: function (req, file, cb) {

    const fileName = Date.now() + "-" + file.originalname;
    // const filePath = path.resolve(__dirname, "..", `upload/images/${fileName}`);
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });
// export const upload = multer();