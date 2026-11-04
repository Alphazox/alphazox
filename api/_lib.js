// Shared helpers for the /api functions (Vercel) and server/server.js (local / Railway).
// Files starting with "_" in /api are not exposed as routes by Vercel.

// ─── Email recipients ───────────────────────────────────────────────────────
// Every form submission (applications, contact messages, demo requests, subscriptions) goes to all
// of these addresses. Override with MAIL_TO="a@x.com,b@y.com" if the list changes.
export const MAIL_TO = (process.env.MAIL_TO || 'support@alphazox.com,aideveloper444@gmail.com')
  .split(',')
  .map(address => address.trim())
  .filter(Boolean);

// ─── Input helpers ──────────────────────────────────────────────────────────

export const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Removes line breaks, for email headers such as the subject. */
export const oneLine = (value = '') => String(value).replace(/[\r\n]+/g, ' ');

/** Trims, length-limits and HTML-escapes every string field so it can be placed in an email. */
export const escapeFields = (body = {}, maxLength = 5000) =>
  Object.fromEntries(Object.entries(body).map(([k, v]) =>
    [k, typeof v === 'string' ? escapeHtml(v.trim().slice(0, maxLength)) : v]));

export const isValidEmail = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

// Digits with optional leading +, spaces, dashes, dots and brackets; 7–15 digits in total (E.164 max).
export const isValidPhone = (phone = '') => {
  const value = String(phone).trim();
  if (!/^\+?[0-9\s\-().]{7,20}$/.test(value)) return false;
  const digits = value.replace(/\D/g, '').length;
  return digits >= 7 && digits <= 15;
};

// ─── Rate limiting ──────────────────────────────────────────────────────────
// Fixed-window counter kept in memory. On Vercel each warm function instance keeps its own
// counters, so this is a best-effort first line; add a Vercel Firewall rate-limit rule on /api/*
// for a limit enforced across all instances.

const buckets = new Map();

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

/** Returns true when the request is allowed; otherwise sends a 429 and returns false. */
export function rateLimit(req, res, name, limit, windowMs) {
  const key = `${name}:${clientIp(req)}`;
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || bucket.reset <= now) {
    bucket = { count: 0, reset: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;

  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.reset <= now) buckets.delete(k);
  }

  if (bucket.count > limit) {
    const retry = Math.ceil((bucket.reset - now) / 1000);
    res.setHeader('Retry-After', String(retry));
    res.status(429).json({ success: false, error: `Too many requests. Please try again in ${retry} seconds.` });
    return false;
  }
  return true;
}

// ─── Honeypot ───────────────────────────────────────────────────────────────
// Forms include a hidden "website" field that people never see. Bots that fill every field get a
// fake success response so they don't adapt.

/** Returns true for a normal submission; otherwise sends a fake success and returns false. */
export function checkHoneypot(req, res) {
  if (req.body?.website) {
    res.status(200).json({ success: true, message: 'Thank you!' });
    return false;
  }
  return true;
}
