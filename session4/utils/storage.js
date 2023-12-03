import * as fs from "fs";
import {validateObj} from "./validate.js";

const getAllUsers = () => {
    const users = [];

    try {
        const usersStorage = fs.readFileSync("./storage/usersToken.json");

        if (usersStorage.toString() !== "" && usersStorage.toString() !== null) {
            users.push(...JSON.parse(usersStorage.toString()));
            // console.log(users);
        }
    } catch (err) {
        console.log(err);
    }

    return users;
}

export const getUserByName = (username = "") => {
    return getAllUsers().filter(user => user.username === username)[0];
}

export const insertUser = (obj = {}) => {
    let isInserted = false;
    const isValidateObj = validateObj(obj);

    if (isValidateObj) {
        try {
            fs.writeFileSync('./storage/usersToken.json', JSON.stringify([...getAllUsers(), obj]));
            isInserted = true;
        } catch (err) {
            console.error(err);
        }
    }

    return isInserted;
}