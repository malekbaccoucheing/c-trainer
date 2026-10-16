// ═══════════════════════════════════════════════════════════════
//  MODE EXAMEN & CHRONO
// ═══════════════════════════════════════════════════════════════

function isExamActive() { return state.mode === 'exam' && !state.examSubmitted; }
function isExamSubmitted() { return state.mode === 'exam' && state.examSubmitted; }

function startExam() {
  const input = prompt(
    "Durée de l'examen en minutes :\n\n• 15 = rapide\n• 30 = standard\n• 60 = approfondi\n• 120 = complet\n\n(toute durée de 1 à 600 minutes est acceptée)",
    "60"
  );
  if (input === null) return;
  const mins = parseInt(input);
  if (!mins || mins < 1 || mins > 600) { toast("Durée invalide", 'error'); return; }

  const active = getActiveExercises();

  // ⭐ Confirmation si des réponses ou résultats existants vont être effacés
  const hasData = active.some(ex => state.answers[ex.id] !== undefined || state.verdicts[ex.id]);
  if (hasData) {
    const ok = confirm(
      "Démarrer l'examen ?\n\n" +
      "⚠️ Vos réponses et résultats actuels sur ces " + active.length + " exercices seront EFFACÉS,\n" +
      "afin que l'examen parte de zéro et que rien ne soit révélé pendant l'épreuve.\n\n" +
      "Continuer ?"
    );
    if (!ok) return;
  }

  // ⭐ Repartir de zéro : ni anciennes réponses préremplies, ni ✓/✗ visibles dans la sidebar
  active.forEach(ex => {
    delete state.verdicts[ex.id];
    delete state.answers[ex.id];
  });

  state.mode = 'exam';
  state.examStart = Date.now();
  state.examDuration = mins * 60;
  state.examSubmitted = false;
  saveState();

  startTimer();
  renderHeader();
  renderExercise();
  renderSidebar();
  updateProgress();
  toast(`Examen démarré — ${mins} min · Corrections masquées`, 'success');
}

function stopExam() {
  if (!confirm("Quitter le mode examen ?\n\nL'examen sera annulé.")) return;
  stopTimer();
  state.mode = 'training';
  state.examStart = null;
  state.examDuration = null;
  state.examSubmitted = false;
  saveState();
  renderHeader();
  renderExercise();
  renderSidebar();
  updateProgress();
  toast("Mode entraînement rétabli", 'info');
}

function submitExam(auto = false) {
  if (!auto && !confirm("Soumettre l'examen ?\n\nToutes les corrections seront révélées immédiatement.")) return;

  const active = getActiveExercises();

  // Évaluer tous les exercices (y compris ceux non répondus)
  active.forEach(ex => {
    const v = grade(ex, state.answers[ex.id]);
    state.verdicts[ex.id] = v || {
      correct: false,
      user: '',
      expected: getExpectedString(ex)
    };
  });

  state.examSubmitted = true;
  stopTimer();
  saveState();
  renderHeader();
  renderExercise();
  renderSidebar();
  updateProgress();

  const score = computeScore();
  if (auto) {
    toast(`Temps écoulé ! Score : ${score.correct}/${score.total} (${score.percent}%)`, 'error');
  } else {
    toast(`Examen soumis ! Score : ${score.correct}/${score.total} (${score.percent}%)`, 'success');
  }
  setTimeout(() => showStats(), 800);
}

function startTimer() {
  stopTimer();
  if (!state.examStart) return;
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function updateTimer() {
  const el = document.getElementById('exam-timer-value');
  if (!el || !state.examStart || !state.examDuration) return;
  const elapsed = Math.floor((Date.now() - state.examStart) / 1000);
  const remaining = state.examDuration - elapsed;
  if (remaining <= 0) {
    el.textContent = '00:00';
    stopTimer();
    if (!state.examSubmitted) submitExam(true);
    return;
  }
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  el.textContent = h > 0
    ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const c = document.getElementById('exam-timer');
  if (remaining < 60) c.classList.add('timer-pulse');
  else c.classList.remove('timer-pulse');
}

function toggleMode() {
  if (state.mode === 'training') startExam();
  else if (state.examSubmitted) {
    // Sortie propre après un examen soumis
    state.mode = 'training';
    state.examStart = null;
    state.examDuration = null;
    state.examSubmitted = false;
    saveState();
    renderHeader();
    renderExercise();
    renderSidebar();
    updateProgress();
    toast("Mode entraînement rétabli", 'info');
  } else {
    stopExam();
  }
}
