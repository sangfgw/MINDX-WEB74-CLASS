import fs from "fs";

export const toBase64 = (path = "") => {
    let encodedImageBase64 = "";
    if (path !== "" && path !== null) {

        try {
            encodedImageBase64 = fs.readFileSync(path, {encoding: "base64"});
        } catch (err) {
            throw new Error(err);
        }
    }

    return encodedImageBase64;
}

export const remove = (path = "") => {
    let isRemoved = false;

    try {
        fs.unlinkSync(path);
        isRemoved = true;
    } catch (err) {
        throw new Error(err);
    }

    return isRemoved;
}