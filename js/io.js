// ═══════════════════════════════════════════════════════════════
//  EXPORT / IMPORT JSON + PDF
// ═══════════════════════════════════════════════════════════════

function exportProgress() {
  const data = {
    version: EXPORT_VERSION, exportedAt: new Date().toISOString(), appName: 'c-trainer-eie',
    state: {
      answers: state.answers, verdicts: state.verdicts,
      mode: state.mode, examStart: state.examStart, examDuration: state.examDuration,
      examSubmitted: state.examSubmitted, selection: state.selection,
      openChapter: state.openChapter
    }
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `c-trainer-progression-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  const done = EXERCISES.filter(ex => state.verdicts[ex.id]?.correct).length;
  toast(`Exporté (${done}/${EXERCISES.length})`, 'success');
}

function triggerImport() { document.getElementById('import-input').click(); }

function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data?.state || typeof data.state.answers !== 'object') { toast("Fichier invalide", 'error'); return; }
      if (!confirm(`Importer cette progression ?\n\n⚠️ Remplace la progression actuelle.`)) return;
      state = Object.assign(defaultState(), data.state);
      saveState();
      const active = getActiveExercises();
      currentId = active[0].id;
      const cur = active.find(ex => ex.id === currentId);
      if (cur && !state.openChapter) state.openChapter = cur.chapter;
      renderHeader(); renderSidebar(); renderExercise(); renderSelectionBanner(); updateProgress();
      if (state.mode === 'exam' && !state.examSubmitted && state.examStart) {
        const elapsed = Math.floor((Date.now() - state.examStart) / 1000);
        if (elapsed < state.examDuration) startTimer(); else submitExam(true);
      } else stopTimer();
      toast("Progression importée", 'success');
    } catch { toast("Erreur de lecture", 'error'); }
    finally { event.target.value = ''; }
  };
  reader.readAsText(file);
}

function formatExplanation(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`);
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/<\/li><br>/g, '</li>').replace(/<br><li>/g, '<li>').replace(/<\/ul><br>/g, '</ul>');
  return html;
}

