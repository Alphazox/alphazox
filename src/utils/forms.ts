// Shared form helpers: phone-number validation.

/** Keeps only characters that can appear in a phone number: digits, +, spaces, dashes and brackets. */
export const sanitizePhone = (value: string) => value.replace(/[^0-9+\-\s()]/g, '').slice(0, 20);

/** 7–15 digits (the international maximum), with an optional leading +. */
export const isValidPhone = (value: string) => {
  const v = value.trim();
  const digits = v.replace(/\D/g, '').length;
  return /^\+?[0-9\s\-()]{7,20}$/.test(v) && digits >= 7 && digits <= 15;
};

export const PHONE_PATTERN = '\\+?[0-9\\s\\-\\(\\)]{7,20}';
export const PHONE_HINT = 'Digits only, 7–15 numbers, with an optional + country code (e.g. +91 81259 50099)';
