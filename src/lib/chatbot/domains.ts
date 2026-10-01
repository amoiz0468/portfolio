import { ChatMessage, DomainTopic } from './types';

/**
 * Intelligent topic & domain classifier that inspects user conversation history
 * to adapt the chatbot's persona and context dynamically.
 */
export function detectDomainTopic(messages?: ChatMessage[]): DomainTopic {
  if (!messages || messages.length === 0) return 'general';
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const text = lastUserMsg.toLowerCase();

  // 1. DevOps, Cloud Infrastructure & Software Factory
  if (
    /\b(devops|ci[\s/-]?cd|docker|container(ization)?|aws|gcp|cloud|sonarqube|dora|gitstream|nginx|reverse proxy|kubernetes|software factory|infrastructure)\b/i.test(
      text
    )
  ) {
    return 'devops';
  }

  // 2. Front-End, Web UI/UX & Mobile Apps
  if (
    /\b(front[\s-]?end|ui[\s/-]?ux|react|vue|react[\s-]*native|mobile[\s-]*client|tailwind|css|websocket|dashboard)\b/i.test(
      text
    )
  ) {
    return 'frontend';
  }

  // 3. Back-End, Microservices & Distributed Databases
  if (
    /\b(back[\s-]?end|microservice(s)?|api|rest|fastapi|django|python|elixir|phoenix|postgres|sql|database|celery|redis|ledgeroo|time[\s-]*manager)\b/i.test(
      text
    )
  ) {
    return 'backend';
  }

  // 4. Artificial Intelligence, GenAI & Machine Learning
  if (
    /\b(ai|genai|llm|agentic|langgraph|langchain|claude|openai|gemini|rag|prompt|pytorch|tensorflow|densenet|computer[\s-]*vision|zoidberg|doctoriq|ocr|cv)\b/i.test(
      text
    )
  ) {
    return 'ai';
  }

  // 5. Project Management & Agile Leadership
  if (
    /\b(project[\s-]*manage(ment|r)?|pm|scrum|agile|jira|clickup|project[\s-]*lead|sprint|stakeholder|specifications|vif)\b/i.test(
      text
    )
  ) {
    return 'pm';
  }

  // 6. Education, Academic Studies & Mentorship
  if (
    /\b(school|university|epitech|fast[\s-]*nuces|degree|pedagogical|teach|assistant|msc|bscs|education)\b/i.test(
      text
    )
  ) {
    return 'education';
  }

  return 'general';
}
