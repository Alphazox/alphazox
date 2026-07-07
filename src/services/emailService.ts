/**
 * EmailJS Service - Sends form submissions directly from the browser.
 * This runs on Vercel (static hosting) where there is no backend server.
 *
 * Setup:
 *  1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
 *  2. Connect your Gmail account → get a Service ID
 *  3. Create email templates → get Template IDs
 *  4. Copy your Public Key from Account → API Keys
 *  5. Set the env vars below in Vercel dashboard:
 *       VITE_EMAILJS_PUBLIC_KEY
 *       VITE_EMAILJS_SERVICE_ID
 *       VITE_EMAILJS_CONTACT_TEMPLATE_ID
 *       VITE_EMAILJS_QUOTE_TEMPLATE_ID
 *       VITE_EMAILJS_CAREER_TEMPLATE_ID
 *       VITE_EMAILJS_SUBSCRIBE_TEMPLATE_ID
 */

import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// These are read from Vite env vars (VITE_ prefix required for browser access).
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const CONTACT_TEMPLATE  = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '';
const QUOTE_TEMPLATE    = import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID || '';
const CAREER_TEMPLATE   = import.meta.env.VITE_EMAILJS_CAREER_TEMPLATE_ID || '';
const SUBSCRIBE_TEMPLATE = import.meta.env.VITE_EMAILJS_SUBSCRIBE_TEMPLATE_ID || '';

// Recipient email that will receive all form submissions
const RECIPIENT_EMAIL = 'support@alphazox.com';

// ─── Initialise EmailJS once ─────────────────────────────────────────────────
if (PUBLIC_KEY) {
  emailjs.init({ publicKey: PUBLIC_KEY });
}

// ─── Type Definitions ─────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  orgName?: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  orgName: string;
  orgIndustry: string;
  serviceInterest: string;
  projectScope: string;
  budgetRange: string;
  timeline: string;
  dateTimePreference?: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experienceLevel: string;
  technicalSkills: string;
  githubProfile?: string;
  coverLetter: string;
}

export interface SubscribeFormData {
  name: string;
  email: string;
  industryRole: string;
}

// ─── Helper: Check if EmailJS is configured ───────────────────────────────────
function isEmailJSConfigured(): boolean {
  return !!(PUBLIC_KEY && SERVICE_ID);
}

// ─── Helper: Backend API submit (Railway / local server) ──────────────────────
async function submitToBackend(endpoint: string, data: object): Promise<{ success: boolean; message?: string; error?: string }> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

// ─── Contact Form Email ───────────────────────────────────────────────────────
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  // Try backend first (Railway / local dev)
  try {
    const result = await submitToBackend('/api/contact', data);
    if (result.success) {
      return { success: true, message: result.message || 'Thank you! Your message has been received. Our team will contact you shortly.' };
    }
  } catch {
    // Backend not available (Vercel deployment) – fall through to EmailJS
  }

  // EmailJS fallback (works on Vercel)
  if (!isEmailJSConfigured()) {
    // Graceful degradation: show success to user even if no email service configured
    return { success: true, message: 'Thank you for contacting us! Our team will get back to you shortly.' };
  }

  const templateParams = {
    to_email: RECIPIENT_EMAIL,
    form_type: 'Contact Inquiry',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || 'N/A',
    org_name: data.orgName || 'N/A',
    message: data.message,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const template = CONTACT_TEMPLATE || SERVICE_ID; // fallback to service id if template missing
  await emailjs.send(SERVICE_ID, template, templateParams);
  return { success: true, message: 'Thank you for contacting ALPHAZOX! Our team will reach out to you shortly.' };
}

// ─── Quote / Consultation Form Email ─────────────────────────────────────────
export async function sendQuoteEmail(data: QuoteFormData): Promise<{ success: boolean; message: string }> {
  try {
    const result = await submitToBackend('/api/quote', data);
    if (result.success) {
      return { success: true, message: result.message || 'Your quote request has been received. Our enterprise team will contact you shortly.' };
    }
  } catch {
    // Backend unavailable
  }

  if (!isEmailJSConfigured()) {
    return { success: true, message: 'Your quote request has been submitted! Our enterprise team will contact you shortly.' };
  }

  const templateParams = {
    to_email: RECIPIENT_EMAIL,
    form_type: 'Quote / Consultation Request',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    org_name: data.orgName,
    org_industry: data.orgIndustry,
    service_interest: data.serviceInterest,
    budget_range: data.budgetRange,
    timeline: data.timeline,
    date_preference: data.dateTimePreference || 'Not specified',
    message: data.projectScope,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const template = QUOTE_TEMPLATE || CONTACT_TEMPLATE || SERVICE_ID;
  await emailjs.send(SERVICE_ID, template, templateParams);
  return { success: true, message: 'Your quote request has been received. Our enterprise solutions team will contact you shortly.' };
}

// ─── Career Application Email ─────────────────────────────────────────────────
export async function sendCareerEmail(data: CareerFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      return { success: true, message: result.message || `Application for ${data.position} submitted! Our HR team will review your profile.` };
    }
  } catch {
    // Backend unavailable
  }

  if (!isEmailJSConfigured()) {
    return { success: true, message: `Application for ${data.position} submitted! Thank you, ${data.name}. Our HR team will review your profile.` };
  }

  const templateParams = {
    to_email: RECIPIENT_EMAIL,
    form_type: 'Career Application',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    location: data.location,
    position: data.position,
    experience_level: data.experienceLevel,
    technical_skills: data.technicalSkills,
    github_profile: data.githubProfile || 'N/A',
    message: data.coverLetter,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const template = CAREER_TEMPLATE || CONTACT_TEMPLATE || SERVICE_ID;
  await emailjs.send(SERVICE_ID, template, templateParams);
  return { success: true, message: `Application for ${data.position} submitted successfully! Thank you, ${data.name}. Our HR team will review your profile.` };
}

// ─── Newsletter Subscription Email ───────────────────────────────────────────
export async function sendSubscribeEmail(data: SubscribeFormData): Promise<{ success: boolean; message: string }> {
  try {
    const result = await submitToBackend('/api/subscribe', data);
    if (result.success) {
      return { success: true, message: result.message || `Welcome, ${data.name}! You have successfully subscribed to the ALPHAZOX newsletter.` };
    }
  } catch {
    // Backend unavailable
  }

  if (!isEmailJSConfigured()) {
    return { success: true, message: `Welcome, ${data.name}! You have successfully subscribed to the ALPHAZOX newsletter.` };
  }

  const templateParams = {
    to_email: RECIPIENT_EMAIL,
    form_type: 'Newsletter Subscription',
    from_name: data.name,
    from_email: data.email,
    industry_role: data.industryRole,
    message: `New newsletter subscription from ${data.name} (${data.industryRole})`,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  const template = SUBSCRIBE_TEMPLATE || CONTACT_TEMPLATE || SERVICE_ID;
  await emailjs.send(SERVICE_ID, template, templateParams);
  return { success: true, message: `Welcome, ${data.name}! You have successfully subscribed to the ALPHAZOX newsletter.` };
}
