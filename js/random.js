// ═══════════════════════════════════════════════════════════════
//  EXAMEN ALÉATOIRE — Tirage au sort d'exercices personnalisé
// ═══════════════════════════════════════════════════════════════

function openRandomExamModal() {
  const modal = document.getElementById('random-modal');
  const byChapter = {};
  EXERCISES.forEach(ex => { byChapter[ex.chapter] = (byChapter[ex.chapter] || 0) + 1; });
  document.getElementById('random-chapters').innerHTML = Object.entries(byChapter).map(([chap, count]) => `
    <label class="flex items-center gap-3 p-2 rounded hover:bg-slate-800/50 cursor-pointer">
      <input type="checkbox" class="random-chap-checkbox w-4 h-4 accent-indigo-500" value="${escapeHtml(chap)}" checked>
      <span class="flex-1 text-sm text-slate-300">${escapeHtml(chap)}</span>
      <span class="text-xs text-slate-500">${count} exos</span>
    </label>`).join('');
  updateRandomMax();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function updateRandomMax() {
  const chapters = getSelectedRandomChapters();
  const total = EXERCISES.filter(ex => chapters.includes(ex.chapter)).length;
  const input = document.getElementById('random-count');
  input.max = total;
  if (parseInt(input.value) > total) input.value = total;
}

function getSelectedRandomChapters() {
  return Array.from(document.querySelectorAll('.random-chap-checkbox:checked')).map(cb => cb.value);
}

function closeRandomExamModal() {
  const modal = document.getElementById('random-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateRandomExam() {
  const chapters = getSelectedRandomChapters();
  if (!chapters.length) { toast("Sélectionnez au moins un chapitre", 'error'); return; }

  const count = parseInt(document.getElementById('random-count').value);
  const pool = EXERCISES.filter(ex => chapters.includes(ex.chapter));

  if (!count || count < 1) { toast("Nombre invalide", 'error'); return; }
  if (count > pool.length) { toast(`Maximum ${pool.length} pour ces chapitres`, 'error'); return; }

  // Le tirage est fait AVANT la confirmation pour savoir quels exercices sont réellement touchés
  const selected = shuffle(pool).slice(0, count);

  // ⭐ Avertissement uniquement si des exercices tirés ont déjà une réponse ou un résultat
  const touched = selected.filter(ex => state.answers[ex.id] !== undefined || state.verdicts[ex.id]).length;
  const examRunning = isExamActive();
  if (touched > 0 || examRunning) {
    let msg = "Générer un nouvel examen aléatoire ?\n\n";
    if (examRunning) msg += "⚠️ Votre examen chronométré en cours sera ANNULÉ.\n";
    if (touched > 0) {
      msg += "⚠️ Les réponses et résultats de " + touched + " exercice" + (touched > 1 ? "s" : "") +
             " tiré" + (touched > 1 ? "s" : "") + " seront RÉINITIALISÉS.\n";
    }
    msg += "Les exercices non tirés gardent leur progression.\n\nContinuer ?";
    if (!confirm(msg)) return;
  }

  // ⭐ Arrêter le chrono si un examen était en cours (sinon l'intervalle tourne dans le vide)
  stopTimer();

  state.selection = { ids: selected.map(ex => ex.id) };
  // Réinitialiser les réponses/verdicts uniquement pour les exercices de la sélection
  selected.forEach(ex => {
    delete state.answers[ex.id];
    delete state.verdicts[ex.id];
  });

  state.mode = 'training';
  state.examStart = null;
  state.examDuration = null;
  state.examSubmitted = false;

  currentId = selected[0].id;
  const firstEx = EXERCISES.find(ex => ex.id === selected[0].id);
  if (firstEx) state.openChapter = firstEx.chapter;

  saveState();
  closeRandomExamModal();
  renderHeader();
  renderSidebar();
  renderExercise();
  updateProgress();
  renderSelectionBanner();
  toast(`${selected.length} exercices tirés au sort`, 'success');
}

function clearSelection() {
  const msg = "Revenir à la banque complète ?\n\n" +
              "✔️ Vos réponses et votre progression sont CONSERVÉES.\n" +
              "❌ La sélection aléatoire est simplement levée (vous retrouvez les " + EXERCISES.length + " exercices).\n\n" +
              "Continuer ?";
  if (!confirm(msg)) return;

  state.selection = null;
  saveState();
  const active = getActiveExercises();
  if (!active.find(ex => ex.id === currentId)) currentId = active[0].id;
  const cur = active.find(ex => ex.id === currentId);
  if (cur) state.openChapter = cur.chapter;
  renderSidebar();
  renderExercise();
  renderHeader();
  renderSelectionBanner();
  updateProgress();
  toast("Banque complète rétablie", 'info');
}

function renderSelectionBanner() {
  const b = document.getElementById('selection-banner');
  if (state.selection && state.selection.ids?.length) {
    b.classList.remove('hidden');
    document.getElementById('selection-count').textContent = state.selection.ids.length;
  } else {
    b.classList.add('hidden');
  }
}
