// ═══════════════════════════════════════════════════════════════
//  RENDER — En-tête, exercice courant, feedback, événements
// ═══════════════════════════════════════════════════════════════

function renderHeader() {
  const timerEl = document.getElementById('exam-timer');
  const submitBtn = document.getElementById('exam-submit-btn');
  const modeBtn = document.getElementById('mode-btn');
  const banner = document.getElementById('exam-banner');
  if (state.mode === 'exam' && !state.examSubmitted) {
    timerEl.classList.remove('hidden'); timerEl.classList.add('flex');
    submitBtn.classList.remove('hidden'); banner.classList.remove('hidden');
    modeBtn.textContent = 'Quitter l\'examen';
    modeBtn.className = 'px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition';
  } else {
    timerEl.classList.add('hidden'); timerEl.classList.remove('flex');
    submitBtn.classList.add('hidden'); banner.classList.add('hidden');
    if (state.mode === 'exam' && state.examSubmitted) {
      modeBtn.textContent = 'Sortir du mode examen';
      modeBtn.className = 'px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition';
    } else {
      modeBtn.textContent = 'Mode Examen';
      modeBtn.className = 'px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition';
    }
  }
}

function renderExercise() {
  const ex = EXERCISES.find(e => e.id === currentId);
  if (!ex) return;
  const answer = state.answers[ex.id];
  const verdict = state.verdicts[ex.id];
  const diffStars = '★'.repeat(ex.difficulty) + '☆'.repeat(5 - ex.difficulty);
  const examActive = isExamActive();
  const examSubmitted = isExamSubmitted();
  const canShowFeedback = verdict && (!examActive || examSubmitted);

  let body = '';
  if (ex.statement) body += `<p class="text-slate-300 mb-4 leading-relaxed">${renderMarkdown(ex.statement)}</p>`;
  if (ex.code && ex.type !== 'findbug') body += `<pre class="code-block mb-4"><code class="language-c">${escapeHtml(ex.code)}</code></pre>`;

  switch (ex.type) {
    case 'mcq': body += renderMCQ(ex, answer); break;
    case 'predict': body += renderPredict(ex, answer); break;
    case 'fillblanks': body += renderFillBlanks(ex, answer); break;
    case 'trace': body += renderTrace(ex, answer); break;
    case 'findbug': body += renderFindBug(ex, answer); break;
    case 'memory': body += renderMemory(ex, answer); break;
  }
  if (canShowFeedback) body += renderFeedback(ex, verdict);

  let actions = '';
  if (examActive) {
    actions = `<div class="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex items-center justify-between flex-wrap gap-3">
      <div class="text-sm text-red-300"><strong>Mode Examen</strong> — Réponses enregistrées automatiquement.</div>
      <button onclick="submitExam()" class="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition">Soumettre l'examen</button>
    </div>`;
  } else {
    actions = `<div class="flex gap-3 mt-6 flex-wrap">
      <button onclick="submitAnswer()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition">Vérifier</button>
      ${verdict ? `<button onclick="clearAnswer()" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition">Effacer</button>` : ''}
      ${nextExerciseId() ? `<button onclick="selectExercise('${nextExerciseId()}')" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition">Suivant →</button>` : ''}
    </div>`;
  }

  main.innerHTML = `<div class="fade-in">
    <div class="mb-6 pb-4 border-b border-slate-800">
      <div class="flex items-center gap-3 mb-2 flex-wrap">
        <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">${escapeHtml(ex.chapter)}</span>
        <span class="text-xs text-amber-400">${diffStars}</span>
        <span class="text-xs text-slate-600 mono">${ex.id}</span>
      </div>
      <h2 class="text-2xl font-semibold text-slate-100">${escapeHtml(ex.title)}</h2>
    </div>
    ${body}${actions}
  </div>`;

  main.querySelectorAll('pre code:not(.no-highlight)').forEach(el => hljs.highlightElement(el));
  attachEvents(ex);
}

function renderMCQ(ex, answer) {
  const selected = new Set(answer || []);
  return `<div class="space-y-2" id="mcq-options">
    ${ex.options.map(o => `<div class="option-card border border-slate-700 rounded-lg p-4 ${selected.has(o.id) ? 'selected' : ''}" data-option="${o.id}">
      <div class="flex items-center gap-3">
        <div class="w-5 h-5 rounded-full border-2 ${selected.has(o.id) ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'} flex items-center justify-center shrink-0">
          ${selected.has(o.id) ? '<div class="w-2 h-2 rounded-full bg-white"></div>' : ''}
        </div>
        <span class="text-slate-200">${renderMarkdown(o.text)}</span>
      </div>
    </div>`).join('')}
  </div>${ex.multi ? '<p class="text-xs text-slate-500 mt-2">Plusieurs réponses possibles.</p>' : ''}`;
}

function renderPredict(ex, answer) {
  return `<textarea id="predict-input" rows="4"
    class="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 mono text-sm text-slate-200 focus:border-emerald-500 focus:outline-none resize-y"
    placeholder="Tapez la sortie attendue ici...">${escapeHtml(answer || '')}</textarea>
  <p class="text-xs text-slate-500 mt-2">Respectez retours à la ligne et casse. Espaces en fin de ligne ignorés.</p>`;
}

function renderFillBlanks(ex, answer) {
  const ans = answer || {};
  let html = escapeHtml(ex.template);
  html = html.replace(/\{\{(\w+)\}\}/g, (m, id) => {
    const b = ex.blanks.find(x => x.id === id);
    if (!b) return m;
    const val = ans[id] || '';
    if (b.kind === 'select') {
      const opts = b.options.map(o => `<option value="${escapeHtml(o)}" ${val === o ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('');
      return `<select data-blank="${id}" class="bg-slate-800 border border-emerald-600/60 rounded px-2 py-0.5 mono text-emerald-300 focus:outline-none focus:border-emerald-400">
        <option value="">— choisir —</option>${opts}</select>`;
    }
    return `<input data-blank="${id}" value="${escapeHtml(val)}" class="bg-slate-800 border border-emerald-600/60 rounded px-2 py-0.5 mono text-emerald-300 w-32 focus:outline-none focus:border-emerald-400">`;
  });
  return `<pre class="code-block"><code class="no-highlight">${html}</code></pre>`;
}

