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

  test('silently traps sub-500ms speed bots', () => {
    const res = validateContact({
      name: 'Speedy Bot',
      email: 'bot@speedy.com',
      message: 'Submitting in 200 milliseconds like a script',
      elapsedMs: 250,
    });

    assert.equal(res.valid, false);
    assert.equal(res.isBotOrTrollSilent, true);
  });

  test('allows fast submissions (500ms-1800ms) when browser autofill is used with valid inputs', () => {
    const res = validateContact({
      name: 'Sarah Connor',
      email: 'sarah@skynet-research.org',
      message: 'Quick inquiry regarding the AI engineer position posted on your portfolio.',
      elapsedMs: 850,
    });

    assert.equal(res.valid, true);
    assert.equal(res.errorReason, undefined);
  });

  test('detects keysmash and repeating characters', () => {
    assert.equal(isCharacterMash('aaaaaaaaaaaa'), true);
    assert.equal(isCharacterMash('asdfasdfasdfasdfasdf'), true);
    assert.equal(isCharacterMash('Hello Moiz, I am inquiring about your software engineer role.'), false);

    const res = validateContact({
      name: 'Troll User',
      email: 'candidate@example.com',
      message: 'aaaaaaaaaaaaaaaaaaaaa',
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.match(res.errorReason || '', /genuine|authentique/i);
    assert.equal(EMOJI_REGEX.test(res.errorReason || ''), false);
  });

  test('accepts up to 10 links in message', () => {
    const links10 = Array.from({ length: 10 }, (_, i) => `https://example${i}.com`).join(' ');
    const res = validateContact({
      name: 'Reference Reviewer',
      email: 'reviewer@peer.org',
      message: `Here are 10 research references: ${links10}`,
      elapsedMs: 5000,
    });

    assert.equal(res.valid, true);
  });

  test('intercepts excessive link spam (> 10 URLs)', () => {
    const links11 = Array.from({ length: 11 }, (_, i) => `https://link${i}.com`).join(' ');
    const res = validateContact({
      name: 'Link Spammer',
      email: 'spam@links.com',
      message: `Check out our links: ${links11}`,
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.match(res.errorReason || '', /links|liens/i);
    assert.equal(EMOJI_REGEX.test(res.errorReason || ''), false);
  });

  test('intercepts crypto / telegram promotion spam', () => {
    const res = validateContact({
      name: 'Crypto Scammer',
      email: 'promoter@marketing-network.com',
      message: 'Hey, buy crypto now for high returns and telegram: @scamchannel',
      elapsedMs: 5000,
    });

    assert.equal(res.valid, false);
    assert.match(res.errorReason || '', /filtered|filtre/i);
    assert.equal(EMOJI_REGEX.test(res.errorReason || ''), false);
  });

  test('intercepts disposable and placeholder troll emails', () => {
    const disposableRes = validateContact({
      name: 'Troll Disposable',
      email: 'throwaway@mailinator.com',
      message: 'Hello, this is a legitimate message but with a temporary disposable email address.',
      elapsedMs: 5000,
    });
    assert.equal(disposableRes.valid, false);
    assert.match(disposableRes.errorReason || '', /permanent|temporaire/i);

    const dummyRes = validateContact({
      name: 'Troll Dummy',
      email: 'test@test.com',
      message: 'Just testing with dummy credentials on your portfolio form.',
      elapsedMs: 5000,
    });
    assert.equal(dummyRes.valid, false);
    assert.match(dummyRes.errorReason || '', /permanent|temporaire/i);

    const abusiveRes = validateContact({
      name: 'Abusive User',
      email: 'fuck@gmail.com',
      message: 'Inquiring with an inappropriate email handle for testing.',
      elapsedMs: 5000,
    });
    assert.equal(abusiveRes.valid, false);
    assert.match(abusiveRes.errorReason || '', /permanent|temporaire/i);
  });

  test('validates legitimate inquiries smoothly without false positives', () => {
    const res = validateContact({
      name: 'Alice Recruiter',
      email: 'alice@innovative-tech.fr',
      message: 'Hello Moiz, we reviewed your machine learning projects and would love to discuss a role.',
      elapsedMs: 12000,
    });

    assert.equal(res.valid, true);
    assert.equal(res.errorReason, undefined);

    const resEdu = validateContact({
      name: 'Professor Dupont',
      email: 'dupont@epitech.eu',
      message: 'Reaching out regarding your academic research presentation.',
      elapsedMs: 8000,
    });
    assert.equal(resEdu.valid, true);
  });
});

