// ═══════════════════════════════════════════════════════════════
//  MODE EXAMEN & CHRONO
// ═══════════════════════════════════════════════════════════════

function isExamActive() { return state.mode === 'exam' && !state.examSubmitted; }
function isExamSubmitted() { return state.mode === 'exam' && state.examSubmitted; }

function startExam() {
  const input = prompt("Durée de l'examen en minutes :\n\n• 15 = rapide\n• 30 = standard\n• 60 = approfondi\n• 120 = complet", "60");
  if (input === null) return;
  const mins = parseInt(input);
  if (!mins || mins < 1 || mins > 600) { toast("Durée invalide", 'error'); return; }
  state.mode = 'exam'; state.examStart = Date.now(); state.examDuration = mins * 60; state.examSubmitted = false;
  saveState();
  startTimer(); renderHeader(); renderExercise(); renderSidebar(); updateProgress();
  toast(`Examen démarré — ${mins} min`, 'success');
}

function stopExam() {
  if (!confirm("Quitter le mode examen ?")) return;
  stopTimer();
  state.mode = 'training'; state.examStart = null; state.examDuration = null; state.examSubmitted = false;
  saveState(); renderHeader(); renderExercise(); renderSidebar(); updateProgress();
  toast("Mode entraînement rétabli", 'info');
}

function submitExam(auto = false) {
  if (!auto && !confirm("Soumettre l'examen ?")) return;
  const active = getActiveExercises();
  active.forEach(ex => {
    const v = grade(ex, state.answers[ex.id]);
    state.verdicts[ex.id] = v || { correct: false, user: '', expected: ex.expected || '' };
  });
  state.examSubmitted = true;
  stopTimer(); saveState();
  renderHeader(); renderExercise(); renderSidebar(); updateProgress();
  const score = computeScore();
  toast(`Examen soumis ! ${score.correct}/${score.total} (${score.percent}%)`, auto ? 'error' : 'success');
  setTimeout(() => showStats(), 800);
}

function startTimer() {
  stopTimer();
  if (!state.examStart) return;
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }

function updateTimer() {
  const el = document.getElementById('exam-timer-value');
  if (!el || !state.examStart || !state.examDuration) return;
  const elapsed = Math.floor((Date.now() - state.examStart) / 1000);
  const remaining = state.examDuration - elapsed;
  if (remaining <= 0) { el.textContent = '00:00'; stopTimer(); if (!state.examSubmitted) submitExam(true); return; }
  const h = Math.floor(remaining / 3600), m = Math.floor((remaining % 3600) / 60), s = remaining % 60;
  el.textContent = h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const c = document.getElementById('exam-timer');
  if (remaining < 60) c.classList.add('timer-pulse'); else c.classList.remove('timer-pulse');
}

function toggleMode() {
  if (state.mode === 'training') startExam();
  else if (state.examSubmitted) {
    state.mode = 'training'; state.examStart = null; state.examDuration = null; state.examSubmitted = false;
    saveState(); renderHeader(); renderExercise(); renderSidebar(); updateProgress();
    toast("Mode entraînement rétabli", 'info');
  } else stopExam();
}
