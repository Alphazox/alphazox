// Answers visitor questions straight from the website content (api/_knowledge.js) without an LLM.
// Used by /api/chat when no Claude API key is configured or the API is unavailable.
//
// How it works: the knowledge base is split into small passages (FAQs, service areas, industry pages,
// jobs, offices…). Common intents (jobs, contact, about, pricing, demo) get direct answers; anything
// else is matched against the passages with BM25 keyword scoring, using the conversation so far for
// short follow-ups like "tell me more".
import { KNOWLEDGE } from './_knowledge.js';

const K = JSON.parse(KNOWLEDGE);
const SITE = K.company.contact;

// ─── Text helpers ───────────────────────────────────────────────────────────

const STOP = new Set(('a an and are as at be been but by can could do does did for from had has have how i if in into is it its ' +
  'me my of on or our please so some tell than that the their them then there these they this to us was we were what when ' +
  'where which who why will with would you your about any give know want need get explain describe show list also more ' +
  'alphazox company yours ok okay hi hello hey thanks thank pls plz kindly provide information info details detail use using used like').split(' '));

const stem = w =>
  w.length > 4 && w.endsWith('ies') ? `${w.slice(0, -3)}y`
    : w.length > 5 ? w.replace(/(ing|ed|es|s)$/, '')
      : w.length > 3 ? w.replace(/s$/, '') : w;

const words = text =>
  String(text).toLowerCase().replace(/\.net/g, ' dotnet ').replace(/[^a-z0-9+#]+/g, ' ').split(' ')
    .filter(w => w && !STOP.has(w)).map(stem);

const SYNONYMS = {
  ai: ['agent', 'agentic', 'llm', 'genai', 'copilot'], ml: ['ai', 'predictive', 'model'], llm: ['ai', 'model'],
  bank: ['banking', 'financial', 'lending', 'loan'], finance: ['financial', 'banking'], insur: ['insurance', 'claim', 'polic'],
  health: ['healthcare', 'patient', 'clinical', 'hospital'], hospital: ['healthcare', 'patient'], govt: ['government', 'citizen', 'public'],
  school: ['education', 'student'], college: ['education', 'student'], university: ['education', 'student'],
  shop: ['retail', 'commerce'], ecommerce: ['retail', 'commerce'], factory: ['manufacturing'], power: ['energy', 'utilit'],
  cloud: ['azure', 'aws', 'devops'], app: ['application', 'mobile', 'portal'], website: ['web', 'portal'], mobile: ['app'],
  legacy: ['moderniz', 'migration'], migrat: ['moderniz', 'legacy'], automat: ['workflow', 'process', 'rpa'],
  secure: ['security', 'governance', 'complian'], security: ['governance', 'complian', 'access'], data: ['integration', 'analytic'],
  integrat: ['api', 'connect'], test: ['qa', 'quality'], dotnet: ['microsoft', 'azure', 'c#'], chatbot: ['assistant', 'conversational', 'agent'],
};

const synonymsOf = t => Object.entries(SYNONYMS).filter(([k]) => t.startsWith(k)).flatMap(([, syns]) => syns);

/** Tokens plus related words. */
const expand = tokens => [...tokens, ...tokens.flatMap(synonymsOf)];

/** Query weights: the visitor's own words count fully, related words count less. */
const weighted = (tokens, factor = 1) => {
  const query = new Map();
  for (const t of tokens) {
    query.set(t, Math.max(query.get(t) ?? 0, factor));
    for (const s of synonymsOf(t)) if (!query.has(s)) query.set(s, 0.4 * factor);
  }
  return query;
};

const clip = (text, max = 650) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('\n'));
  return (end > 200 ? cut.slice(0, end + 1) : cut + '…').trim();
};

const bullets = items => items.map(i => `• ${i}`).join('\n');
const pageNote = page => (page ? `\nMore on ${page}` : '');

// ─── Passages ───────────────────────────────────────────────────────────────

const passages = [];
const add = (title, text, page, extra = '') => {
  if (!title || !text) return;
  passages.push({ title, text, page, tokens: words(`${title} ${text} ${extra}`), titleTokens: words(title.replace(/\s*\(.*\)$/, '')) });
};

for (const f of K.faq) add(f.q, f.a, null);
for (const f of K.agenticAI.faq) add(f.q, f.a, '/agentic-ai');

