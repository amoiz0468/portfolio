import { ChatMessage } from './types';

/**
 * Call Google Gemini API
 */
export async function callGeminiApi(apiKey: string, model: string, prompt: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 450,
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const candidate = data?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;
  if (text) return text;
  throw new Error('No text returned from Gemini API');
}

/**
 * Call OpenAI compatible endpoints (OpenAI, Groq, Together)
 */
export async function callOpenAICompatibleApi({
  endpoint,
  apiKey,
  model,
  messages,
}: {
  endpoint: string;
  apiKey: string;
  model: string;
  messages: ChatMessage[];
}): Promise<string> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 450,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error from ${endpoint} (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (text) return text;
  throw new Error(`No choices returned from ${endpoint}`);
}
