// ═══════════════════════════════════════════════════════════════
//  HELP — Guide de démarrage pour l'étudiant
// ═══════════════════════════════════════════════════════════════

const HELP_SEEN_KEY = 'c-trainer-help-seen-v1';

function initHelp() {
  const helpBtn = document.getElementById('help-btn');
  if (helpBtn) helpBtn.addEventListener('click', () => openHelp());

  const closeBtn = document.getElementById('help-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const dontShow = document.getElementById('help-dont-show');
      if (dontShow && dontShow.checked) localStorage.setItem(HELP_SEEN_KEY, '1');
      closeHelp();
    });
  }

  const modal = document.getElementById('help-modal');
  if (modal) modal.addEventListener('click', (e) => { if (e.target.id === 'help-modal') closeHelp(); });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeHelp(); });

  if (!localStorage.getItem(HELP_SEEN_KEY)) {
    setTimeout(() => openHelp(true), 400);
  }
}

function openHelp(isFirstTime = false) {
  const modal = document.getElementById('help-modal');
  if (!modal) return;
  const content = document.getElementById('help-content');
  if (content) content.innerHTML = renderHelpContent();
  const dontShowWrap = document.getElementById('help-dont-show-wrap');
  if (dontShowWrap) dontShowWrap.style.display = isFirstTime ? 'flex' : 'none';
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  const scrollable = content?.parentElement;
  if (scrollable) scrollable.scrollTop = 0;
}

