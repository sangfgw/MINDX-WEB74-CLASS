import * as uploadImage from "../utils/uploadImage.js";

export const uploadImageController = (req, res) => {
    if (!req.file) {
        throw new Error("Image File Not Found");
    }

    // console.log(req.file);
    let data = uploadImage.toBase64(req.file.path);
    uploadImage.remove(req.file.path);

    return res.json({
        fileName: req.file.filename,
        encoding: "base64",
        imageEncoded: data ? `data:image/png;base64,${data}` : "",
        status: data !== "" && data !== null ? 200 : 400
    });
}