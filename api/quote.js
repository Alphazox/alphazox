import nodemailer from 'nodemailer';

/**
 * Vercel Serverless Function – Quote / Consultation Request Form
 * POST /api/quote
 * Sends enterprise quote request to support@alphazox.com via SMTP/Gmail
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const {
    name, orgName, orgIndustry, email, phone,
    serviceInterest, projectScope, budgetRange, timeline, dateTimePreference, message
  } = req.body || {};

  if (!name || !email || !phone || !orgName) {
    return res.status(400).json({ success: false, error: 'Name, Email, Phone and Company are required.' });
  }

  const senderEmail = process.env.SMTP_USER || 'prasanthibolla29@gmail.com';
  const appPassword = (process.env.SMTP_PASS || 'wdvwojigerezkgnb').replace(/\s/g, '');

  const htmlContent = `
    <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #0052FF 0%, #00C2FF 100%); color: white; padding: 20px; text-align: center;">
        <h2 style="margin: 0; font-size: 22px;">New Quote / Consultation Request</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #334155;">
        <h3 style="margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 40%; color: #64748b;">Name:</td><td style="padding: 8px 0; color: #0f172a;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td><td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Company:</td><td style="padding: 8px 0; color: #0f172a;">${orgName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Industry:</td><td style="padding: 8px 0; color: #0f172a;">${orgIndustry || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service Interest:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${serviceInterest || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Budget Range:</td><td style="padding: 8px 0; color: #10b981; font-weight: bold;">${budgetRange || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Timeline:</td><td style="padding: 8px 0; color: #0f172a;">${timeline || 'N/A'}</td></tr>
          ${dateTimePreference ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Preferred Time:</td><td style="padding: 8px 0; color: #0f172a;">${dateTimePreference}</td></tr>` : ''}
        </table>
        ${(projectScope || message) ? `
        <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Project Scope</h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; color: #475569; white-space: pre-wrap;">${projectScope || message}</div>
        ` : ''}
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
      to: 'support@alphazox.com',
      cc: senderEmail,
      replyTo: email,
      subject: `New Quote Request from ${name} – ${orgName}`,
      html: htmlContent,
    });

    console.log(`[Quote] Email sent to support@alphazox.com from ${email}`);
    return res.status(200).json({
      success: true,
      message: 'Your quote request has been received. Our enterprise team will evaluate it and reach out shortly.',
    });
  } catch (err) {
    console.error('[Quote] Email error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
}
