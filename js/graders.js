// ═══════════════════════════════════════════════════════════════
//  GRADERS — Correction des 6 formats d'exercices
// ═══════════════════════════════════════════════════════════════

function grade(ex, answer) {
  if (answer === undefined || answer === null) return null;
  switch (ex.type) {
    case 'mcq': {
      const user = [...(answer || [])].sort().join(',');
      const correct = [...ex.correct].sort().join(',');
      return { correct: user === correct, user, expected: correct };
    }
    case 'predict': {
      const user = normalizeStr(answer, ex.normalize);
      const expected = normalizeStr(ex.expected, ex.normalize);
      return { correct: user === expected, user, expected };
    }
    case 'fillblanks': {
      const details = ex.blanks.map(b => {
        const u = normalizeStr((answer || {})[b.id] || '');
        const accepted = [b.correct, ...(b.accept || [])].map(a => normalizeStr(a));
        return { id: b.id, user: u, correct: b.correct, ok: accepted.includes(u) };
      });
      return { correct: details.every(d => d.ok), details };
    }
    case 'trace': {
      const userRows = answer || [];
      const details = ex.rows.map((row, i) => {
        const userRow = userRows[i] || [];
        return { index: i, cells: row.map((cell, j) => {
          if (j === 0) return { user: cell, correct: cell, ok: true };
          const u = normalizeStr(userRow[j] || '', ex.normalize);
          const c = normalizeStr(cell, ex.normalize);
          return { user: u, correct: c, ok: u === c };
        })};
      });
      return { correct: details.every(r => r.cells.every(c => c.ok)), details };
    }
    case 'findbug': {
      const userLine = answer?.line;
      if (userLine === undefined || userLine === null) return null;
      const correct = ex.bugLines.includes(userLine);
      return { correct, user: String(userLine), expected: ex.bugLines.join(', ') };
    }
    case 'memory': {
      const values = answer?.values || {};
      const details = ex.memory.map((m, i) => {
        const u = normalizeStr(values[i] || '');
        const c = normalizeStr(m.expected);
        return { index: i, name: m.name, user: u, correct: c, ok: u === c };
      });
      return { correct: details.every(d => d.ok), details };
    }
    default: return null;
  }
}