function renderTrace(ex, answer) {
  const ans = answer || [];
  return `<div class="overflow-x-auto">
    <table class="w-full border-collapse text-sm">
      <thead><tr>${ex.columns.map((c, i) => `<th class="border border-slate-700 bg-slate-900 px-3 py-2 text-left text-slate-400 font-medium ${i === 0 ? 'w-20' : ''}">${escapeHtml(c)}</th>`).join('')}</tr></thead>
      <tbody>${ex.rows.map((row, i) => `<tr>${row.map((cell, j) => {
        if (j === 0) return `<td class="border border-slate-700 bg-slate-900 px-3 py-2 mono text-slate-400">${escapeHtml(cell)}</td>`;
        const v = (ans[i] || [])[j] || '';
        return `<td class="border border-slate-700 p-1"><input data-trace-row="${i}" data-trace-col="${j}" value="${escapeHtml(v)}" class="w-full bg-transparent px-2 py-1 mono text-slate-200 focus:outline-none focus:bg-slate-800 rounded"></td>`;
      }).join('')}</tr>`).join('')}</tbody>
    </table>
  </div><p class="text-xs text-slate-500 mt-2">Remplissez les cellules.</p>`;
}

function renderFindBug(ex, answer) {
  const selectedLine = answer?.line ?? null;
  const lines = ex.code.split('\n');
  return `<div class="code-block p-0 overflow-hidden">
    <div class="py-3" id="findbug-lines">
      ${lines.map((line, i) => {
        const lineNum = i + 1;
        const isSelected = selectedLine === lineNum;
        return `<div class="bug-line ${isSelected ? 'selected' : ''}" data-line="${lineNum}">
          <span class="line-num">${lineNum}</span>
          <span class="flex-1 whitespace-pre">${escapeHtml(line) || ' '}</span>
        </div>`;
      }).join('')}
    </div>
  </div>
  <p class="text-xs text-slate-500 mt-2">👆 Cliquez sur la ligne qui contient le bug.</p>`;
}

