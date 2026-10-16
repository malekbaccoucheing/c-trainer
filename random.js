// ═══════════════════════════════════════════════════════════════
//  EXAMEN ALÉATOIRE
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
  modal.classList.remove('hidden'); modal.classList.add('flex');
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
  modal.classList.add('hidden'); modal.classList.remove('flex');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function generateRandomExam() {
  const chapters = getSelectedRandomChapters();
  if (!chapters.length) { toast("Sélectionnez au moins un chapitre", 'error'); return; }
  const count = parseInt(document.getElementById('random-count').value);
  const pool = EXERCISES.filter(ex => chapters.includes(ex.chapter));
  if (!count || count < 1) { toast("Nombre invalide", 'error'); return; }
  if (count > pool.length) { toast(`Max ${pool.length}`, 'error'); return; }
  const selected = shuffle(pool).slice(0, count);
  state.selection = { ids: selected.map(ex => ex.id) };
  selected.forEach(ex => { delete state.answers[ex.id]; delete state.verdicts[ex.id]; });
  state.mode = 'training'; state.examStart = null; state.examDuration = null; state.examSubmitted = false;
  currentId = selected[0].id;
  const firstEx = EXERCISES.find(ex => ex.id === selected[0].id);
  if (firstEx) state.openChapter = firstEx.chapter;
  saveState(); closeRandomExamModal();
  renderHeader(); renderSidebar(); renderExercise(); updateProgress(); renderSelectionBanner();
  toast(`${selected.length} exercices tirés au sort`, 'success');
}

function clearSelection() {
  if (!confirm("Revenir à la banque complète ?")) return;
  state.selection = null; saveState();
  const active = getActiveExercises();
  if (!active.find(ex => ex.id === currentId)) currentId = active[0].id;
  const cur = active.find(ex => ex.id === currentId);
  if (cur) state.openChapter = cur.chapter;
  renderSidebar(); renderExercise(); renderHeader(); renderSelectionBanner(); updateProgress();
  toast("Banque complète", 'info');
}

function renderSelectionBanner() {
  const b = document.getElementById('selection-banner');
  if (state.selection && state.selection.ids?.length) {
    b.classList.remove('hidden');
    document.getElementById('selection-count').textContent = state.selection.ids.length;
  } else b.classList.add('hidden');
}