add('What is an AI agent?', `${K.agenticAI.faq[0]?.a ?? ''}\nHow an agent works:\n${bullets(K.agenticAI.loop.map(s => `${s.title}: ${s.desc}`))}`, '/agentic-ai', 'agent agentic work loop');
add('AI agent vs chatbot vs automation',
  `A chatbot mainly understands intent. Rule-based automation acts across systems but can't plan or adapt. An ALPHAZOX AI agent does all of it: ${K.agenticAI.compare.rows.join(', ').toLowerCase()}.`,
  '/agentic-ai', 'difference compare chatbot rpa automation');
add('How we build an AI agent', bullets(K.agenticAI.lifecycle.map(s => `${s.title}: ${s.desc}`)), '/agentic-ai', 'process lifecycle build agent steps');
for (const c of K.agenticAI.capabilities) add(c.title, `${c.summary}\n${bullets(c.points)}`, '/agentic-ai', 'agent capability');
add('Example AI agents we build', bullets(K.agenticAI.examples.map(e => `${e.title}: ${e.desc}`)), '/agentic-ai', 'example agent use case');

for (const p of K.pillars) add(p.title, `${p.desc}\n${bullets(p.points)}`, '/');
for (const g of K.useCases) for (const u of g.items) add(u.title, `${u.desc} (${g.label})`, u.to, g.intro);
for (const i of K.initiatives) add(i.title, i.desc, i.to);
for (const c of K.capabilities) add(c.title, `${c.desc} Includes: ${c.tags.join(', ')}.`, c.to);
for (const t of K.techStack) add(`${t.group} technologies`, `We work with ${t.items.join(', ')}.`, t.to, 'technology stack tools platform');
add('Industries we serve', bullets(K.industries.map(i => `${i.name}: ${i.desc}`)), '/industries', 'industry sector domain');
for (const i of K.industries) add(i.name, `${i.desc}\nWhat we build: ${i.builds.join(', ')}.`, `/industries/${i.slug}`, 'industry');
add('Governance and security', bullets(K.governance.map(g => `${g.title}: ${g.desc}`)), '/platform/security-governance', 'security governance compliance audit access safe');
add('How we deliver projects', bullets(K.deliveryApproach.map(d => `${d.title}: ${d.desc}`)), '/about', 'approach process delivery methodology steps start');
add('Why choose ALPHAZOX', bullets(K.whyUs.map(w => `${w.title}: ${w.desc}`)), '/solutions', 'why choose benefit advantage different');
add('Our values', bullets(K.values.map(v => `${v.title}: ${v.desc}`)), '/about', 'values culture');

for (const d of K.detailPages) {
  add(d.name, `${d.title} ${d.summary}\nWhat we deliver:\n${bullets(d.areas.map(a => a.title))}`, d.page, `${d.eyebrow} ${(d.outcomes || []).join(' ')}`);
  add(`${d.name}: outcomes`, bullets(d.outcomes || []), d.page, 'outcome result benefit');
  for (const a of d.areas) add(`${a.title} (${d.name})`, `${a.desc}\nIncludes: ${a.builds.join(', ')}.`, d.page);
  for (const f of d.faq || []) add(f.q, f.a, d.page, d.name);
  for (const f of d.more?.faq || []) add(f.q, f.a, d.page, d.name);
  for (const e of d.more?.examples || []) add(`${e.title} (${d.name})`, e.desc, d.page, 'example');
  if (d.more?.intro) add(d.more.introTitle || d.name, d.more.intro.join(' '), d.page, d.name);
  if (d.more?.stack) add(`${d.name}: technology`, `Typical stack: ${d.more.stack.join(', ')}.`, d.page, 'technology stack tools');
}

// BM25 statistics.
const N = passages.length;
const df = new Map();
for (const p of passages) for (const t of new Set(p.tokens)) df.set(t, (df.get(t) || 0) + 1);
const avgLen = passages.reduce((s, p) => s + p.tokens.length, 0) / N;
const idf = t => Math.log(1 + (N - (df.get(t) || 0) + 0.5) / ((df.get(t) || 0) + 0.5));

const matches = (t, q) => t === q || (q.length >= 4 && t.startsWith(q)) || (t.length >= 4 && q.startsWith(t));

