// Groq (free tier, no card needed) for the website chatbot.
// Env: GROQ_API_KEY (from https://console.groq.com/keys), GROQ_MODEL (optional).
// The free tier allows only a few thousand tokens per minute, so the caller sends just the website
// passages relevant to the question, not the whole site. When a model's limit is hit (HTTP 429) the
// next model is tried; if all fail the caller falls back to the website search.

const MODELS = [process.env.GROQ_MODEL || 'openai/gpt-oss-120b', 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * @param {string} system - instructions + relevant website content
 * @param {{ role: 'user' | 'assistant', content: string }[]} messages
 * @returns {Promise<string | null>} the reply, or null if Groq couldn't answer
 */
export async function askGroq(system, messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  for (const model of [...new Set(MODELS)]) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: system }, ...messages],
          max_tokens: 1500,
          temperature: 0.4,
          // gpt-oss models reason before answering; keep it short for quick chat replies.
          ...(model.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low' } : {}),
        }),
        signal: AbortSignal.timeout(25_000),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error(`[Chat] Groq ${model} error ${res.status}:`, data?.error?.message ?? 'no details');
        if (res.status === 401) return null; // bad key: no point trying other models
        continue;
      }
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (reply) return reply;
      console.error(`[Chat] Groq ${model} returned no text (finish_reason: ${data?.choices?.[0]?.finish_reason ?? 'unknown'})`);
    } catch (err) {
      console.error(`[Chat] Groq ${model} request failed:`, err.message);
    }
  }
  return null;
}
