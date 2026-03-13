import { forgotPassword } from "../services/resetToken.service.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    const result = await forgotPassword(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

