import userService from "../services/users.service.js";
import usersService from "../services/users.service.js";

export const registerController = async (req, res, next) => {
  const access_token = await userService.register(req.body);
  return res.json({
    message: "Register successfully",
    result: {
      access_token,
    },
  });
};

export const loginController = async (req, res, next) => {
  const user_id = req.user._id;
  const access_token = await userService.login(user_id);
  return res.json({
    message: "Login successfully",
    result: {
      access_token,
    },
  });
};

export const getMeController = async (req, res, next) => {
  const user = req.decode_authorization.user_id ? await usersService.getUser(req.decode_authorization.user_id) : {};
  return res.json(user);
};
