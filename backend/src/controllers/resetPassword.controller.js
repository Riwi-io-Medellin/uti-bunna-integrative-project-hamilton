import { resetPassword } from "../services/resetToken.service.js";

export const resetPasswordController = async (req, res, next) => {
  try {

    const newPassword = req.body.password;
    const result = await resetPassword(req.user.id, newPassword);

    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid or expired reset token") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};