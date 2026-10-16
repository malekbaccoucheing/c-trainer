// ═══════════════════════════════════════════════════════════════
//  STATISTIQUES
// ═══════════════════════════════════════════════════════════════

function computeScore() {
  const active = getActiveExercises();
  const total = active.length;
  const attempted = active.filter(ex => {
    const a = state.answers[ex.id];
    if (a === undefined || a === null) return false;
    if (typeof a === 'string') return a.trim().length > 0;
    if (Array.isArray(a)) return a.length > 0;
    if (typeof a === 'object') return Object.keys(a).length > 0;
    return true;
  }).length;
  const correct = active.filter(ex => state.verdicts[ex.id]?.correct).length;
  const percent = state.mode === 'exam'
    ? (total > 0 ? Math.round((correct / total) * 100) : 0)
    : (attempted > 0 ? Math.round((correct / attempted) * 100) : 0);
  return { total, attempted, correct, percent };
}

function computeChapterStats() {
  const active = getActiveExercises();
  const byChapter = {};
  active.forEach(ex => {
    if (!byChapter[ex.chapter]) byChapter[ex.chapter] = { total: 0, attempted: 0, correct: 0 };
    byChapter[ex.chapter].total++;
    const v = state.verdicts[ex.id];
    if (v) { byChapter[ex.chapter].attempted++; if (v.correct) byChapter[ex.chapter].correct++; }
  });
  return byChapter;
}

function computeFormatStats() {
  const active = getActiveExercises();
  const byFormat = {};
  active.forEach(ex => {
    if (!byFormat[ex.type]) byFormat[ex.type] = { total: 0, attempted: 0, correct: 0 };
    byFormat[ex.type].total++;
    const v = state.verdicts[ex.id];
    if (v) { byFormat[ex.type].attempted++; if (v.correct) byFormat[ex.type].correct++; }
  });
  return byFormat;
}

function showStats() {
  const global = computeScore();
  const byChapter = computeChapterStats();
  const byFormat = computeFormatStats();
  const active = getActiveExercises();
  const content = document.getElementById('stats-content');

  const chapterRows = Object.entries(byChapter).map(([chapter, s]) => {
    const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    let barBg, textColor;
    if (pct >= 75) { barBg = 'bg-emerald-500'; textColor = 'text-emerald-400'; }
    else if (pct >= 40) { barBg = 'bg-amber-500'; textColor = 'text-amber-400'; }
    else { barBg = 'bg-red-500'; textColor = 'text-red-400'; }
    return `<div class="mb-4">
      <div class="flex justify-between items-baseline mb-1">
        <span class="text-slate-200 font-medium text-sm">${escapeHtml(chapter)}</span>
        <span class="text-xs text-slate-400">${s.correct}/${s.total}</span>
      </div>
      <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div class="h-full ${barBg} bar-fill" style="width: ${pct}%"></div>
      </div>
      <div class="text-xs ${textColor} mt-1">${pct}% de réussite</div>
    </div>`;
  }).join('');

  const formatRows = Object.entries(byFormat).map(([fmt, s]) => {
    const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    const labels = { mcq: '📝 QCM', predict: '🔮 Prédire', fillblanks: '🕳️ Trous', trace: '📊 Trace', findbug: '🐛 Trouver bug', memory: '🧠 Mémoire' };
    return `<tr>
      <td class="py-2 text-slate-300">${labels[fmt] || fmt}</td>
      <td class="py-2 text-right text-slate-300">${s.correct} / ${s.total}</td>
      <td class="py-2 text-right text-slate-400">${pct}%</td>
    </tr>`;
  }).join('');

  content.innerHTML = `
    ${state.selection ? `<div class="mb-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">🎲 Statistiques sur <strong>${active.length} exercices</strong> (sélection aléatoire).</div>` : ''}
    <div class="bg-slate-800/50 rounded-xl p-5 mb-6">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div><div class="text-3xl font-bold text-emerald-400">${global.correct}</div><div class="text-xs text-slate-500 uppercase tracking-wide mt-1">Réussis</div></div>
        <div><div class="text-3xl font-bold text-slate-300">${global.attempted}</div><div class="text-xs text-slate-500 uppercase tracking-wide mt-1">Tentés</div></div>
        <div><div class="text-3xl font-bold text-amber-400">${global.percent}%</div><div class="text-xs text-slate-500 uppercase tracking-wide mt-1">Réussite</div></div>
      </div>
    </div>
    <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3">Par chapitre</h3>
    ${chapterRows}
    <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 mt-6">Par format</h3>
    <table class="w-full text-sm">
      <thead><tr class="text-xs text-slate-500 uppercase tracking-wider">
        <th class="text-left pb-2">Format</th><th class="text-right pb-2">Réussis</th><th class="text-right pb-2">%</th>
      </tr></thead>
      <tbody>${formatRows}</tbody>
    </table>
  `;
  document.getElementById('stats-modal').classList.remove('hidden');
  document.getElementById('stats-modal').classList.add('flex');
}

function closeStats() {
  document.getElementById('stats-modal').classList.add('hidden');
  document.getElementById('stats-modal').classList.remove('flex');
}
