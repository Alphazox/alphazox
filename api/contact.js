import nodemailer from 'nodemailer';
import { checkHoneypot, escapeFields, isValidEmail, oneLine, isValidPhone, rateLimit, MAIL_TO } from './_lib.js';

/**
 * Vercel Serverless Function – Contact Form
 * POST /api/contact
 * Sends form submission to support@alphazox.com via SMTP/Gmail
 */
export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // 5 messages per IP per 10 minutes.
  if (!rateLimit(req, res, 'contact', 5, 10 * 60_000)) return;
  if (!checkHoneypot(req, res)) return;

  const raw = req.body || {};
  const { name, orgName, email, phone, message } = escapeFields(raw);

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, Email, and Message are required.' });
  }
  if (!isValidEmail(raw.email)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  }
  if (phone && !isValidPhone(raw.phone)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid phone number using digits only (7–15 digits, optional + country code).' });
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
        <h2 style="margin: 0; font-size: 22px;">New Contact Submission</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #334155;">
        <h3 style="margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Organization:</td>
            <td style="padding: 8px 0; color: #0f172a;">${orgName || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
            <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td>
            <td style="padding: 8px 0; color: #0f172a;">${phone || 'N/A'}</td>
          </tr>
        </table>
        <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Message</h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; color: #475569; white-space: pre-wrap;">${message}</div>
        <div style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
          Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
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
      replyTo: raw.email.trim(),
      subject: oneLine(`New Inquiry from ${raw.name}${raw.orgName ? ' – ' + raw.orgName : ''}`),
      html: htmlContent,
    });

    console.log(`[Contact] Email sent to ${MAIL_TO.join(', ')} from ${email}`);
    return res.status(200).json({
      success: true,
      message: 'Thank you for contacting ALPHAZOX! Our team will reach out to you shortly.',
    });
  } catch (err) {
    console.error('[Contact] Email error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
}
