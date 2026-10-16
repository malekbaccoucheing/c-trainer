// ═══════════════════════════════════════════════════════════════
//  IO — Export/Import JSON de progression + Export PDF
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
//  EXPORT JSON
// ─────────────────────────────────────────────────────────────
function exportProgress() {
  const data = {
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    appName: 'c-trainer-eie',
    state: {
      answers: state.answers,
      verdicts: state.verdicts,
      mode: state.mode,
      examStart: state.examStart,
      examDuration: state.examDuration,
      examSubmitted: state.examSubmitted,
      selection: state.selection,
      openChapter: state.openChapter
    }
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `c-trainer-progression-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  const done = EXERCISES.filter(ex => state.verdicts[ex.id]?.correct).length;
  toast(`Votre progression a été exportée : ${done} exercices réussis sur ${EXERCISES.length}.`, 'success');
}

// ─────────────────────────────────────────────────────────────
//  IMPORT JSON
// ─────────────────────────────────────────────────────────────
function triggerImport() {
  document.getElementById('import-input').click();
}

function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      // ⭐ Vérifications préliminaires
      if (!data || typeof data !== 'object') {
        toast("Ce fichier est invalide, car son contenu est illisible.", 'error');
        return;
      }
      if (!data.state || typeof data.state.answers !== 'object') {
        toast("Ce fichier est invalide, car sa structure ne correspond pas à celle d'une progression exportée.", 'error');
        return;
      }

      // ⭐ NOUVEAU — Vérification de la version du fichier
      const fileVersion = data.version;
      if (fileVersion === undefined) {
        if (!confirm(
          "⚠️ Ce fichier ne contient pas de numéro de version.\n\n" +
          "Il peut provenir d'une version antérieure de la plateforme " +
          "et être partiellement incompatible.\n\n" +
          "Voulez-vous continuer l'import ?"
        )) return;
      } else if (fileVersion > EXPORT_VERSION) {
        toast(
          `Ce fichier provient d'une version plus récente (version ${fileVersion}). Une mise à jour de la plateforme est recommandée.`,
          'error'
        );
        if (!confirm(
          `Ce fichier provient d'une version PLUS RÉCENTE (version ${fileVersion}) que la plateforme actuelle (version ${EXPORT_VERSION}).\n\n` +
          "Certaines données risquent d'être mal interprétées ou perdues.\n\n" +
          "Voulez-vous continuer quand même ?"
        )) return;
      } else if (fileVersion < EXPORT_VERSION) {
        if (!confirm(
          `Ce fichier provient d'une version antérieure (version ${fileVersion}).\n\n` +
          "L'import va migrer vos données vers la version actuelle " +
          `(version ${EXPORT_VERSION}). Vos réponses seront préservées.\n\n` +
          "Voulez-vous continuer ?"
        )) return;
      } else {
        // Même version → confirmation standard
        const done = EXERCISES.filter(ex => data.state.verdicts[ex.id]?.correct).length;
        if (!confirm(
          "Voulez-vous importer cette progression ?\n\n" +
          `📊 Exercices réussis dans ce fichier : ${done}\n` +
          `📅 Date de l'export : ${data.exportedAt ? new Date(data.exportedAt).toLocaleString('fr-FR') : 'inconnue'}\n\n` +
          "⚠️ Cette action REMPLACE votre progression actuelle.\n\n" +
          "Voulez-vous continuer ?"
        )) return;
      }

      // ⭐ Filtrage — Ne garder que les réponses/verdicts qui correspondent à des exercices existants
      // (au cas où la banque a évolué entre-temps)
      const validIds = new Set(EXERCISES.map(ex => ex.id));
      const filteredAnswers = {};
      const filteredVerdicts = {};
      let droppedAnswers = 0;

      Object.entries(data.state.answers || {}).forEach(([id, val]) => {
        if (validIds.has(id)) filteredAnswers[id] = val;
        else droppedAnswers++;
      });
      Object.entries(data.state.verdicts || {}).forEach(([id, val]) => {
        if (validIds.has(id)) filteredVerdicts[id] = val;
      });

      if (droppedAnswers > 0) {
        toast(`Des réponses orphelines ont été ignorées, car leurs exercices n'existent plus dans la banque : ${droppedAnswers} au total.`, 'info');
      }

      // Fusionner avec le state par défaut
      state = Object.assign(defaultState(), data.state, {
        answers: filteredAnswers,
        verdicts: filteredVerdicts
      });
      saveState();

      // Repositionner sur un exercice valide
      const active = getActiveExercises();
      currentId = active[0].id;
      const cur = active.find(ex => ex.id === currentId);
      if (cur && !state.openChapter) state.openChapter = cur.chapter;

      renderHeader();
      renderSidebar();
      renderExercise();
      renderSelectionBanner();
      updateProgress();

      // Reprendre le timer si nécessaire
      if (state.mode === 'exam' && !state.examSubmitted && state.examStart) {
        const elapsed = Math.floor((Date.now() - state.examStart) / 1000);
        if (elapsed < state.examDuration) startTimer();
        else submitExam(true);
      } else {
        stopTimer();
      }

      const done = EXERCISES.filter(ex => state.verdicts[ex.id]?.correct).length;
      toast(`Votre progression a été importée : ${done} exercices réussis.`, 'success');
    } catch (err) {
      console.error(err);
      toast("Le fichier JSON n'a pas pu être lu. Vérifiez qu'il provient bien d'un export de la plateforme.", 'error');
    } finally {
      // Reset input pour permettre de réimporter le même fichier
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

// ─────────────────────────────────────────────────────────────
//  FORMATAGE MARKDOWN pour le PDF (contexte hors navigateur)
// ─────────────────────────────────────────────────────────────
function formatExplanation(text) {
  if (typeof text !== 'string') text = String(text ?? '');

  // Protéger les blocs de code d'abord
  const codeBlocks = [];
  let html = escapeHtml(text).replace(/```(\w*)\r?\n([\s\S]*?)```/g, (m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="code">${code}</pre>`);
    return `\x00B${idx}\x00`;
  });

  // Protéger le code inline
  const inlineCodes = [];
  html = html.replace(/`([^`\n]+)`/g, (m, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(`<code>${code}</code>`);
    return `\x00I${idx}\x00`;
  });

  // Formatage
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^\s*-\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`);
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/<\/li><br>/g, '</li>').replace(/<br><li>/g, '<li>').replace(/<\/ul><br>/g, '</ul>');

  // Restaurer
  html = html.replace(/\x00I(\d+)\x00/g, (m, idx) => inlineCodes[parseInt(idx, 10)]);
  html = html.replace(/\x00B(\d+)\x00/g, (m, idx) => codeBlocks[parseInt(idx, 10)]);

  return html;
}

// ─────────────────────────────────────────────────────────────
//  EXPORT PDF — Génère un HTML imprimable dans un nouvel onglet
// ─────────────────────────────────────────────────────────────
function exportPDF() {
  const win = window.open('', '_blank');
  if (!win) { toast("Votre navigateur a bloqué l'ouverture de la fenêtre. Autorisez les fenêtres surgissantes pour ce site afin d'exporter le PDF.", 'error'); return; }

  const active = getActiveExercises();
  const global = computeScore();
  const byChapter = computeChapterStats();
  const date = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const errors = active
    .filter(ex => state.verdicts[ex.id] && !state.verdicts[ex.id].correct)
    .map(ex => ({ ex, v: state.verdicts[ex.id] }));

  const success = active
    .filter(ex => state.verdicts[ex.id]?.correct)
    .map(ex => ({ ex, v: state.verdicts[ex.id] }));

  const chapterRows = Object.entries(byChapter).map(([chapter, s]) => {
    const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    return `<tr><td>${escapeHtml(chapter)}</td><td>${s.correct}/${s.total}</td><td>${pct}%</td></tr>`;
  }).join('');

  // ⭐ AMÉLIORÉ — Résumé détaillé des réponses par type d'exercice
  function renderUserAnswer(ex, v) {
    if (ex.type === 'predict') {
      return `<div class="answer">
        <strong>Votre réponse :</strong>
        <pre>${escapeHtml(v.user || '(vide)')}</pre>
      </div>`;
    }

    if (ex.type === 'mcq') {
      const userOpts = (v.user || '').split(',').map(s => s.trim()).filter(Boolean);
      const userText = userOpts.length === 0
        ? '(aucune)'
        : userOpts.map(u => {
            const opt = ex.options?.find(o => o.id === u);
            return opt ? `<code>${escapeHtml(opt.text)}</code>` : `<code>${escapeHtml(u)}</code>`;
          }).join(', ');
      return `<div class="answer"><strong>Votre réponse :</strong> ${userText}</div>`;
    }

    if (ex.type === 'fillblanks') {
      const details = v.details || [];
      const wrong = details.filter(d => !d.ok);
      if (wrong.length === 0) return `<div class="answer"><strong>Vous n'avez pas répondu à cet exercice.</strong></div>`;
      return `<div class="answer">
        <strong>Trous incorrects :</strong>
        <ul>${wrong.map(d => `<li>Pour le blanc <code>${escapeHtml(d.id)}</code>, vous avez écrit <code>${escapeHtml(d.user) || '(vide)'}</code>, alors que la réponse attendue était <code>${escapeHtml(d.correct)}</code>.</li>`).join('')}</ul>
      </div>`;
    }

    if (ex.type === 'trace') {
      const details = v.details || [];
      const wrongCells = details.flatMap((r, i) =>
        r.cells.map((c, j) => {
          if (!c.ok) return `<li>À la ligne ${i+1}, pour la colonne <code>${escapeHtml(ex.columns[j])}</code>, vous avez écrit <code>${escapeHtml(c.user) || '(vide)'}</code>, alors que la valeur attendue était <code>${escapeHtml(c.correct)}</code>.</li>`;
          return '';
        })
      ).filter(Boolean);
      if (wrongCells.length === 0) return `<div class="answer"><strong>Vous n'avez pas répondu à cet exercice.</strong></div>`;
      return `<div class="answer">
        <strong>Cellules incorrectes :</strong>
        <ul>${wrongCells.join('')}</ul>
      </div>`;
    }

    if (ex.type === 'findbug') {
      const correctLines = (ex.bugLines || []).join(', ');
      return `<div class="answer">
        <strong>Ligne que vous avez cliquée :</strong> <code>${escapeHtml(v.user) || '(aucune)'}</code><br>
        <strong>Ligne ou lignes attendues :</strong> <code>${escapeHtml(correctLines)}</code>
      </div>`;
    }

    if (ex.type === 'memory') {
      const details = v.details || [];
      const wrong = details.filter(d => !d.ok);
      if (wrong.length === 0) return `<div class="answer"><strong>Vous n'avez pas répondu à cet exercice.</strong></div>`;
      return `<div class="answer">
        <strong>Cellules mémoire incorrectes :</strong>
        <ul>${wrong.map(d => `<li>Pour la cellule <code>${escapeHtml(d.name)}</code>, vous avez écrit <code>${escapeHtml(d.user) || '(vide)'}</code>, alors que la valeur attendue était <code>${escapeHtml(d.correct)}</code>.</li>`).join('')}</ul>
      </div>`;
    }

    return `<div class="answer"><strong>Vous n'avez pas répondu à cet exercice.</strong></div>`;
  }

  function renderErrorItem({ ex, v }) {
    return `<div class="ex-error">
      <div class="ex-header">
        <span class="badge">${escapeHtml(ex.chapter)}</span>
        <span class="badge diff">${'★'.repeat(ex.difficulty)}</span>
      </div>
      <h3>${escapeHtml(ex.title)}</h3>
      <div class="statement">${formatExplanation(ex.statement || '')}</div>
      ${ex.code ? `<pre class="code">${escapeHtml(ex.code)}</pre>` : ''}
      ${renderUserAnswer(ex, v)}
      <div class="explanation">
        <strong>📖 Explication :</strong>
        <div>${formatExplanation(ex.explanation || '')}</div>
      </div>
    </div>`;
  }

  const selectionNote = state.selection
    ? `<p style="background:#eef2ff; border-left:4px solid #6366f1; padding:10px 14px; border-radius:4px; color:#3730a3;">
        🎲 Cette synthèse repose sur une <strong>sélection aléatoire</strong> de ${active.length} exercices.
      </p>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Synthèse de l'entraînement en langage C — ${date}</title>
<style>
  @page { margin: 1.5cm; }
  body { font-family: Georgia, 'Times New Roman', serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #222; line-height: 1.5; font-size: 11pt; }
  h1 { border-bottom: 3px solid #059669; padding-bottom: 10px; color: #064e3b; margin-bottom: 4px; }
  h2 { color: #059669; border-bottom: 1px solid #d1d5db; padding-bottom: 6px; margin-top: 30px; font-size: 15pt; }
  h3 { color: #1f2937; margin: 4px 0 8px 0; font-size: 13pt; }
  .subtitle { color: #6b7280; margin-bottom: 24px; font-style: italic; }
  .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
  .summary-card { background: #f0fdf4; border-left: 4px solid #10b981; padding: 12px 16px; border-radius: 4px; }
  .summary-card .num { font-size: 24pt; font-weight: bold; color: #059669; }
  .summary-card .lbl { font-size: 9pt; text-transform: uppercase; color: #6b7280; letter-spacing: 1px; }
  .summary-card.amber { background: #fffbeb; border-color: #f59e0b; }
  .summary-card.amber .num { color: #d97706; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
  th, td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
  th { background: #f9fafb; font-weight: bold; color: #374151; }
  .ex-error { border-left: 4px solid #ef4444; background: #fef2f2; padding: 16px 20px; margin: 18px 0; page-break-inside: avoid; border-radius: 4px; }
  .ex-header { display: flex; gap: 8px; margin-bottom: 6px; }
  .badge { display: inline-block; padding: 2px 8px; background: #fff; border: 1px solid #d1d5db; border-radius: 12px; font-size: 8pt; color: #6b7280; }
  .badge.diff { color: #d97706; border-color: #fcd34d; }
  pre, pre.code { background: #1e293b; color: #e2e8f0; padding: 12px 14px; border-radius: 4px; font-family: Consolas, 'Courier New', monospace; font-size: 9pt; overflow-x: auto; line-height: 1.4; margin: 10px 0; white-space: pre-wrap; word-break: break-word; }
  code { font-family: Consolas, monospace; background: #f3f4f6; padding: 1px 5px; border-radius: 3px; font-size: 9.5pt; color: #be123c; }
  .statement { color: #4b5563; font-style: italic; margin: 6px 0; }
  .statement code { font-style: normal; }
  .answer { background: #fff; border-left: 3px solid #9ca3af; padding: 10px 14px; margin: 10px 0; font-size: 10pt; }
  .answer ul { margin: 6px 0 0 18px; padding: 0; }
  .answer li { margin: 3px 0; }
  .explanation { background: #fff; border-left: 3px solid #10b981; padding: 12px 14px; margin-top: 12px; font-size: 10pt; }
  .explanation strong { color: #059669; display: block; margin-bottom: 6px; }
  .success-section { background: #f0fdf4; padding: 12px 16px; border-radius: 4px; margin-top: 16px; }
  .success-section ul { columns: 2; column-gap: 20px; margin: 8px 0 0 18px; padding: 0; }
  .success-section li { margin: 4px 0; font-size: 10pt; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #d1d5db; text-align: center; color: #9ca3af; font-size: 9pt; font-style: italic; }
  .no-print { text-align: center; margin: 20px 0; }
  .no-print button { padding: 12px 24px; background: #059669; color: white; border: none; border-radius: 8px; font-size: 12pt; cursor: pointer; font-family: inherit; }
  .no-print button:hover { background: #047857; }
  @media print { .no-print { display: none; } body { margin: 0; padding: 0; } }
</style>
</head>
<body>
  <h1>Synthèse de votre entraînement en langage C</h1>
  <p class="subtitle">École Nationale d'Ingénieurs de Carthage, première année. Document généré le ${date}.</p>
  ${selectionNote}
  <div class="no-print">
    <button onclick="window.print()">🖨️ Imprimer ou enregistrer en PDF</button>
  </div>

  <h2>Bilan global</h2>
  <div class="summary-grid">
    <div class="summary-card">
      <div class="num">${global.correct}</div>
      <div class="lbl">Exercices réussis</div>
    </div>
    <div class="summary-card amber">
      <div class="num">${errors.length}</div>
      <div class="lbl">À revoir</div>
    </div>
    <div class="summary-card">
      <div class="num">${global.percent}%</div>
      <div class="lbl">Taux de réussite</div>
    </div>
  </div>

  <h2>Détail par chapitre</h2>
  <table>
    <thead>
      <tr><th>Chapitre</th><th>Réussis</th><th>Pourcentage</th></tr>
    </thead>
    <tbody>${chapterRows}</tbody>
  </table>

  ${errors.length > 0 ? `
    <h2>Exercices à revoir (${errors.length})</h2>
    <p style="color:#6b7280; font-style:italic;">Chaque exercice ci-dessous présente votre erreur, puis l'explication détaillée du concept concerné.</p>
    ${errors.map(renderErrorItem).join('')}
  ` : `
    <h2>🎉 Aucune erreur</h2>
    <p>Félicitations, vous avez réussi tous les exercices que vous avez tentés.</p>
  `}

  ${success.length > 0 ? `
    <h2>Exercices réussis (${success.length})</h2>
    <div class="success-section">
      <ul>
        ${success.map(({ex}) => `<li>${escapeHtml(ex.title)} <span style="color:#9ca3af">— ${escapeHtml(ex.chapter)}</span></li>`).join('')}
      </ul>
    </div>
  ` : ''}

  <div class="footer">
    Ce document a été généré automatiquement par la plateforme d'entraînement en langage C de l'École Nationale d'Ingénieurs de Carthage.
  </div>
</body>
</html>`;

  win.document.write(html);
  win.document.close();
}
