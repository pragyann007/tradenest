import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/AsyncHandler.js";
dotenv.config()

export const sendOtpMail = asyncHandler(async (email, resetUrl) => {

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const resetPasswordMail = {
        from: `"Tradenest Security" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Tradenest Password",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #333; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 24px; border-radius: 8px;">
              
              <h2 style="color: #0a3d62;">🔐 Tradenest Password Reset</h2>
      
              <p>Hello,</p>
      
              <p>
                We received a request to reset the password for your <b>Tradenest</b> account.
                Click the button below to securely reset your password.
              </p>
      
              <div style="text-align: center; margin: 30px 0;">
                <a 
                  href="${resetUrl}" 
                  style="
                    background-color: #1e90ff;
                    color: #ffffff;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    display: inline-block;
                  "
                >
                  Reset Password
                </a>
              </div>
      
              <p style="font-size: 14px;">
                This password reset link will expire in <b>15 minutes</b> and can be used only once.
              </p>
      
              <hr style="margin: 24px 0;" />
      
              <p style="font-size: 13px; color: #666;">
                If you did not request a password reset, you can safely ignore this email.
                Your account will remain secure.
              </p>
      
              <p style="margin-top: 24px;">
                Regards,<br />
                <b>Tradenest Security Team</b>
              </p>
            </div>
          </div>
        `,
      };
      
        
      const info = await transporter.sendMail(resetPasswordMail);
      console.log(info)
      console.log("✅ Mail sent:", info.response);
      
   })