function exportPDF() {
  const win = window.open('', '_blank');
  if (!win) { toast("Autorisez les popups", 'error'); return; }
  const active = getActiveExercises();
  const global = computeScore();
  const byChapter = computeChapterStats();
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const errors = active.filter(ex => state.verdicts[ex.id] && !state.verdicts[ex.id].correct).map(ex => ({ ex, v: state.verdicts[ex.id] }));
  const success = active.filter(ex => state.verdicts[ex.id]?.correct).map(ex => ({ ex, v: state.verdicts[ex.id] }));

  const chapterRows = Object.entries(byChapter).map(([chapter, s]) => {
    const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    return `<tr><td>${escapeHtml(chapter)}</td><td>${s.correct}/${s.total}</td><td>${pct}%</td></tr>`;
  }).join('');

  function renderErrorItem({ ex, v }) {
    let userAnswer = '';
    if (ex.type === 'predict' && v.user !== undefined) {
      userAnswer = `<div class="answer"><strong>Votre réponse :</strong><pre>${escapeHtml(v.user || '(vide)')}</pre></div>`;
    } else if (ex.type === 'mcq') {
      const opts = (v.user || '').split(',').map(s => s.trim()).filter(Boolean);
      userAnswer = `<div class="answer"><strong>Votre réponse :</strong> ${opts.map(u => {
        const opt = ex.options?.find(o => o.id === u);
        return opt ? `<code>${escapeHtml(opt.text)}</code>` : `<code>${escapeHtml(u)}</code>`;
      }).join(', ') || '(aucune)'}</div>`;
    } else if (ex.type === 'fillblanks' && v.details) {
      const wrong = v.details.filter(d => !d.ok);
      userAnswer = wrong.length
        ? `<div class="answer"><strong>Trous incorrects :</strong><ul>${wrong.map(d => `<li><code>${d.id}</code> — Vous : <code>${escapeHtml(d.user) || '(vide)'}</code> · Attendu : <code>${escapeHtml(d.correct)}</code></li>`).join('')}</ul></div>`
        : `<div class="answer"><strong>Non répondu.</strong></div>`;
    } else if (ex.type === 'trace' && v.details) {
      const wrongCells = v.details.flatMap((r, i) => r.cells.map((c, j) => {
        if (!c.ok) return `<li>Ligne ${i+1}, <code>${escapeHtml(ex.columns[j])}</code> — Vous : <code>${escapeHtml(c.user) || '(vide)'}</code> · Attendu : <code>${escapeHtml(c.correct)}</code></li>`;
        return '';
      })).filter(Boolean);
      userAnswer = wrongCells.length
        ? `<div class="answer"><strong>Cellules incorrectes :</strong><ul>${wrongCells.join('')}</ul></div>`
        : `<div class="answer"><strong>Non répondu.</strong></div>`;
    } else if (ex.type === 'findbug') {
      userAnswer = `<div class="answer"><strong>Ligne cliquée :</strong> <code>${escapeHtml(v.user) || '(aucune)'}</code><br><strong>Ligne(s) attendue(s) :</strong> <code>${escapeHtml(v.expected)}</code></div>`;
    } else if (ex.type === 'memory' && v.details) {
      const wrong = v.details.filter(d => !d.ok);
      userAnswer = wrong.length
        ? `<div class="answer"><strong>Cellules mémoire incorrectes :</strong><ul>${wrong.map(d => `<li><code>${escapeHtml(d.name)}</code> — Vous : <code>${escapeHtml(d.user) || '(vide)'}</code> · Attendu : <code>${escapeHtml(d.correct)}</code></li>`).join('')}</ul></div>`
        : `<div class="answer"><strong>Non répondu.</strong></div>`;
    } else {
      userAnswer = `<div class="answer"><strong>Non répondu.</strong></div>`;
    }
    return `<div class="ex-error">
      <div class="ex-header"><span class="badge">${escapeHtml(ex.chapter)}</span><span class="badge diff">${'★'.repeat(ex.difficulty)}</span></div>
      <h3>${escapeHtml(ex.title)}</h3>
      <div class="statement">${formatExplanation(ex.statement || '')}</div>
      ${ex.code ? `<pre class="code">${escapeHtml(ex.code)}</pre>` : ''}
      ${userAnswer}
      <div class="explanation"><strong>📖 Explication :</strong><div>${formatExplanation(ex.explanation)}</div></div>
    </div>`;
  }

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Synthèse C — ${date}</title>
<style>
@page { margin: 1.5cm; }
body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #222; line-height: 1.5; font-size: 11pt; }
h1 { border-bottom: 3px solid #059669; padding-bottom: 10px; color: #064e3b; }
h2 { color: #059669; border-bottom: 1px solid #d1d5db; padding-bottom: 6px; margin-top: 30px; font-size: 15pt; }
h3 { color: #1f2937; margin: 4px 0 8px 0; font-size: 13pt; }
.subtitle { color: #6b7280; margin-bottom: 24px; font-style: italic; }
.summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
.summary-card { background: #f0fdf4; border-left: 4px solid #10b981; padding: 12px 16px; }
.summary-card .num { font-size: 24pt; font-weight: bold; color: #059669; }
.summary-card .lbl { font-size: 9pt; text-transform: uppercase; color: #6b7280; }
.summary-card.amber { background: #fffbeb; border-color: #f59e0b; }
.summary-card.amber .num { color: #d97706; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
th, td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
th { background: #f9fafb; font-weight: bold; }
.ex-error { border-left: 4px solid #ef4444; background: #fef2f2; padding: 16px 20px; margin: 18px 0; page-break-inside: avoid; }
.ex-header { display: flex; gap: 8px; margin-bottom: 6px; }
.badge { display: inline-block; padding: 2px 8px; background: #fff; border: 1px solid #d1d5db; border-radius: 12px; font-size: 8pt; color: #6b7280; }
.badge.diff { color: #d97706; border-color: #fcd34d; }
pre, pre.code { background: #1e293b; color: #e2e8f0; padding: 12px 14px; border-radius: 4px; font-family: Consolas, monospace; font-size: 9pt; overflow-x: auto; white-space: pre-wrap; }
code { font-family: Consolas, monospace; background: #f3f4f6; padding: 1px 5px; border-radius: 3px; font-size: 9.5pt; color: #be123c; }
.statement { color: #4b5563; font-style: italic; margin: 6px 0; }
.answer { background: #fff; border-left: 3px solid #9ca3af; padding: 10px 14px; margin: 10px 0; font-size: 10pt; }
.answer ul { margin: 6px 0 0 18px; padding: 0; }
.explanation { background: #fff; border-left: 3px solid #10b981; padding: 12px 14px; margin-top: 12px; font-size: 10pt; }
.explanation strong { color: #059669; display: block; margin-bottom: 6px; }
.success-section { background: #f0fdf4; padding: 12px 16px; margin-top: 16px; }
.success-section ul { columns: 2; margin: 8px 0 0 18px; padding: 0; }
.footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #d1d5db; text-align: center; color: #9ca3af; font-size: 9pt; font-style: italic; }
.no-print { text-align: center; margin: 20px 0; }
.no-print button { padding: 12px 24px; background: #059669; color: white; border: none; border-radius: 8px; font-size: 12pt; cursor: pointer; font-family: inherit; }
@media print { .no-print { display: none; } }
</style></head><body>
<h1>Synthèse d'entraînement C</h1>
<p class="subtitle">EIE Carthage — 1ère année · Généré le ${date}</p>
${state.selection ? `<p style="background:#eef2ff; border-left:4px solid #6366f1; padding:10px 14px;">🎲 Sélection aléatoire de ${active.length} exercices.</p>` : ''}
<div class="no-print"><button onclick="window.print()">🖨️ Imprimer / PDF</button></div>
<h2>Bilan global</h2>
<div class="summary-grid">
  <div class="summary-card"><div class="num">${global.correct}</div><div class="lbl">Réussis</div></div>
  <div class="summary-card amber"><div class="num">${errors.length}</div><div class="lbl">À revoir</div></div>
  <div class="summary-card"><div class="num">${global.percent}%</div><div class="lbl">Taux</div></div>
</div>
<h2>Détail par chapitre</h2>
<table><thead><tr><th>Chapitre</th><th>Réussis</th><th>%</th></tr></thead><tbody>${chapterRows}</tbody></table>
${errors.length > 0 ? `<h2>Exercices à revoir (${errors.length})</h2>${errors.map(renderErrorItem).join('')}` : `<h2>🎉 Aucune erreur</h2>`}
${success.length > 0 ? `<h2>Exercices réussis (${success.length})</h2><div class="success-section"><ul>${success.map(({ex}) => `<li>${escapeHtml(ex.title)}</li>`).join('')}</ul></div>` : ''}
<div class="footer">Plateforme d'entraînement C · EIE Carthage</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
}
