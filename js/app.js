// ═══════════════════════════════════════════════════════════════
//  APP — Point d'entrée (chargé en DERNIER)
// ═══════════════════════════════════════════════════════════════

const initialActive = getActiveExercises();
currentId = initialActive[0]?.id || EXERCISES[0].id;

if (state.openChapter === null) {
  state.openChapter = initialActive[0]?.chapter || NO_CHAPTER;
  saveState();
}

renderHeader();
renderSidebar();
renderExercise();
renderSelectionBanner();
updateProgress();

// Import file input
document.getElementById('import-input').addEventListener('change', handleImportFile);

// Mise à jour du max quand on coche/décoche un chapitre dans la modale aléatoire
document.addEventListener('change', (e) => {
  if (e.target.classList?.contains('random-chap-checkbox')) updateRandomMax();
});

// Reprise timer si l'examen était en cours
if (state.mode === 'exam' && !state.examSubmitted && state.examStart) {
  const elapsed = Math.floor((Date.now() - state.examStart) / 1000);
  if (elapsed < state.examDuration) startTimer(); else submitExam(true);
}

// Raccourcis clavier & clics sur modales
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeStats(); closeRandomExamModal(); }
});
document.getElementById('stats-modal').addEventListener('click', (e) => { if (e.target.id === 'stats-modal') closeStats(); });
document.getElementById('random-modal').addEventListener('click', (e) => { if (e.target.id === 'random-modal') closeRandomExamModal(); });
