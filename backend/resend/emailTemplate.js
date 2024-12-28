export const verificationTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="background-color:#f9f9f9;color:#333;font-family:Arial, sans-serif;line-height:1.6;margin:0;padding:0">
    <table
      align="center"
      width="100%"
      style="max-width:600px;margin:20px auto;background-color:#fff;border:1px solid #ddd;padding:20px;border-radius:8px"
    >
      <tr>
        <td style="text-align:center">
          <h1 style="font-size:24px;color:#333;margin:0">Verify Your Email</h1>
          <p style="font-size:16px;color:#555;margin:20px 0">
            Welcome to OneClickAway! Use the verification code below to activate your account:
          </p>
          <p
            style="font-size:32px;font-weight:bold;color:#000;margin:20px 0;border:1px solid #ddd;padding:10px;border-radius:4px;display:inline-block"
          >
            {verificationToken}
          </p>
          <p style="font-size:14px;color:#888;margin:20px 0">
            (This code is valid for 24 hours)
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const confirmationTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Account Verified</title>
  </head>
  <body style="background-color:#f9f9f9;color:#333;font-family:Arial, sans-serif;line-height:1.6;margin:0;padding:0">
    <table
      align="center"
      width="100%"
      style="max-width:600px;margin:20px auto;background-color:#fff;border:1px solid #ddd;padding:20px;border-radius:8px"
    >
      <tr>
        <td style="text-align:center">
          <h1 style="font-size:24px;color:#333;margin:0">Account Verified</h1>
          <p style="font-size:16px;color:#555;margin:20px 0">
            Hi <strong>{userName}</strong>,
          </p>
          <p style="font-size:16px;color:#555;margin:20px 0">
            Congratulations! Your OneClickAway account has been successfully verified. Start using the wallet for seamless digital payments.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const resetPasswordTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password</title>
  </head>
  <body style="background-color:#f9f9f9;color:#333;font-family:Arial, sans-serif;line-height:1.6;margin:0;padding:0">
    <table
      align="center"
      width="100%"
      style="max-width:600px;margin:20px auto;background-color:#fff;border:1px solid #ddd;padding:20px;border-radius:8px"
    >
      <tr>
        <td style="text-align:center">
          <h1 style="font-size:24px;color:#333;margin:0">Reset Your Password</h1>
          <p style="font-size:16px;color:#555;margin:20px 0">
            Click the link below to reset your OneClickAway account password:
          </p>
          <p style="margin:20px 0">
            <a href="{resetURL}" style="font-size:16px;color:#fff;background-color:#007bff;padding:10px 20px;text-decoration:none;border-radius:4px;display:inline-block">
              Reset Password
            </a>
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const resetPasswordSuccessTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Successful</title>
  </head>
  <body style="background-color:#f9f9f9;color:#333;font-family:Arial, sans-serif;line-height:1.6;margin:0;padding:0">
    <table
      align="center"
      width="100%"
      style="max-width:600px;margin:20px auto;background-color:#fff;border:1px solid #ddd;padding:20px;border-radius:8px"
    >
      <tr>
        <td style="text-align:center">
          <h1 style="font-size:24px;color:#333;margin:0">Password Reset Successful</h1>
          <p style="font-size:16px;color:#555;margin:20px 0">
            Your OneClickAway account password has been reset successfully. If you didn't request this, please contact support immediately.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
