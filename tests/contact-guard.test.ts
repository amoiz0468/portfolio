import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeInput,
  sanitizeSingleLine,
  isCharacterMash,
  validateContact,
} from '../src/lib/contact-guard';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

describe('Contact Guard Security: Sanitization & Injection Defense', () => {
  test('strips HTML, scripts, null bytes, and dangerous protocols', () => {
    const malicious = '<script>alert("xss")</script>Hello\0 <iframe src="evil.com"></iframe><img src=x onerror=alert(1)> javascript:void(0)';
    const clean = sanitizeInput(malicious);

    assert.equal(clean.includes('<script>'), false);
    assert.equal(clean.includes('alert'), false);
    assert.equal(clean.includes('\0'), false);
    assert.equal(clean.includes('<iframe'), false);
    assert.equal(clean.includes('javascript:'), false);
    assert.match(clean, /Hello/);
  });

  test('sanitizeSingleLine removes newlines and carriage returns for header injection defense', () => {
    const headerInjection = 'John Doe\r\nBcc: victim@example.com\nSubject: Injected';
    const clean = sanitizeSingleLine(headerInjection);

    assert.equal(clean.includes('\r'), false);
    assert.equal(clean.includes('\n'), false);
    assert.equal(clean, 'John Doe  Bcc: victim@example.com Subject: Injected');
  });
});

describe('Contact Guard Security: Anti-Troll & Spam Defense', () => {
  test('silently traps honeypot botcheck field', () => {
    const res = validateContact({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      message: 'This is an automated spam message to your inbox',
      botcheck: 'automated',
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.equal(res.isBotOrTrollSilent, true);
  });

  test('silently traps sub-second speed bots', () => {
    const res = validateContact({
      name: 'Speedy Bot',
      email: 'bot@speedy.com',
      message: 'Submitting in 200 milliseconds like a script',
      elapsedMs: 250,
    });

    assert.equal(res.valid, false);
    assert.equal(res.isBotOrTrollSilent, true);
  });

  test('detects keysmash and repeating characters', () => {
    assert.equal(isCharacterMash('aaaaaaaaaaaa'), true);
    assert.equal(isCharacterMash('asdfasdfasdfasdfasdf'), true);
    assert.equal(isCharacterMash('Hello Moiz, I am inquiring about your software engineer role.'), false);

    const res = validateContact({
      name: 'Troll User',
      email: 'troll@example.com',
      message: 'aaaaaaaaaaaaaaaaaaaaa',
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.match(res.errorReason || '', /genuine|authentique/i);
    assert.equal(EMOJI_REGEX.test(res.errorReason || ''), false);
  });

  test('intercepts excessive link spam (> 3 URLs)', () => {
    const res = validateContact({
      name: 'Link Spammer',
      email: 'spam@links.com',
      message: 'Check out https://a.com and https://b.com and https://c.com and https://d.com',
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.match(res.errorReason || '', /links|liens/i);
    assert.equal(EMOJI_REGEX.test(res.errorReason || ''), false);
  });

  test('intercepts crypto / telegram promotion spam', () => {
    const res = validateContact({
      name: 'Crypto Scammer',
      email: 'scam@crypto.com',
      message: 'Hey, buy crypto now for high returns and telegram: @scamchannel',
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.match(res.errorReason || '', /filtered|filtre/i);
    assert.equal(EMOJI_REGEX.test(res.errorReason || ''), false);
  });

  test('validates legitimate inquiries smoothly', () => {
    const res = validateContact({
      name: 'Alice Recruiter',
      email: 'alice@innovative-tech.fr',
      message: 'Hello Moiz, we reviewed your machine learning projects and would love to discuss a role.',
      elapsedMs: 12000,
    });

    assert.equal(res.valid, true);
    assert.equal(res.errorReason, undefined);
  });
});
