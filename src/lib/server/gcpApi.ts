"use server";

import { Message } from "@/types/message";
import { gmailAuth } from "../gcp/gmailApi";

export const sendEmail = async (
  to: string,
  subject: string,
  message: string
) => {
  try {
    const gmail = await gmailAuth();

    const rawMessage = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/html; charset=utf-8",
      "",
      message,
    ].join("\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

    return true;
  } catch (error: unknown) {
    throw new Error("Failed to send email due to an unknown error.");
  }
};

export const sendEmailToAdmin = async (message: Message) => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error("Admin email is not configured.");
  }

  const siteUrl = process.env.SITE_URL;

  const platformLink = siteUrl ? `${siteUrl}/admin` : "#";

  const subject = `GDG ID Platform - New Message from ${message.name}`;

  const htmlBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="margin-bottom: 10px;">New Message Received</h2>

    <p><strong>Message ID:</strong> ${message.id}</p>
    <p><strong>Name:</strong> ${message.name}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Subject:</strong> ${message.subject}</p>

    <p><strong>Message:</strong></p>
    <pre style="
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 12px;
      white-space: pre-wrap;
      font-family: inherit;
    ">
${message.message}
    </pre>

    <p style="margin-top: 20px;">
      <a href="${platformLink}" 
         style="display: inline-block; background: #1a73e8; color: white; padding: 10px 16px; text-decoration: none; border-radius: 4px;">
        View on Platform
      </a>
    </p>
  </div>
`;

  await sendEmail(adminEmail, subject, htmlBody);
};
