// ═══════════════════════════════════════════════════════════════
//  CORE — État, persistance localStorage, utilitaires
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'c-trainer-v9';
const EXPORT_VERSION = 9;
const NO_CHAPTER = '__NONE__';

function defaultState() {
  return {
    answers: {}, verdicts: {},
    mode: 'training', examStart: null, examDuration: null, examSubmitted: false,
    selection: null,
    openChapter: null
  };
}

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!s) return defaultState();
    return Object.assign(defaultState(), s);
  } catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ---- Variables d'état globales ----
let state = loadState();
let currentId = null;
let timerInterval = null;

// ---- Références DOM principales ----
const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');

// ---- Filtre de sélection (aléatoire) ----
function getActiveExercises() {
  if (!state.selection || !state.selection.ids || state.selection.ids.length === 0) return EXERCISES;
  const idSet = new Set(state.selection.ids);
  const filtered = EXERCISES.filter(ex => idSet.has(ex.id));
  return filtered.length > 0 ? filtered : EXERCISES;
}

// ---- Toast ----
function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-2xl fade-in z-50 max-w-sm text-sm ${
    type === 'success' ? 'bg-emerald-600 text-white' :
    type === 'error' ? 'bg-red-600 text-white' :
    'bg-slate-800 text-slate-200 border border-slate-700'
  }`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; }, 2200);
  setTimeout(() => el.remove(), 2600);
}

// ---- HTML escape ----
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---- Markdown léger (pour UI Tailwind) ----
function renderMarkdown(s) {
  let html = escapeHtml(s);
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-[0.85em]">$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-100">$1</strong>');
  html = html.replace(/^\s*-\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, m => `<ul class="space-y-1 my-2">${m}</ul>`);
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/<\/li><br>/g, '</li>').replace(/<br><li/g, '<li').replace(/<\/ul><br>/g, '</ul>');
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => `<pre class="code-block my-2"><code class="language-${lang || 'c'}">${code}</code></pre>`);
  return html;
}

// ---- Normalisation pour comparaison de chaînes ----
function normalizeStr(s, mode = 'trim') {
  if (typeof s !== 'string') s = String(s ?? '');
  switch (mode) {
    case 'exact': return s;
    case 'trim': return s.trim();
    case 'trim-lines': return s.split('\n').map(l => l.trimEnd()).join('\n').trim();
    case 'whitespace': return s.replace(/\s+/g, ' ').trim();
    default: return s.trim();
  }
}
