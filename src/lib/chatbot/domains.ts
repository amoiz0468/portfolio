import { ChatMessage, DomainTopic } from './types';

/**
 * Intelligent topic & domain classifier that inspects user conversation history
 * to adapt the chatbot's persona and context dynamically. Supports both English and French queries.
 */
export function detectDomainTopic(messages?: ChatMessage[]): DomainTopic {
  if (!messages || messages.length === 0) return 'general';
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const text = lastUserMsg.toLowerCase();

  // 1. DevOps, Cloud Infrastructure & Software Factory
  if (
    /\b(devops|ci[\s/-]?cd|docker|container(ization)?|conteneur|aws|gcp|cloud|nuage|sonarqube|dora|gitstream|nginx|reverse proxy|kubernetes|software factory|infrastructure|d[ée]ploiement)\b/i.test(
      text
    )
  ) {
    return 'devops';
  }

  // 2. Front-End, Web UI/UX & Mobile Apps
  if (
    /\b(front[\s-]?end|ui[\s/-]?ux|react|vue|react[\s-]*native|mobile[\s-]*client|mobile|tailwind|css|websocket|dashboard|interface)\b/i.test(
      text
    )
  ) {
    return 'frontend';
  }

  // 3. Back-End, Microservices & Distributed Databases
  if (
    /\b(back[\s-]?end|microservice(s)?|api|rest|fastapi|django|python|elixir|phoenix|postgres|sql|database|base de donn[ée]es|celery|redis|ledgeroo|time[\s-]*manager)\b/i.test(
      text
    )
  ) {
    return 'backend';
  }

  // 4. Artificial Intelligence, GenAI & Machine Learning
  if (
    /\b(ai|ia|intelligence artificielle|genai|llm|agentic|langgraph|langchain|claude|openai|gemini|rag|prompt|pytorch|tensorflow|densenet|computer[\s-]*vision|vision par ordinateur|zoidberg|doctoriq|ocr|cv|apprentissage)\b/i.test(
      text
    )
  ) {
    return 'ai';
  }

  // 5. Project Management & Agile Leadership
  if (
    /\b(project[\s-]*manage(ment|r)?|gestion de projet|chef de projet|pm|scrum|agile|jira|clickup|project[\s-]*lead|sprint|stakeholder|specifications|vif)\b/i.test(
      text
    )
  ) {
    return 'pm';
  }

  // 6. Education, Academic Studies & Mentorship
  if (
    /\b([ée]cole|universit[ée]|formation|[ée]tudes|dipl[ôo]me|p[ée]dagogique|enseigner|school|university|epitech|fast[\s-]*nuces|degree|pedagogical|teach|assistant|msc|bscs|education)\b/i.test(
      text
    )
  ) {
    return 'education';
  }

  return 'general';
}