function renderMemory(ex, answer) {
  const values = answer?.values || {};
  return `<div class="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-slate-900">
        <tr>
          <th class="text-left px-4 py-2 text-xs uppercase tracking-wider text-slate-500">Variable</th>
          <th class="text-left px-4 py-2 text-xs uppercase tracking-wider text-slate-500">Type</th>
          <th class="text-left px-4 py-2 text-xs uppercase tracking-wider text-slate-500">Adresse</th>
          <th class="text-left px-4 py-2 text-xs uppercase tracking-wider text-slate-500">Valeur</th>
        </tr>
      </thead>
      <tbody>
        ${ex.memory.map((m, i) => `
          <tr class="border-t border-slate-800">
            <td class="px-4 py-2 mono text-emerald-300">${escapeHtml(m.name)}</td>
            <td class="px-4 py-2 mono text-slate-500 text-xs">${escapeHtml(m.type)}</td>
            <td class="px-4 py-2 mono text-slate-500 text-xs">${escapeHtml(m.address || '—')}</td>
            <td class="px-4 py-2">
              <input data-memory-idx="${i}" value="${escapeHtml(values[i] || '')}" placeholder="?"
                class="w-32 bg-slate-800 border border-emerald-600/60 rounded px-2 py-1 mono text-emerald-300 focus:outline-none focus:border-emerald-400">
            </td>
          </tr>`).join('')}
      </tbody>
    </table>
  </div>
  <p class="text-xs text-slate-500 mt-2">Remplissez la valeur finale. Pour un pointeur, indiquez l'**adresse**.</p>`;
}

