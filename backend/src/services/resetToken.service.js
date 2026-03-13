import * as userRepository from "../repositories/user.repository.js";
import { generateResetToken } from "../utils/resetToken.js";
import { sendResetEmail } from "../utils/mailer.utils.js";
import { hashPassword } from "../utils/hash.js";

export const forgotPassword = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  if (user.rowCount === 0) {
    return { message: "If the email is registered, check your inbox for instructions." };
  }
  const userId = user.rows[0].user_id;
  const token = generateResetToken(userId);
  await sendResetEmail(email, token);
  return { message: "Password reset link sent. Check your email (including spam)." };
};

export const resetPassword = async (userId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);
  const result = await userRepository.updatePassword(userId, hashedPassword);
  return { message: "Password updated successfully", user: result.rows[0] };
};

