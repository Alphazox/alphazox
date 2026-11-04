import nodemailer from 'nodemailer';
import { escapeFields, isValidEmail, rateLimit, MAIL_TO } from './_lib.js';

/**
 * Vercel Serverless Function – Newsletter Subscription Form
 * POST /api/subscribe
 * Sends subscription notification to the MAIL_TO addresses via SMTP/Gmail
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  if (!rateLimit(req, res, 'subscribe', 5, 10 * 60_000)) return;

  const raw = req.body || {};
  if (raw.website) return res.status(200).json({ success: true, message: 'Thank you!' }); // honeypot
  const { name, email, industryRole } = escapeFields(raw, 300);

  if (!name || !email || !industryRole) {
    return res.status(400).json({ success: false, error: 'Name, Email, and Industry/Role are required.' });
  }
  if (!isValidEmail(raw.email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }

  const senderEmail = process.env.SMTP_USER;
  const appPassword = (process.env.SMTP_PASS || '').replace(/\s/g, '');
  if (!senderEmail || !appPassword) {
    console.error('SMTP_USER / SMTP_PASS environment variables are not set.');
    return res.status(500).json({ success: false, error: 'Email service is not configured. Please email support@alphazox.com directly.' });
  }

  const htmlContent = `
    <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0052FF 0%, #00C2FF 100%); color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px;">New Newsletter Subscription</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #334155;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;">Name:</td><td style="padding: 8px 0; color: #0f172a;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td><td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Industry / Role:</td><td style="padding: 8px 0; color: #0f172a;">${industryRole}</td></tr>
        </table>
        <div style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
          Subscribed on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </div>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: senderEmail, pass: appPassword },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"ALPHAZOX Web Inquiries" <${senderEmail}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `New Newsletter Subscription – ${name}`,
      html: htmlContent,
    });

    console.log(`[Subscribe] Email sent to ${MAIL_TO.join(', ')} from ${email}`);
    return res.status(200).json({
      success: true,
      message: `Welcome, ${name}! You have successfully subscribed to the ALPHAZOX newsletter.`,
    });
  } catch (err) {
    console.error('[Subscribe] Email error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to process subscription. Please try again.' });
  }
}
