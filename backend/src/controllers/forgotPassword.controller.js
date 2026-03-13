import { forgotPassword } from "../services/resetToken.service.js";
import * as userRepository from "../repositories/user.repository.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userRepository.findUserByEmail(email);
    if (user.rowCount === 0 || user.rows[0].user_id !== req.user.id) {
      return res.status(400).json({ error: "Email does not match account" });
    }
    const result = await forgotPassword(email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

