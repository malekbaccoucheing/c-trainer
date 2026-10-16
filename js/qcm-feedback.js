// ═══════════════════════════════════════════════════════════════
//  QCM FEEDBACK — Analyse contextuelle des réponses
//  Chaque entrée = { idQcm: { idOption: "feedback..." } }
//  Le feedback peut être sur une mauvaise option (pourquoi c'est faux)
//  ou sur la bonne option (pourquoi c'est juste).
// ═══════════════════════════════════════════════════════════════

const QCM_FEEDBACK = {

  // ───── CHAPITRE 1 ─────

  'base-001': {
    'b': 'Non. `sizeof(char)` ne peut **jamais** valoir 2, quelle que soit l\'architecture. Confusion fréquente avec `short` ou `int`.',
    'c': 'Non. **4 octets**, c\'est la taille typique d\'un `int` ou d\'un `float` sur les machines actuelles, pas d\'un `char`.',
    'd': 'C\'est le **piège classique** ! Beaucoup croient que tout varie, mais la norme C fixe `sizeof(char) = 1` **par définition** — c\'est l\'octet lui-même. Les autres types varient, `char` non.'
  },

  'base-007': {
    'b': 'Non. `5` vient d\'une lecture naïve de gauche à droite. Le C respecte les **priorités** : `*` et `/` d\'abord, puis `+` et `-`.',
    'c': 'Non. `14` correspond à `2 + 12`, mais tu as oublié de soustraire `10 / 2 = 5`. Détail : `3 * 4 = 12`, `10 / 2 = 5`, donc `2 + 12 - 5 = 9`.',
    'd': 'Non. Recalcule étape par étape : `3 * 4 = 12`, puis `10 / 2 = 5`, enfin `2 + 12 - 5 = 9`.'
  },

  'base-011': {
    'a': 'Non. `n` est déclaré `const` — sa valeur **ne peut pas être modifiée** après l\'initialisation. Le programme ne compile même pas.',
    'b': 'Non, justement. C\'est **impossible** : `const` empêche toute modification. Le compilateur rejette `n = 25;`.',
    'd': 'Non. `const` protège à la **compilation**, pas à l\'exécution. Le compilateur détecte l\'erreur avant de générer du code.'
  },

  'base-013': {
    'b': 'Non. Tu confonds avec le **nombre d\'éléments**. `sizeof(tab)` = taille **totale en octets** = 5 × 4 = 20.',
    'c': 'Non. `sizeof(tab) / sizeof(tab[0])` **divise** par la taille d\'un élément, tu ne retrouves donc pas 20 mais bien 5.',
    'd': 'Non, pas d\'erreur. `sizeof` s\'applique très bien à un tableau de taille connue à la compilation. C\'est même le cas d\'usage typique.'
  },

  // ⭐ RÉÉCRIT — les options ont changé (voir exercises.js → base-017)
  'base-017': {
    'a': 'Exact ! Sur une architecture 64-bit classique : `char` = 1, `short` = 2, `int` = 4, `double` = 8. La suite 1 < 2 < 4 < 8 est **strictement croissante**.',
    'b': 'Non. `int` (4 octets) n\'est **pas plus petit** que `char` (1 octet). L\'ordre correct commence par `char`, pas par `int`.',
    'c': '**Piège classique !** `long` fait **8 octets** sur 64-bit, exactement comme `double`. Donc `char < int < long < double` revient à écrire `1 < 4 < 8 < 8`, ce qui est **faux** en strict (`8 < 8` est faux). Il faut utiliser `short` ou s\'arrêter avant `long`.',
    'd': 'Non. `double` et `long` font **tous deux 8 octets** sur 64-bit. Écrire `double < long` revient à `8 < 8`, ce qui est faux. Il n\'y a pas de relation d\'ordre strict entre ces deux types.'
  },

  'base-025': {
    'a': 'Non. La fonction `printf` ne fait **aucune conversion intelligente**. `%d` attend un `int` (4 octets), pas un `double` (8 octets).',
    'b': 'Non, c\'est justement le piège. Le format `%d` interprète les octets du `double` comme un `int` — résultat totalement imprévisible.',
    'd': 'Non, ça compile sans erreur. Le compilateur fait confiance au format — c\'est **au programmeur** de faire correspondre format et type.'
  },

  // ───── CHAPITRE 2 ─────

  'ctrl-011': {
    'a': 'Non. `while (1)` teste la valeur **1 = vrai**. La condition est toujours vraie, donc le corps s\'exécute indéfiniment...',
    'c': 'Non, ça compile parfaitement. `while (1)` est même un **idiome classique** pour les boucles "infinies" contrôlées par un `break` interne.',
    'd': 'Non. Ce n\'est pas 1 itération mais une **infinité** : à chaque tour, on reteste la condition qui reste vraie. Il faut un `break` explicite pour sortir.'
  },

  'ctrl-015': {
    'b': 'Non, c\'est l\'inverse. Si la condition est **fausse dès le départ**, `while` ne s\'exécute jamais, mais `do-while` s\'exécute **au moins une fois** puis s\'arrête.',
    'c': 'Non, pour un nombre d\'itérations connu, on utilise `for` — c\'est son rôle. `do-while` est pour "au moins une fois, puis tant que...".',
    'd': 'Non, `do-while` n\'empêche rien. Une boucle infinie reste possible : `do { ... } while(1);` tourne indéfiniment sans `break`.'
  },

  'ctrl-018': {
    'b': 'Non. `A * B > 0` fonctionne mais **utilise la multiplication**, ce que l\'énoncé demande d\'éviter (à cause du débordement possible).',
    'c': 'Non. `A + B > 0` ne dit rien sur le signe du **produit**. Exemple : `A = -5, B = 10` → somme positive (5), produit négatif (-50).',
    'd': 'Non. `A == B` ne concerne pas les signes. `A = B = 5` : produit positif. `A = B = -5` : produit positif aussi. Ce test ne distingue pas.'
  },

  // ───── CHAPITRE 3 ─────

  'tab-001': {
    'a': 'Non, c\'est **le piège classique**. `tab[10]` est hors bornes — indices valides : 0 à 9.',
    'c': 'Non. Pour un tableau de 10 éléments, les indices vont de 0 à 9. `tab[11]` est deux fois hors bornes.',
    'd': 'Non, la règle est la même partout : **indices 0 à n-1**. C\'est une convention du langage C, pas une histoire d\'architecture.'
  },

  'tab-010': {
    'a': 'Non. O(1) signifie temps constant — impossible pour une recherche dans n éléments. On doit au moins regarder un peu.',
    'c': 'Non. O(n) est la complexité d\'une **recherche linéaire**. La dichotomie est justement là pour faire mieux.',
    'd': 'Non, très loin de là. O(n²) serait le cas d\'algorithmes naïfs (comme un tri à bulles non optimisé). La dichotomie divise par 2 à chaque étape.'
  },

  'tab-014': {
    'a': 'Non. Le C **ne copie pas** les tableaux automatiquement lors d\'un appel de fonction — c\'est d\'ailleurs pour ça qu\'on peut modifier le tableau d\'origine depuis la fonction.',
    'c': 'Non. Le nombre d\'éléments **n\'est jamais transmis automatiquement**. C\'est pour ça qu\'on doit toujours écrire `void f(int tab[], int n)`.',
    'd': 'Non, le tableau est bien transmis. Il est simplement converti en pointeur sur son premier élément.'
  },

  // ───── CHAPITRE 4 ─────

  // ⭐ NOUVEAU — feedbacks manquants ajoutés
  'ptr-002': {
    'a': 'Correct. `tab[i]` est **défini** par la norme C comme la notation raccourcie de `*(tab + i)`. Les deux expressions sont interchangeables dans tout programme C.',
    'b': 'Correct. Puisque `q = tab` (q pointe sur le premier élément), on a l\'équivalence `q + i ≡ tab + i`, donc `*(q + i) ≡ *(tab + i) ≡ tab[i]`. C\'est le formalisme du cours.',
    'c': '**Non, c\'est le piège classique.** `*q + i` est lu `(*q) + i` car `*` (unaire) est prioritaire sur `+`. Cela donne `tab[0] + i` — une **valeur** (par exemple `10 + 1 = 11`), pas un **élément** de tableau. Attention aux parenthèses : `*(q + i)` ≠ `(*q) + i`.',
    'd': 'Correct. `&tab[i]` donne l\'adresse de l\'élément i, puis `*` relit le contenu à cette adresse. C\'est une manière détournée mais valide d\'écrire `tab[i]`.'
  },

  'ptr-004': {
    'a': 'Non, c\'est impossible. `tab` est une **constante d\'adresse**, pas un pointeur modifiable. `tab++` = erreur de compilation.',
    'c': 'Non. `tab` se comporte comme une adresse, mais on ne peut **pas la changer**. Contrairement à un vrai pointeur `q = tab;` où `q++` fonctionne.',
    'd': 'Non. `tab` et `&tab` désignent **la même adresse** en mémoire (même si leurs types diffèrent). Cette option est un piège avancé.'
  },

  'ptr-008': {
    'a': 'Non. `calloc` est en général **plus lent** que `malloc`, car il doit mettre à zéro tous les octets alloués. Le gain est ailleurs (sécurité).',
    'c': 'Non, c\'est l\'inverse. `malloc` laisse la mémoire **non initialisée** (contenu aléatoire). C\'est `calloc` qui met à zéro.',
    'd': 'Non, la différence est cruciale. `malloc(n * sizeof(int))` vs `calloc(n, sizeof(int))` : le second garantit tous les éléments à 0.'
  },

  'ptr-013': {
    'a': 'Non. Après `free(p)`, la mémoire a été rendue au système. Ce qui reste dans les octets n\'est **pas garanti** — ce peut être 42, ou autre chose, ou un crash.',
    'b': 'Non, ce n\'est pas garanti non plus. Le système peut réutiliser ce bloc entre-temps, ou le marquer comme invalide.',
    'c': 'Non, ça compile parfaitement. Le compilateur ne peut pas détecter l\'usage après `free` — c\'est un problème purement **à l\'exécution**.'
  },

  'ptr-016': {
    'a': 'Non. `5` est la valeur de `x`, mais `q` ne stocke **pas** la valeur — il stocke **où** aller la chercher.',
    'c': 'Non. `&q` donnerait l\'adresse de `q`, mais `q` tout seul contient l\'adresse de **la variable pointée** (ici `x`).',
    'd': 'Non, pas de NULL ici. `q` a bien été initialisé avec `&x`, il pointe quelque part de valide.'
  },

  'ptr-019': {
    'a': 'Non. Une constante (5) n\'a **pas d\'adresse mémoire** au sens C. Elle peut vivre dans un registre ou être intégrée directement dans l\'instruction.',
    'c': 'Non. Aucune adresse n\'est retournée — la compilation échoue avant.',
    'd': 'Non, `NULL` est une constante spéciale pour les pointeurs, ça ne s\'applique pas ici.'
  },

  'ptr-023': {
    'a': 'Non. Aucune erreur à la compilation — `malloc` sans `free` est parfaitement valide syntaxiquement.',
    'b': 'Non, l\'erreur n\'est **pas immédiate**. Le programme tourne normalement, mais la mémoire reste occupée inutilement.',
    'd': 'Non, ce n\'est pas anodin. Une fuite sur un programme court est invisible, mais sur un serveur qui tourne des jours, ça finit par tout bloquer.'
  },

  // ───── CHAPITRE 5 ─────

  'struct-001': {
    'a': 'Non. `*e.ce` est lu par le compilateur comme `*(e.ce)` (`.` prioritaire sur `*`). Or `e` est un pointeur, `e.ce` n\'existe pas → **erreur de compilation**.',
    'c': 'Non. `&e.ce` cumule deux problèmes : la syntaxe invalide `e.ce` **et** un `&` qui donnerait l\'adresse, pas la valeur.',
    'd': 'Non. `e.ce` est invalide : `e` est un **pointeur**, pas une structure. `.` ne s\'applique qu\'à une variable de type structure.'
  },

  'struct-005': {
    'a': 'Non, c\'est parfaitement légal en C, à condition que les deux structures aient le **même type** (même modèle `struct`).',
    'b': 'Non. Le C copie **tous les champs** d\'un coup, pas seulement le premier. C\'est une copie membre à membre automatique.',
    'd': 'Non. `etd = et;` fait une **copie de valeur**, pas un pointeur. Après l\'affectation, `etd` et `et` sont deux variables **totalement indépendantes**.'
  },

  'struct-008': {
    'a': 'Non. `ETUDIANT tab[2]` est un **tableau statique de structures** (2 structures complètes sur la pile), pas un tableau d\'adresses.',
    'b': 'Non. `ETUDIANT *tab` est un **pointeur unique** vers une structure, utilisé comme base d\'un tableau dynamique de structures.',
    'c': 'Non. `ETUDIANT *tab[2]` est un tableau **statique** (taille fixe 2) d\'adresses. Ce n\'est pas dynamique.'
  },

  'struct-014': {
    'b': 'Non, c\'est justement le piège. Par défaut, une structure est passée **par valeur** — une copie complète est faite.',
    'c': 'Non, aucune erreur. C\'est une opération valide, simplement coûteuse si la structure est grosse.',
    'd': 'Non, la règle est universelle en C, pas dépendante du compilateur : les structures sont passées par valeur.'
  },

  'struct-018': {
    'a': 'Non. On ne peut pas **diviser un tableau** par un entier. `etd.notes` est une adresse (pointeur), la division n\'a aucun sens.',
    'c': 'Non. Il n\'existe **aucune fonction `sum()` native** en C. Il faut tout écrire à la main avec une boucle.',
    'd': 'Non, c\'est tout à fait possible. Il faut juste une boucle d\'accumulation (`som += notes[i]`) puis une division.'
  },

  'struct-022': {
    'a': 'Non. `e.date_naiss.jour` utilise `.` alors que `e` est un **pointeur**. Il faut d\'abord déréférencer avec `->` ou `(*e)` avant d\'accéder à la sous-structure.',
    'c': 'Non, c\'est un mélange incorrect. `e.date_naiss` est invalide (car `e` est un pointeur) et `->` s\'applique à `date_naiss` qui n\'est pas un pointeur.',
    'd': 'Non. `date_naiss` est une **structure**, pas un pointeur. `->` ne s\'applique qu\'à des pointeurs. Il faut `e->date_naiss.jour`.'
  },

  'struct-025': {
    'a': 'Non. C\'est justement l\'intérêt des structures : on peut déclarer **autant de variables** qu\'on veut à partir d\'un même modèle.',
    'c': 'Non, il n\'y a **aucune limite** au nombre de variables. Un modèle `struct etudiant` peut servir à créer 3, 100 ou 10 000 variables.',
    'd': 'Non. La réponse est universelle en C, aucune dépendance au compilateur.'
  },

  'struct-026': {
    'a': 'Non. `scanf` a besoin d\'une **adresse** pour y écrire. `etd.ce` est une valeur (`int`), pas une adresse → plantage probable.',
    'c': 'Non. `etd` est une **variable** (pas un pointeur), donc `etd->ce` est invalide. `->` ne s\'applique qu\'à des pointeurs.',
    'd': 'Non. `*etd.ce` est lu comme `*(etd.ce)` : tentative de déréférencer un `int`. Erreur de compilation.'
  },

  'struct-027': {
    'a': 'Non. `e` est un **pointeur**, pas une structure. `.` ne s\'applique qu\'à une variable de type structure directement.',
    'c': 'Non. `&e.ce` est invalide : `e.ce` n\'existe pas (même raison que ci-dessus). Il faudrait `&e->ce`.',
    'd': 'Non. `*e.ce` est lu comme `*(e.ce)` (`.` prioritaire) : tentative de déréférencer un `int`. Erreur de compilation.'
  },

  'struct-028': {
    'a': 'Non. `ETUDIANT tab[n]` n\'est valide que si `n` est une **constante** connue à la compilation (avec quelques extensions compilateur). Pour un vrai dynamique, ce n\'est pas la bonne approche.',
    'c': 'Non. `ETUDIANT **tab` est un **pointeur sur pointeur** — utile pour un tableau dynamique d\'**adresses** de structures (voir exercice struct-007), pas de structures elles-mêmes.',
    'd': 'Non. `ETUDIANT tab[];` est une erreur de syntaxe — un tableau doit avoir une taille (statique) ou être initialisé pour que le compilateur la déduise.'
  }

};

// ═══════════════════════════════════════════════════════════════
//  APPLICATION — Injecte le feedback dans la banque en mémoire
// ═══════════════════════════════════════════════════════════════
function applyQcmFeedback() {
  let patched = 0;
  for (const ex of EXERCISES) {
    if (ex.type !== 'mcq') continue;
    const fb = QCM_FEEDBACK[ex.id];
    if (!fb) continue;
    for (const opt of ex.options) {
      if (fb[opt.id]) {
        opt.feedback = fb[opt.id];
        patched++;
      }
    }
  }
  console.log(`[QCM Feedback] ${patched} feedbacks appliqués sur ${Object.keys(QCM_FEEDBACK).length} QCM`);
}