// BM25 over the passage text, plus a bonus when the query words appear in the passage title
// (so "What is an AI agent?" lands on the passage with that title, not any passage mentioning agents).
function score(p, query) {
  let s = 0;
  let own = 0;
  let ownInTitle = 0;
  const len = p.tokens.length;
  for (const [q, weight] of query) {
    if (weight === 1) own++;
    let tf = 0;
    for (const t of p.tokens) if (matches(t, q)) tf++;
    if (!tf) continue;
    s += weight * idf(q) * ((tf * 2.2) / (tf + 1.2 * (0.25 + 0.75 * (len / avgLen))));
    if (p.titleTokens.some(t => matches(t, q))) {
      s += weight * idf(q) * 1.5;
      if (weight === 1) ownInTitle++;
    }
  }
  // Passages whose title covers more of the question rank higher.
  return own ? s * (1 + ownInTitle / own) : s;
}

/** Share (by importance) of the visitor's own words that appear anywhere on the site. */
function coverage(tokens) {
  if (!tokens.length) return 0;
  let found = 0;
  let total = 0;
  for (const q of tokens) {
    const w = idf(q);
    total += w;
    const variants = [q, ...synonymsOf(q)];
    if (passages.some(p => p.tokens.some(t => variants.some(v => matches(t, v))))) found += w;
  }
  return found / total;
}

// ─── Direct intents ─────────────────────────────────────────────────────────

const has = (q, re) => re.test(q);

function aboutAnswer() {
  return `${K.company.summary}\n\n${K.company.mission}\n\nWe work across ${K.industries.map(i => i.name).join(', ')}. See /about, or ask me about a service, industry or open role.`;
}

function contactAnswer() {
  const offices = SITE.offices.map(o => `• ${o.label}: ${o.address} Phone ${o.phone}`).join('\n');
  return `You can reach ALPHAZOX at:\nEmail: ${SITE.email}\nIndia: ${SITE.phoneIndia}\nUSA: ${SITE.phoneUSA}\n\nOffices:\n${offices}\n\nOr send a message on /contact. We reply within one business day.`;
}

