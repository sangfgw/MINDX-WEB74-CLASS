import path from "path";
import multer from "multer";
import e from "express";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("upload/images"));
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});


const MB_LIMIT = 1;
const megabyteToByte = Math.pow(1024, 2) * MB_LIMIT;
export const upload = multer({storage: storage, limits: {fileSize: megabyteToByte}});
