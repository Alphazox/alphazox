import nodemailer from 'nodemailer';
import multer from 'multer';

/**
 * Vercel Serverless Function – Career Application Form
 * POST /api/careers
 * Sends career application details and resume to support@alphazox.com via SMTP/Gmail
 */
export const config = { api: { bodyParser: false } };

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    const extension = file.originalname.split('.').pop()?.toLowerCase();
    if (['pdf', 'doc', 'docx'].includes(extension)) {
      callback(null, true);
    } else {
      callback(new Error('Please upload a PDF or Word document.'));
    }
  },
});

function parseResume(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('resume')(req, res, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await parseResume(req, res);
  } catch (err) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'Resume must be 10 MB or smaller.'
      : err.message;
    return res.status(status).json({ success: false, error: message });
  }

  const {
    name, email, phone, location,
    position, experienceLevel, technicalSkills,
    githubProfile, coverLetter
  } = req.body;
  const resume = req.file;

  if (!name || !email || !phone || !location || !position || !experienceLevel || !technicalSkills || !coverLetter) {
    return res.status(400).json({ success: false, error: 'All fields except GitHub profile are required.' });
  }
  if (!resume) {
    return res.status(400).json({ success: false, error: 'Please attach your resume.' });
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
        <h2 style="margin: 0; font-size: 22px;">New Career Application</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #334155;">
        <h3 style="margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Applicant Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 40%; color: #64748b;">Name:</td><td style="padding: 8px 0; color: #0f172a;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Position Applied:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${position}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td><td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Location:</td><td style="padding: 8px 0; color: #0f172a;">${location}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Experience Level:</td><td style="padding: 8px 0; color: #0f172a;">${experienceLevel}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">Technical Skills:</td><td style="padding: 8px 0; color: #0f172a;">${technicalSkills}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #64748b;">GitHub Profile:</td><td style="padding: 8px 0; color: #2563eb;">${githubProfile || 'N/A'}</td></tr>
        </table>
        <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Cover Letter</h3>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; color: #475569; white-space: pre-wrap;">${coverLetter}</div>
        <div style="margin-top: 20px; padding: 12px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;">
          <strong>Resume attached:</strong> ${resume.originalname.replace(/[\\/]/g, '_').replace(/[\r\n]/g, '')}
        </div>
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
      subject: `New Job Application: ${position} – ${name}`,
      html: htmlContent,
      attachments: [{
        filename: resume.originalname.replace(/[\\/]/g, '_').replace(/[\r\n]/g, ''),
        content: resume.buffer,
        contentType: resume.mimetype,
      }],
    });

    console.log(`[Careers] Email sent to support@alphazox.com from ${email}`);
    return res.status(200).json({
      success: true,
      message: `Application for ${position} submitted successfully! Thank you, ${name}. Our HR team will review your profile.`,
    });
  } catch (err) {
    console.error('[Careers] Email error:', err.message);
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
}
