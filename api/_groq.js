// Groq (free tier, no card needed) for the website chatbot.
// Env: GROQ_API_KEY (from https://console.groq.com/keys), GROQ_MODEL (optional).
// The free tier allows only a few thousand tokens per minute per model, so the caller sends just the
// website passages relevant to the question, and each model below has its own separate limit. When
// all are briefly over their limit, we wait the few seconds Groq asks for and try once more; if that
// still fails the caller falls back to the website search.

const MODELS = [process.env.GROQ_MODEL || 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_HISTORY = 6; // messages sent to Groq, to stay within the per-minute token limits
const MAX_WAIT_MS = 9000;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Removes hidden reasoning and markdown emphasis the chat window would show as raw characters. */
const tidy = text =>
  text
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .trim();

async function callModel(model, key, system, messages) {
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
    signal: AbortSignal.timeout(20_000),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.error?.message ?? 'no details';
    console.error(`[Chat] Groq ${model} error ${res.status}:`, message);
    const wait = Number(/try again in ([\d.]+)s/i.exec(message)?.[1]);
    return { status: res.status, waitMs: Number.isFinite(wait) ? Math.ceil(wait * 1000) : null };
  }
  const reply = tidy(data?.choices?.[0]?.message?.content ?? '');
  if (!reply) console.error(`[Chat] Groq ${model} returned no text (finish_reason: ${data?.choices?.[0]?.finish_reason ?? 'unknown'})`);
  return { reply };
}

/**
 * @param {string} system - instructions + relevant website content
 * @param {{ role: 'user' | 'assistant', content: string }[]} messages
 * @returns {Promise<string | null>} the reply, or null if Groq couldn't answer
 */
export async function askGroq(system, messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;

  const recent = messages.slice(-MAX_HISTORY);
  while (recent.length && recent[0].role !== 'user') recent.shift();

  let shortestWait = null;
  for (const model of [...new Set(MODELS)]) {
    try {
      const result = await callModel(model, key, system, recent);
      if (result.reply) return result.reply;
      if (result.status === 401) return null; // bad key: no point trying other models
      if (result.status === 429 && result.waitMs !== null) {
        shortestWait = Math.min(shortestWait ?? Infinity, result.waitMs);
      }
    } catch (err) {
      console.error(`[Chat] Groq ${model} request failed:`, err.message);
    }
  }

  // Every model is over its per-minute limit: wait briefly once, then retry the main model.
  if (shortestWait !== null && shortestWait <= MAX_WAIT_MS) {
    await sleep(shortestWait + 250);
    try {
      const result = await callModel(MODELS[0], key, system, recent);
      if (result.reply) return result.reply;
    } catch (err) {
      console.error('[Chat] Groq retry failed:', err.message);
    }
  }
  return null;
}
