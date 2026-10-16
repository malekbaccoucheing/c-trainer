// ═══════════════════════════════════════════════════════════════
//  SIDEBAR — Accordéon synchronisé
// ═══════════════════════════════════════════════════════════════

function renderSidebar() {
  const active = getActiveExercises();
  const byChapter = {};
  active.forEach(ex => {
    if (!byChapter[ex.chapter]) byChapter[ex.chapter] = [];
    byChapter[ex.chapter].push(ex);
  });

  if (state.openChapter && state.openChapter !== NO_CHAPTER && !byChapter[state.openChapter]) {
    state.openChapter = NO_CHAPTER;
    saveState();
  }

  const typeIcons = { mcq: '📝', predict: '🔮', fillblanks: '🕳️', trace: '📊', findbug: '🐛', memory: '🧠' };

  let html = '';
  for (const [chapter, exs] of Object.entries(byChapter)) {
    const done = exs.filter(e => state.verdicts[e.id]?.correct).length;
    const isOpen = state.openChapter === chapter;
    const total = exs.length;
    const successRate = total > 0 ? Math.round((done / total) * 100) : 0;

    let badgeColor = 'text-slate-500';
    if (successRate >= 75) badgeColor = 'text-emerald-400';
    else if (successRate >= 40) badgeColor = 'text-amber-400';
    else if (done > 0) badgeColor = 'text-red-400';

    html += `
      <div data-chapter-wrap="${escapeHtml(chapter)}">
        <button data-chapter-btn data-chapter="${escapeHtml(chapter)}" onclick="toggleChapter(this.dataset.chapter)"
          class="chapter-btn w-full text-left px-3 py-2 rounded-lg flex items-center gap-2
          ${isOpen ? 'chapter-btn-open' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}">
          <span class="chapter-chevron ${isOpen ? 'open' : ''} text-xs text-slate-500 shrink-0">▶</span>
          <span class="flex-1 text-xs uppercase tracking-wider font-medium truncate">${escapeHtml(chapter)}</span>
          <span class="text-[0.7rem] ${badgeColor} font-mono shrink-0">${done}/${total}</span>
        </button>
        <div class="chapter-content ${isOpen ? 'open' : ''}">
          <div class="chapter-inner">
            <div class="pl-2 mt-1 space-y-0.5 border-l border-slate-800 ml-3">
              ${exs.map(ex => {
                const v = state.verdicts[ex.id];
                const isCurrent = ex.id === currentId;
                const icon = v
                  ? (v.correct ? '<span class="text-emerald-400">✓</span>' : '<span class="text-red-400">✗</span>')
                  : '<span class="text-slate-600">○</span>';
                const fmt = typeIcons[ex.type] || '';
                return `
                  <button onclick="selectExercise('${ex.id}')"
                    class="w-full text-left px-2.5 py-1.5 rounded-md text-sm transition flex items-start gap-2
                    ${isCurrent ? 'bg-emerald-500/10 border border-emerald-500/30' : 'hover:bg-slate-900'}">
                    <span class="mt-0.5 shrink-0 text-xs">${icon}</span>
                    <span class="shrink-0 text-xs opacity-60">${fmt}</span>
                    <span class="flex-1 ${isCurrent ? 'text-emerald-100 font-medium' : 'text-slate-400'}">${escapeHtml(ex.title)}</span>
                  </button>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>`;
  }
  sidebar.innerHTML = html;
}

function toggleChapter(chapter) {
  const wasOpen = state.openChapter === chapter;
  state.openChapter = wasOpen ? NO_CHAPTER : chapter;
  saveState();

  document.querySelectorAll('[data-chapter-wrap]').forEach(wrap => {
    const ch = wrap.dataset.chapterWrap;
    const isNowOpen = ch === state.openChapter;

    const content = wrap.querySelector('.chapter-content');
    const chevron = wrap.querySelector('.chapter-chevron');
    const btn = wrap.querySelector('[data-chapter-btn]');

    if (content) content.classList.toggle('open', isNowOpen);
    if (chevron) chevron.classList.toggle('open', isNowOpen);
    if (btn) {
      btn.classList.toggle('chapter-btn-open', isNowOpen);
      if (isNowOpen) {
        btn.classList.remove('text-slate-400', 'hover:bg-slate-900', 'hover:text-slate-200');
      } else {
        btn.classList.add('text-slate-400', 'hover:bg-slate-900', 'hover:text-slate-200');
      }
    }
  });
}

function collapseAll() {
  state.openChapter = NO_CHAPTER;
  saveState();
  document.querySelectorAll('[data-chapter-wrap]').forEach(wrap => {
    const content = wrap.querySelector('.chapter-content');
    const chevron = wrap.querySelector('.chapter-chevron');
    const btn = wrap.querySelector('[data-chapter-btn]');
    if (content) content.classList.remove('open');
    if (chevron) chevron.classList.remove('open');
    if (btn) {
      btn.classList.remove('chapter-btn-open');
      btn.classList.add('text-slate-400', 'hover:bg-slate-900', 'hover:text-slate-200');
    }
  });
}

function updateProgress() {
  const active = getActiveExercises();
  const total = active.length;
  const done = active.filter(ex => state.verdicts[ex.id]?.correct).length;
  document.getElementById('progress-text').textContent = `${done} / ${total}`;
  document.getElementById('progress-bar').style.width = `${total > 0 ? (done / total) * 100 : 0}%`;
}