function jobsAnswer(q) {
  const jobs = K.careers.openRoles;
  // A question about one specific role?
  const qTokens = expand(words(q)).filter(t => !/^(job|opening|role|position|vacanc|hiring|career|apply|current|open|many|how)/.test(t));
  const scored = jobs.map(j => ({ j, s: words(`${j.title} ${j.team}`).filter(t => qTokens.some(q2 => t.startsWith(q2) || q2.startsWith(t))).length }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  if (scored.length && scored.length < jobs.length) {
    const matches = scored.filter(x => x.s === scored[0].s).map(x => x.j);
    return `${matches.length === 1 ? 'Yes, we have this opening' : 'Matching openings'}:\n${bullets(matches.map(j => `${j.title}, ${j.team}, ${j.location} (${j.type})`))}\n\n${K.careers.howToApply} Apply on /careers.`;
  }
  return `We currently have ${jobs.length} open roles:\n${bullets(jobs.map(j => `${j.title} (${j.location})`))}\n\n${K.careers.howToApply} Apply on /careers.`;
}

function intent(q) {
  const text = q.toLowerCase();
  const tokens = words(text);
  if (!tokens.length && has(text, /\b(hi|hello|hey|hii+|good (morning|afternoon|evening)|namaste)\b/)) {
    return "Hello! I'm Alpha, the ALPHAZOX assistant. Ask me about our AI agents and apps, the industries we serve, open jobs or how to contact us.";
  }
  if (has(text, /\b(thanks|thank you|thx|great|awesome|cool)\b/) && tokens.length <= 2) {
    return 'Happy to help! Anything else you would like to know about ALPHAZOX?';
  }
  if (has(text, /\b(job|jobs|opening|openings|vacanc|hiring|career|careers|recruit|fresher|intern|internship|apply|position|positions|work (at|with|for) (you|alphazox))/)) {
    if (has(text, /\b(salary|ctc|package|pay)\b/)) return `Salary details aren't published on the website. Apply on /careers and our HR team will discuss compensation with shortlisted candidates, or email ${SITE.email}.`;
    return jobsAnswer(text);
  }
  if (has(text, /\b(contact|phone|call|email|mail|address|office|offices|located|location|where are you|reach you|whatsapp|number)\b/)) {
    return contactAnswer();
  }
  if (has(text, /\b(price|pricing|cost|costs|charge|charges|fee|fees|budget|quote|quotation|rate|rates)\b/)) {
    return 'Pricing depends on scope, so we don\'t publish fixed prices. Every engagement starts with a free 30-minute discovery call where we scope one high-value use case and give you an estimate. Use the "Book a demo" button at the top of the page, or write to us on /contact.';
  }
  if (has(text, /\b(what('s| is| are)( an?)? (ai )?agents?|what('s| is) agentic( ai)?|define (an? )?(ai )?agent)\b/) && tokens.length <= 3) {
    const agent = passages.find(p => p.title === 'What is an AI agent?');
    return `${agent.text}\n\nSee /agentic-ai for examples and how we build them safely.`;
  }
  if (has(text, /\b(what (do|does|can) (you|alphazox|your company) (do|build|offer|make|provide)|(your|alphazox) services|services|offerings|what you do)\b/) &&
      !tokens.some(t => !/^(servic|build|offer|make|do|provide|what)/.test(t))) {
    const faq = K.faq.find(f => /build/i.test(f.q));
    return `${faq ? faq.a : K.company.summary}\n\nOur main areas:\n${bullets(K.initiatives.map(i => `${i.title}: ${i.desc}`))}\n\nSee /solutions, or ask me about any of these.`;
  }
  if (has(text, /\b(demo|meeting|consult|consultation|appointment|book)\b/)) {
    return `Click "Book a demo" at the top of any page and fill in the short form. We'll set up a free 30-minute discovery call within one business day. You can also email ${SITE.email}.`;
  }
  if (has(text, /\b(why (should|would|choose|pick|hire|you|alphazox)|choose (you|alphazox)|advantages?|different from|better than)\b/)) {
    const why = passages.find(p => p.title === 'Why choose ALPHAZOX');
    return `${why.text}\n\nThe best way to see it is a free 30-minute discovery call: use "Book a demo" at the top of the page.`;
  }
  if (has(text, /\b(who are you|what (is|are) (alphazox|you)|about (alphazox|you|your company|the company|company)|explain (about )?(the )?alphazox|tell me about (alphazox|your company|yourself)|your company|alphazox)\b/) &&
      tokens.length <= 3) {
    return aboutAnswer();
  }
  return null;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** messages: [{ role: 'user' | 'assistant', content }], last one from the user. */
export function answerFromSite(messages) {
  const question = messages[messages.length - 1].content;
  const direct = intent(question);
  if (direct) return direct;

  const own = words(question);
  const query = weighted(own);

  // Follow-ups ("tell me more", "what about insurance?") borrow the previous question's topic.
  const isFollowUp = !own.length || /^(and|also|what about|how about|tell me more|more|why|how come|go on|continue)\b/i.test(question.trim());
  const previous = [...messages].slice(0, -1).reverse().find(m => m.role === 'user');
  if (isFollowUp && previous) for (const [t, w] of weighted(words(previous.content), 0.5)) if (!query.has(t)) query.set(t, w);

  if (!query.size) {
    return 'Could you tell me a bit more about what you are looking for? For example: AI agents, app development, legacy modernization, an industry, open jobs or contact details.';
  }

  const ranked = passages.map(p => ({ p, s: score(p, query) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
  // Not on the site: the best match is weak, or the visitor's important words never appear on the site
  // (e.g. "weather today" only matching "today").
  if (!ranked.length || ranked[0].s < 1.5 || (own.length && coverage(own) < 0.6)) {
    if (/\balphazox\b/i.test(question)) return aboutAnswer();
    return `I couldn't find that on our website. I can answer questions about our AI agents, apps and automation, legacy modernization, the industries we serve, open jobs and how to reach us. For anything else, email ${SITE.email} or use /contact and our team will reply within one business day.`;
  }

  // If the previous answer already came from the best passage, move on to the next one ("tell me more").
  const lastBot = [...messages].reverse().find(m => m.role === 'assistant')?.content ?? '';
  let best = ranked[0];
  if (isFollowUp && lastBot.includes(clip(best.p.text, 120).slice(0, 80))) best = ranked.find(x => !lastBot.includes(x.p.text.slice(0, 80))) ?? best;

  const related = ranked.find(x => x !== best && x.p.page && x.p.page !== best.p.page && x.s > best.s * 0.6);
  const heading = `${best.p.title.replace(/\s*\(.*\)$/, '')}\n`;
  return `${heading}${clip(best.p.text)}${pageNote(best.p.page)}${related ? `\nRelated: ${related.p.title.replace(/\s*\(.*\)$/, '')} (${related.p.page})` : ''}`;
}
