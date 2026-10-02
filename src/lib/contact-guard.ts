/**
 * Contact Form Security, Sanitization & Anti-Troll Defense
 * Strictly zero emojis. Full defense against XSS, header injection, and automated/human trolls.
 */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  botcheck?: string;
  elapsedMs: number;
}

export interface ValidationResult {
  valid: boolean;
  isBotOrTrollSilent?: boolean; // If true, pretend success without forwarding
  errorReason?: string;
}

// Strip null bytes, script tags, HTML/XML elements, and dangerous URI schemes
export function sanitizeInput(input: string, maxLength: number = 4000): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/\0/g, '') // Null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Script tags
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Style tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Iframe tags
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '') // Object tags
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '') // Embed tags
    .replace(/<[^>]*>/g, '') // Strip remaining HTML tags
    .replace(/javascript\s*:/gi, '') // Strip javascript: pseudo-protocols
    .replace(/vbscript\s*:/gi, '') // Strip vbscript: pseudo-protocols
    .replace(/data\s*:\s*text\/html/gi, '') // Strip data: URIs
    .trim();
}

// Single-line sanitizer for fields like name and email to stop header injection (\r, \n)
export function sanitizeSingleLine(input: string, maxLength: number = 120): string {
  const sanitized = sanitizeInput(input, maxLength);
  return sanitized.replace(/[\r\n\t]/g, ' ').trim();
}

// Known troll and spam signatures (crypto spam, telegram pumps, repetitive garbage)
const TROLL_PATTERNS = [
  /buy\s+crypto/i,
  /bitcoin\s+profit/i,
  /telegram\s*:\s*@/i,
  /whatsapp\s*me\s*at/i,
  /seo\s+ranking\s+guarantee/i,
  /casino\s+bonus/i,
  /viagra|cialis/i,
  /make\s+\$\d+\s+daily/i,
  /earn\s+money\s+fast/i,
];

// Check if message is a repeated character keysmash (e.g. "asdfasdfasdfasdf" or "aaaaaaaaaa")
export function isCharacterMash(str: string): boolean {
  if (/(.)\1{7,}/.test(str)) return true; // 8+ identical characters in a row
  if (/^([a-z0-9]{2,4})\1{4,}$/i.test(str.replace(/\s+/g, ''))) return true; // Repeating short syllable 5+ times
  return false;
}

// Validate contact form payload with anti-troll and security checks
export function validateContact(
  payload: ContactPayload,
  isFrench: boolean = false
): ValidationResult {
  const { name, email, message, botcheck, elapsedMs } = payload;

  // 1. Honeypot check: Bots fill this hidden input. Silently absorb so the bot thinks it succeeded
  if (botcheck && botcheck.trim().length > 0) {
    return { valid: false, isBotOrTrollSilent: true };
  }

  // 2. Velocity check: Humans take at least 1.8 seconds to fill out name, email, and message
  if (elapsedMs > 0 && elapsedMs < 1800) {
    return { valid: false, isBotOrTrollSilent: true };
  }

  // 3. Name validation
  const cleanName = sanitizeSingleLine(name, 100);
  if (!cleanName || cleanName.length < 2) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Veuillez saisir votre nom (au moins 2 caracteres).'
        : 'Please enter your name (at least 2 characters).',
    };
  }

  // 4. Email validation
  const cleanEmail = sanitizeSingleLine(email, 254);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Veuillez fournir une adresse email valide.'
        : 'Please provide a valid email address.',
    };
  }

  // 5. Message validation
  const cleanMessage = sanitizeInput(message, 4000);
  if (!cleanMessage || cleanMessage.length < 10) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Le message doit comporter au moins 10 caracteres descriptifs.'
        : 'The message must contain at least 10 descriptive characters.',
    };
  }

  // 6. Anti-Troll & Keysmash detection
  if (isCharacterMash(cleanMessage)) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Veuillez saisir un message explicatif authentique.'
        : 'Please provide a genuine, meaningful message.',
    };
  }

  // 7. Excessive URL link spam (more than 3 URLs)
  const urlCount = (cleanMessage.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Trop de liens detectes. Veuillez limiter les adresses web.'
        : 'Too many links detected. Please limit web links in your message.',
    };
  }

  // 8. Troll patterns
  for (const pattern of TROLL_PATTERNS) {
    if (pattern.test(cleanMessage)) {
      return {
        valid: false,
        errorReason: isFrench
          ? 'Ce type de message publicitaire ou non sollicite est filtre.'
          : 'Promotional or unsolicited messages of this type are filtered.',
      };
    }
  }

  return { valid: true };
}

// Client rate-limiting helper using localStorage
const STORAGE_KEY = 'moiz_contact_cooldown';

export function checkClientRateLimit(isFrench: boolean = false): { allowed: boolean; message?: string } {
  if (typeof window === 'undefined') return { allowed: true };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (raw) {
      const data: { lastSent: number; count: number; hourStart: number } = JSON.parse(raw);

      // Cooldown between individual submissions (10 seconds)
      if (now - data.lastSent < 10000) {
        const remainingSec = Math.ceil((10000 - (now - data.lastSent)) / 1000);
        return {
          allowed: false,
          message: isFrench
            ? `Veuillez patienter ${remainingSec} secondes avant un nouvel envoi.`
            : `Please wait ${remainingSec} seconds before sending another message.`,
        };
      }

      // Max 5 submissions per rolling hour
      if (now - data.hourStart < 3600000) {
        if (data.count >= 5) {
          return {
            allowed: false,
            message: isFrench
              ? 'Limite de messages atteinte pour cette heure. Veuillez ecrire directement par email.'
              : 'Hourly message limit reached. Please email directly.',
          };
        }
      }
    }
  } catch {
    // If storage is restricted, fail open gracefully
  }

  return { allowed: true };
}

export function recordClientSubmission(): void {
  if (typeof window === 'undefined') return;

  try {
    const now = Date.now();
    const raw = window.localStorage.getItem(STORAGE_KEY);
    let count = 1;
    let hourStart = now;

    if (raw) {
      const data = JSON.parse(raw);
      if (now - data.hourStart < 3600000) {
        count = (data.count || 0) + 1;
        hourStart = data.hourStart;
      }
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lastSent: now, count, hourStart })
    );
  } catch {
    // Ignore storage errors
  }
}