function closeHelp() {
  const modal = document.getElementById('help-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function renderHelpContent() {
  return `
    <div class="rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 p-5 mb-5">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <span class="text-xl">👋</span>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-emerald-300 mb-1">Bienvenue !</h3>
          <p class="text-sm text-slate-300 leading-relaxed">
            Ce site t'aide à <strong class="text-slate-100">t'entraîner au langage C</strong> pour ton cours de 1<sup>ère</sup> année à l'EIE Carthage.
            Tu y trouveras <strong class="text-slate-100">155 exercices</strong> classés en 5 chapitres, du plus simple au plus difficile.
            Tout fonctionne dans ton navigateur, rien à installer.
          </p>
        </div>
      </div>
    </div>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>📚</span> Les 5 chapitres
      </h3>
      <div class="space-y-2">
        ${renderChapterHelp('1', 'Généralités', 'Types, opérateurs, printf/scanf, conversions', '30 exercices')}
        ${renderChapterHelp('2', 'Structures de contrôle', 'if, switch, while, do-while, for, break/continue', '28 exercices')}
        ${renderChapterHelp('3', 'Tableaux et matrices', 'Parcours, recherche, tris, matrices, transposée', '25 exercices')}
        ${renderChapterHelp('4', 'Pointeurs', 'Adresses, arithmétique, malloc/free, tableaux 2D', '36 exercices')}
        ${renderChapterHelp('5', 'Structures', 'struct, typedef, pointeurs sur struct, tableaux', '36 exercices')}
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>📝</span> Les 6 formats d'exercices
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${renderFormatHelp('📝', 'QCM', 'Choisis la ou les bonnes réponses. En cas d\'erreur, tu reçois une analyse PERSONNALISÉE de ton choix.', 'emerald')}
        ${renderFormatHelp('🔮', 'Prédire la sortie', 'Tape la sortie exacte du programme. Respecte les espaces et retours à la ligne.', 'purple')}
        ${renderFormatHelp('🕳️', 'Texte à trous', 'Complète les éléments manquants d\'un programme (codes de format, opérateurs…).', 'blue')}
        ${renderFormatHelp('📊', 'Table de trace', 'Remplis un tableau de valeurs ligne par ligne, en suivant l\'exécution.', 'amber')}
        ${renderFormatHelp('🐛', 'Trouver le bug', 'Clique sur la ligne qui contient l\'erreur dans le code affiché.', 'red')}
        ${renderFormatHelp('🧠', 'État mémoire', 'Indique la valeur finale de chaque variable après l\'exécution.', 'indigo')}
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>✅</span> Comment répondre à un exercice
      </h3>
      <ol class="space-y-3 text-sm text-slate-300">
        ${renderStep('1', 'Déplie un chapitre', 'Dans le menu à gauche, clique sur un chapitre pour voir ses exercices. Cliquer sur un autre chapitre replie automatiquement le premier.')}
        ${renderStep('2', 'Choisis un exercice', 'Clique sur le titre d\'un exercice. Il s\'affiche à droite avec son énoncé et son code.')}
        ${renderStep('3', 'Réponds', 'Selon le format : clique sur une réponse, tape du texte, remplis un tableau, etc.')}
        ${renderStep('4', 'Clique sur « Vérifier »', 'La correction s\'affiche immédiatement : <span class="text-emerald-400 font-medium">✓ Correct</span> ou <span class="text-red-400 font-medium">✗ Incorrect</span>, avec une <strong class="text-slate-100">explication détaillée</strong> dans tous les cas.')}
        ${renderStep('5', 'Passe au suivant', 'Clique sur « Suivant → » ou choisis un autre exercice dans la sidebar.')}
      </ol>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>🎯</span> Analyse personnalisée des QCM
      </h3>
      <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-slate-300 space-y-3">
        <p>
          Sur les <strong class="text-slate-100">QCM</strong>, tu ne reçois pas juste "✗ Incorrect" — tu obtiens une <strong class="text-emerald-300">analyse ciblée</strong> de ce qui ne va pas dans <em>ton</em> choix précis.
        </p>
        <div class="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <div class="text-xs uppercase tracking-wider text-red-400 mb-2">Exemple de ce que tu verras</div>
          <div class="flex items-start gap-2 mb-1">
            <span class="text-red-400 font-bold">✗</span>
            <span class="text-sm text-red-200 font-medium">Votre choix : "4"</span>
          </div>
          <div class="text-xs text-slate-300 pl-6 leading-relaxed">
            Non. 4 octets, c'est la taille typique d'un <code>int</code> ou d'un <code>float</code>, pas d'un <code>char</code>.
          </div>
        </div>
        <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
          <div class="flex items-start gap-2">
            <span class="text-emerald-400 font-bold">✓</span>
            <span class="text-sm text-emerald-200 font-medium">Bonne réponse : "1"</span>
          </div>
        </div>
        <p class="text-xs text-slate-400 italic">
          💡 Chaque mauvaise option a sa propre explication : tu comprends exactement <strong class="text-slate-200">pourquoi ta réponse précise ne marche pas</strong>.
        </p>
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>📈</span> Suivre ta progression
      </h3>
      <div class="space-y-3 text-sm text-slate-300">
        <p>En haut à droite du site, tu vois <code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded">X / 155</code> : c'est ton nombre d'exercices <strong class="text-slate-100">réussis</strong>.</p>
        <p>Chaque chapitre affiche aussi <code class="bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded">réussis/total</code> à droite du titre.</p>
        <p>Le bouton <strong class="text-slate-100">📊 Stats</strong> ouvre un panneau détaillé : réussite par chapitre, par format d'exercice, et par niveau de difficulté.</p>
        <p class="text-xs text-slate-500 italic">💾 Ta progression est sauvegardée automatiquement dans ton navigateur. Elle reste là même si tu fermes l'onglet.</p>
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>🕐</span> Mode Examen
      </h3>
      <div class="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-slate-300">
        <p class="mb-2">Clique sur <strong class="text-red-300">« Mode Examen »</strong> dans le header pour simuler un DS. Choisis la durée : <strong>15, 30, 60 ou 120 minutes</strong>.</p>
        <ul class="space-y-1 list-disc list-inside">
          <li>La correction est <strong class="text-slate-100">cachée</strong> jusqu'à la soumission.</li>
          <li>Un <strong class="text-red-300">chrono</strong> s'affiche en haut et pulse dans la dernière minute.</li>
          <li>À la fin (ou si tu cliques « Soumettre »), tu obtiens ton <strong class="text-slate-100">score global</strong>.</li>
          <li>Le résultat est calculé sur <strong>le total</strong> des exercices, pas seulement ceux tentés.</li>
        </ul>
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>🎲</span> Examen aléatoire
      </h3>
      <div class="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4 text-sm text-slate-300">
        <p>Clique sur <strong class="text-indigo-300">« 🎲 Aléatoire »</strong> pour générer une sélection d'exercices au hasard. Choisis le nombre (1 à 155) et les chapitres à inclure. Idéal pour <strong>réviser vite</strong> sur un thème précis.</p>
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>💾</span> Sauvegarder et partager
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <div class="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div class="text-lg mb-1">📄 PDF</div>
          <p class="text-xs text-slate-400 mb-2">Génère une synthèse imprimable avec tes erreurs et leurs explications.</p>
          <p class="text-[0.7rem] text-slate-500 italic">Bouton en haut à droite</p>
        </div>
        <div class="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div class="text-lg mb-1">💾 Export</div>
          <p class="text-xs text-slate-400 mb-2">Télécharge ta progression dans un fichier <code>.json</code>.</p>
          <p class="text-[0.7rem] text-slate-500 italic">Utile pour changer d'appareil</p>
        </div>
        <div class="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <div class="text-lg mb-1">📥 Import</div>
          <p class="text-xs text-slate-400 mb-2">Restaure une progression depuis un fichier <code>.json</code>.</p>
          <p class="text-[0.7rem] text-slate-500 italic">⚠️ Remplace la progression actuelle</p>
        </div>
      </div>
    </section>

    <section class="mb-6">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>💡</span> Astuces
      </h3>
      <ul class="space-y-2 text-sm text-slate-300">
        <li class="flex gap-2"><span class="text-slate-500 shrink-0">▸</span><span>Le bouton <strong class="text-slate-100">« ⌃ Tout replier »</strong> referme tous les chapitres d'un coup.</span></li>
        <li class="flex gap-2"><span class="text-slate-500 shrink-0">▸</span><span>Un exercice <span class="text-red-400">✗</span> peut être refait autant de fois que tu veux. Clique sur <strong class="text-slate-100">« Effacer »</strong> pour retenter.</span></li>
        <li class="flex gap-2"><span class="text-slate-500 shrink-0">▸</span><span>Sur mobile, tout fonctionne aussi : choisis un chapitre, réponds avec le clavier tactile.</span></li>
        <li class="flex gap-2"><span class="text-slate-500 shrink-0">▸</span><span>La touche <kbd class="bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-xs">Échap</kbd> ferme les panneaux ouverts.</span></li>
        <li class="flex gap-2"><span class="text-slate-500 shrink-0">▸</span><span>Le bouton <strong class="text-slate-100">Reset</strong> efface tout et recommence à zéro — à n'utiliser qu'en dernier recours.</span></li>
      </ul>
    </section>

    <section class="mb-2">
      <h3 class="text-sm uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
        <span>❓</span> Questions fréquentes
      </h3>
      <div class="space-y-3 text-sm">
        ${renderFaq('Je peux revenir en arrière et changer ma réponse ?', 'Oui. Tant que tu n\'as pas cliqué sur <strong>« Vérifier »</strong>, ta réponse reste modifiable. Une fois vérifiée, clique sur <strong>« Effacer »</strong> pour tout recommencer.')}
        ${renderFaq('Ma progression est-elle perdue si je ferme le navigateur ?', 'Non. Tout est sauvegardé automatiquement dans ton navigateur (localStorage). Elle reste tant que tu ne vides pas les données du site.')}
        ${renderFaq('Est-ce que ça marche sur mon téléphone ?', 'Oui, l\'interface est adaptée aux mobiles. Toutes les fonctionnalités sont accessibles : exercices, mode examen, stats, PDF.')}
        ${renderFaq('Pourquoi mon score change parfois sans que je fasse rien ?', 'En mode entraînement, le pourcentage est calculé sur les exercices <strong>tentés</strong>. En mode examen, il est calculé sur le <strong>total</strong>. C\'est volontaire : les deux modes ont des objectifs différents.')}
        ${renderFaq('Puis-je utiliser le site hors ligne ?', 'Partiellement : la page reste chargée tant qu\'on ne la recharge pas, mais les polices et icônes viennent d\'Internet. Une connexion est recommandée.')}
        ${renderFaq('J\'ai trouvé une erreur dans un exercice, que faire ?', 'Contacte ton enseignant. Chaque exercice a un identifiant (ex : <code>ptr-003</code>) visible sous le titre, ce qui permet de le retrouver rapidement.')}
      </div>
    </section>
  `;
}

function renderChapterHelp(num, title, subtitle, count) {
  return `
    <div class="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
      <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-sm font-bold text-emerald-400">${num}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <span class="font-medium text-slate-200">${title}</span>
          <span class="text-[0.7rem] text-slate-500 shrink-0">${count}</span>
        </div>
        <p class="text-xs text-slate-500 mt-0.5">${subtitle}</p>
      </div>
    </div>
  `;
}

function renderFormatHelp(icon, title, desc, color) {
  const colors = {
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
    red: 'border-red-500/30 bg-red-500/5',
    indigo: 'border-indigo-500/30 bg-indigo-500/5'
  };
  return `
    <div class="rounded-lg border ${colors[color] || 'border-slate-700 bg-slate-900/50'} p-3">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-lg">${icon}</span>
        <span class="font-medium text-slate-200 text-sm">${title}</span>
      </div>
      <p class="text-xs text-slate-400 leading-relaxed">${desc}</p>
    </div>
  `;
}

function renderStep(num, title, desc) {
  return `
    <li class="flex gap-3">
      <span class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">${num}</span>
      <div class="flex-1">
        <div class="font-medium text-slate-200 mb-0.5">${title}</div>
        <div class="text-xs text-slate-400 leading-relaxed">${desc}</div>
      </div>
    </li>
  `;
}

function renderFaq(question, answer) {
  return `
    <details class="group rounded-lg border border-slate-700 bg-slate-900/50 overflow-hidden">
      <summary class="cursor-pointer px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-800/50 transition">
        <span class="text-slate-200 text-sm font-medium">${question}</span>
        <span class="text-slate-500 transition-transform group-open:rotate-90 shrink-0">▶</span>
      </summary>
      <div class="px-4 pb-3 text-xs text-slate-400 leading-relaxed">${answer}</div>
    </details>
  `;
}
