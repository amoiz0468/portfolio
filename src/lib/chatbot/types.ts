export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
};

export type DomainTopic =
  | 'devops'
  | 'backend'
  | 'frontend'
  | 'ai'
  | 'pm'
  | 'education'
  | 'general';
