const kb = document.querySelector('#kb');
const messages = document.querySelector('#messages');
const status = document.querySelector('#status');
const question = document.querySelector('#question');

const demo = `What are your opening hours? | We are open Monday to Friday, 8am to 5pm.
Where are you located? | We are located in the city centre. Our team can send you directions.
How much does delivery cost? | Standard delivery costs $5. Express delivery costs $10.
How can I contact you? | Email hello@example.com or call +1 555 0100.
What is your return policy? | You can request a return within 30 days of purchase.`;

function parseKB() {
  return kb.value.split('\n').map(x => x.trim()).filter(Boolean).map(line => {
    const i = line.indexOf('|');
    return i === -1 ? null : {q: line.slice(0,i).trim(), a: line.slice(i+1).trim()};
  }).filter(Boolean);
}

function words(s) {
  return new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w => w.length > 2));
}

function answer(text) {
  const entries = parseKB();
  if (!entries.length) return "I don't have any business information yet. Add some FAQs in the Knowledge Base.";
  const input = words(text);
  let best = null, bestScore = 0;
  for (const e of entries) {
    const q = words(e.q);
    let score = 0;
    input.forEach(w => { if (q.has(w)) score += 1; });
    const normalized = text.toLowerCase();
    if (normalized.includes(e.q.toLowerCase())) score += 3;
    if (score > bestScore) { bestScore = score; best = e; }
  }
  if (!best || bestScore < 1) return "I’m not confident I have that information. Please contact the business directly so a team member can help.";
  return best.a;
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function resetChat() {
  messages.innerHTML = '';
  addMessage("Hi! I'm the AnswerStack assistant. Ask me anything about this business.", 'bot');
}
resetChat();

document.querySelector('#loadDemo').onclick = () => { kb.value = demo; status.textContent = 'Demo FAQs loaded.'; };
document.querySelector('#save').onclick = () => {
  localStorage.setItem('answerstack_kb', kb.value);
  status.textContent = `Saved ${parseKB().length} FAQ entries in this browser.`;
};
document.querySelector('#clear').onclick = () => { kb.value=''; localStorage.removeItem('answerstack_kb'); status.textContent='Knowledge base cleared.'; };
document.querySelector('#resetChat').onclick = resetChat;

document.querySelector('#chatForm').onsubmit = e => {
  e.preventDefault();
  const q = question.value.trim();
  if (!q) return;
  addMessage(q, 'user');
  question.value = '';
  setTimeout(() => addMessage(answer(q), 'bot'), 180);
};

const saved = localStorage.getItem('answerstack_kb');
kb.value = saved || demo;

const snippet = `<script>
  // Production version: replace with your hosted AnswerStack widget URL.
  window.AnswerStack = { businessId: "YOUR_BUSINESS_ID" };
</script>
<script src="https://YOUR-DOMAIN.com/widget.js" defer></script>`;
document.querySelector('#snippet').textContent = snippet;

document.querySelector('#copy').onclick = async () => {
  await navigator.clipboard.writeText(snippet);
  status.textContent = 'Embed snippet copied.';
};
