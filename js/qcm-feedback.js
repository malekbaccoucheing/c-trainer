// ═══════════════════════════════════════════════════════════════
//  QCM FEEDBACK — Analyse contextuelle des réponses
//  Chaque entrée = { idQcm: { idOption: "feedback..." } }
//  Le feedback peut être sur une mauvaise option (pourquoi c'est faux)
//  ou sur la bonne option (pourquoi c'est juste).
// ═══════════════════════════════════════════════════════════════

const QCM_FEEDBACK = {

  // ───── CHAPITRE 1 ─────

  'base-001': {
    'b': 'Non, `sizeof(char)` ne peut **jamais** valoir 2, quelle que soit l\'architecture. Vous confondez probablement avec le type `short`, dont la taille est souvent de 2 octets. La norme C impose qu\'un `char` occupe exactement un octet.',
    'c': 'Non, la valeur 4 octets correspond à la taille habituelle d\'un `int` ou d\'un `float` sur les machines actuelles. Le type `char` est beaucoup plus petit que cela. Retenez que sa taille ne dépend pas de la machine.',
    'd': 'Non, c\'est le **piège classique** : beaucoup d\'étudiants pensent que la taille de tous les types varie selon l\'architecture. La norme C définit pourtant que `sizeof(char)` vaut 1, car le `char` sert d\'unité de mesure à tous les autres types. Seules les tailles des autres types dépendent de la machine.'
  },

  'base-007': {
    'b': 'Non, le résultat 5 provient d\'une lecture naïve de gauche à droite. Le langage C respecte les **priorités** des opérateurs : la multiplication et la division sont calculées avant l\'addition et la soustraction. Vous devez donc calculer `3 * 4` et `10 / 2` en premier.',
    'c': 'Non, le résultat 14 correspond à `2 + 12`, mais vous avez oublié de soustraire le quotient `10 / 2`. Calculez d\'abord `3 * 4` qui vaut 12, puis `10 / 2` qui vaut 5. Vous obtenez alors `2 + 12 - 5`, soit 9.',
    'd': 'Non, ce résultat ne correspond pas au calcul exact. Reprenez étape par étape en respectant les **priorités** : `3 * 4` vaut 12, puis `10 / 2` vaut 5. Il reste alors `2 + 12 - 5`, qui donne 9.'
  },

  'base-011': {
    'a': 'Non, la variable `n` est déclarée `const`, donc sa valeur **ne peut pas être modifiée** après l\'initialisation. Le programme ne compile même pas. Vous avez oublié que le compilateur vérifie cette règle avant toute exécution.',
    'b': 'Non, c\'est justement **impossible**, car le mot-clé `const` interdit toute modification de la variable. Le compilateur rejette l\'instruction `n = 25;` avec un message d\'erreur. Vous ne pouvez donc pas obtenir un affichage de la nouvelle valeur.',
    'd': 'Non, la protection de `const` agit à la **compilation** et non à l\'exécution. Le compilateur détecte l\'erreur avant de produire le moindre code. Le programme ne peut donc jamais démarrer.'
  },

  'base-013': {
    'b': 'Non, vous confondez la taille du tableau avec son **nombre d\'éléments**. L\'expression `sizeof(tab)` donne la taille totale en octets, soit 5 éléments de 4 octets chacun. Le résultat est donc 20 et non 5.',
    'c': 'Non, l\'expression `sizeof(tab) / sizeof(tab[0])` **divise** la taille totale par celle d\'un seul élément. Vous ne retrouvez donc pas 20 octets, mais bien le nombre d\'éléments, c\'est-à-dire 5. Il s\'agit d\'une autre question que celle posée.',
    'd': 'Non, il n\'y a aucune erreur ici. L\'opérateur `sizeof` s\'applique très bien à un tableau dont la taille est connue à la compilation. C\'est même son usage typique pour connaître la taille d\'un tableau en octets.'
  },

  // ⭐ RÉÉCRIT — les options ont changé (voir exercises.js → base-017)
  'base-017': {
    'a': 'C\'est exact, sur une architecture 64 bits classique, `char` occupe 1 octet, `short` 2, `int` 4 et `double` 8. La suite de ces tailles est donc **strictement croissante**. Votre raisonnement sur l\'ordre des types est correct.',
    'b': 'Non, le type `int` occupe 4 octets, ce qui est **plus grand** que les 1 octet du type `char`. L\'ordre correct doit donc commencer par `char`, et non par `int`. Reprenez la liste des tailles dans l\'ordre croissant.',
    'c': 'Attention, le piège classique ici est de croire que `long` est plus petit que `double`. Sur une architecture 64 bits, `long` occupe **8 octets**, exactement comme `double`. L\'enchaînement `char < int < long < double` reviendrait à écrire que 8 est strictement inférieur à 8, ce qui est faux.',
    'd': 'Non, les types `double` et `long` occupent **tous les deux 8 octets** sur une architecture 64 bits. Écrire que `double` est strictement plus petit que `long` revient à affirmer que 8 est inférieur à 8. Il n\'existe donc aucune relation d\'ordre strict entre ces deux types.'
  },

  'base-025': {
    'a': 'Non, la fonction `printf` ne réalise **aucune conversion intelligente** entre les types. Le format `%d` attend un `int` de 4 octets, alors que vous lui transmettez un `double` de 8 octets. Le programme ne corrige donc pas cette différence à votre place.',
    'b': 'Non, ce n\'est pas ce qui se passe, et c\'est justement le piège. Le format `%d` interprète les octets du `double` comme s\'il s\'agissait d\'un `int`. Le résultat est alors totalement imprévisible.',
    'd': 'Non, ce code compile sans erreur. Le compilateur fait confiance au format que vous écrivez. C\'est donc **au programmeur** de faire correspondre le format et le type de la valeur.'
  },

  // ───── CHAPITRE 2 ─────

  'ctrl-011': {
    'a': 'Non, la boucle ne s\'arrête pas. La condition `while (1)` teste la valeur 1, qui est toujours **vraie** en langage C. Le corps de la boucle s\'exécute donc indéfiniment tant qu\'aucune instruction ne l\'interrompt.',
    'c': 'Non, ce code compile parfaitement. L\'écriture `while (1)` est même un **idiome classique** pour construire une boucle infinie que l\'on quitte avec un `break` interne. Le compilateur ne signale donc aucune erreur.',
    'd': 'Non, la boucle ne s\'exécute pas une seule fois. À chaque tour, la condition est testée de nouveau et reste vraie, ce qui produit une **infinité** d\'itérations. Il faut un `break` explicite pour en sortir.'
  },

  'ctrl-015': {
    'b': 'Non, c\'est exactement l\'inverse. Si la condition est **fausse dès le départ**, la boucle `while` ne s\'exécute jamais. La boucle `do-while` s\'exécute en revanche **au moins une fois**, puis s\'arrête.',
    'c': 'Non, pour un nombre d\'itérations connu à l\'avance, on utilise plutôt la boucle `for`, car c\'est son rôle. La boucle `do-while` sert à répéter une action au moins une fois, puis tant qu\'une condition reste vraie. Vous confondez donc deux usages différents.',
    'd': 'Non, la boucle `do-while` n\'empêche en rien une boucle infinie. L\'instruction `do { ... } while(1);` tourne indéfiniment tant qu\'aucun `break` n\'intervient. La condition en fin de boucle ne protège donc de rien.'
  },

  'ctrl-018': {
    'b': 'Non, le test `A * B > 0` fonctionne bien, mais il **utilise la multiplication**, ce que l\'énoncé demande d\'éviter. Le produit risque en effet de provoquer un débordement pour de grandes valeurs. Vous devez donc raisonner directement sur les signes de `A` et de `B`.',
    'c': 'Non, le test `A + B > 0` ne dit rien sur le signe du **produit**. Prenez par exemple `A` valant -5 et `B` valant 10 : la somme est positive, alors que le produit vaut -50 et reste négatif. Cette condition ne convient donc pas.',
    'd': 'Non, le test `A == B` ne concerne pas les signes des deux nombres. Si `A` et `B` valent tous deux 5, le produit est positif, et il l\'est aussi s\'ils valent tous deux -5. Cette condition ne permet donc pas de distinguer les cas.'
  },

  // ───── CHAPITRE 3 ─────

  'tab-001': {
    'a': 'Non, c\'est **le piège classique** : l\'élément `tab[10]` est hors des bornes du tableau. Les indices valides d\'un tableau de 10 éléments vont de 0 à 9. Un accès à l\'indice 10 provoque un comportement indéfini.',
    'c': 'Non, pour un tableau de 10 éléments, les indices valides vont de 0 à 9. L\'accès à `tab[11]` est donc encore plus loin des bornes que `tab[10]`. Vous sortez de la zone mémoire du tableau de deux positions.',
    'd': 'Non, la règle est la même partout : les indices vont de 0 à **n-1** pour un tableau de n éléments. Il s\'agit d\'une convention du langage C, et non d\'une question d\'architecture. Elle ne change donc jamais d\'une machine à l\'autre.'
  },

  'tab-010': {
    'a': 'Non, la complexité O(1) désigne un temps constant, ce qui est impossible pour une recherche parmi n éléments. Il faut au minimum examiner quelques éléments pour trouver la valeur cherchée. La dichotomie est rapide, mais pas à ce point.',
    'c': 'Non, la complexité O(n) correspond à une **recherche linéaire**, qui parcourt les éléments un par un. La dichotomie existe justement pour faire mieux que cela. Elle exploite le fait que le tableau est trié.',
    'd': 'Non, vous êtes très loin du bon résultat. La complexité O(n²) correspond à des algorithmes naïfs, comme un tri à bulles non optimisé. La dichotomie, elle, **divise par deux** l\'intervalle de recherche à chaque étape.'
  },

  'tab-014': {
    'a': 'Non, le langage C **ne copie pas** automatiquement un tableau lors d\'un appel de fonction. C\'est d\'ailleurs pour cette raison que la fonction peut modifier le tableau d\'origine. Seule l\'adresse du premier élément est transmise.',
    'c': 'Non, le nombre d\'éléments **n\'est jamais transmis automatiquement** à la fonction. C\'est pourquoi vous devez toujours ajouter un paramètre supplémentaire, comme dans `void f(int tab[], int n)`. La fonction ne peut pas le deviner seule.',
    'd': 'Non, le tableau est bien transmis à la fonction. Il est simplement converti en **pointeur** sur son premier élément. La fonction travaille donc sur le tableau d\'origine.'
  },

  // ───── CHAPITRE 4 ─────

  // ⭐ NOUVEAU — feedbacks manquants ajoutés
  'ptr-002': {
    'a': 'C\'est exact, la norme C **définit** `tab[i]` comme une notation raccourcie de `*(tab + i)`. Les deux expressions sont donc interchangeables dans tout programme. Cette affirmation est correcte et vous ne devez pas l\'écarter.',
    'b': 'C\'est exact, puisque le pointeur `q` désigne le premier élément du tableau, l\'expression `*(q + i)` désigne le même élément que `*(tab + i)`. Elle est donc équivalente à `tab[i]`. C\'est le formalisme présenté dans le cours.',
    'c': 'Non, c\'est **le piège classique** de la priorité des opérateurs. L\'expression `*q + i` est lue comme `(*q) + i`, car l\'opérateur unaire `*` est prioritaire sur `+`. Elle donne donc la **valeur** `tab[0] + i`, et non l\'élément d\'indice `i`, alors qu\'il faudrait écrire `*(q + i)` avec des parenthèses.',
    'd': 'C\'est exact, l\'expression `&tab[i]` donne l\'adresse de l\'élément d\'indice `i`, puis l\'opérateur `*` relit le contenu situé à cette adresse. Cette écriture est détournée, mais parfaitement valide. Elle désigne bien le même élément que `tab[i]`.'
  },

  'ptr-004': {
    'a': 'Non, c\'est impossible, car `tab` est une **constante d\'adresse** et non un pointeur modifiable. L\'instruction `tab++` provoque donc une erreur de compilation. Vous ne pouvez pas déplacer le nom d\'un tableau.',
    'c': 'Non, le nom `tab` se comporte comme une adresse, mais vous ne pouvez **pas la changer**. Un véritable pointeur, comme `q` après l\'affectation `q = tab;`, accepte au contraire l\'instruction `q++`. La différence entre les deux est précisément l\'objet de la question.',
    'd': 'Non, `tab` et `&tab` désignent **la même adresse** en mémoire, même si leurs types sont différents. Cette option est un piège avancé, car elle semble raisonnable. Les deux expressions pointent bien vers le même emplacement.'
  },

  'ptr-008': {
    'a': 'Non, la fonction `calloc` est en général **plus lente** que `malloc`, car elle doit mettre à zéro tous les octets alloués. Son avantage se situe ailleurs, dans la sécurité de l\'initialisation. Vous confondez donc le bénéfice réel avec la rapidité.',
    'c': 'Non, c\'est exactement l\'inverse. La fonction `malloc` laisse la mémoire **non initialisée**, et son contenu est donc aléatoire. C\'est `calloc` qui met tous les octets à zéro.',
    'd': 'Non, la différence entre les deux fonctions est cruciale. L\'appel `malloc(n * sizeof(int))` ne garantit aucune valeur, alors que `calloc(n, sizeof(int))` garantit que tous les éléments valent 0. Vous ne pouvez donc pas les considérer comme équivalentes.'
  },

  'ptr-013': {
    'a': 'Non, après `free(p)`, la mémoire a été rendue au système. Le contenu des octets n\'est **pas garanti** : vous pouvez y lire 42, une autre valeur, ou provoquer un plantage. Vous ne devez jamais compter sur cette valeur.',
    'b': 'Non, ce résultat n\'est pas garanti non plus. Le système peut réutiliser ce bloc de mémoire entre-temps, ou le marquer comme invalide. Le comportement est **indéfini**.',
    'c': 'Non, ce code compile parfaitement. Le compilateur ne peut pas détecter l\'usage d\'un pointeur après `free`, car le problème apparaît uniquement **à l\'exécution**. C\'est ce qui rend cette erreur dangereuse.'
  },

  'ptr-016': {
    'a': 'Non, la valeur 5 est celle de la variable `x`, mais le pointeur `q` ne stocke **pas** cette valeur. Il stocke l\'adresse où aller la chercher. Vous confondez donc le pointeur avec la variable pointée.',
    'c': 'Non, l\'expression `&q` donnerait l\'adresse du pointeur `q` lui-même. Le nom `q` tout seul contient l\'adresse de **la variable pointée**, c\'est-à-dire de `x`. Il s\'agit de deux adresses différentes.',
    'd': 'Non, le pointeur ne vaut pas `NULL` ici. Il a bien été initialisé avec `&x`, et il pointe donc vers un emplacement valide. Vous avez sans doute oublié cette initialisation dans le code.'
  },

  'ptr-019': {
    'a': 'Non, une constante comme 5 n\'a **pas d\'adresse mémoire** au sens du langage C. Elle peut être placée dans un registre ou intégrée directement dans l\'instruction. Vous ne pouvez donc pas en prendre l\'adresse.',
    'c': 'Non, aucune adresse n\'est retournée, car la compilation échoue avant. Le compilateur refuse en effet l\'opérateur `&` appliqué à une constante. Le programme ne peut donc jamais s\'exécuter.',
    'd': 'Non, `NULL` est une constante spéciale destinée aux pointeurs. Elle ne s\'applique pas à ce cas, car aucun pointeur n\'est créé ici. L\'erreur est détectée bien plus tôt, par le compilateur.'
  },

  'ptr-023': {
    'a': 'Non, il n\'y a aucune erreur à la compilation. Un appel à `malloc` sans `free` est parfaitement valide du point de vue de la syntaxe. Le problème apparaît seulement pendant l\'exécution.',
    'b': 'Non, l\'erreur n\'est **pas immédiate**. Le programme tourne normalement, mais la mémoire reste occupée inutilement. Cette situation s\'appelle une **fuite mémoire**.',
    'd': 'Non, ce défaut n\'est pas anodin. Une fuite reste invisible dans un programme court, mais dans un serveur qui tourne pendant des jours, elle finit par saturer la mémoire. Vous devez donc toujours libérer ce que vous avez alloué.'
  },

  // ───── CHAPITRE 5 ─────

  'struct-001': {
    'a': 'Non, le compilateur lit `*e.ce` comme `*(e.ce)`, car l\'opérateur `.` est prioritaire sur `*`. Or `e` est un pointeur, donc l\'expression `e.ce` n\'existe pas. Vous obtenez une **erreur de compilation**.',
    'c': 'Non, l\'expression `&e.ce` cumule deux problèmes. La syntaxe `e.ce` est invalide puisque `e` est un pointeur, et l\'opérateur `&` donnerait une adresse au lieu d\'une valeur. Cette option est donc doublement fausse.',
    'd': 'Non, l\'écriture `e.ce` est invalide, car `e` est un **pointeur** et non une structure. L\'opérateur `.` ne s\'applique qu\'à une variable de type structure. Il faut utiliser l\'opérateur `->` dans ce cas.'
  },

  'struct-005': {
    'a': 'Non, cette affectation est parfaitement légale en langage C, à condition que les deux structures soient du **même type**. Elles doivent donc provenir du même modèle `struct`. Vous pouvez donc affecter une structure à une autre.',
    'b': 'Non, le langage C copie **tous les champs** en une seule fois, et pas seulement le premier. Il s\'agit d\'une copie membre à membre réalisée automatiquement. Vous n\'avez donc pas besoin de copier chaque champ à la main.',
    'd': 'Non, l\'instruction `etd = et;` effectue une **copie de valeur** et ne crée pas de pointeur. Après l\'affectation, `etd` et `et` sont deux variables **totalement indépendantes**. Modifier l\'une ne change donc pas l\'autre.'
  },

  'struct-008': {
    'a': 'Non, la déclaration `ETUDIANT tab[2]` crée un **tableau statique de structures**, donc deux structures complètes placées sur la pile. Ce n\'est pas un tableau d\'adresses. Vous confondez les structures elles-mêmes avec des pointeurs vers elles.',
    'b': 'Non, la déclaration `ETUDIANT *tab` crée un **pointeur unique** vers une structure. Il sert de base à un tableau dynamique de structures. Elle ne déclare donc pas un tableau d\'adresses.',
    'c': 'Non, la déclaration `ETUDIANT *tab[2]` crée bien un tableau d\'adresses, mais sa taille est fixée à 2 et il est donc **statique**. Il ne correspond pas à ce que l\'énoncé demande. Le caractère dynamique manque ici.'
  },

  'struct-014': {
    'b': 'Non, c\'est justement le piège. Par défaut, une structure est passée **par valeur** à une fonction, et une copie complète est donc effectuée. La fonction ne travaille pas sur l\'original.',
    'c': 'Non, il n\'y a aucune erreur ici. Le passage d\'une structure par valeur est une opération valide, simplement coûteuse lorsque la structure est volumineuse. Le compilateur l\'accepte sans difficulté.',
    'd': 'Non, cette règle est universelle en langage C et ne dépend pas du compilateur. Les structures sont toujours passées **par valeur**. Aucun compilateur conforme ne se comporte autrement.'
  },

  'struct-018': {
    'a': 'Non, vous ne pouvez pas **diviser un tableau** par un entier. L\'expression `etd.notes` désigne une adresse, c\'est-à-dire un pointeur, et une division n\'a aucun sens sur une adresse. Il faut d\'abord calculer la somme des éléments.',
    'c': 'Non, il n\'existe **aucune fonction `sum()` native** en langage C. Vous devez écrire vous-même une boucle pour additionner les notes. Cette fonction n\'appartient pas à la bibliothèque standard.',
    'd': 'Non, ce calcul est tout à fait possible. Il suffit d\'écrire une boucle d\'accumulation, par exemple avec l\'instruction `som += notes[i]`, puis de diviser le total par le nombre de notes. La moyenne se calcule donc sans difficulté.'
  },

  'struct-022': {
    'a': 'Non, l\'écriture `e.date_naiss.jour` utilise l\'opérateur `.` alors que `e` est un **pointeur**. Vous devez d\'abord déréférencer `e` avec `->` ou avec `(*e)` avant d\'accéder à la sous-structure. L\'opérateur `.` ne convient pas pour le premier accès.',
    'c': 'Non, c\'est un mélange incorrect des deux opérateurs. L\'expression `e.date_naiss` est invalide, car `e` est un pointeur, et l\'opérateur `->` ne peut pas s\'appliquer à `date_naiss`, qui n\'est pas un pointeur. Les deux erreurs s\'ajoutent.',
    'd': 'Non, le champ `date_naiss` est une **structure** et non un pointeur. L\'opérateur `->` ne s\'applique qu\'à des pointeurs, et vous ne devez donc pas l\'utiliser ici. L\'écriture correcte est `e->date_naiss.jour`.'
  },

  'struct-025': {
    'a': 'Non, c\'est justement l\'intérêt des structures : vous pouvez déclarer **autant de variables** que vous le souhaitez à partir d\'un même modèle. Le modèle ne limite donc pas leur nombre. Vous avez sans doute confondu modèle et variable.',
    'c': 'Non, il n\'existe **aucune limite** au nombre de variables que vous pouvez créer. Un modèle `struct etudiant` peut servir à créer 3, 100 ou 10 000 variables. Seule la mémoire disponible constitue une contrainte.',
    'd': 'Non, la réponse est universelle en langage C et ne dépend d\'aucun compilateur. Le principe d\'un modèle réutilisable fait partie du langage lui-même. Vous n\'avez donc pas à vous soucier de l\'outil utilisé.'
  },

  'struct-026': {
    'a': 'Non, la fonction `scanf` a besoin d\'une **adresse** pour y écrire la valeur lue. L\'expression `etd.ce` est une valeur de type `int` et non une adresse. Cet appel provoque donc probablement un plantage du programme.',
    'c': 'Non, la variable `etd` est une **structure** et non un pointeur, donc l\'écriture `etd->ce` est invalide. L\'opérateur `->` ne s\'applique qu\'à des pointeurs. Vous devez utiliser l\'opérateur `.` ici.',
    'd': 'Non, le compilateur lit `*etd.ce` comme `*(etd.ce)`, ce qui revient à déréférencer un `int`. Cette opération est impossible et provoque une **erreur de compilation**. L\'opérateur `.` est en effet prioritaire sur `*`.'
  },

  'struct-027': {
    'a': 'Non, la variable `e` est un **pointeur** et non une structure. L\'opérateur `.` ne s\'applique qu\'à une variable de type structure directement. Vous devez donc passer par l\'opérateur `->`.',
    'c': 'Non, l\'expression `&e.ce` est invalide, car `e.ce` n\'existe pas puisque `e` est un pointeur. Il faudrait écrire `&e->ce` pour obtenir l\'adresse du champ. Le problème est le même que dans les options précédentes.',
    'd': 'Non, le compilateur lit `*e.ce` comme `*(e.ce)`, car l\'opérateur `.` est prioritaire. Cette écriture tente de déréférencer un `int` et provoque une **erreur de compilation**. Vous devez d\'abord accéder au champ avec `->`.'
  },

  'struct-028': {
    'a': 'Non, la déclaration `ETUDIANT tab[n]` n\'est valide que si `n` est une **constante** connue à la compilation, sauf extension particulière du compilateur. Pour obtenir un véritable tableau dynamique, ce n\'est pas la bonne approche. Vous devez allouer la mémoire pendant l\'exécution.',
    'c': 'Non, la déclaration `ETUDIANT **tab` crée un **pointeur sur pointeur**. Elle est utile pour un tableau dynamique d\'**adresses** de structures, et non pour un tableau de structures elles-mêmes. Vous compliquez donc inutilement la situation.',
    'd': 'Non, la ligne `ETUDIANT tab[];` est une erreur de syntaxe. Un tableau doit avoir une taille explicite, ou être initialisé pour que le compilateur puisse la déduire. Ici, aucune de ces deux conditions n\'est remplie.'
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
