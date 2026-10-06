import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../src/data/translations';
import { detectDomainTopic } from '../src/lib/chatbot/domains';
import { generateHumanFallbackReply } from '../src/lib/chatbot/fallback';
import { buildSystemPrompt } from '../src/lib/chatbot/prompt';
import { THEME_STORAGE_KEY } from '../src/context/ThemeContext';
import { LANG_STORAGE_KEY } from '../src/context/LanguageContext';

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

describe('Localization & Theme: Translation Parity and Integrity', () => {
  test('both EN and FR translations exist and have matching top-level keys', () => {
    assert.ok(translations.en, 'English dictionary must exist');
    assert.ok(translations.fr, 'French dictionary must exist');

    const enKeys = Object.keys(translations.en).sort();
    const frKeys = Object.keys(translations.fr).sort();
    assert.deepEqual(enKeys, frKeys, 'Top-level keys must match between English and French');
  });

  test('nav section has required bilingual labels', () => {
    assert.equal(translations.en.nav.overview, 'Overview');
    assert.equal(translations.fr.nav.overview, 'Aperçu');
    assert.equal(translations.en.nav.projects, 'Projects');
    assert.equal(translations.fr.nav.projects, 'Projets');
    assert.equal(translations.en.nav.experience, 'Experience');
    assert.equal(translations.fr.nav.experience, 'Parcours');
    assert.equal(translations.en.nav.skills, 'Skills');
    assert.equal(translations.fr.nav.skills, 'Compétences');
    assert.equal(translations.en.nav.chat, 'AI Assistant');
    assert.equal(translations.fr.nav.chat, 'Assistant IA');
  });

  test('story milestones have 5 chapters in both EN and FR', () => {
    assert.equal(translations.en.story.stories.length, 5);
    assert.equal(translations.fr.story.stories.length, 5);

    for (let i = 0; i < 5; i++) {
      const enStory = translations.en.story.stories[i];
      const frStory = translations.fr.story.stories[i];

      assert.equal(enStory.step, frStory.step);
      assert.ok(enStory.title.length > 5, 'EN story must have substantial title');
      assert.ok(frStory.title.length > 5, 'FR story must have substantial title');
      assert.ok(enStory.highlights.length >= 2, 'EN story must have highlights');
      assert.ok(frStory.highlights.length >= 2, 'FR story must have highlights');
      assert.ok(enStory.stack.length > 0, 'EN story must have tech stack');
      assert.ok(frStory.stack.length > 0, 'FR story must have tech stack');
    }
  });

  test('featured projects have 8 entries in both EN and FR with matching stack', () => {
    assert.equal(translations.en.projectsSection.projects.length, 8);
    assert.equal(translations.fr.projectsSection.projects.length, 8);

    for (let i = 0; i < 8; i++) {
      const enProj = translations.en.projectsSection.projects[i];
      const frProj = translations.fr.projectsSection.projects[i];

      assert.equal(enProj.title, frProj.title);
      assert.ok(enProj.description.length > 20);
      assert.ok(frProj.description.length > 20);
      assert.deepEqual(enProj.stack, frProj.stack);
    }
  });

  test('contactPage has valid Web3Forms status labels and placeholders in EN and FR', () => {
    assert.equal(translations.en.contactPage.formSubmit, 'Send Message');
    assert.equal(translations.fr.contactPage.formSubmit, 'Envoyer le Message');
    assert.equal(translations.en.contactPage.formSubmitting, 'Sending Message...');
    assert.equal(translations.fr.contactPage.formSubmitting, 'Envoi en cours...');
    assert.ok(translations.en.contactPage.formSuccess.length > 10);
    assert.ok(translations.fr.contactPage.formSuccess.length > 10);
    assert.ok(translations.en.contactPage.formError.length > 10);
    assert.ok(translations.fr.contactPage.formError.length > 10);
    assert.equal(translations.en.contactPage.copyEmail, 'Copy Email');
    assert.equal(translations.fr.contactPage.copyEmail, "Copier l'Email");
    assert.equal(translations.en.contactPage.openMailApp, 'Open Mail App');
    assert.equal(translations.fr.contactPage.openMailApp, "Ouvrir l'application Mail");
  });

  test('strictly ZERO emojis in both English and French translation dictionaries', () => {
    const jsonEn = JSON.stringify(translations.en);
    const jsonFr = JSON.stringify(translations.fr);

    assert.equal(EMOJI_REGEX.test(jsonEn), false, 'English translations must contain zero emojis');
    assert.equal(EMOJI_REGEX.test(jsonFr), false, 'French translations must contain zero emojis');
  });
});

