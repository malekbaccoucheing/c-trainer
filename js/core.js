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

// ---- Résolution unifiée de la "réponse attendue" selon le type ----
function getExpectedString(ex) {
  if (!ex) return '';
  if (ex.expected) return ex.expected;
  if (ex.correct) return Array.isArray(ex.correct) ? ex.correct.join(', ') : String(ex.correct);
  if (ex.bugLines) return ex.bugLines.join(', ');
  if (ex.blanks) return ex.blanks.map(b => b.correct).join(', ');
  if (ex.rows) return ex.rows.map(r => r.join(' | ')).join(' / ');
  if (ex.memory) return ex.memory.map(m => `${m.name}=${m.expected}`).join(', ');
  return '';
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

// Protection des blocs de code ET du code inline par sentinelles.
// Cela empêche le markdown (**gras**, listes, etc.) de casser le contenu
// à l'intérieur des balises <code> ou <pre>.
function renderMarkdown(s) {
  let html = escapeHtml(s);

  // ---------- ÉTAPE 1 : protéger les blocs de code ```lang ... ``` ----------
  const codeBlocks = [];
  html = html.replace(/```(\w*)\r?\n([\s\S]*?)```/g, (m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="code-block my-2"><code class="language-${lang || 'c'}">${code}</code></pre>`);
    return `\x00B${idx}\x00`;
  });

  // ---------- ÉTAPE 2 : protéger le code inline `...` ----------
  // Sans cette protection, `ETUDIANT **tab` serait transformé en
  // <code>ETUDIANT <strong>tab</code>...</strong> → HTML cassé.
  const inlineCodes = [];
  html = html.replace(/`([^`\n]+)`/g, (m, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(`<code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded text-[0.85em]">${code}</code>`);
    return `\x00I${idx}\x00`;
  });

  // ---------- ÉTAPE 3 : formatage Markdown sur le texte restant ----------
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-100">$1</strong>');
  html = html.replace(/^\s*-\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, m => `<ul class="space-y-1 my-2">${m}</ul>`);
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/<\/li><br>/g, '</li>').replace(/<br><li/g, '<li').replace(/<\/ul><br>/g, '</ul>');

  // ---------- ÉTAPE 4 : restaurer le code inline ----------
  html = html.replace(/\x00I(\d+)\x00/g, (m, idx) => inlineCodes[parseInt(idx, 10)]);

  // ---------- ÉTAPE 5 : restaurer les blocs de code ----------
  html = html.replace(/\x00B(\d+)\x00/g, (m, idx) => codeBlocks[parseInt(idx, 10)]);

  return html;
}

// ---- Normalisation pour comparaison de chaînes ----
//
// ⭐ CORRECTION du point signalé par l'auditrice :
//
// L'ancien `case 'trim-lines'` terminait par `.trim()`, ce qui supprimait
// TOUS les espaces en début et fin de la chaîne complète. Or, plusieurs
// exercices (base-010, base-019, ctrl-020, ctrl-021, ctrl-023) ont un
// résultat attendu qui commence par un ou plusieurs espaces significatifs :
//
//   base-010 : "   1   2\n1   |2"
//   base-019 : "2.300000 4.500000\n2.30 4.50\n 2.30|4.50 |"
//   ctrl-020 : " 1 \n 2 \nla valeur de i est 3 "
//
// Avec `.trim()`, le "   1" de base-010 devenait "1", et l'étudiant qui
// avait saisi correctement les espaces de tête était injustement pénalisé.
//
// La nouvelle version :
//   1. Supprime les espaces en FIN de chaque ligne (avec `.trimEnd()`).
//      Cela tolère le copier-coller ou une saisie distraite avec des
//      espaces invisibles en fin de ligne.
//   2. Supprime les SAUTS DE LIGNE FINAUX (avec `.replace(/\n+$/, '')`),
//      ce qui évite qu'une dernière ligne vide ne soit comptée comme une
//      ligne à part entière.
//   3. PRÉSERVE les espaces en DÉBUT de ligne, car ils font partie de la
//      sortie attendue quand le programme utilise des gabarits d'affichage.
function normalizeStr(s, mode = 'trim') {
  if (typeof s !== 'string') s = String(s ?? '');
  switch (mode) {
    case 'exact':
      return s;
    case 'trim':
      return s.trim();
    case 'trim-lines':
      // Attention : on NE fait PAS de .trim() final, sinon les espaces
      // en début de première ligne seraient supprimés.
      return s.split('\n').map(l => l.trimEnd()).join('\n').replace(/\n+$/, '');
    case 'whitespace':
      return s.replace(/\s+/g, ' ').trim();
    default:
      return s.trim();
  }
}
