// Google Gemini (free tier) for the website chatbot.
// Env: GEMINI_API_KEY (from https://aistudio.google.com/apikey), GEMINI_MODEL (optional).
// Free-tier limits are per Google project; when a model's quota runs out (HTTP 429) the next model
// in the list is tried, and if all fail the caller falls back to the website search.

const MODELS = [process.env.GEMINI_MODEL || 'gemini-flash-latest', 'gemini-3.5-flash-lite'];
const ENDPOINT = model => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

/**
 * @param {string} system - system instructions + website knowledge
 * @param {{ role: 'user' | 'assistant', content: string }[]} messages
 * @returns {Promise<string | null>} the reply, or null if Gemini couldn't answer
 */
export async function askGemini(system, messages) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const body = JSON.stringify({
    system_instruction: { parts: [{ text: system }] },
    contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
    generationConfig: { maxOutputTokens: 4096 },
  });

  for (const model of [...new Set(MODELS)]) {
    try {
      const res = await fetch(ENDPOINT(model), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body,
        signal: AbortSignal.timeout(25_000),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error(`[Chat] Gemini ${model} error ${res.status}:`, data?.error?.message ?? 'no details');
        continue; // quota exhausted, model unavailable, etc.: try the next model
      }
      const candidate = data?.candidates?.[0];
      const reply = (candidate?.content?.parts ?? [])
        .filter(p => typeof p.text === 'string' && !p.thought)
        .map(p => p.text)
        .join('')
        .trim();
      if (reply) return reply;
      console.error(`[Chat] Gemini ${model} returned no text (finishReason: ${candidate?.finishReason ?? data?.promptFeedback?.blockReason ?? 'unknown'})`);
      if (data?.promptFeedback?.blockReason || candidate?.finishReason === 'SAFETY') {
        return "Sorry, I can't help with that. I'm happy to answer other questions, or tell you about ALPHAZOX's services, careers and how to contact us.";
      }
    } catch (err) {
      console.error(`[Chat] Gemini ${model} request failed:`, err.message);
    }
  }
  return null;
}