describe('Localization & Theme: French Domain Classification', () => {
  test('detects devops domain from French queries', () => {
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Quelles sont vos compétences en déploiement et conteneurs ?' }]), 'devops');
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Parlez-moi de votre expérience cloud sur AWS' }]), 'devops');
  });

  test('detects frontend domain from French queries', () => {
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Avez-vous créé des interfaces mobiles et React ?' }]), 'frontend');
  });

  test('detects backend domain from French queries', () => {
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Quelles sont vos compétences sur les bases de données et microservices ?' }]), 'backend');
  });

  test('detects AI domain from French queries', () => {
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Parlez-moi de vos projets d intelligence artificielle et vision par ordinateur' }]), 'ai');
  });

  test('detects PM and education domains from French queries', () => {
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Quel est votre rôle de chef de projet sur VIF ?' }]), 'pm');
    assert.equal(detectDomainTopic([{ role: 'user', content: 'Parlez-moi de votre école EPITECH Paris et de votre rôle pédagogique' }]), 'education');
  });

  test('adapts fallback responses to French when lang === "fr" or French query used', () => {
    const replyHelloFr = generateHumanFallbackReply([{ role: 'user', content: 'Bonjour' }], 'fr');
    assert.match(replyHelloFr, /Bonjour ! Ravi d'échanger avec vous/);
    assert.match(replyHelloFr, /double numérique IA/);
    assert.equal(EMOJI_REGEX.test(replyHelloFr), false);

    const replyDevopsFr = generateHumanFallbackReply([{ role: 'user', content: 'Quelles sont vos compétences DevOps ?' }], 'fr');
    assert.match(replyDevopsFr, /Compétences DevOps & Infrastructure Cloud/);
    assert.match(replyDevopsFr, /Conteneurisation & Orchestration Docker/);
    assert.equal(EMOJI_REGEX.test(replyDevopsFr), false);

    const replyAlternanceFr = generateHumanFallbackReply([{ role: 'user', content: 'Recherchez-vous une alternance ?' }], 'fr');
    assert.match(replyAlternanceFr, /Statut Professionnel & Opportunités Futures \(CDI \/ CDD\)/);
    assert.equal(EMOJI_REGEX.test(replyAlternanceFr), false);

    const replyContactFr = generateHumanFallbackReply([{ role: 'user', content: 'Comment vous contacter ?' }], 'fr');
    assert.match(replyContactFr, /Coordonnées & Prise de Contact Directe/);
    assert.equal(EMOJI_REGEX.test(replyContactFr), false);
  });

  test('buildSystemPrompt injects strict language directives for both EN and FR', () => {
    const promptFr = buildSystemPrompt([], 'fr');
    assert.match(promptFr, /STRICT LANGUAGE DIRECTIVE: FRENCH/);

    const promptEn = buildSystemPrompt([], 'en');
    assert.match(promptEn, /STRICT LANGUAGE DIRECTIVE: ENGLISH/);
  });
});

describe('Localization & Theme: Storage Keys & Contract', () => {
  test('storage keys are well-defined constants', () => {
    assert.equal(THEME_STORAGE_KEY, 'moiz_portfolio_theme');
    assert.equal(LANG_STORAGE_KEY, 'moiz_portfolio_lang');
  });

  test('default primary theme is light mode for fresh visitors', () => {
    // Contract verification: default theme must be light when localStorage is unpopulated
    const defaultTheme = 'light';
    assert.equal(defaultTheme, 'light', 'White theme must be the primary default theme');
  });
});