function renderFeedback(ex, verdict) {
  const isCorrect = verdict.correct;
  const icon = isCorrect ? '✓' : '✗';
  const title = isCorrect ? 'Correct' : 'Incorrect';
  const containerClass = isCorrect ? 'mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 fade-in' : 'mt-6 rounded-xl border border-red-500/30 bg-red-500/5 p-5 fade-in';
  const badgeClass = isCorrect ? 'w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold' : 'w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold';
  const titleClass = isCorrect ? 'font-semibold text-emerald-400' : 'font-semibold text-red-400';
  let detailsHtml = '';

  if (ex.type === 'fillblanks' && verdict.details) {
    const wrong = verdict.details.filter(d => !d.ok);
    if (wrong.length) detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700">
      <div class="text-xs text-slate-400 mb-2">Détail :</div>
      <div class="space-y-1">${wrong.map(d => `<div class="text-sm"><span class="text-slate-500 mono">[${d.id}]</span> Vous : <span class="text-red-400 mono">${escapeHtml(d.user) || '(vide)'}</span> — Attendu : <span class="text-emerald-400 mono">${escapeHtml(d.correct)}</span></div>`).join('')}</div>
    </div>`;
  }
  if (ex.type === 'trace' && verdict.details) {
    const wrongCells = [];
    verdict.details.forEach((r, i) => r.cells.forEach((c, j) => { if (!c.ok) wrongCells.push({ row: i + 1, col: ex.columns[j], user: c.user, correct: c.correct }); }));
    if (wrongCells.length) detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700">
      <div class="text-xs text-slate-400 mb-2">Cellules incorrectes :</div>
      <div class="space-y-1">${wrongCells.map(w => `<div class="text-sm">Ligne ${w.row}, <span class="mono">${escapeHtml(w.col)}</span> : Vous : <span class="text-red-400 mono">${escapeHtml(w.user) || '(vide)'}</span> — Attendu : <span class="text-emerald-400 mono">${escapeHtml(w.correct)}</span></div>`).join('')}</div>
    </div>`;
  }
  if (ex.type === 'mcq' && !verdict.correct) {
    const correctText = ex.options.filter(o => ex.correct.includes(o.id)).map(o => o.text).join(', ');
    detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700"><div class="text-sm">Bonnes réponses : <span class="text-emerald-400">${renderMarkdown(correctText)}</span></div></div>`;
  }
  if (ex.type === 'predict' && !verdict.correct) {
    detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div><div class="text-xs text-red-400 mb-1">Votre réponse</div>
        <pre class="bg-slate-900 border border-red-900/40 rounded p-3 mono text-sm text-red-300 whitespace-pre-wrap">${escapeHtml(verdict.user) || '(vide)'}</pre></div>
      <div><div class="text-xs text-emerald-400 mb-1">Attendu</div>
        <pre class="bg-slate-900 border border-emerald-900/40 rounded p-3 mono text-sm text-emerald-300 whitespace-pre-wrap">${escapeHtml(verdict.expected)}</pre></div>
    </div>`;
  }
  if (ex.type === 'findbug') {
    const userLine = verdict.user;
    const correctLines = ex.bugLines;
    if (isCorrect) {
      detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700"><div class="text-sm text-emerald-300">✅ Vous avez identifié la ligne ${userLine}.</div></div>`;
    } else {
      detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700">
        <div class="text-sm">Vous avez cliqué : <span class="text-red-400 mono">ligne ${escapeHtml(userLine) || '(aucune)'}</span></div>
        <div class="text-sm">Ligne(s) correcte(s) : <span class="text-emerald-400 mono">${correctLines.join(', ')}</span></div>
      </div>`;
    }
  }
  if (ex.type === 'memory' && verdict.details) {
    const wrong = verdict.details.filter(d => !d.ok);
    if (wrong.length) detailsHtml = `<div class="mt-3 pt-3 border-t border-slate-700">
      <div class="text-xs text-slate-400 mb-2">Cellules incorrectes :</div>
      <div class="space-y-1">${wrong.map(d => `<div class="text-sm mono">${escapeHtml(d.name)} : Vous : <span class="text-red-400">${escapeHtml(d.user) || '(vide)'}</span> — Attendu : <span class="text-emerald-400">${escapeHtml(d.correct)}</span></div>`).join('')}</div>
    </div>`;
  }

  return `<div class="${containerClass}">
    <div class="flex items-center gap-2 mb-3">
      <span class="${badgeClass}">${icon}</span>
      <span class="${titleClass}">${title}</span>
    </div>
    <div class="text-slate-300 text-sm leading-relaxed">${renderMarkdown(ex.explanation)}</div>
    ${detailsHtml}
  </div>`;
}

function attachEvents(ex) {
  if (ex.type === 'mcq') {
    main.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        const opt = card.dataset.option;
        const current = new Set(state.answers[ex.id] || []);
        if (ex.multi) current.has(opt) ? current.delete(opt) : current.add(opt);
        else { current.clear(); current.add(opt); }
        state.answers[ex.id] = [...current];
        main.querySelectorAll('.option-card').forEach(c => {
          const o = c.dataset.option;
          c.classList.toggle('selected', current.has(o));
          const dot = c.querySelector('.w-5');
          dot.className = `w-5 h-5 rounded-full border-2 ${current.has(o) ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'} flex items-center justify-center shrink-0`;
          dot.innerHTML = current.has(o) ? '<div class="w-2 h-2 rounded-full bg-white"></div>' : '';
        });
        if (state.verdicts[ex.id] && !isExamActive()) { delete state.verdicts[ex.id]; const fb = main.querySelector('.fade-in > .rounded-xl'); if (fb) fb.remove(); }
        saveState();
      });
    });
  }
  if (ex.type === 'predict') {
    const input = document.getElementById('predict-input');
    if (input) input.addEventListener('input', () => {
      state.answers[ex.id] = input.value;
      if (state.verdicts[ex.id] && !isExamActive()) { delete state.verdicts[ex.id]; const fb = main.querySelector('.fade-in > .rounded-xl'); if (fb) fb.remove(); }
      saveState();
    });
  }
  if (ex.type === 'fillblanks') {
    main.querySelectorAll('[data-blank]').forEach(el => {
      const handler = () => {
        const id = el.dataset.blank;
        state.answers[ex.id] = state.answers[ex.id] || {};
        state.answers[ex.id][id] = el.value;
        if (state.verdicts[ex.id] && !isExamActive()) { delete state.verdicts[ex.id]; const fb = main.querySelector('.fade-in > .rounded-xl'); if (fb) fb.remove(); }
        saveState();
      };
      el.addEventListener('input', handler);
      el.addEventListener('change', handler);
    });
  }
  if (ex.type === 'trace') {
    main.querySelectorAll('[data-trace-row]').forEach(el => {
      el.addEventListener('input', () => {
        const r = parseInt(el.dataset.traceRow), c = parseInt(el.dataset.traceCol);
        state.answers[ex.id] = state.answers[ex.id] || [];
        state.answers[ex.id][r] = state.answers[ex.id][r] || [];
        state.answers[ex.id][r][c] = el.value;
        if (state.verdicts[ex.id] && !isExamActive()) { delete state.verdicts[ex.id]; const fb = main.querySelector('.fade-in > .rounded-xl'); if (fb) fb.remove(); }
        saveState();
      });
    });
  }
  if (ex.type === 'findbug') {
    main.querySelectorAll('.bug-line').forEach(el => {
      el.addEventListener('click', () => {
        const line = parseInt(el.dataset.line);
        state.answers[ex.id] = { line };
        main.querySelectorAll('.bug-line').forEach(l => {
          l.classList.toggle('selected', parseInt(l.dataset.line) === line);
        });
        if (state.verdicts[ex.id] && !isExamActive()) { delete state.verdicts[ex.id]; const fb = main.querySelector('.fade-in > .rounded-xl'); if (fb) fb.remove(); }
        saveState();
      });
    });
  }
  if (ex.type === 'memory') {
    main.querySelectorAll('[data-memory-idx]').forEach(el => {
      el.addEventListener('input', () => {
        const idx = parseInt(el.dataset.memoryIdx);
        state.answers[ex.id] = state.answers[ex.id] || { values: {} };
        if (!state.answers[ex.id].values) state.answers[ex.id].values = {};
        state.answers[ex.id].values[idx] = el.value;
        if (state.verdicts[ex.id] && !isExamActive()) { delete state.verdicts[ex.id]; const fb = main.querySelector('.fade-in > .rounded-xl'); if (fb) fb.remove(); }
        saveState();
      });
    });
  }
}

