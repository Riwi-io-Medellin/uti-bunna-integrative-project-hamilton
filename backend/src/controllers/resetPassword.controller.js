import { resetPassword } from "../services/resetToken.service.js";
import * as userRepository from "../repositories/user.repository.js";

export const resetPasswordController = async (req, res, next) => {
  try {
    const { email, password: newPassword } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    // Verify email belongs to user (req.user.id from auth middleware)
    const user = await userRepository.findUserByEmail(email);
    if (user.rowCount === 0 || user.rows[0].user_id !== req.user.id) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const result = await resetPassword(req.user.id, newPassword);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid or expired reset token") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

