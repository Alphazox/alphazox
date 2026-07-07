import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function – Newsletter Subscription Form
 * POST /api/subscribe
 * Sends subscription notification to support@alphazox.com via SMTP/Gmail
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, industryRole } = req.body || {};

  if (!name || !email || !industryRole) {
    return res.status(400).json({ success: false, error: 'Name, Email, and Industry/Role are required.' });
  }

  const senderEmail = process.env.SMTP_USER || 'prasanthibolla29@gmail.com';
  const appPassword = (process.env.SMTP_PASS || 'wdvwojigerezkgnb').replace(/\s/g, '');

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
      to: 'support@alphazox.com',
      cc: senderEmail,
      replyTo: email,
      subject: `New Newsletter Subscription – ${name}`,
      html: htmlContent,
    });

    console.log(`[Subscribe] Email sent to support@alphazox.com from ${email}`);
    return res.status(200).json({
      success: true,
      message: `Welcome, ${name}! You have successfully subscribed to the ALPHAZOX newsletter.`,
    });
  } catch (err) {
    console.error('[Subscribe] Email error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to process subscription. Please try again.' });
  }
}
