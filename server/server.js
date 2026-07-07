import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ─── File-Based Persistent Storage ──────────────────────────────────────────

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_FILES = {
  contacts: path.join(DATA_DIR, 'contacts.json'),
  careers: path.join(DATA_DIR, 'careers.json'),
  subscribers: path.join(DATA_DIR, 'subscribers.json'),
};

// Initialize JSON files if they don't exist
Object.values(DB_FILES).forEach((filePath) => {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
});

// Helper: Read JSON file
function readDB(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

// Helper: Write JSON file
function writeDB(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── MongoDB Configuration ──────────────────────────────────────────────────

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alphazox';

mongoose.connect(MONGO_URI)
  .then(() => console.log(`[MongoDB Connected]: ${MONGO_URI}`))
  .catch(err => console.error('[MongoDB Error]:', err.message));

// MongoDB Schemas
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  orgName: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const ContactModel = mongoose.model('Contact', contactSchema);

const quoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  orgName: String,
  orgIndustry: String,
  serviceInterest: String,
  budgetRange: String,
  timeline: String,
  projectScope: String,
  timestamp: { type: Date, default: Date.now }
});
const QuoteModel = mongoose.model('Quote', quoteSchema);

const careerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  position: String,
  experienceLevel: String,
  technicalSkills: String,
  githubProfile: String,
  coverLetter: String,
  resumeFile: String,
  resumeOriginalName: String,
  timestamp: { type: Date, default: Date.now }
});
const CareerModel = mongoose.model('Career', careerSchema);

const subscriberSchema = new mongoose.Schema({
  name: String,
  email: String,
  industryRole: String,
  timestamp: { type: Date, default: Date.now }
});
const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);

// ─── Email Transport Configuration ──────────────────────────────────────────

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const OUTBOX_FILE = path.join(DATA_DIR, 'outbox_emails.json');
if (!fs.existsSync(OUTBOX_FILE)) {
  fs.writeFileSync(OUTBOX_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// ─── Recipient: all form submissions notify this address ─────────────────────
const RECIPIENT_EMAIL = 'support@alphazox.com';
const CC_EMAIL = process.env.SMTP_USER || 'prasanthibolla29@gmail.com'; // CC as backup

// Function to dispatch email
async function sendEmail(subject, htmlContent, data) {
  // NOTE: Gmail SMTP requires the 'from' address to exactly match the
  // authenticated SMTP_USER account. Using any other domain (e.g. alphazox.com)
  // will cause DMARC/SPF failures and silent delivery drops.
  const senderEmail = process.env.SMTP_USER;
  const appPassword = (process.env.SMTP_PASS || '').replace(/\s/g, ''); // strip spaces

  const mailOptions = {
    from: `"ALPHAZOX Web Inquiries" <${senderEmail}>`,
    to: RECIPIENT_EMAIL,
    cc: CC_EMAIL !== RECIPIENT_EMAIL ? CC_EMAIL : undefined,
    replyTo: data.email || senderEmail,
    subject,
    html: htmlContent,
  };

  // Always save a local copy to outbox for backup / audit
  try {
    const outbox = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf-8') || '[]');
    outbox.push({
      id: data.id,
      to: RECIPIENT_EMAIL,
      from: mailOptions.from,
      replyTo: mailOptions.replyTo,
      subject: mailOptions.subject,
      html: mailOptions.html,
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(OUTBOX_FILE, JSON.stringify(outbox, null, 2), 'utf-8');
    console.log(`[Outbox]: Saved copy → ${OUTBOX_FILE}`);
  } catch (err) {
    console.error('[Outbox Save Error]:', err.message);
  }

  // Send via Gmail SMTP
  if (senderEmail && appPassword) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: senderEmail,
        pass: appPassword,   // Gmail App Password (spaces stripped)
      },
      tls: { rejectUnauthorized: false },
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Email SUCCESS]: Sent to ${RECIPIENT_EMAIL} | MessageID: ${info.messageId}`);
    } catch (err) {
      console.error(`[Email FAIL]: Could not send to ${RECIPIENT_EMAIL}`);
      console.error(`  → Code: ${err.code} | Response: ${err.response || err.message}`);
      console.error(`  → SMTP User: ${senderEmail} | Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
    }
  } else {
    console.warn(`[Email SKIP]: No SMTP credentials in .env — email saved to outbox only.`);
  }
}