function submitAnswer() {
  if (isExamActive()) { toast("Correction différée en mode examen.", 'info'); return; }
  const ex = EXERCISES.find(e => e.id === currentId);
  if (!ex) return;
  if (ex.type === 'predict') {
    const ta = document.getElementById('predict-input');
    if (ta) state.answers[ex.id] = ta.value;
  }
  const verdict = grade(ex, state.answers[ex.id]);
  if (!verdict) { toast("Aucune réponse à vérifier", 'info'); return; }
  state.verdicts[ex.id] = verdict;
  saveState();
  renderExercise(); renderSidebar(); updateProgress();
}

function clearAnswer() {
  const ex = EXERCISES.find(e => e.id === currentId);
  if (!ex) return;
  delete state.answers[ex.id];
  delete state.verdicts[ex.id];
  saveState();
  renderExercise(); renderSidebar(); updateProgress();
}

function selectExercise(id) {
  currentId = id;
  const ex = EXERCISES.find(e => e.id === id);
  if (ex) state.openChapter = ex.chapter;
  saveState();
  renderSidebar(); renderExercise();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextExerciseId() {
  const active = getActiveExercises();
  const idx = active.findIndex(e => e.id === currentId);
  if (idx < 0 || idx === active.length - 1) return null;
  return active[idx + 1].id;
}

function resetAll() {
  if (!confirm('Effacer toutes vos réponses ?')) return;
  state = defaultState();
  stopTimer();
  currentId = EXERCISES[0].id;
  state.openChapter = EXERCISES[0].chapter;
  saveState();
  renderHeader(); renderSidebar(); renderExercise(); renderSelectionBanner(); updateProgress();
}