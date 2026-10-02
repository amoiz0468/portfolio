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

// Disposable and throwaway email domains used by trolls/bots
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'trashmail.com',
  'dispostable.com',
  'temp-mail.org',
  'fakeinbox.com',
  'burnermail.io',
  'nada.ltd',
  'getnada.com',
  'generator.email',
]);

const TROLL_EMAIL_EXACT = new Set([
  'test@test.com',
  'asdf@asdf.com',
  'admin@admin.com',
  'fake@fake.com',
  'none@none.com',
  'nobody@nobody.com',
  'spam@spam.com',
  'troll@troll.com',
  'no@no.com',
  'xyz@xyz.com',
  'abc@abc.com',
  'aaa@aaa.com',
]);

const TROLL_EMAIL_PREFIXES = [
  /^(?:fuck|bitch|kys|troll)\b/i,
];

export function isTrollEmail(email: string): boolean {
  if (typeof email !== 'string') return true;
  const normalized = email.toLowerCase().trim();
  if (TROLL_EMAIL_EXACT.has(normalized)) return true;

  const parts = normalized.split('@');
  if (parts.length !== 2) return true;
  const [local, domain] = parts;

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return true;

  for (const rx of TROLL_EMAIL_PREFIXES) {
    if (rx.test(local)) return true;
  }

  const domainRoot = domain.split('.')[0];
  if (local.length <= 4 && local === domainRoot) {
    return true;
  }

  return false;
}

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

  // 2. Velocity & Autofill check
  // Sub-500ms is impossible for humans even with autofill (automated scripts) -> silent trap
  if (elapsedMs > 0 && elapsedMs < 500) {
    return { valid: false, isBotOrTrollSilent: true };
  }

  // Fast submissions (500ms - 1800ms) can occur via browser autofill
  // If the user has valid name, genuine email format, and genuine message, accept as legitimate autofill;
  // otherwise, silently trap suspicious rapid payloads.
  const cleanEmailPrelim = sanitizeSingleLine(email, 254);
  const cleanNamePrelim = sanitizeSingleLine(name, 100);
  const cleanMessagePrelim = sanitizeInput(message, 4000);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (elapsedMs > 0 && elapsedMs < 1800) {
    const isAutofillLegitimate =
      cleanNamePrelim.length >= 2 &&
      emailRegex.test(cleanEmailPrelim) &&
      !isTrollEmail(cleanEmailPrelim) &&
      cleanMessagePrelim.length >= 10 &&
      !isCharacterMash(cleanMessagePrelim);

    if (!isAutofillLegitimate) {
      return { valid: false, isBotOrTrollSilent: true };
    }
  }

  // 3. Name validation
  const cleanName = cleanNamePrelim;
  if (!cleanName || cleanName.length < 2) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Veuillez saisir votre nom (au moins 2 caracteres).'
        : 'Please enter your name (at least 2 characters).',
    };
  }

  // 4. Email validation
  const cleanEmail = cleanEmailPrelim;
  if (!emailRegex.test(cleanEmail)) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Veuillez fournir une adresse email valide.'
        : 'Please provide a valid email address.',
    };
  }

  if (isTrollEmail(cleanEmail)) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Veuillez fournir une adresse email valide et non temporaire.'
        : 'Please provide a valid, permanent email address.',
    };
  }

  // 5. Message validation
  const cleanMessage = cleanMessagePrelim;
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

  // 7. Excessive URL link spam (more than 10 URLs)
  const urlCount = (cleanMessage.match(/https?:\/\//gi) || []).length;
  if (urlCount > 10) {
    return {
      valid: false,
      errorReason: isFrench
        ? 'Trop de liens detectes. Veuillez limiter a un maximum de 10 adresses web.'
        : 'Too many links detected. Please limit to a maximum of 10 web links.',
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
const SUBMISSION_COOLDOWN_MS = 30000; // 30 seconds cooldown between submissions

export function checkClientRateLimit(isFrench: boolean = false): { allowed: boolean; message?: string } {
  if (typeof window === 'undefined') return { allowed: true };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (raw) {
      const data: { lastSent: number; count: number; hourStart: number } = JSON.parse(raw);

      // Cooldown between individual submissions (30 seconds)
      if (now - data.lastSent < SUBMISSION_COOLDOWN_MS) {
        const remainingSec = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - data.lastSent)) / 1000);
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
