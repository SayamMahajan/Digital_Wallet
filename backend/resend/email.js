import { resend } from "./config.js";
import { verificationTemplate, confirmationTemplate, resetPasswordTemplate, resetPasswordSuccessTemplate } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "OneClickAway - Email Verification",
      html: verificationTemplate.replace("{verificationToken}", verificationToken),
    });

    if (error) {
      throw new Error("Failed to send verification email");
    }
  } catch (error) {
    throw error;
  }
};

export const sendConfirmationEmail = async (email, firstName) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "OneClickAway - Account Verified",
      html: confirmationTemplate.replace("{userName}", firstName),
    });

    if (error) {
      throw new Error("Failed to send confirmation email");
    }

  } catch (error) {
    throw error;
  }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "OneClickAway - Reset Password",
      html: resetPasswordTemplate.replace("{resetURL}", resetURL),
    });

    if (error) {
      throw new Error("Failed to send reset password email");
    }

  } catch (error) {
    throw error;
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "OneClickAway - Password Reset Successful",
      html: resetPasswordSuccessTemplate,
    });

    if (error) {
      throw new Error("Failed to send reset password success email");
    }

  } catch (error) {
    throw error;
  }
};