async function sendQueryEmail(contactData) {
  const subject = `New Inquiry from ${contactData.name} - ${contactData.orgName}`;
  const html = `
      <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0052FF 0%, #00C2FF 100%); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">New Contact Submission</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #334155;">
          <h3 style="margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Client Contact Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;">Client Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Organization:</td>
              <td style="padding: 8px 0; color: #0f172a;">${contactData.orgName || 'N/A'} ${contactData.orgIndustry ? `(${contactData.orgIndustry})` : ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${contactData.email}">${contactData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="tel:${contactData.phone || 'N/A'}">${contactData.phone || 'N/A'}</a></td>
            </tr>
            ${contactData.serviceInterest ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service Interest:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${contactData.serviceInterest}</td>
            </tr>` : ''}
            ${contactData.budgetRange ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Budget Range:</td>
              <td style="padding: 8px 0; color: #10b981; font-weight: bold;">${contactData.budgetRange}</td>
            </tr>` : ''}
            ${contactData.timeline ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Timeline:</td>
              <td style="padding: 8px 0; color: #0f172a;">${contactData.timeline}</td>
            </tr>` : ''}
          </table>

          ${contactData.projectScope || contactData.message ? `
          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b; margin-top: 24px;">Project Scope</h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; color: #475569; font-style: italic; white-space: pre-wrap;">
            ${contactData.projectScope || contactData.message}
          </div>` : ''}

          <div style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
            Submitted on ${new Date(contactData.timestamp).toLocaleString()} | Submission ID: ${contactData.id}
          </div>
        </div>
      </div>
    `;
  await sendEmail(subject, html, contactData);
}

async function sendCareerEmail(careerData) {
  const subject = `New Job Application from ${careerData.name} - ${careerData.position}`;
  const html = `
      <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0052FF 0%, #00C2FF 100%); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">New Career Application</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #334155;">
          <h3 style="margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b;">Applicant Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${careerData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Position Applied:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${careerData.position}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${careerData.email}">${careerData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="tel:${careerData.phone}">${careerData.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Location:</td>
              <td style="padding: 8px 0; color: #0f172a;">${careerData.location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Experience Level:</td>
              <td style="padding: 8px 0; color: #0f172a;">${careerData.experienceLevel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Technical Skills:</td>
              <td style="padding: 8px 0; color: #0f172a;">${careerData.technicalSkills}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">GitHub Profile:</td>
              <td style="padding: 8px 0; color: #2563eb;">${careerData.githubProfile}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; color: #1e293b; margin-top: 24px;">Cover Letter</h3>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; color: #475569; font-style: italic; white-space: pre-wrap;">
            ${careerData.coverLetter}
          </div>

          ${careerData.resumeFile ? `
          <div style="margin-top: 20px; padding: 12px; background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px;">
            <strong>Resume Attached:</strong> ${careerData.resumeOriginalName}
          </div>` : ''}

          <div style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
            Submitted on ${new Date(careerData.timestamp).toLocaleString()} | Submission ID: ${careerData.id}
          </div>
        </div>
      </div>
    `;
  await sendEmail(subject, html, careerData);
}

async function sendSubscribeEmail(subscriberData) {
  const subject = `New Newsletter Subscription from ${subscriberData.name}`;
  const html = `
      <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0052FF 0%, #00C2FF 100%); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">New Newsletter Subscription</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">ALPHAZOX Portal</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #334155;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #64748b;">Name:</td>
              <td style="padding: 8px 0; color: #0f172a;">${subscriberData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${subscriberData.email}">${subscriberData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Industry/Role:</td>
              <td style="padding: 8px 0; color: #0f172a;">${subscriberData.industryRole}</td>
            </tr>
          </table>
          <div style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
            Submitted on ${new Date(subscriberData.timestamp).toLocaleString()} | Submission ID: ${subscriberData.id}
          </div>
        </div>
      </div>
    `;
  await sendEmail(subject, html, subscriberData);
}

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ─── API: Contact Submission (General) ───────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, orgName, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, Email, and Message are required.' });
  }

  const submissionData = {
    name, orgName, email, phone, projectScope: message,
    timestamp: new Date()
  };

  try {
    const contactDoc = new ContactModel({ name, orgName, email, phone, message });
    await contactDoc.save();
    console.log('[MongoDB]: Contact saved', contactDoc._id);
    submissionData.id = contactDoc._id;
  } catch (err) {
    console.error('[MongoDB Error]:', err.message);
    submissionData.id = Date.now();
  }

  sendQueryEmail(submissionData).catch(err => console.error(err));

  return res.status(200).json({
    success: true,
    message: 'Thank you for contacting Astikos! Your request has been received.',
    submissionId: submissionData.id
  });
});

// ─── API: Quote Submission (Enterprise) ──────────────────────────────────────

app.post('/api/quote', async (req, res) => {
  const { name, orgName, orgIndustry, email, phone, serviceInterest, projectScope, budgetRange, timeline } = req.body;

  if (!name || !email || !phone || !orgName || !orgIndustry || !serviceInterest || !projectScope || !budgetRange || !timeline) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  const submissionData = {
    name, orgName, orgIndustry, email, phone,
    serviceInterest, projectScope, budgetRange, timeline,
    timestamp: new Date()
  };

  try {
    const quoteDoc = new QuoteModel(submissionData);
    await quoteDoc.save();
    console.log('[MongoDB]: Quote saved', quoteDoc._id);
    submissionData.id = quoteDoc._id;
  } catch (err) {
    console.error('[MongoDB Error]:', err.message);
    submissionData.id = Date.now();
  }

  sendQueryEmail(submissionData).catch(err => console.error(err));

  return res.status(200).json({
    success: true,
    message: 'Your quote request has been received. Our enterprise team will evaluate it and reach out shortly.',
    submissionId: submissionData.id
  });
});

// ─── API: Careers Submission ─────────────────────────────────────────────────

app.post('/api/careers', upload.single('resume'), async (req, res) => {
  const { name, email, phone, location, position, experienceLevel, technicalSkills, githubProfile, coverLetter } = req.body;
  const file = req.file;

  if (!name || !email || !phone || !location || !position || !experienceLevel || !technicalSkills || !coverLetter) {
    return res.status(400).json({ success: false, error: 'All fields except GitHub profile are required.' });
  }

  const submissionData = {
    name, email, phone, location,
    position, experienceLevel, technicalSkills,
    githubProfile: githubProfile || 'N/A',
    coverLetter,
    resumeFile: file ? file.filename : null,
    resumeOriginalName: file ? file.originalname : null,
    timestamp: new Date()
  };

  try {
    const careerDoc = new CareerModel(submissionData);
    await careerDoc.save();
    console.log('[MongoDB]: Career application saved', careerDoc._id);
    submissionData.id = careerDoc._id;
  } catch (err) {
    console.error('[MongoDB Error]:', err.message);
    submissionData.id = Date.now();
  }

  // Also save to file for backup
  const records = readDB(DB_FILES.careers);
  records.push({ ...submissionData, id: submissionData.id, timestamp: new Date().toISOString() });
  writeDB(DB_FILES.careers, records);

  sendCareerEmail(submissionData).catch(err => console.error(err));

  return res.status(200).json({
    success: true,
    message: `Application for ${position} submitted successfully! Thank you, ${name}. Our HR team will review your profile.`,
    submissionId: submissionData.id
  });
});

// ─── API: Newsletter Subscription ────────────────────────────────────────────

app.post('/api/subscribe', async (req, res) => {
  const { name, email, industryRole } = req.body;

  if (!name || !email || !industryRole) {
    return res.status(400).json({ success: false, error: 'Name, Email and Role are required.' });
  }

  // Check for duplicate email
  const records = readDB(DB_FILES.subscribers);
  const exists = records.find(r => r.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(200).json({ success: true, message: `You are already subscribed, ${name}! We appreciate your continued interest.` });
  }

  const subscriberData = {
    name, email, industryRole,
    timestamp: new Date()
  };

  try {
    const subscriberDoc = new SubscriberModel(subscriberData);
    await subscriberDoc.save();
    console.log('[MongoDB]: Subscriber saved', subscriberDoc._id);
    subscriberData.id = subscriberDoc._id;
  } catch (err) {
    console.error('[MongoDB Error]:', err.message);
    subscriberData.id = Date.now();
  }

  // Also save to file for backup
  records.push({ ...subscriberData, id: subscriberData.id, timestamp: new Date().toISOString() });
  writeDB(DB_FILES.subscribers, records);

  sendSubscribeEmail(subscriberData).catch(err => console.error(err));

  return res.status(200).json({
    success: true,
    message: `Welcome, ${name}! You have successfully subscribed to the ALPHAZOX newsletter.`
  });
});

// ─── API: Chatbot ─────────────────────────────────────────────────────────────

app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ success: false, error: 'Message query is required.' });

  const query = message.toLowerCase();
  let reply = '';

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    reply = "Hello! I am ALPHAZOX's virtual assistant. How can I help you transform your business today? You can ask me about our 45 services, industries we serve, careers, global capability centers (GCC), or how to contact us.";
  } else if (query.includes('service') || query.includes('what do you do') || query.includes('offerings') || query.includes('45')) {
    reply = "ALPHAZOX offers 45 comprehensive services across 9 practice areas:\n\n" +
      "1. **Core IT Services** (7): Custom App Dev, Maintenance, Digital Transformation, QA, DevOps, Cloud/Salesforce, Data Science.\n" +
      "2. **Enterprise Solutions** (2): SAP Services, Microsoft Services.\n" +
      "3. **Professional Services** (6): Talent Augmentation, Software Procurement, Agile Squads, On-Demand Support, RIPS, Managed Services.\n" +
      "4. **Customer Support** (4): Customer Service, Technical Support, Virtual Assistants, Remote Surveillance.\n" +
      "5. **Financial Management** (6): Bookkeeping, Payroll, MIS Reporting, Controller Services, Tax, E-Commerce Integrations.\n" +
      "6. **Infrastructure** (4): IT Infrastructure, Security, GCC, Expense Management.\n" +
      "7. **Digital Integration** (6): Digital Integration, B2B/EDI, API Management, RPA, IDP, Process Mining.\n" +
      "8. **Digital Marketing** (4): Digital Marketing, Web Services, Solution Consulting, QA Compliance.\n" +
      "9. **Low-Code & AI** (5): Low-Code, Generative AI, Intelligent Automation, Advanced Analytics, Cloud Engineering.";
  } else if (query.includes('rpa') || query.includes('automation') || query.includes('uipath')) {
    reply = "At ALPHAZOX, we drive efficiency through Robotic Process Automation (RPA) and Intelligent Document Processing (IDP). We support **UiPath, Power Automate, Blue Prism, and Automation Anywhere**. Our services range from Bot Development and Process Mining to building Centers of Excellence (COE).";
  } else if (query.includes('gcc') || query.includes('global capability') || query.includes('india')) {
    reply = "ALPHAZOX is a premier partner for establishing **Global Capability Centers (GCCs)**. We offer 'GCC-as-a-Service', helping global companies set up and manage high-performance centers in India. We handle regulatory compliance, legal entity establishment, office setup (access to 2M+ sq. ft. of Tier 1 workspace), talent acquisition, and operational excellence using our 'Zero Surprise Framework'.";
  } else if (query.includes('cloud') || query.includes('devops') || query.includes('azure') || query.includes('aws')) {
    reply = "Our Cloud & DevOps services empower enterprises with cloud-native scalability. We provide cloud strategy, architecture advisory, and migration services in partnership with AWS, Microsoft Azure, and Google Cloud. We also configure automated CI/CD pipelines, container orchestration (Docker/Kubernetes), and 24/7 SLA-driven operations.";
  } else if (query.includes('data science') || query.includes('ai') || query.includes('generative ai') || query.includes('ml')) {
    reply = "ALPHAZOX unlocks the value of data through Advanced Analytics, Machine Learning, and Generative AI. Through **ALPHAZOX Innovation Labs**, we offer the **Rapid60 program** to help organizations kickstart their Generative AI journey within 60 days, including custom virtual assistants, semantic search, and document intelligence.";
  } else if (query.includes('sap')) {
    reply = "Our SAP Services team provides end-to-end intelligent enterprise solutions including SAP S/4HANA consulting, implementation, cloud transformation, advanced analytics, and process automation. Our SAP-certified team delivers within timeline and budget.";
  } else if (query.includes('financial') || query.includes('bookkeeping') || query.includes('accounting') || query.includes('payroll') || query.includes('tax')) {
    reply = "ALPHAZOX provides comprehensive Financial Management services: **Bookkeeping** (50+ certified professionals, 40-50% cost savings), **Payroll Processing** (multi-state & international), **Financial & MIS Reporting**, **Controller Services**, **Tax Services** (with IRS audit defense), and **E-Commerce Integrations**.";
  } else if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('office')) {
    reply = "You can reach ALPHAZOX at:\n\n" +
      "• **US Office**: Austin, TX | Phone: +1 (716) 939-6514 (Meet by Appointment Only)\n" +
      "• **India Offices**: Hyderabad & Visakhapatnam | Phone: +91-991-991-8458 or +91-868-888-8458\n" +
      "• **Email**: info@alphazox.com\n\n" +
      "Feel free to submit a query through our Contact section!";
  } else if (query.includes('career') || query.includes('job') || query.includes('apply') || query.includes('work')) {
    reply = "We are always looking for talented minds to join our team at ALPHAZOX! We foster a performance-driven culture with equal growth opportunities. Please visit our **Careers** section to view open positions and submit your CV.";
  } else if (query.includes('monitoring') || query.includes('surveillance') || query.includes('security')) {
    reply = "Our Remote Video Monitoring & e-Surveillance solutions are powered by **VDO Intel**, using AI computer vision to automate safety. We offer 24/7 live video monitoring, solar-powered surveillance for remote sites, and service lane monitoring to eliminate false claims.";
  } else {
    reply = "Thank you for asking! ALPHAZOX is a trusted digital transformation partner with 45 services across 9 practice areas. We specialize in custom software development, cloud engineering, RPA automation, data science, financial management, and global operations. Please specify if you'd like details on any area, or visit our Services page to explore all 45 capabilities!";
  }

  return res.status(200).json({ success: true, reply });
});

// ─── Admin Read Endpoints (Protected by header in production) ─────────────────

app.get('/api/admin/contacts', (req, res) => {
  const records = readDB(DB_FILES.contacts);
  res.json({ success: true, count: records.length, data: records });
});

app.get('/api/admin/careers', (req, res) => {
  const records = readDB(DB_FILES.careers);
  res.json({ success: true, count: records.length, data: records });
});

app.get('/api/admin/subscribers', (req, res) => {
  const records = readDB(DB_FILES.subscribers);
  res.json({ success: true, count: records.length, data: records });
});

app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      contacts: readDB(DB_FILES.contacts).length,
      careers: readDB(DB_FILES.careers).length,
      subscribers: readDB(DB_FILES.subscribers).length,
    }
  });
});

// ─── Serve compiled static files in production ────────────────────────────────

const frontendBuildPath = path.join(__dirname, '../dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 [ALPHAZOX Backend] Running on http://localhost:${PORT}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
  console.log(`   • contacts.json  → ${readDB(DB_FILES.contacts).length} records`);
  console.log(`   • careers.json   → ${readDB(DB_FILES.careers).length} records`);
  console.log(`   • subscribers.json → ${readDB(DB_FILES.subscribers).length} records`);
  console.log(`\n📊 Admin endpoints:`);
  console.log(`   GET /api/admin/contacts`);
  console.log(`   GET /api/admin/careers`);
  console.log(`   GET /api/admin/subscribers`);
  console.log(`   GET /api/admin/stats\n`);
});
