// ═══════════════════════════════════════════════════════════════
//  BANQUE D'EXERCICES — 155 exercices
//  ⭐ C'est ICI que tu ajoutes / modifies des exercices
// ═══════════════════════════════════════════════════════════════

const EXERCISES = [
{id:'base-001',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'sizeof(char)',difficulty:1,statement:'Que vaut `sizeof(char)` en C, quelle que soit l\'architecture de la machine ?',multi:false,options:[{id:'a',text:'1'},{id:'b',text:'2'},{id:'c',text:'4'},{id:'d',text:'Dépend de l\'architecture'}],correct:['a'],explanation:'En C, `sizeof(char)` vaut **toujours 1 octet**. C\'est la définition même de l\'octet dans la norme : la taille d\'un `char` sert de référence pour mesurer toutes les autres. C\'est la seule taille garantie par le langage — `int`, `long` et `double` varient selon l\'architecture, mais `char` non.'},
{id:'base-002',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Division entière',difficulty:2,statement:'Qu\'affiche ce programme, ligne par ligne ?',code:`int a = 5, b = 2;
printf("%d\\n", a / b);
printf("%f\\n", (float)a / b);
printf("%d\\n", a % b);`,expected:'2\n2.500000\n1',normalize:'trim-lines',explanation:'Le premier `printf` effectue une division **entière** car `a` et `b` sont tous deux des `int` : le résultat est tronqué à 2, ce qui affiche `2`.\n\nLe deuxième `printf` applique un cast `(float)` à `a` avant la division. Les deux opérandes sont alors des flottants et le résultat vaut 2.5, affiché avec six décimales par défaut, soit `2.500000`.\n\nLe troisième `printf` calcule le reste de la division entière de 5 par 2, ce qui donne `1`.'},
{id:'base-003',type:'predict',chapter:'Chapitre 1 — Généralités',title:'i++ vs ++i',difficulty:3,statement:'Qu\'affiche ce programme, sachant que les deux blocs réinitialisent i à 5 avant de calculer n ?',code:`int i = 5;
int n = ++i - 5;
printf("i = %d, n = %d\\n", i, n);
i = 5;
n = i++ - 5;
printf("i = %d, n = %d\\n", i, n);`,expected:'i = 6, n = 1\ni = 6, n = 0',normalize:'trim-lines',explanation:'L\'opérateur `++i` incrémente la variable **avant** que sa valeur soit utilisée dans l\'expression. Ici, `i` passe de 5 à 6, puis `6 - 5 = 1` est affecté à `n`. La première ligne affiche donc `i = 6, n = 1`.\n\nL\'opérateur `i++` incrémente la variable **après** que sa valeur ait été utilisée. Ici, la valeur 5 est transmise à l\'expression (`5 - 5 = 0`), puis `i` est incrémenté à 6. La seconde ligne affiche donc `i = 6, n = 0`.\n\nDans les deux cas, la variable `i` finit à 6 — seule la valeur transmise à l\'expression change.'},
{id:'base-004',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Conversions implicites',difficulty:3,statement:'Qu\'affiche ce programme, sachant que les types de `a` et `b` sont respectivement `float` et `char` ?',code:`int x = 12;
float a = 12.48;
char b = 4;
x = a / b;
printf("%d\\n", x);`,expected:'3',normalize:'trim',explanation:'Le compilateur applique les règles de conversion automatique avant de diviser. La variable `b`, de type `char`, est d\'abord promue en `int`, puis en `float` car `a` est un `float`. La division s\'effectue donc sur des nombres réels : `12.48 / 4.0 = 3.12`.\n\nLors de l\'affectation à `x`, qui est un `int`, la valeur 3.12 est **tronquée** à 3. Le programme affiche donc `3`.\n\nIl ne s\'agit pas d\'un arrondi : 3.99 aurait également donné 3.'},
{id:'base-005',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'Codes de format printf',difficulty:2,statement:'Complétez le programme en sélectionnant le code de format adapté au type de chaque valeur passée à `printf`.',template:`int n = 42;
float pi = 3.14159;
char c = 'A';
printf("Entier : {{1}}\\n", n);
printf("Réel   : {{2}}\\n", pi);
printf("Caractère : {{3}}\\n", c);
printf("Adresse de n : {{4}}\\n", &n);`,blanks:[{id:'1',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%d'},{id:'2',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%f'},{id:'3',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%c'},{id:'4',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%p'}],explanation:'Chaque code de format doit correspondre au type de la valeur affichée. Le code `%d` sert à afficher un entier, `%f` un nombre flottant, `%c` un caractère, `%p` une adresse mémoire et `%s` une chaîne de caractères.\n\nSi le code ne correspond pas au type, le programme compile mais produit un **comportement indéfini** : `printf` interprète les octets de la valeur selon le format demandé, ce qui donne des résultats imprévisibles.'},
{id:'base-006',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Code ASCII',difficulty:2,statement:'Qu\'affiche ce programme, sachant que `\'A\'` correspond au code ASCII 65 ?',code:`char c = 'A';
printf("%c\\n", c);
printf("%d\\n", c);
printf("%c\\n", c + 1);`,expected:'A\n65\nB',normalize:'trim-lines',explanation:'En C, un `char` est un petit entier stocké sur un octet, et sa valeur numérique correspond à son code ASCII. La lettre `A` a pour code 65.\n\n- Le premier `printf` utilise `%c` et affiche le caractère lui-même : `A`.\n- Le deuxième `printf` utilise `%d` et affiche la valeur numérique du caractère : `65`.\n- Le troisième `printf` calcule `c + 1`, ce qui donne 66, dont le caractère correspondant est `B`.\n\nCette équivalence entre `char` et `int` permet d\'effectuer de l\'arithmétique sur les caractères.'},
{id:'base-007',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Priorité des opérateurs',difficulty:3,statement:'En respectant les règles de priorité des opérateurs en C, que vaut l\'expression `2 + 3 * 4 - 10 / 2` ?',multi:false,options:[{id:'a',text:'9'},{id:'b',text:'5'},{id:'c',text:'14'},{id:'d',text:'7'}],correct:['a'],explanation:'Le langage C applique la même priorité que les mathématiques : les opérateurs `*` et `/` sont évalués **avant** les opérateurs `+` et `-`. À priorité égale, l\'évaluation se fait de gauche à droite.\n\n- `3 * 4 = 12`\n- `10 / 2 = 5`\n- `2 + 12 - 5 = 9`\n\nLe résultat final est donc 9.'},
{id:'base-008',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Opérateurs logiques',difficulty:3,statement:'Qu\'affiche ce programme, sachant que `a` vaut 5 et `b` vaut 0 ?',code:`int a = 5, b = 0;
printf("%d\\n", a && b);
printf("%d\\n", a || b);
printf("%d\\n", !a);
printf("%d\\n", !b);`,expected:'0\n1\n0\n1',normalize:'trim-lines',explanation:'En C, la valeur numérique `0` représente **faux** et toute autre valeur représente **vrai**. Les opérateurs logiques renvoient eux-mêmes `1` pour « vrai » et `0` pour « faux ».\n\n- `a && b` : `b` vaut 0, donc le résultat est faux → `0`.\n- `a || b` : `a` est non nul, donc au moins un des deux est vrai → `1`.\n- `!a` : `a` est vrai, donc sa négation est fausse → `0`.\n- `!b` : `b` est faux, donc sa négation est vraie → `1`.\n\nLe C utilise aussi un **court-circuit** : dans `a && b`, si `a` était faux, `b` ne serait même pas évalué.'},
{id:'base-009',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Opérateur ternaire',difficulty:3,statement:'Qu\'affiche ce programme, sachant que `a` vaut 12 et `b` vaut 7 ?',code:`int a = 12, b = 7;
int max = (a > b) ? a : b;
printf("%d\\n", max);
printf("%d\\n", (a < b) ? a : b);`,expected:'12\n7',normalize:'trim-lines',explanation:'L\'opérateur ternaire `? :` est un raccourci pour une instruction `if-else`. Sa syntaxe est : `(condition) ? valeur_si_vrai : valeur_si_faux`. Il renvoie l\'une des deux valeurs selon que la condition est vraie ou fausse.\n\n- `(12 > 7) ? 12 : 7` : la condition est vraie, donc le résultat est `12`.\n- `(12 < 7) ? 12 : 7` : la condition est fausse, donc le résultat est `7`.\n\nC\'est une manière concise d\'écrire une affectation conditionnelle.'},
{id:'base-010',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Gabarit %4d',difficulty:3,statement:'Qu\'affiche ce programme ? Respectez précisément les espaces dans votre réponse.',code:`int x = 1, y = 2;
printf("%4d%4d\\n", x, y);
printf("%-4d|%d\\n", x, y);`,expected:'   1   2\n1   |2',normalize:'trim-lines',explanation:'Le chiffre placé après `%` définit une **largeur minimale d\'affichage** appelée « gabarit ». Par défaut, la valeur est cadrée à droite et complétée par des espaces à gauche.\n\n- `%4d` avec la valeur `1` réserve 4 caractères et affiche trois espaces suivis d\'un `1`.\n- `%4d` avec la valeur `2` affiche de la même manière trois espaces suivis d\'un `2`.\n- Le tiret dans `%-4d` inverse le cadrage : la valeur est alors alignée à **gauche** et les espaces sont ajoutés à droite.\n\nSi la valeur dépasse la largeur du gabarit, elle est affichée en entier sans être tronquée.'},
{id:'base-011',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Const et compilation',difficulty:2,statement:'Soit le programme suivant qui déclare `n` avec le mot-clé `const` puis tente de le modifier. Que se passe-t-il à la compilation ?',code:`const int n = 20;
n = 25;`,multi:false,options:[{id:'a',text:'Affiche 20'},{id:'b',text:'Affiche 25'},{id:'c',text:'Erreur de compilation'},{id:'d',text:'Comportement indéfini'}],correct:['c'],explanation:'Le mot-clé `const` rend la variable **en lecture seule** : toute tentative de modification après l\'initialisation est rejetée par le compilateur.\n\nIci, la ligne `n = 25;` provoque une erreur du type `assignment of read-only variable \'n\'`. Le compilateur refuse de générer un exécutable, donc le programme ne s\'exécute jamais.\n\nCette protection intervient **à la compilation**, pas à l\'exécution : il n\'y a pas de comportement indéfini, juste une erreur détectée avant.'},
{id:'base-012',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'#define',difficulty:2,statement:'Complétez le programme pour définir la constante symbolique `NB` avec la valeur 5.',template:`#include <stdio.h>
{{1}} NB {{2}}
int main() { printf("NB = %d\\n", NB); }`,blanks:[{id:'1',kind:'select',options:['#define','#include','const','typedef'],correct:'#define'},{id:'2',kind:'select',options:['5','5;','= 5','(5)'],correct:'5'}],explanation:'La directive `#define` est traitée par le **préprocesseur**, un programme qui s\'exécute avant le compilateur. Elle remplace textuellement toutes les occurrences de `NB` par la valeur `5` dans le code source.\n\nAttention : il ne faut **jamais** de point-virgule à la fin d\'un `#define`. Sinon, le remplacement produirait `printf("NB = %d\\n", 5;)`, ce qui provoquerait une erreur de syntaxe.\n\nÀ la différence d\'une variable `const`, `#define` ne réserve pas de place en mémoire : c\'est un simple remplacement de texte.'},
{id:'base-013',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'sizeof tableau',difficulty:3,statement:'Pour un tableau `int tab[5]` sur une machine où un `int` occupe 4 octets, que valent respectivement `sizeof(tab)` et `sizeof(tab) / sizeof(tab[0])` ?',multi:false,options:[{id:'a',text:'`20` et `5`'},{id:'b',text:'`5` et `5`'},{id:'c',text:'`20` et `20`'},{id:'d',text:'Erreur'}],correct:['a'],explanation:'`sizeof(tab)` renvoie la taille **totale** du tableau en octets, soit 5 éléments × 4 octets = 20 octets.\n\n`sizeof(tab[0])` renvoie la taille d\'**un seul élément**, soit 4 octets.\n\nLa division 20 / 4 donne donc 5, ce qui correspond au **nombre d\'éléments** du tableau. C\'est une astuce classique en C pour compter les éléments sans écrire la taille en dur.'},
{id:'base-014',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Modulo négatif',difficulty:3,statement:'Qu\'affiche ce programme ? Prêtez attention au signe du reste dans chaque cas.',code:`printf("%d\\n", 7 % 3);
printf("%d\\n", -7 % 3);
printf("%d\\n", 7 % -3);`,expected:'1\n-1\n1',normalize:'trim-lines',explanation:'En C, l\'opérateur `%` calcule le **reste** de la division entière. Le signe du résultat suit toujours celui du **dividende** (le premier opérande), et non celui du diviseur.\n\n- `7 % 3 = 1` car 7 = 2 × 3 + 1.\n- `-7 % 3 = -1` car -7 = -2 × 3 + (-1).\n- `7 % -3 = 1` car 7 = -2 × (-3) + 1.\n\nAttention : d\'autres langages comme Python ou Ruby appliquent une convention différente où le signe suit le diviseur.'},
{id:'base-015',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'Incrémentations',difficulty:2,statement:'Complétez le programme en choisissant l\'opérateur d\'incrémentation adapté aux commentaires.',template:`int i = 5;
int x = {{1}};   // x = 5, puis i = 6
int y = {{2}};   // y = 7, puis i = 7
int z = {{3}};   // z = 7, puis i = 8`,blanks:[{id:'1',kind:'select',options:['i++','++i','i--','--i'],correct:'i++'},{id:'2',kind:'select',options:['i++','++i','i--','--i'],correct:'++i'},{id:'3',kind:'select',options:['i++','++i','i--','--i'],correct:'i++'}],explanation:'L\'opérateur **postfixé** `i++` renvoie la valeur actuelle de `i` puis l\'incrémente. L\'opérateur **préfixé** `++i` incrémente d\'abord puis renvoie la nouvelle valeur.\n\n1. `i` vaut 5. `x = i++` : `x` reçoit 5, puis `i` devient 6.\n2. `y = ++i` : `i` passe à 7, puis `y` reçoit 7.\n3. `z = i++` : `z` reçoit 7, puis `i` devient 8.\n\nÉtat final : `i = 8, x = 5, y = 7, z = 7`.'},
{id:'base-016',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Comparaison caractères',difficulty:3,statement:'Qu\'affiche ce programme, sachant que `\'1\'` a pour code ASCII 49 et `\'a\'` pour code 97 ?',code:`char c1 = '1', c2 = 'a';
if (c1 < c2) printf("inf\\n");
else printf("sup\\n");
printf("%d\\n", 'z' - 'a');`,expected:'inf\n25',normalize:'trim-lines',explanation:'La comparaison `c1 < c2` porte sur les **codes ASCII** des caractères, pas sur leur apparence. Le caractère `\'1\'` a pour code 49 et `\'a\'` a pour code 97. Comme 49 est inférieur à 97, la condition est vraie et le programme affiche `inf`.\n\nLe deuxième `printf` calcule la distance entre `\'z\'` (code 122) et `\'a\'` (code 97), ce qui donne `25`.\n\nRappel de l\'ordre ASCII : les chiffres (48 à 57) viennent avant les majuscules (65 à 90), qui elles-mêmes viennent avant les minuscules (97 à 122).'}, 
{id:'base-017',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Types et tailles',difficulty:2,statement:'Sur une architecture 64-bit classique, quel est l\'ordre **strictement croissant** des tailles (en octets) ?',multi:false,options:[{id:'a',text:'`char` < `short` < `int` < `double`'},{id:'b',text:'`int` < `char` < `long` < `double`'},{id:'c',text:'`char` < `int` < `long` < `double`'},{id:'d',text:'`char` < `int` < `double` < `long`'}],correct:['a'],explanation:'Sur une architecture 64-bit classique, les tailles sont : `char` = 1 octet, `short` = 2 octets, `int` = 4 octets, `double` = 8 octets. La suite 1 < 2 < 4 < 8 est donc bien strictement croissante.\n\nAttention, l\'option `char < int < long < double` est **fausse** : sur 64-bit, `long` fait également 8 octets, donc `long < double` devient `8 < 8`, ce qui est faux en strict.\n\nIl faut retenir que seul `char` a une taille garantie par la norme. Toutes les autres varient selon l\'architecture et le compilateur.'},
{id:'base-018',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Cast explicite',difficulty:3,statement:'Qu\'affiche ce programme, en comparant le résultat des deux divisions ?',code:`int n = 5, p = 2;
double r1 = n / p;
double r2 = (double)n / p;
printf("%.2f\\n", r1);
printf("%.2f\\n", r2);`,expected:'2.00\n2.50',normalize:'trim-lines',explanation:'Dans la première ligne, `n / p` est évaluée **avant** l\'affectation. Comme `n` et `p` sont tous deux des `int`, la division est entière : 5 / 2 = 2. Le résultat 2 est ensuite converti en `double` pour être stocké dans `r1`, ce qui donne `2.00`.\n\nDans la deuxième ligne, le cast `(double)` s\'applique à `n` **avant** la division. Les deux opérandes sont alors des flottants et la division donne 2.5, affiché sous la forme `2.50`.\n\nRègle à retenir : pour obtenir une division réelle en C, il faut qu\'au moins un des deux opérandes soit de type flottant.'},
{id:'base-019',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Affichage flottants',difficulty:3,statement:'Qu\'affiche ce programme ? Observez la précision et le cadrage de chaque ligne.',code:`float x = 2.3, y = 4.5;
printf("%f %f\\n", x, y);
printf("%.2f %.2f\\n", x, y);
printf("%5.2f|%-5.2f|\\n", x, y);`,expected:'2.300000 4.500000\n2.30 4.50\n 2.30|4.50 |',normalize:'trim-lines',explanation:'- `%f` affiche un flottant avec **six décimales par défaut**, d\'où `2.300000` et `4.500000`.\n- `%.2f` limite la précision à **deux décimales** : `2.30` et `4.50`.\n- `%5.2f` combine une largeur minimale de 5 caractères et une précision de 2. La valeur `2.30` occupant 4 caractères, elle est complétée par un espace à gauche.\n- `%-5.2f` applique le même gabarit mais aligne la valeur à **gauche**, ce qui ajoute l\'espace à droite.\n\nSyntaxe générale : `%[largeur][.précision]type`.'},
{id:'base-020',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'Lecture clavier',difficulty:2,statement:'Complétez le programme pour lire au clavier un entier, un réel et un caractère.',template:`int n;
float x;
char c;
scanf("{{1}}", {{2}});
scanf("{{3}}", {{4}});
scanf("{{5}}", {{6}});`,blanks:[{id:'1',kind:'select',options:['%d','%f','%c','%s'],correct:'%d'},{id:'2',kind:'select',options:['&n','n','*n','&&n'],correct:'&n'},{id:'3',kind:'select',options:['%d','%f','%c','%s'],correct:'%f'},{id:'4',kind:'select',options:['&x','x','*x','&&x'],correct:'&x'},{id:'5',kind:'select',options:['%d','%f','%c','%s'],correct:'%c'},{id:'6',kind:'select',options:['&c','c','*c','&&c'],correct:'&c'}],explanation:'La fonction `scanf` a besoin d\'une **adresse mémoire** pour écrire la valeur lue. C\'est pour cela qu\'il faut faire précéder chaque nom de variable du caractère `&`, qui signifie « adresse de ».\n\n- Pour un entier, on utilise `%d` et `&n`.\n- Pour un réel, on utilise `%f` et `&x`.\n- Pour un caractère, on utilise `%c` et `&c`.\n\nAttention : `scanf` est différent de `printf`. `printf` reçoit des valeurs, `scanf` reçoit des adresses. Oublier le `&` dans `scanf` est l\'erreur la plus fréquente des débutants.'},
{id:'base-021',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Évaluation d\'expression',difficulty:3,statement:'Sachant que `A=20, B=5, C=-10, D=2, X=12`, que vaut l\'expression `(5*X)+2*((3*B)+4)` ?',code:`int A=20, B=5, C=-10, D=2, X=12;
int r = (5*X)+2*((3*B)+4);`,expected:'98',normalize:'trim',explanation:'On évalue l\'expression en respectant les parenthèses et les priorités :\n\n- `5 * X = 5 × 12 = 60`\n- `3 * B = 3 × 5 = 15`\n- `15 + 4 = 19`\n- `2 * 19 = 38`\n- `60 + 38 = 98`\n\nLa variable `r` contient donc la valeur 98.'},
{id:'base-022',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Évaluation avec affectation',difficulty:4,statement:'Sachant que `A=20` et `X=5`, que vaut `A` après l\'exécution de l\'instruction `A += (X+5);` ?',code:`int A = 20, X = 5;
A += (X+5);`,expected:'30',normalize:'trim',explanation:'L\'opérateur `+=` est une **affectation élargie**. L\'instruction `A += (X+5)` est strictement équivalente à `A = A + (X+5)`.\n\nOn calcule d\'abord `X + 5 = 5 + 5 = 10`, puis on ajoute cette valeur à `A` : `20 + 10 = 30`.\n\nLa variable `A` vaut donc 30 après l\'exécution.'},
{id:'base-023',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Type et valeur d\'expression',difficulty:4,statement:'Sachant que `long A=15; char B=\'A\'; short C=10;`, quel est le **type** du résultat de l\'expression `C + B` ? Répondez par un nom de type C.',code:`long A = 15;
char B = 'A';
short C = 10;`,expected:'int',normalize:'trim',explanation:'Avant d\'effectuer une opération arithmétique, le compilateur C applique des **promotions entières**. Les types plus petits que `int` — comme `char` et `short` — sont automatiquement convertis en `int`.\n\nIci, `B` (de type `char`) et `C` (de type `short`) sont tous deux promus en `int` avant l\'addition. Le résultat de `C + B` est donc lui aussi de type `int`.\n\nCette règle évite les débordements lors des opérations sur les petits types.'},
{id:'base-024',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Valeur de C+B',difficulty:3,statement:'Sachant que `char B=\'A\';` (code ASCII 65) et `short C=10;`, que vaut l\'expression `C + B` ?',code:`char B = 'A';
short C = 10;
int r = C + B;`,expected:'75',normalize:'trim',explanation:'En C, une variable de type `char` est stockée sous forme numérique. La lettre `A` correspond au code ASCII 65. La variable `B` contient donc la valeur entière 65.\n\nL\'expression `C + B` revient à calculer `10 + 65`, soit `75`.\n\nLe résultat est stocké dans `r`, qui est un `int`.'},
{id:'base-025',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Mauvais code de format',difficulty:3,statement:'Que produit un appel à `printf("%d", 3.14);` où le format `%d` est utilisé pour afficher un `double` ?',multi:false,options:[{id:'a',text:'Affiche 3'},{id:'b',text:'Affiche 3.14'},{id:'c',text:'Affiche une valeur indéterminée (comportement indéfini)'},{id:'d',text:'Erreur de compilation'}],correct:['c'],explanation:'Le format `%d` indique à `printf` d\'attendre un `int` et d\'interpréter les octets correspondants comme un entier. Or, la valeur passée `3.14` est un `double`, qui est stocké sur 8 octets avec un tout autre encodage.\n\nLe programme compile sans avertissement, mais à l\'exécution `printf` lit les mauvais octets et affiche une valeur totalement imprévisible. C\'est ce qu\'on appelle un **comportement indéfini**.\n\nC\'est au programmeur de veiller à ce que chaque code de format corresponde au type de la valeur affichée.'},
{id:'base-026',type:'predict',chapter:'Chapitre 1 — Généralités',title:'[Variante] Division entière (7/3)',difficulty:2,statement:'Qu\'affiche ce programme, sachant que `a` et `b` sont des `int` ?',code:`int a = 7, b = 3;
printf("%d\\n", a / b);
printf("%d\\n", a % b);`,expected:'2\n1',normalize:'trim-lines',explanation:'Comme `a` et `b` sont tous deux des `int`, l\'opérateur `/` effectue une **division entière**. Le résultat de `7 / 3` vaut 2, car la partie décimale est tronquée.\n\nL\'opérateur `%` calcule le **reste** de cette même division : `7 % 3 = 1`, car `7 = 2 × 3 + 1`.\n\nLa première ligne affiche `2` et la seconde affiche `1`.'},
{id:'base-027',type:'predict',chapter:'Chapitre 1 — Généralités',title:'[Variante] i++ sur 10',difficulty:3,statement:'Qu\'affiche ce programme ? Observez l\'ordre des incrémentations.',code:`int i = 10;
printf("%d\\n", i++);
printf("%d\\n", i);
printf("%d\\n", ++i);`,expected:'10\n11\n12',normalize:'trim-lines',explanation:'L\'opérateur `i++` renvoie la valeur actuelle **puis** incrémente. L\'opérateur `++i` incrémente **puis** renvoie la nouvelle valeur.\n\n1. `i = 10`. `printf("%d", i++)` affiche 10, puis `i` devient 11.\n2. `printf("%d", i)` affiche la valeur courante de `i`, soit 11.\n3. `printf("%d", ++i)` incrémente `i` à 12, puis affiche 12.\n\nLe programme affiche donc `10`, `11` et `12` sur trois lignes.'},
{id:'findbug-001',type:'findbug',chapter:'Chapitre 1 — Généralités',title:'[Bug] Format et division',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui calcule un résultat réel à partir de deux entiers.',code:`int main() {
    int a = 5;
    int b = 2;
    float resultat = a / b;
    printf("%f\\n", resultat);
    return 0;
}`,bugLines:[4],explanation:'La ligne 4 effectue `a / b` alors que les deux variables sont de type `int`. Le compilateur réalise donc une **division entière** : le résultat vaut 2, et non 2.5. Cette valeur entière est ensuite stockée dans la variable `resultat` de type `float`, qui contient donc 2.0.\n\nPour obtenir le résultat attendu, il faut convertir au moins un des deux opérandes en `float` avant la division, par exemple : `float resultat = (float)a / b;`.'},
{id:'findbug-002',type:'findbug',chapter:'Chapitre 1 — Généralités',title:'[Bug] Mauvais format',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui affiche un entier et un réel.',code:`int main() {
    int x = 42;
    float pi = 3.14;
    printf("%d\\n", x);
    printf("%d\\n", pi);
    return 0;
}`,bugLines:[5],explanation:'La ligne 5 demande d\'afficher `pi`, qui est un `float`, en utilisant le format `%d`. Or, `%d` attend un `int`. Le programme compile, mais le résultat est imprévisible car `printf` interprète les octets du flottant comme s\'il s\'agissait d\'un entier.\n\nIl faut utiliser le format `%f` pour afficher un `float`. La ligne correcte serait : `printf("%f\\n", pi);`.'},
{id:'mem-001',type:'memory',chapter:'Chapitre 1 — Généralités',title:'[Mémoire] Variables simples',difficulty:2,statement:'Remplissez la valeur finale de chaque variable après l\'exécution du programme.',code:`int x = 5;
int y = 10;
x = x + y;
y = x - y;`,memory:[{name:'x',type:'int',address:'F100',expected:'15'},{name:'y',type:'int',address:'F104',expected:'5'}],explanation:'Déroulons le programme pas à pas :\n\n- Au départ, `x = 5` et `y = 10`.\n- Après `x = x + y`, `x` devient `5 + 10 = 15`.\n- Après `y = x - y`, `y` devient `15 - 10 = 5`.\n\nL\'état final est donc `x = 15` et `y = 5`. Ce petit programme est une manière détournée d\'échanger les valeurs de deux variables sans variable temporaire.'},

{id:'ctrl-001',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'while simple',difficulty:2,statement:'Qu\'affiche ce programme, en précisant la valeur finale de `i` ?',code:`int i = 1;
while (i <= 3) {
    printf("i = %d\\n", i);
    i++;
}
printf("Fin : i = %d\\n", i);`,expected:'i = 1\ni = 2\ni = 3\nFin : i = 4',normalize:'trim-lines',explanation:'La boucle `while` teste la condition **avant** chaque itération. Tant que `i` est inférieur ou égal à 3, le corps est exécuté : on affiche la valeur de `i` puis on l\'incrémente.\n\n- Itération 1 : `i = 1`, affichage, puis `i` passe à 2.\n- Itération 2 : `i = 2`, affichage, puis `i` passe à 3.\n- Itération 3 : `i = 3`, affichage, puis `i` passe à 4.\n- Test : `4 <= 3` est faux, la boucle s\'arrête.\n\nLa variable `i` finit à 4, ce qui est affiché après la boucle.'},
{id:'ctrl-002',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'do-while vs while',difficulty:3,statement:'Qu\'affiche ce programme ? Comparez ce que produisent la boucle `while` et la boucle `do-while`.',code:`int x = 10;
while (x < 5) { printf("while : %d\\n", x); x++; }
do { printf("do-while : %d\\n", x); x++; } while (x < 5);`,expected:'do-while : 10',normalize:'trim-lines',explanation:'Les deux boucles testent la même condition `x < 5`, mais à des moments différents.\n\nLa boucle `while` teste la condition **avant** d\'exécuter son corps. Comme `x = 10` au départ, la condition est déjà fausse et le corps n\'est jamais exécuté : aucune ligne `while :` n\'est affichée.\n\nLa boucle `do-while` teste la condition **après** avoir exécuté son corps. Elle s\'exécute donc **au moins une fois** : elle affiche `do-while : 10`, puis `x` devient 11. À ce moment, la condition `11 < 5` est fausse et la boucle s\'arrête.\n\nLe programme n\'affiche qu\'une seule ligne : `do-while : 10`.'},
{id:'ctrl-003',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'for multi-variables',difficulty:3,statement:'Qu\'affiche ce programme, sachant que la boucle fait avancer `i` et reculer `j` simultanément ?',code:`int i, j;
for (i = 0, j = 10; i < j; i++, j--) {
    printf("%d %d\\n", i, j);
}`,expected:'0 10\n1 9\n2 8\n3 7\n4 6',normalize:'trim-lines',explanation:'La boucle `for` accepte **plusieurs initialisations** et **plusieurs avancements**, séparés par des virgules. Ici, `i` démarre à 0 et `j` à 10, puis à chaque tour `i` augmente de 1 tandis que `j` diminue de 1.\n\n| Tour | i | j | Condition |\n|---|---|---|---|\n| 1 | 0 | 10 | vrai |\n| 2 | 1 | 9 | vrai |\n| 3 | 2 | 8 | vrai |\n| 4 | 3 | 7 | vrai |\n| 5 | 4 | 6 | vrai |\n| 6 | 5 | 5 | faux |\n\nLa boucle s\'arrête quand `i` atteint 5 car `5 < 5` est faux. Le programme effectue donc 5 itérations.'},
{id:'ctrl-004',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'break',difficulty:3,statement:'Qu\'affiche ce programme, sachant que la boucle est prévue pour aller jusqu\'à 10 ?',code:`for (int i = 1; i <= 10; i++) {
    if (i == 4) break;
    printf("%d ", i);
}
printf("\\nFini\\n");`,expected:'1 2 3 \nFini',normalize:'trim-lines',explanation:'L\'instruction `break` interrompt **immédiatement** la boucle et en sort, quelle que soit la condition de continuation.\n\n- Itération 1 : `i = 1`. La condition `i == 4` est fausse, on affiche `1 `.\n- Itération 2 : `i = 2`. La condition est fausse, on affiche `2 `.\n- Itération 3 : `i = 3`. La condition est fausse, on affiche `3 `.\n- Itération 4 : `i = 4`. La condition est vraie, `break` sort de la boucle.\n\nLes valeurs 4 à 10 ne sont jamais affichées. Le programme affiche donc `1 2 3 ` puis `Fini`.'},
{id:'ctrl-005',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'continue',difficulty:3,statement:'Qu\'affiche ce programme ? Prêtez attention au rôle de `continue`.',code:`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    printf("%d ", i);
}`,expected:'1 2 4 5 ',normalize:'trim',explanation:'L\'instruction `continue` **saute à l\'itération suivante** sans exécuter le reste du corps de la boucle.\n\n- Itération 1 : `i = 1`. Pas de `continue`, on affiche `1 `.\n- Itération 2 : `i = 2`. Pas de `continue`, on affiche `2 `.\n- Itération 3 : `i = 3`. La condition est vraie, `continue` saute directement à `i++`. La valeur 3 n\'est donc jamais affichée.\n- Itération 4 : `i = 4`. Pas de `continue`, on affiche `4 `.\n- Itération 5 : `i = 5`. Pas de `continue`, on affiche `5 `.\n\nDifférence avec `break` : `continue` ne sort pas de la boucle, il passe simplement à l\'itération suivante.'},
{id:'ctrl-006',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'switch sans break',difficulty:4,statement:'Qu\'affiche ce programme ? Examinez attentivement l\'enchaînement des `case` quand aucun `break` n\'est présent.',code:`int x = 2;
switch (x) {
    case 1: printf("un ");
    case 2: printf("deux ");
    case 3: printf("trois ");
    case 4: printf("quatre ");
    default: printf("autre ");
}`,expected:'deux trois quatre autre ',normalize:'trim',explanation:'L\'instruction `switch` cherche le `case` qui correspond à la valeur de `x`, puis exécute toutes les instructions **à partir de ce point** jusqu\'à rencontrer un `break` ou la fin du bloc.\n\nIci, `x = 2`, donc le programme saute directement au `case 2`. Comme aucun `break` n\'est présent, l\'exécution **continue** dans les `case` suivants :\n\n- Affiche `deux `.\n- Tombe dans `case 3` et affiche `trois `.\n- Tombe dans `case 4` et affiche `quatre `.\n- Tombe dans `default` et affiche `autre `.\n\nCe phénomène s\'appelle un **fall-through**. Il faut toujours ajouter `break;` après chaque `case` si on veut éviter ce comportement.'},
{id:'ctrl-007',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Boucles imbriquées',difficulty:4,statement:'Qu\'affiche ce programme ? Combien de fois la boucle interne s\'exécute-t-elle au total ?',code:`for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) printf("%d%d ", i, j);
    printf("\\n");
}`,expected:'11 12 13 \n21 22 23 ',normalize:'trim-lines',explanation:'Les deux boucles sont **imbriquées** : la boucle interne s\'exécute intégralement pour chaque tour de la boucle externe. Le nombre total d\'itérations est donc 2 × 3 = **6**.\n\n- Pour `i = 1`, la boucle interne parcourt `j = 1, 2, 3` et affiche `11 12 13 `, puis on passe à la ligne suivante.\n- Pour `i = 2`, la boucle interne parcourt de nouveau `j = 1, 2, 3` et affiche `21 22 23 `.\n\nAu total, six paires (i, j) sont affichées.'},
{id:'ctrl-008',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Somme jusqu\'à 100',difficulty:4,statement:'Sachant que l\'utilisateur saisit successivement les entiers 20, 60 et 50, qu\'affiche ce programme ?',code:`int x, som = 0;
while (som <= 100) { scanf("%d", &x); som += x; }
printf("La somme est %d\\n", som);`,expected:'La somme est 130',normalize:'trim',explanation:'La condition `som <= 100` est testée **avant** chaque tour, mais la lecture se fait **à l\'intérieur** de la boucle.\n\n- La variable `som` vaut 0, ce qui est inférieur à 100. On lit la valeur 20 et on l\'ajoute : `som = 20`.\n- La condition `20 <= 100` est vraie. On lit 60 : `som = 80`.\n- La condition `80 <= 100` est vraie. On lit 50 : `som = 130`.\n- La condition `130 <= 100` est fausse, on sort.\n\nPiège à retenir : la boucle s\'arrête **après** avoir dépassé le seuil, donc la somme finale peut largement dépasser 100. Ici, elle vaut 130.'},
{id:'ctrl-009',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Comptage caractères',difficulty:5,statement:'Sachant que l\'utilisateur saisit la chaîne `Azerty AA#`, qu\'affiche ce programme ?',code:`char x;
int nb = 0;
while ((x = getchar()) != '#') {
    if (x == 'A') nb++;
}
printf("Nombre de A : %d\\n", nb);`,expected:'Nombre de A : 3',normalize:'trim',explanation:'Le programme lit les caractères un par un grâce à `getchar()` et s\'arrête dès que le caractère sentinelle `#` est rencontré. À chaque itération, si le caractère lu est un `A`, le compteur `nb` est incrémenté.\n\nLa chaîne `Azerty AA#` contient exactement **trois `A`** : le premier au début, puis deux autres groupés au milieu. Le programme affiche donc `Nombre de A : 3`.\n\nSubtilité : les parenthèses autour de `(x = getchar())` sont **obligatoires**. Sans elles, le compilateur lirait `x = (getchar() != \'#\')`, ce qui stockerait 0 ou 1 dans `x`.'},
{id:'ctrl-010',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Comptage mots',difficulty:5,statement:'Sachant que l\'utilisateur saisit la chaîne `..aaai;;bbb#`, qu\'affiche ce programme ?',code:`char x, prec = ' ';
int nb = 0;
while ((x = getchar()) != '#') {
    if (x == ' ' || x == '.' || x == ';') {
        if (prec != ' ' && prec != '.' && prec != ';') nb++;
    }
    prec = x;
}
printf("Mots : %d\\n", nb);`,expected:'Mots : 1',normalize:'trim',explanation:'Le programme compte les mots en détectant les **transitions séparateur → non-séparateur**. Le compteur est incrémenté seulement quand on rencontre un séparateur (espace, point, point-virgule) et que le caractère **précédent** n\'en était pas un.\n\nParcours de `..aaai;;bbb#` :\n- Deux points : `prec` reste un séparateur, `nb` ne bouge pas.\n- `aaai` : transition détectée, `nb = 1`.\n- `;;` : `prec` était un séparateur, `nb` ne bouge pas.\n- `bbb#` : le `#` termine la boucle sans qu\'aucun séparateur n\'ait suivi `bbb`. Le dernier mot n\'est donc **pas compté**.\n\nLe programme affiche `Mots : 1`.'},
{id:'ctrl-011',type:'mcq',chapter:'Chapitre 2 — Contrôle',title:'Boucle infinie',difficulty:3,statement:'Que se passe-t-il si l\'on écrit `while (1) { ... }` sans instruction `break` à l\'intérieur du corps ?',multi:false,options:[{id:'a',text:'La boucle s\'arrête normalement'},{id:'b',text:'La boucle tourne à l\'infini'},{id:'c',text:'Erreur de compilation'},{id:'d',text:'Une seule itération'}],correct:['b'],explanation:'En C, la valeur `1` représente **vrai**. La condition du `while` est donc toujours satisfaite, quelle que soit l\'exécution du corps. La boucle tourne indéfiniment.\n\nC\'est un idiome classique en C : on écrit `while (1)` pour créer volontairement une boucle infinie, et on la termine plus tard avec un `break`. Sans ce `break`, le programme bloque définitivement.\n\nLe programme compile parfaitement — il n\'y a aucune erreur de syntaxe. Seule l\'exécution est bloquée.'},
{id:'ctrl-012',type:'fillblanks',chapter:'Chapitre 2 — Contrôle',title:'Factorielle',difficulty:4,statement:'Complétez le programme pour calculer la factorielle de `n` (avec `n ≥ 0`), sachant que `0! = 1`.',template:`int n, i;
long fact = {{1}};
for (i = 1; i {{2}} n; i++) fact {{3}} i;`,blanks:[{id:'1',kind:'select',options:['0','1','n','n+1'],correct:'1'},{id:'2',kind:'select',options:['<','<=','>','>='],correct:'<='},{id:'3',kind:'select',options:['+=','-=','*=','/='],correct:'*='}],explanation:'La factorielle d\'un entier `n` se calcule par le produit `1 × 2 × 3 × ... × n`. Il faut donc :\n\n- Initialiser `fact` à **1**, l\'élément neutre de la multiplication, et non à 0 (sinon le résultat serait toujours nul).\n- Faire varier `i` de 1 jusqu\'à `n` **inclus**, donc écrire `i <= n`.\n- Multiplier `fact` par `i` à chaque tour grâce à l\'opérateur `fact *= i`.\n\nPour `n = 5`, la variable `fact` évolue ainsi : 1, 2, 6, 24, 120.'},
{id:'ctrl-013',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'goto',difficulty:3,statement:'Qu\'affiche ce programme, sachant que l\'instruction `goto` renvoie à une étiquette placée au début du bloc ?',code:`int i = 0;
debut:
    printf("%d ", i);
    i++;
    if (i < 3) goto debut;
printf("\\nFini\\n");`,expected:'0 1 2 \nFini',normalize:'trim-lines',explanation:'L\'instruction `goto etiquette;` transfère **immédiatement** le contrôle à la ligne marquée par cette étiquette, où qu\'elle soit dans la même fonction.\n\n- Itération 1 : `i = 0`, affichage, puis `i = 1`. Comme `1 < 3`, on saute à `debut`.\n- Itération 2 : `i = 1`, affichage, puis `i = 2`. Comme `2 < 3`, on saute à `debut`.\n- Itération 3 : `i = 2`, affichage, puis `i = 3`. Comme `3 < 3` est faux, on sort.\n\nLe programme affiche `0 1 2 ` puis `Fini`.\n\nEn pratique, `goto` est à éviter : il rend le code difficile à suivre. Les boucles `for`, `while` et `do-while` couvrent la quasi-totalité des besoins.'},
{id:'ctrl-014',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Cascade if-else',difficulty:2,statement:'Qu\'affiche ce programme pour `note = 14` ?',code:`int note = 14;
if (note >= 16) printf("Très bien\\n");
else if (note >= 14) printf("Bien\\n");
else if (note >= 12) printf("Assez bien\\n");
else printf("Passable\\n");`,expected:'Bien',normalize:'trim',explanation:'Dans une cascade `if-else if-else`, les conditions sont évaluées **dans l\'ordre** et le programme s\'arrête à la **première** qui est vraie.\n\n- `14 >= 16` ? Faux.\n- `14 >= 14` ? **Vrai** → le programme affiche `Bien` et sort de la cascade.\n\nLes conditions suivantes (`14 >= 12` et le `else`) ne sont jamais évaluées, même si elles seraient aussi vraies. C\'est pour cela qu\'il faut toujours ordonner les conditions du plus restrictif au plus large.'},
{id:'ctrl-015',type:'mcq',chapter:'Chapitre 2 — Contrôle',title:'Quand do-while ?',difficulty:3,statement:'Dans quel cas faut-il privilégier la boucle `do-while` plutôt que `while` ou `for` ?',multi:false,options:[{id:'a',text:'Quand on veut exécuter le corps au moins une fois, quoi qu\'il arrive'},{id:'b',text:'Quand la condition peut être fausse dès le départ'},{id:'c',text:'Quand on connaît à l\'avance le nombre d\'itérations'},{id:'d',text:'Quand on veut éviter une boucle infinie'}],correct:['a'],explanation:'La particularité de `do-while` est de tester la condition **après** l\'exécution du corps. Le corps est donc exécuté **au moins une fois**, même si la condition est fausse dès le départ.\n\nC\'est le bon choix pour :\n- Une saisie avec validation : on demande au moins une fois à l\'utilisateur.\n- Un menu interactif : on affiche le menu au moins une fois avant de tester le choix.\n\nRécapitulatif des trois boucles : on utilise `for` quand le nombre d\'itérations est connu, `while` quand on teste avant, et `do-while` quand on teste après.'},
{id:'ctrl-016',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Imbrication et break',difficulty:5,statement:'Qu\'affiche ce programme ? Prêtez attention à la portée du `break` dans deux boucles imbriquées.',code:`for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) break;
        printf("%d%d ", i, j);
    }
}`,expected:'11 21 31 ',normalize:'trim',explanation:'L\'instruction `break` sort uniquement de la **boucle la plus proche**, c\'est-à-dire la boucle interne. La boucle externe continue son déroulement normal.\n\nPour chaque valeur de `i` :\n- `j = 1` : `1 == 2` est faux, on affiche `i1 `.\n- `j = 2` : `2 == 2` est vrai, `break` sort de la boucle interne.\n\nLes couples affichés sont donc `11 `, `21 ` et `31 `.\n\nPour sortir de deux boucles imbriquées, il faut soit utiliser `goto`, soit un drapeau booléen.'},
{id:'ctrl-017',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Somme 1 à 100',difficulty:2,statement:'Qu\'affiche ce programme qui calcule la somme des entiers de 1 à 100 ?',code:`int i, som;
for (i = 1, som = 0; i <= 100; i++) som += i;
printf("somme = %d\\n", som);`,expected:'somme = 5050',normalize:'trim',explanation:'La boucle accumule dans `som` la somme des entiers de 1 à 100. À chaque itération, `som` augmente de `i` puis `i` s\'incrémente.\n\nLe résultat final correspond à la formule mathématique de la somme arithmétique : 1 + 2 + ... + 100 = 100 × 101 / 2 = **5050**.\n\nL\'initialisation multiple dans le `for` (`i = 1, som = 0`) est une syntaxe valide et courante.'},
{id:'ctrl-018',type:'mcq',chapter:'Chapitre 2 — Contrôle',title:'Signe du produit',difficulty:4,statement:'Comment déterminer le **signe** du produit `A × B` sans effectuer la multiplication elle-même ?',multi:false,options:[{id:'a',text:'`(A > 0 && B > 0) || (A < 0 && B < 0)` → positif'},{id:'b',text:'`A * B > 0`'},{id:'c',text:'`A + B > 0`'},{id:'d',text:'`A == B`'}],correct:['a'],explanation:'D\'après la règle des signes en arithmétique :\n\n- Un positif multiplié par un positif donne un positif.\n- Un négatif multiplié par un négatif donne un positif.\n- Un positif multiplié par un négatif donne un négatif.\n\nL\'expression `(A > 0 && B > 0) || (A < 0 && B < 0)` couvre les deux cas qui produisent un résultat positif, sans jamais effectuer la multiplication.\n\nPourquoi éviter `A * B` ? Simplement parce que le produit de deux grands entiers peut **déborder** la capacité d\'un `int`, alors que la comparaison de signes ne présente aucun risque.'},
{id:'ctrl-019',type:'fillblanks',chapter:'Chapitre 2 — Contrôle',title:'Triangle étoiles',difficulty:4,statement:'Complétez le programme qui affiche un triangle isocèle d\'étoiles de `n` lignes, où `n = 4`.',template:`int n = 4;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= {{1}}; j++) printf(" ");
    for (int k = 1; k <= {{2}}; k++) printf("*");
    printf("\\n");
}`,blanks:[{id:'1',kind:'select',options:['n - i','i','n','i - 1'],correct:'n - i'},{id:'2',kind:'select',options:['2*i - 1','i','2*i','i + 1'],correct:'2*i - 1'}],explanation:'Pour dessiner un triangle isocèle de `n` lignes, il faut aligner deux suites :\n\n- Les **espaces** diminuent à chaque ligne. La première ligne compte `n - 1` espaces, la deuxième `n - 2`, etc. La formule est donc `n - i`.\n- Les **étoiles** suivent la suite des nombres impairs : 1, 3, 5, 7... La formule est `2 * i - 1`.\n\nPour `n = 4`, le programme dessine :\n```\n   *\n  ***\n *****\n*******\n```\n\nC\'est un classique pour comprendre la coordination de plusieurs boucles imbriquées.'},
{id:'ctrl-020',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] for avec printf séparé',difficulty:3,statement:'Qu\'affiche ce programme ? Observez ce qui se passe après la sortie de la boucle.',code:`int i;
for (i = 1; i < 3; i++)
    printf(" %d \\n", i);
printf("la valeur de i est %d \\n", i);`,expected:' 1 \n 2 \nla valeur de i est 3 ',normalize:'trim-lines',explanation:'La boucle `for` s\'exécute tant que `i < 3`, c\'est-à-dire pour `i = 1` et `i = 2`.\n\n- Itération 1 : affiche ` 1 ` puis `i` devient 2.\n- Itération 2 : affiche ` 2 ` puis `i` devient 3.\n- Test : `3 < 3` est faux, la boucle s\'arrête.\n\nLe dernier `printf`, situé **après** la boucle, affiche la valeur actuelle de `i`, qui est 3. C\'est un point à retenir : la variable qui contrôle une boucle `for` finit toujours par dépasser la condition d\'arrêt.'},
{id:'ctrl-021',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] for avec 2 printf',difficulty:4,statement:'Qu\'affiche ce programme, sachant que le corps de la boucle contient deux `printf` ?',code:`int i;
for (i = 1; i < 3; i++) {
    printf(" %d \\n", i);
    printf("la valeur de i est %d \\n", i);
}`,expected:' 1 \nla valeur de i est 1 \n 2 \nla valeur de i est 2 ',normalize:'trim-lines',explanation:'Le bloc de la boucle contient **deux instructions**, exécutées dans l\'ordre à chaque tour.\n\n- Itération 1 (`i = 1`) : affiche ` 1 `, puis `la valeur de i est 1 `.\n- Itération 2 (`i = 2`) : affiche ` 2 `, puis `la valeur de i est 2 `.\n- Test : `3 < 3` est faux, la boucle s\'arrête.\n\nLe programme effectue 2 itérations complètes.'},
{id:'ctrl-022',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] Programme 4',difficulty:4,statement:'Qu\'affiche ce programme avec deux boucles imbriquées dont la variable interne n\'est pas déclarée dans le `for` ?',code:`int i, j;
for (i = 1; i < 3; i++) {
    for (j = 1; j < 4; j++) {
        printf("i : %d, j : %d \\n", i, j);
        printf("la valeur de j est %d \\n", j);
    }
}
printf("la valeur de i est %d \\n", i);`,expected:'i : 1, j : 1 \nla valeur de j est 1 \ni : 1, j : 2 \nla valeur de j est 2 \ni : 1, j : 3 \nla valeur de j est 3 \ni : 2, j : 1 \nla valeur de j est 1 \ni : 2, j : 2 \nla valeur de j est 2 \ni : 2, j : 3 \nla valeur de j est 3 \nla valeur de i est 3 ',normalize:'trim-lines',explanation:'Les deux boucles sont **imbriquées** : la boucle externe parcourt `i` de 1 à 2, et pour chaque valeur de `i`, la boucle interne parcourt `j` de 1 à 3. Le nombre total d\'itérations est 2 × 3 = **6**.\n\nÀ chaque tour, le programme affiche l\'état du couple `(i, j)` puis la valeur courante de `j`. Après la sortie des deux boucles, la dernière ligne affiche la valeur finale de `i`, qui est 3.\n\nRemarque : la variable `j` est déclarée **en dehors** des boucles, donc sa valeur finale (4) reste accessible après — mais elle n\'est pas affichée ici.'},
{id:'ctrl-023',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] break + continue',difficulty:5,statement:'Qu\'affiche ce programme ? Déroulez attentivement les deux boucles et les effets combinés de `break` et `continue`.',code:`int i, j;
for (i = 0; i < 3; i++) {
    if (i == 1) continue;
    for (j = 0; j < 4; j++) {
        printf("\\n i:%d, et j:%d", i, j);
        if (j == 2) break;
    }
    printf("\\n i:%d, et j:%d", i, j);
}
printf("\\n i:%d, et j:%d", i, j);`,expected:'\n i:0, et j:0\n i:0, et j:1\n i:0, et j:2\n i:0, et j:2\n i:2, et j:0\n i:2, et j:1\n i:2, et j:2\n i:2, et j:2\n i:3, et j:2',normalize:'trim-lines',explanation:'Le `continue` saute l\'itération `i = 1` de la boucle externe. Les boucles ne s\'exécutent donc que pour `i = 0` et `i = 2`.\n\nPour `i = 0` :\n- La boucle interne affiche `j:0`, `j:1`, `j:2`, puis `break` sort quand `j == 2`.\n- Le `break` interrompt la boucle **avant** que `j++` ne soit exécuté. La variable `j` reste donc à **2**, pas 3.\n- La ligne suivante affiche `i:0, et j:2`.\n\nPour `i = 2` : le même schéma se répète, `j` finit également à 2.\n\nEnfin, `i = 3` à la sortie de la boucle externe : le programme affiche `i:3, et j:2`.\n\nRègle à retenir : `break` interrompt immédiatement la boucle ; l\'avancement d\'un `for` n\'est **pas** exécuté après un `break`.'},
{id:'ctrl-024',type:'findbug',chapter:'Chapitre 2 — Contrôle',title:'[Bug] = au lieu de ==',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui teste si l\'utilisateur a saisi 5.',code:`int main() {
    int x;
    scanf("%d", &x);
    if (x = 5)
        printf("x vaut 5\\n");
    else
        printf("x ne vaut pas 5\\n");
    return 0;
}`,bugLines:[4],explanation:'La ligne 4 utilise `x = 5` avec un **seul signe égal**, ce qui effectue une **affectation** et non une comparaison. La variable `x` est écrasée par la valeur 5, puis cette valeur est évaluée par le `if`.\n\nComme 5 est non nul, la condition est toujours considérée comme vraie. Le programme affiche donc systématiquement `x vaut 5`, quelle que soit la valeur saisie.\n\nIl faut utiliser `x == 5` avec un **double signe égal** pour effectuer une comparaison.'},
{id:'ctrl-025',type:'findbug',chapter:'Chapitre 2 — Contrôle',title:'[Bug] Boucle infinie',difficulty:3,statement:'Cliquez sur la ligne qui cause la boucle infinie dans ce programme qui devrait afficher les entiers de 0 à 9.',code:`int main() {
    int i = 0;
    while (i < 10) {
        printf("%d\\n", i);
    }
    return 0;
}`,bugLines:[4],explanation:'La ligne 4 affiche la valeur de `i` mais **n\'incrémente jamais** la variable. Comme `i` reste à 0, la condition `i < 10` est toujours vraie et la boucle ne s\'arrête jamais.\n\nPour corriger ce programme, il faut ajouter une instruction `i++;` après le `printf`. Sans cette mise à jour, la boucle tourne indéfiniment.'},
{id:'ctrl-026',type:'findbug',chapter:'Chapitre 2 — Contrôle',title:'[Bug] switch sans break',difficulty:4,statement:'Cliquez sur la ou les lignes où il manque un `break` pour éviter que les `case` suivants ne s\'exécutent inutilement.',code:`int main() {
    int x = 2;
    switch (x) {
        case 1: printf("un\\n");
        case 2: printf("deux\\n");
        case 3: printf("trois\\n");
    }
    return 0;
}`,bugLines:[5,6],explanation:'Les lignes 5 et 6 correspondent aux `case 2` et `case 3`, qui ne terminent pas par un `break`. Sans `break`, l\'exécution passe d\'un `case` au suivant — c\'est ce qu\'on appelle un **fall-through**.\n\nPour `x = 2`, le programme exécute `case 2`, puis tombe dans `case 3` et affiche `deux` suivi de `trois`, alors que seul `deux` était attendu.\n\nIl faut ajouter `break;` à la fin de chaque `case` pour éviter ce comportement.'},
{id:'ctrl-027',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Variante] continue sur 6',difficulty:3,statement:'Qu\'affiche ce programme, sachant qu\'il saute l\'itération 4 puis s\'arrête à l\'itération 6 ?',code:`for (int i = 1; i <= 6; i++) {
    if (i == 4) continue;
    if (i == 6) break;
    printf("%d ", i);
}`,expected:'1 2 3 5 ',normalize:'trim',explanation:'Ce programme combine deux instructions de contrôle à l\'intérieur d\'une même boucle.\n\n- Itérations 1, 2 et 3 : rien ne bloque, on affiche `1 `, `2 ` et `3 `.\n- Itération 4 : `continue` saute directement à `i++`. La valeur 4 n\'est **jamais affichée**.\n- Itération 5 : on affiche `5 `.\n- Itération 6 : `break` sort immédiatement de la boucle. La valeur 6 n\'est pas affichée non plus.\n\nLe programme affiche donc `1 2 3 5 `.'},
{id:'mem-002',type:'memory',chapter:'Chapitre 2 — Contrôle',title:'[Mémoire] Trace de boucle',difficulty:3,statement:'Après l\'exécution de la boucle `for (int k = 0; k < 4; k++) i += k;`, que valent respectivement `i` et `k` ?',code:`int i = 0;
for (int k = 0; k < 4; k++)
    i += k;`,memory:[{name:'i',type:'int',address:'F100',expected:'6'},{name:'k',type:'int',address:'F104',expected:'4'}],explanation:'La boucle accumule dans `i` la somme des valeurs successives de `k` :\n\n- `k = 0` : `i = 0 + 0 = 0`.\n- `k = 1` : `i = 0 + 1 = 1`.\n- `k = 2` : `i = 1 + 2 = 3`.\n- `k = 3` : `i = 3 + 3 = 6`.\n\nLa boucle s\'arrête quand `k` atteint 4, car `4 < 4` est faux.\n\nÉtat final : `i = 6` et `k = 4`.'},

{id:'tab-001',type:'mcq',chapter:'Chapitre 3 — Tableaux',title:'Dernier indice',difficulty:2,statement:'Pour un tableau `int tab[10]`, quel est le **dernier indice valide** que l\'on peut utiliser ?',multi:false,options:[{id:'a',text:'10'},{id:'b',text:'9'},{id:'c',text:'11'},{id:'d',text:'Dépend de l\'architecture'}],correct:['b'],explanation:'En C, les indices d\'un tableau commencent à **0** et se terminent à **n-1**, où n est la taille du tableau. Pour un tableau de 10 éléments, les indices valides vont donc de 0 à 9.\n\nUtiliser `tab[10]` provoquerait un **débordement de tampon** : on accéderait à une case mémoire qui n\'appartient pas au tableau. C\'est une source majeure de bugs et de failles de sécurité en C.\n\nMoyen mnémotechnique : « le 10ᵉ élément a l\'indice 9 ».'},
{id:'tab-002',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Init partielle',difficulty:3,statement:'Qu\'affiche ce programme, sachant que le tableau est initialisé avec seulement trois valeurs ?',code:`int tab[5] = {11, 12, 13};
for (int i = 0; i < 5; i++) printf("%d ", tab[i]);`,expected:'11 12 13 0 0 ',normalize:'trim',explanation:'Lors de la déclaration d\'un tableau avec initialisation partielle, le compilateur C **complète automatiquement** les éléments manquants avec la valeur 0.\n\nIci, `tab[0]`, `tab[1]` et `tab[2]` reçoivent respectivement 11, 12 et 13. Les cases `tab[3]` et `tab[4]` sont initialisées à 0.\n\nAttention : cette règle ne s\'applique **que** lors de la déclaration avec initialisation. Si on écrit `int tab[5];` sans accolades, les valeurs sont **indéterminées** (déchets mémoire).'}, 
{id:'tab-003',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Taille implicite',difficulty:3,statement:'Quelle est la taille réservée pour `tab` et pour `tab2` ? Répondez par deux nombres, un par ligne.',code:`int tab[] = {10, 20, 30, 40, 50};
int tab2[] = {1, 0, 0, 1, 1, 0, 1, 0, 1, 0};`,expected:'5\n10',normalize:'trim-lines',explanation:'Quand on déclare un tableau avec `[]` vide et une liste d\'initialisation, le compilateur C **déduit automatiquement** la taille à partir du nombre d\'éléments fournis.\n\n- `tab` contient 5 valeurs, sa taille est donc 5.\n- `tab2` contient 10 valeurs, sa taille est donc 10.\n\nC\'est pratique pour éviter d\'écrire une taille en dur et de se tromper. On peut ensuite vérifier la taille calculée à l\'exécution avec `sizeof(tab) / sizeof(tab[0])`.'},
{id:'tab-004',type:'trace',chapter:'Chapitre 3 — Tableaux',title:'Recherche du maximum',difficulty:3,statement:'Complétez le tableau de valeurs en traçant l\'évolution de `max` et `indice` à chaque itération.',code:`int tab[5] = {3, 8, 1, 9, 4};
int max = tab[0];
int indice = 0;
for (int i = 1; i < 5; i++) {
    if (tab[i] > max) { max = tab[i]; indice = i; }
}`,columns:['i','tab[i]','max','indice'],rows:[['1','8','8','1'],['2','1','8','1'],['3','9','9','3'],['4','4','9','3']],normalize:'trim',explanation:'L\'algorithme cherche le **maximum** du tableau en partant du premier élément comme valeur de référence, puis en parcourant les suivants.\n\n- Itération 1 : `tab[1] = 8` est supérieur à `max = 3`, donc `max` devient 8 et `indice` devient 1.\n- Itération 2 : `tab[2] = 1` n\'est pas supérieur à 8, on ne change rien.\n- Itération 3 : `tab[3] = 9` est supérieur à 8, donc `max` devient 9 et `indice` devient 3.\n- Itération 4 : `tab[4] = 4` n\'est pas supérieur à 9, on ne change rien.\n\nLe programme trouve donc un maximum de 9 situé à l\'indice 3.'},
{id:'tab-005',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Inversion',difficulty:4,statement:'Qu\'affiche ce programme, sachant que la boucle échange les éléments du tableau sans utiliser de tableau auxiliaire ?',code:`int tab[6] = {1, 2, 3, 4, 5, 6};
int aide;
for (int i = 0, j = 5; i < j; i++, j--) {
    aide = tab[i]; tab[i] = tab[j]; tab[j] = aide;
}
for (int i = 0; i < 6; i++) printf("%d ", tab[i]);`,expected:'6 5 4 3 2 1 ',normalize:'trim',explanation:'La boucle utilise **deux indices** qui partent des extrémités du tableau et se rapprochent l\'un de l\'autre. À chaque tour, les deux éléments sont échangés grâce à une variable temporaire `aide`.\n\n- Tour 1 : échange `tab[0]` et `tab[5]` : `{6, 2, 3, 4, 5, 1}`.\n- Tour 2 : échange `tab[1]` et `tab[4]` : `{6, 5, 3, 4, 2, 1}`.\n- Tour 3 : échange `tab[2]` et `tab[3]` : `{6, 5, 4, 3, 2, 1}`.\n\nQuand `i` et `j` se croisent, la boucle s\'arrête. Le tableau est complètement inversé.'},
{id:'tab-006',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'Supprimer zéros',difficulty:5,statement:'Complétez le programme qui supprime toutes les occurrences de zéro dans un tableau et tasse les éléments restants.',template:`int tab[8] = {1, 0, 2, 0, 0, 3, 0, 4};
int n = 8, j = 0;
for (int i = 0; i < n; i++) {
    if (tab[i] {{1}} 0) {
        tab[{{2}}] = tab[i];
        j++;
    }
}
n = {{3}};`,blanks:[{id:'1',kind:'select',options:['!=','==','<=','>='],correct:'!='},{id:'2',kind:'select',options:['i','j','i+1','j+1'],correct:'j'},{id:'3',kind:'select',options:['i','j','8','i-1'],correct:'j'}],explanation:'L\'algorithme utilise **deux indices** :\n\n- `i` parcourt l\'intégralité du tableau d\'origine.\n- `j` indique la prochaine position d\'écriture dans le tableau compacté.\n\nÀ chaque élément non nul rencontré (`tab[i] != 0`), on le réécrit à la position `j` et on incrémente `j`. Après la boucle, `j` contient le nombre d\'éléments conservés, et l\'on met à jour `n = j`.\n\nPour l\'entrée `{1, 0, 2, 0, 0, 3, 0, 4}`, le résultat est `{1, 2, 3, 4}` avec `n = 4`.'},
{id:'tab-007',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Tri sélection — 1er tour uniquement',difficulty:5,statement:'Le code ci-dessous est une version **volontairement limitée** du tri par sélection : la boucle externe ne fait **qu\'un seul tour** (`i < 1`). Quel est l\'état du tableau **après ce seul tour** ?',code:`int tab[5] = {5, 3, 8, 1, 4};
for (int i = 0; i < 1; i++) {   /* un seul tour */
    int min = i;
    for (int j = i + 1; j < 5; j++)
        if (tab[j] < tab[min]) min = j;
    int aide = tab[i]; tab[i] = tab[min]; tab[min] = aide;
}`,expected:'1 3 8 5 4',normalize:'trim',explanation:'Le tri par sélection place à chaque tour le **minimum restant** à sa position définitive.\n\nAu tour `i = 0` :\n- On cherche le minimum du tableau `[5, 3, 8, 1, 4]` en parcourant les indices 1 à 4.\n- Le minimum est `1`, situé à l\'indice 3.\n- On échange `tab[0]` (5) et `tab[3]` (1).\n\nRésultat après ce tour : `1 3 8 5 4`.\n\nPour obtenir le tri complet, il faudrait que la boucle externe aille jusqu\'à `i < 4`. Ici, le programme s\'arrête volontairement après la première itération.'},
{id:'tab-008',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Tri bulles',difficulty:4,statement:'Après **une seule passe** complète de la boucle interne (les quatre comparaisons), quel est l\'état du tableau ?',code:`int tab[5] = {5, 1, 4, 2, 8};
for (int j = 0; j < 4; j++) {
    if (tab[j] > tab[j+1]) {
        int aide = tab[j]; tab[j] = tab[j+1]; tab[j+1] = aide;
    }
}`,expected:'1 4 2 5 8',normalize:'trim',explanation:'Le tri à bulles fait « remonter » le plus grand élément vers la fin du tableau à chaque passe. À chaque comparaison, si l\'élément courant est plus grand que son voisin de droite, on les échange.\n\n| Comparaison | Échange | État |\n|---|---|---|\n| 5 > 1 | oui | 1 5 4 2 8 |\n| 5 > 4 | oui | 1 4 5 2 8 |\n| 5 > 2 | oui | 1 4 2 5 8 |\n| 5 > 8 | non | 1 4 2 5 8 |\n\nAprès cette première passe, le plus grand élément (8) est en dernière position, sa place définitive. Le tri complet nécessiterait d\'autres passes.'},
{id:'tab-009',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Recherche linéaire',difficulty:3,statement:'Qu\'affiche ce programme qui recherche la valeur 44 dans un tableau de six entiers ?',code:`int tab[6] = {11, 22, 33, 44, 55, 66};
int val = 44, pos = -1;
for (int i = 0; i < 6; i++) {
    if (tab[i] == val) { pos = i; break; }
}
printf("Trouvé à l'indice %d\\n", pos);`,expected:'Trouvé à l\'indice 3',normalize:'trim',explanation:'La **recherche linéaire** parcourt le tableau élément par élément jusqu\'à trouver la valeur recherchée. Dès qu\'elle est trouvée, l\'instruction `break` interrompt la boucle.\n\n- `i = 0` : `11 == 44` ? Non.\n- `i = 1` : `22 == 44` ? Non.\n- `i = 2` : `33 == 44` ? Non.\n- `i = 3` : `44 == 44` ? Oui. `pos` reçoit 3, et `break` sort de la boucle.\n\nLe programme affiche `Trouvé à l\'indice 3`.\n\nComplexité : O(n) dans le pire cas, car il faut parcourir tout le tableau si la valeur est absente ou en fin de tableau.'},
{id:'tab-010',type:'mcq',chapter:'Chapitre 3 — Tableaux',title:'Complexité dichotomie',difficulty:3,statement:'Quelle est la complexité temporelle de la **recherche dichotomique** dans un tableau trié de n éléments ?',multi:false,options:[{id:'a',text:'O(1)'},{id:'b',text:'O(log n)'},{id:'c',text:'O(n)'},{id:'d',text:'O(n²)'}],correct:['b'],explanation:'La recherche dichotomique (ou binaire) divise à chaque étape l\'intervalle de recherche **par deux**. Elle compare la valeur recherchée au milieu du tableau, puis restreint la recherche à la moitié gauche ou droite.\n\nPour un tableau de n éléments, le nombre maximum d\'étapes est logarithmique : environ log₂(n). Pour n = 1 000 000, cela représente à peine 20 comparaisons.\n\nAttention : la dichotomie exige que le tableau soit **trié** au préalable. Sinon, la logique de division n\'a aucun sens.'},
{id:'tab-011',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Fusion tableaux',difficulty:5,statement:'Qu\'affiche ce programme qui fusionne deux tableaux triés en un seul tableau trié ?',code:`int t1[3] = {1, 3, 5}, t2[3] = {2, 4, 6}, t[6];
int i = 0, j = 0, k = 0;
while (i < 3 && j < 3) {
    if (t1[i] < t2[j]) t[k++] = t1[i++];
    else t[k++] = t2[j++];
}
while (i < 3) t[k++] = t1[i++];
while (j < 3) t[k++] = t2[j++];
for (int m = 0; m < 6; m++) printf("%d ", t[m]);`,expected:'1 2 3 4 5 6 ',normalize:'trim',explanation:'L\'algorithme de **fusion** compare les éléments de tête de chaque tableau et copie toujours le plus petit dans le tableau résultat.\n\n- `1 < 2` → on copie 1, `i` avance.\n- `3 < 2` ? Non → on copie 2, `j` avance.\n- `3 < 4` → on copie 3, `i` avance.\n- `5 < 4` ? Non → on copie 4, `j` avance.\n- `5 < 6` → on copie 5, `i` avance.\n- Il ne reste que le 6 dans `t2`, on le copie.\n\nRésultat : `1 2 3 4 5 6 `. Complexité O(n1 + n2). C\'est l\'étape clé du tri fusion.'},
{id:'tab-012',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Parcours matrice',difficulty:3,statement:'Qu\'affiche ce programme qui parcourt une matrice 2×3 ligne par ligne ?',code:`int mat[2][3] = {{1, 2, 3}, {4, 5, 6}};
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) printf("%d ", mat[i][j]);
    printf("\\n");
}`,expected:'1 2 3 \n4 5 6 ',normalize:'trim-lines',explanation:'En C, une matrice est stockée **ligne par ligne** en mémoire. Les deux boucles imbriquées parcourent donc successivement :\n\n- La ligne 0 : `mat[0][0]`, `mat[0][1]`, `mat[0][2]`, soit `1 2 3 `.\n- La ligne 1 : `mat[1][0]`, `mat[1][1]`, `mat[1][2]`, soit `4 5 6 `.\n\nLe `printf("\\n")` à la fin de la boucle externe ajoute un saut de ligne après chaque ligne de la matrice.'},
{id:'tab-013',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'Transposée',difficulty:4,statement:'Complétez le programme qui calcule la transposée d\'une matrice 2×3 dans une matrice 3×2.',template:`int t[2][3], tr[3][2];
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        tr[{{1}}][{{2}}] = t[i][j];`,blanks:[{id:'1',kind:'select',options:['i','j','i+1','j+1'],correct:'j'},{id:'2',kind:'select',options:['i','j','i+1','j+1'],correct:'i'}],explanation:'La transposée d\'une matrice s\'obtient en **inversant les indices de ligne et de colonne**. L\'élément situé à la ligne `i` et à la colonne `j` de la matrice d\'origine se retrouve à la ligne `j` et à la colonne `i` de la transposée.\n\nL\'instruction `tr[j][i] = t[i][j]` applique exactement cette règle.\n\nConséquence sur les dimensions : une matrice de taille l × c devient une matrice de taille c × l. C\'est pour cela que `tr` est déclarée `[3][2]` alors que `t` est déclarée `[2][3]`.'},
{id:'tab-014',type:'mcq',chapter:'Chapitre 3 — Tableaux',title:'Tableau en paramètre',difficulty:4,statement:'Quand on passe un tableau `int tab[10]` à une fonction, que reçoit réellement la fonction ?',multi:false,options:[{id:'a',text:'Une copie complète du tableau'},{id:'b',text:'Un pointeur vers le premier élément'},{id:'c',text:'Le nombre d\'éléments'},{id:'d',text:'Rien, le tableau ne se passe pas'}],correct:['b'],explanation:'En C, un tableau passé à une fonction est **converti automatiquement en pointeur** vers son premier élément. La fonction ne reçoit donc pas une copie du tableau, mais simplement l\'adresse de sa première case.\n\nConséquences importantes :\n1. La fonction **modifie** le tableau d\'origine (pas de copie).\n2. `sizeof(tab)` dans la fonction renvoie la taille du pointeur, pas la taille du tableau.\n3. Il faut **toujours** passer la taille en paramètre supplémentaire : `void f(int tab[], int n)`.'},
{id:'tab-015',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Compression',difficulty:5,statement:'Qu\'affiche ce programme qui réduit chaque séquence de nombres identiques à un seul exemplaire ?',code:`int tab[8] = {1, 1, 2, 2, 2, 1, 1, 1};
int j = 0;
for (int i = 0; i < 8; i++) {
    if (i == 0 || tab[i] != tab[j-1]) tab[j++] = tab[i];
}
for (int i = 0; i < j; i++) printf("%d ", tab[i]);`,expected:'1 2 1 ',normalize:'trim',explanation:'L\'algorithme utilise `j` comme **position d\'écriture** et ne réécrit un élément que s\'il diffère du dernier élément déjà écrit.\n\n- `i = 0` : on écrit `1` en position 0, `j` passe à 1.\n- `i = 1` : `tab[1] = 1` est identique à `tab[0]`, on ne fait rien.\n- `i = 2` : `tab[2] = 2` diffère de `tab[0] = 1`, on écrit 2 en position 1, `j` passe à 2.\n- `i = 3` et `i = 4` : identiques à 2, on ne fait rien.\n- `i = 5` : `tab[5] = 1` diffère de `tab[1] = 2`, on écrit 1 en position 2, `j` passe à 3.\n- `i = 6` et `i = 7` : identiques à 1, on ne fait rien.\n\nLa séquence compressée est `1 2 1 `.'},
{id:'tab-016',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'[Série 3] Séparer positifs/négatifs',difficulty:4,statement:'Complétez le programme qui sépare les valeurs positives et négatives d\'un tableau dans deux tableaux distincts.',template:`int tab[50], tpos[50], tneg[50];
int n, i, ip = 0, in = 0;
for (i = 0; i < n; i++) {
    if (tab[i] > 0) {
        tpos[{{1}}] = tab[i];
        {{2}};
    } else if (tab[i] < 0) {
        tneg[{{3}}] = tab[i];
        {{4}};
    }
}`,blanks:[{id:'1',kind:'select',options:['i','ip','in','0'],correct:'ip'},{id:'2',kind:'select',options:['ip++','in++','i++','rien'],correct:'ip++'},{id:'3',kind:'select',options:['i','ip','in','0'],correct:'in'},{id:'4',kind:'select',options:['ip++','in++','i++','rien'],correct:'in++'}],explanation:'L\'algorithme utilise **deux compteurs indépendants** : `ip` pour le tableau des positifs et `in` pour celui des négatifs.\n\nPour chaque élément non nul du tableau d\'origine :\n- S\'il est positif, on l\'écrit dans `tpos` à la position `ip`, puis on incrémente `ip`.\n- S\'il est négatif, on l\'écrit dans `tneg` à la position `in`, puis on incrémente `in`.\n\nLes valeurs nulles sont ignorées, car ni `tab[i] > 0` ni `tab[i] < 0` ne sont vraies pour 0.'},
{id:'tab-017',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'[Série 3] Recherche dichotomique',difficulty:5,statement:'Complétez l\'algorithme de recherche dichotomique dans un tableau trié.',template:`int debut = 0, fin = n - 1, milieu, trouve = 0;
while (debut <= fin && !trouve) {
    milieu = (debut + fin) / 2;
    if (tab[milieu] == val) trouve = 1;
    else if (tab[milieu] < val) debut = {{1}};
    else fin = {{2}};
}`,blanks:[{id:'1',kind:'select',options:['milieu','milieu + 1','milieu - 1','debut + 1'],correct:'milieu + 1'},{id:'2',kind:'select',options:['milieu','milieu + 1','milieu - 1','fin - 1'],correct:'milieu - 1'}],explanation:'La recherche dichotomique maintient un intervalle `[debut, fin]` qui se resserre à chaque étape. On calcule le milieu, puis on compare :\n\n- Si `tab[milieu] == val`, on a trouvé.\n- Si `tab[milieu] < val`, la valeur cherchée est **à droite** du milieu : on décale `debut` à `milieu + 1`.\n- Si `tab[milieu] > val`, la valeur cherchée est **à gauche** du milieu : on décale `fin` à `milieu - 1`.\n\nLe `+ 1` et le `- 1` sont essentiels : ils garantissent que l\'intervalle diminue strictement, sinon le programme boucherait indéfiniment.'},
{id:'tab-018',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'[Série 3] Fusion triée',difficulty:5,statement:'Complétez l\'algorithme de fusion de deux tableaux triés `t1` et `t2` dans un tableau `t`.',template:`int i = 0, j = 0, k = 0;
while (i < n1 && j < n2) {
    if (t1[i] < t2[j]) t[k++] = t1[{{1}}];
    else t[k++] = t2[{{2}}];
}
while (i < n1) t[k++] = t1[i++];
while (j < n2) t[k++] = t2[j++];`,blanks:[{id:'1',kind:'select',options:['i++','j++','k++','i'],correct:'i++'},{id:'2',kind:'select',options:['i++','j++','k++','j'],correct:'j++'}],explanation:'La fusion de deux tableaux triés fonctionne comme la **fermeture d\'une fermeture éclair** : on compare les têtes de chaque tableau et on copie la plus petite dans le résultat.\n\n- Si `t1[i] < t2[j]`, on prend `t1[i]` et on avance `i` avec `i++`.\n- Sinon, on prend `t2[j]` et on avance `j` avec `j++`.\n- Dans les deux cas, `k` avance pour indiquer la prochaine position d\'écriture.\n\nQuand l\'un des deux tableaux est épuisé, les boucles suivantes vident l\'autre dans `t`. Complexité : O(n1 + n2).'},
{id:'tab-019',type:'findbug',chapter:'Chapitre 3 — Tableaux',title:'[Bug] Débordement de tampon',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui remplit un tableau de 5 éléments.',code:`int main() {
    int tab[5];
    for (int i = 0; i <= 5; i++) {
        tab[i] = i * 2;
    }
    for (int i = 0; i < 5; i++)
        printf("%d ", tab[i]);
    return 0;
}`,bugLines:[3],explanation:'La ligne 3 utilise la condition `i <= 5`, ce qui fait **6 itérations** (de 0 à 5) pour un tableau de 5 éléments. Or, les indices valides vont de 0 à 4.\n\nÀ la dernière itération, `tab[5]` accède à une case mémoire située **hors du tableau**. C\'est ce qu\'on appelle un **débordement de tampon**. Le programme peut corrompre une autre variable, planter, ou produire des résultats imprévisibles.\n\nIl faut écrire `i < 5` à la place.'},
{id:'tab-020',type:'findbug',chapter:'Chapitre 3 — Tableaux',title:'[Bug] Swap incorrect',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui tente d\'échanger les valeurs de `a` et `b`.',code:`int main() {
    int a = 5, b = 10;
    a = b;
    b = a;
    printf("a=%d, b=%d\\n", a, b);
    return 0;
}`,bugLines:[3],explanation:'La ligne 3 effectue `a = b`, ce qui **écrase** la valeur initiale de `a` (5) avant qu\'elle ait pu être transférée à `b`. Après cette ligne, `a` et `b` valent tous les deux 10.\n\nLa ligne 4, `b = a`, ne fait que recopier 10 dans `b`. Résultat : les deux variables valent 10, alors que l\'objectif était de les échanger.\n\nIl faut utiliser une **variable temporaire** pour stocker la valeur de `a` avant de l\'écraser :\n```\nint tmp = a;\na = b;\nb = tmp;\n```'}, 
{id:'tab-021',type:'findbug',chapter:'Chapitre 3 — Tableaux',title:'[Bug] Parcours jusqu\'à n inclus',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui parcourt un tableau de 10 éléments.',code:`int main() {
    int tab[10] = {0};
    int n = 10;
    for (int i = 0; i <= n; i++)
        printf("%d ", tab[i]);
    return 0;
}`,bugLines:[4],explanation:'La ligne 4 utilise la condition `i <= n` avec `n = 10`. La boucle s\'exécute donc pour `i` allant de 0 à 10 inclus, ce qui fait 11 itérations.\n\nOr, pour un tableau de 10 éléments, les indices valides vont de 0 à 9. L\'accès `tab[10]` dépasse le tableau et lit une case mémoire indéterminée. C\'est un **débordement de tampon** en lecture.\n\nLa condition correcte est `i < n`, ce qui donne 10 itérations et couvre exactement les indices 0 à 9.'},
{id:'tab-022',type:'memory',chapter:'Chapitre 3 — Tableaux',title:'[Mémoire] Après inversion',difficulty:4,statement:'Remplissez l\'état final du tableau `tab` après l\'exécution de ce programme d\'inversion.',code:`int tab[4] = {10, 20, 30, 40};
for (int i = 0, j = 3; i < j; i++, j--) {
    int tmp = tab[i];
    tab[i] = tab[j];
    tab[j] = tmp;
}`,memory:[{name:'tab[0]',type:'int',address:'F100',expected:'40'},{name:'tab[1]',type:'int',address:'F104',expected:'30'},{name:'tab[2]',type:'int',address:'F108',expected:'20'},{name:'tab[3]',type:'int',address:'F10C',expected:'10'}],explanation:'Deux indices se croisent : `i` démarre à 0 et `j` démarre à 3. À chaque tour, les éléments aux positions `i` et `j` sont échangés via `tmp`, puis `i` avance et `j` recule.\n\n- Tour 1 : échange `tab[0]` (10) et `tab[3]` (40). État : `{40, 20, 30, 10}`.\n- Tour 2 : échange `tab[1]` (20) et `tab[2]` (30). État : `{40, 30, 20, 10}`.\n\nLes indices `i` et `j` se croisent, la boucle s\'arrête. Le tableau est complètement inversé.'},
{id:'tab-023',type:'memory',chapter:'Chapitre 3 — Tableaux',title:'[Mémoire] Trace tri sélection',difficulty:5,statement:'Après la **première itération complète** de ce tri par sélection, remplissez l\'état du tableau.',code:`int tab[5] = {5, 3, 8, 1, 4};
int min = 0;
for (int j = 1; j < 5; j++)
    if (tab[j] < tab[min]) min = j;
int tmp = tab[0];
tab[0] = tab[min];
tab[min] = tmp;`,memory:[{name:'tab[0]',type:'int',address:'F100',expected:'1'},{name:'tab[1]',type:'int',address:'F104',expected:'3'},{name:'tab[2]',type:'int',address:'F108',expected:'8'},{name:'tab[3]',type:'int',address:'F10C',expected:'5'},{name:'tab[4]',type:'int',address:'F110',expected:'4'}],explanation:'Le tri par sélection cherche d\'abord le minimum du tableau, puis l\'échange avec le premier élément.\n\n- Recherche du minimum dans `[5, 3, 8, 1, 4]` : le plus petit est 1, situé à l\'indice 3.\n- Échange de `tab[0]` et `tab[3]` : le tableau devient `{1, 3, 8, 5, 4}`.\n\nÀ l\'issue de ce premier tour, la plus petite valeur est à sa place définitive. Les tours suivants traiteraient le reste du tableau.'},
{id:'tab-024',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'[Variante] Recherche max',difficulty:3,statement:'Qu\'affiche ce programme qui recherche le maximum d\'un tableau de six entiers ?',code:`int tab[6] = {7, 2, 9, 4, 11, 3};
int max = tab[0];
for (int i = 1; i < 6; i++)
    if (tab[i] > max) max = tab[i];
printf("%d\\n", max);`,expected:'11',normalize:'trim',explanation:'L\'algorithme initialise `max` avec le premier élément du tableau, puis parcourt les suivants en mettant à jour `max` à chaque fois qu\'une valeur plus grande est trouvée.\n\n- `max = 7` au départ.\n- `tab[1] = 2` < 7, inchangé.\n- `tab[2] = 9` > 7, `max = 9`.\n- `tab[3] = 4` < 9, inchangé.\n- `tab[4] = 11` > 9, `max = 11`.\n- `tab[5] = 3` < 11, inchangé.\n\nLe programme affiche donc `11`.'},
{id:'tab-025',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'[Variante] Somme conditionnelle',difficulty:4,statement:'Qu\'affiche ce programme qui calcule la somme des éléments strictement positifs d\'un tableau contenant des valeurs positives et négatives ?',code:`int tab[6] = {1, -2, 3, -4, 5, -6};
int som = 0;
for (int i = 0; i < 6; i++)
    if (tab[i] > 0) som += tab[i];
printf("%d\\n", som);`,expected:'9',normalize:'trim',explanation:'La boucle parcourt chaque élément du tableau, mais n\'ajoute à `som` que les valeurs **strictement positives**.\n\n- `1 > 0` → `som = 1`.\n- `-2 > 0` ? Non.\n- `3 > 0` → `som = 4`.\n- `-4 > 0` ? Non.\n- `5 > 0` → `som = 9`.\n- `-6 > 0` ? Non.\n\nLe programme affiche donc `9`.'},

{id:'ptr-001',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'*q modifie x',difficulty:2,statement:'Qu\'affiche ce programme, sachant que `q` pointe sur `x` ?',code:`int x = 5;
int *q = &x;
*q = *q + 10;
printf("%d\\n", x);
printf("%d\\n", *q);`,expected:'15\n15',normalize:'trim-lines',explanation:'La variable `q` contient l\'**adresse** de `x`. L\'expression `*q` désigne donc le contenu de cette adresse, c\'est-à-dire la valeur de `x` elle-même.\n\nL\'instruction `*q = *q + 10` est strictement équivalente à `x = x + 10`. Après son exécution, `x` vaut 15.\n\nLe premier `printf` affiche la valeur de `x`, soit 15. Le second affiche la valeur pointée par `q`, qui est aussi la valeur de `x`, donc 15 également.\n\nÀ retenir : `*q` et `x` sont deux notations pour désigner la même case mémoire.'},
{id:'ptr-002',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'tab[i] équivalents',difficulty:3,statement:'Soit `int tab[5];` et `int *q = tab;`. Quelles expressions sont **équivalentes** à `tab[i]` ? Sélectionnez toutes les bonnes réponses.',multi:true,options:[{id:'a',text:'`*(tab + i)`'},{id:'b',text:'`*(q + i)` avec q=tab'},{id:'c',text:'`*q + i`'},{id:'d',text:'`*(&tab[i])`'}],correct:['a','b','d'],explanation:'En C, l\'accès indexé `tab[i]` est **défini par la norme** comme une notation raccourcie de `*(tab + i)`. Les deux écritures sont interchangeables dans tout programme C.\n\n- Option (a) : correcte, c\'est la définition.\n- Option (b) : correcte aussi, car `q = tab` signifie que `q` pointe sur le premier élément. Donc `q + i` ≡ `tab + i`, et `*(q + i)` ≡ `tab[i]`.\n- Option (c) : **fausse**. L\'opérateur `*` (unaire) est prioritaire sur `+`. `*q + i` est lu `(*q) + i`, ce qui donne `tab[0] + i` — une valeur, pas un élément de tableau.\n- Option (d) : correcte, car `&tab[i]` donne l\'adresse de l\'élément, et `*` relit le contenu.\n\nPiège à retenir : ne jamais confondre `*(q + i)` et `(*q) + i`.'},
{id:'ptr-003',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Arithmétique typée',difficulty:4,statement:'On suppose (adresses fictives) que `&tab[0] = F800` et qu\'un `int` occupe 4 octets. Quelles adresses sont affichées ? (une par ligne, en hexadécimal)',code:`int tab[5];
int *q = tab;
printf("%p\\n", (void*)q);
printf("%p\\n", (void*)(q + 1));
printf("%p\\n", (void*)(q + 3));`,expected:'F800\nF804\nF80C',normalize:'trim-lines',explanation:'L\'arithmétique des pointeurs en C est **typée** : le compilateur connaît la taille du type pointé et ajuste automatiquement l\'addition. Pour un `int *`, ajouter 1 revient à avancer de `sizeof(int)`, soit 4 octets.\n\n- `q` contient F800.\n- `q + 1` = F800 + 1 × 4 = F804.\n- `q + 3` = F800 + 3 × 4 = F80C.\n\nAttention : `q + 1` n\'ajoute **pas** 1 octet, mais 4. C\'est un point crucial pour la manipulation des tableaux et des structures.'},
{id:'ptr-004',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'tab est-il un pointeur ?',difficulty:3,statement:'Soit `int tab[5];`. Quelle affirmation concernant `tab` et son comportement en C est **vraie** ?',multi:false,options:[{id:'a',text:'`tab` est un pointeur, on peut écrire `tab++`'},{id:'b',text:'`tab++` est illégal car `tab` est une constante d\'adresse'},{id:'c',text:'`tab` est une variable modifiable comme les autres'},{id:'d',text:'`tab` et `&tab` désignent des adresses différentes'}],correct:['b'],explanation:'Le nom `tab` **n\'est pas un pointeur** au sens strict, mais une **constante d\'adresse** : il représente l\'adresse du premier élément du tableau et ne peut pas être modifié.\n\n- `tab++` est **interdit** : le compilateur refuse d\'incrémenter une constante.\n- `tab = q` est également interdit.\n- En revanche, `q = tab` est parfaitement valide, car on copie l\'adresse dans un vrai pointeur modifiable.\n\nC\'est pour cette raison qu\'on utilise souvent un pointeur auxiliaire quand on veut parcourir un tableau en avançant.'},
{id:'ptr-005',type:'trace',chapter:'Chapitre 4 — Pointeurs',title:'Trace parcours pointeur',difficulty:4,statement:'Complétez le tableau en traçant les valeurs de `q` et `*q` à chaque itération. On suppose `&tab[0] = F800` et un `int` de 4 octets.',code:`int tab[5] = {11, 12, 13, 14, 15};
int *q = tab;
for (int i = 0; i < 3; i++) {
    printf("%p → %d\\n", (void*)q, *q);
    q++;
}`,columns:['Itération','q (adresse)','*q (valeur)'],rows:[['1','F800','11'],['2','F804','12'],['3','F808','13']],normalize:'trim',explanation:'L\'instruction `q++` incrémente le pointeur de `sizeof(int)` octets, soit 4 octets. Le pointeur avance donc d\'un élément à chaque tour.\n\n- Itération 1 : `q = F800`, `*q = 11`.\n- `q++` → `q = F804`.\n- Itération 2 : `*q = 12`.\n- `q++` → `q = F808`.\n- Itération 3 : `*q = 13`.\n\nC\'est le **formalisme n°4** présenté dans le cours : un pointeur qui avance.'},
{id:'ptr-006',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Allocation correcte',difficulty:3,statement:'Complétez le programme qui alloue dynamiquement un tableau de `n` entiers avec vérification d\'erreur.',template:`int n, *tab;
scanf("%d", &n);
tab = (int*) {{1}}(n * {{2}}(int));
if ({{3}}) {
    printf("Erreur\\n");
    {{4}}(-1);
}`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','realloc'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['tab','!tab','tab == 1','tab != NULL'],correct:'!tab'},{id:'4',kind:'select',options:['return','exit','break','continue'],correct:'exit'}],explanation:'Le pattern canonique d\'allocation dynamique en C est :\n```\ntab = (int*) malloc(n * sizeof(int));\nif (!tab) exit(-1);\n```\n\nTrois règles fondamentales :\n1. Toujours écrire `n * sizeof(int)` et non `n` tout seul. Sinon, on réserve `n` octets au lieu de `n × 4`.\n2. Toujours vérifier que `malloc` a réussi en testant `!tab` ou `tab == NULL`.\n3. Toujours libérer plus tard avec `free(tab)`.'},
{id:'ptr-007',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Priorité * et &',difficulty:4,statement:'Qu\'affiche ce programme, sachant que `q` pointe sur `x` ?',code:`int x = 5;
int *q = &x;
printf("%d\\n", *q + 1);
printf("%d\\n", *q);
printf("%d\\n", (*q)++);
printf("%d\\n", x);`,expected:'6\n5\n5\n6',normalize:'trim-lines',explanation:'L\'opérateur `*` (unaire) a une priorité plus élevée que `+`, donc `*q + 1` est lu `(*q) + 1`, ce qui donne `5 + 1 = 6`.\n\n- `*q` affiche 5.\n- `(*q)++` applique la **post-incrémentation** à la valeur pointée : le `printf` affiche d\'abord 5, puis `x` est incrémenté à 6.\n- Le dernier `printf` affiche `x`, qui vaut maintenant 6.\n\nAttention à la différence : `(*q)++` incrémente la **valeur pointée**, tandis que `*q++` incrémenterait le **pointeur** lui-même.'},
{id:'ptr-008',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'malloc vs calloc',difficulty:3,statement:'Quelle est la différence principale entre `malloc(n * sizeof(int))` et `calloc(n, sizeof(int))` ?',multi:false,options:[{id:'a',text:'`calloc` est plus rapide que `malloc`'},{id:'b',text:'`calloc` initialise la mémoire allouée à 0, `malloc` non'},{id:'c',text:'`malloc` initialise la mémoire allouée à 0, `calloc` non'},{id:'d',text:'Aucune différence, les deux sont interchangeables'}],correct:['b'],explanation:'La fonction `calloc` met tous les octets du bloc alloué à **zéro**. La fonction `malloc`, en revanche, laisse la mémoire brute : son contenu est **aléatoire** (résidus de programmes précédents).\n\nSyntaxe :\n- `malloc(1 argument)` : la taille totale en octets.\n- `calloc(2 arguments)` : le nombre d\'éléments et la taille de chacun.\n\nSi vous avez besoin d\'un tableau rempli de zéros, `calloc` est plus pratique. Sinon, `malloc` est un peu plus rapide car il ne fait rien de plus que réserver.'},
{id:'ptr-009',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Soustraction pointeurs',difficulty:4,statement:'Qu\'affiche ce programme, sachant que `q1` et `q2` pointent tous deux dans le même tableau ?',code:`int tab[10] = {0,1,2,3,4,5,6,7,8,9};
int *q1 = &tab[2];
int *q2 = &tab[7];
printf("%ld\\n", q2 - q1);`,expected:'5',normalize:'trim',explanation:'La soustraction de deux pointeurs qui pointent dans le même tableau donne le **nombre d\'éléments** qui les séparent, et non le nombre d\'octets.\n\n- `q1` pointe sur `tab[2]` (indice 2).\n- `q2` pointe sur `tab[7]` (indice 7).\n- `q2 - q1` = 7 - 2 = **5 éléments**.\n\nLe compilateur C divise automatiquement l\'écart en octets (5 × 4 = 20) par la taille d\'un élément (4), ce qui donne 5. Attention : ce calcul n\'a de sens que si les deux pointeurs appartiennent au même tableau.'},
{id:'ptr-010',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Pointeur sur pointeur',difficulty:4,statement:'Qu\'affiche ce programme avec une chaîne de trois niveaux de pointeurs ?',code:`int x = 5;
int *q1 = &x;
int **q2 = &q1;
int ***q3 = &q2;
printf("%d\\n", *q1);
printf("%d\\n", **q2);
printf("%d\\n", ***q3);`,expected:'5\n5\n5',normalize:'trim-lines',explanation:'Chaque pointeur contient l\'adresse du niveau précédent : `q3` pointe sur `q2`, qui pointe sur `q1`, qui pointe sur `x`.\n\n- `q1` contient l\'adresse de `x`. `*q1` donne `x`, soit 5.\n- `q2` contient l\'adresse de `q1`. `**q2` équivaut à `*q1`, soit 5.\n- `q3` contient l\'adresse de `q2`. `***q3` équivaut à `**q2`, soit 5.\n\nCe mécanisme est utile pour modifier un pointeur depuis une fonction ou pour représenter un tableau dynamique 2D (`int **mat`).'},
{id:'ptr-011',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'realloc',difficulty:4,statement:'Complétez le programme qui agrandit un tableau de 100 à 130 entiers en préservant le contenu existant.',template:`int *tab = (int*) malloc(100 * sizeof(int));
if (!tab) exit(-1);
tab = (int*) {{1}}(tab, {{2}} * sizeof(int));
if (!tab) exit(-2);
{{3}}(tab);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','realloc','free'],correct:'realloc'},{id:'2',kind:'select',options:['100','130','30','230'],correct:'130'},{id:'3',kind:'select',options:['free','delete','clear','release'],correct:'free'}],explanation:'La fonction `realloc` redimensionne un bloc déjà alloué. Elle prend en **premier argument** le pointeur d\'origine et en **second argument** la nouvelle taille totale souhaitée.\n\n`realloc(tab, 130 * sizeof(int))` conserve les 100 premiers éléments et réserve 30 cases supplémentaires. Attention : l\'adresse retournée peut être différente de l\'adresse d\'origine, c\'est pourquoi il faut **réassigner** le résultat à `tab`.\n\nBonne pratique : vérifier que `realloc` n\'a pas échoué avant d\'utiliser le nouveau pointeur. Ne pas oublier de libérer avec `free` à la fin.'},
{id:'ptr-012',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Tableau 2D',difficulty:5,statement:'On suppose (adresses fictives) que `mat` commence à F800 et qu\'un `int` occupe 4 octets. Quelles adresses sont affichées ?',code:`int mat[3][4];
printf("%p\\n", (void*)mat);
printf("%p\\n", (void*)mat[1]);
printf("%p\\n", (void*)&mat[2][0]);`,expected:'F800\nF810\nF820',normalize:'trim-lines',explanation:'Une matrice en C est stockée **ligne par ligne** en mémoire, comme un long tableau unidimensionnel. Chaque ligne occupe `nombre_colonnes × sizeof(type)` octets.\n\n- `mat` désigne l\'adresse de la ligne 0, soit F800.\n- La ligne 1 commence après 4 entiers, soit 4 × 4 = 16 octets plus loin : F800 + 16 = **F810**.\n- La ligne 2 commence après 8 entiers : F800 + 32 = **F820**.\n\nÉquivalences utiles : `mat[i]` ≡ `*(mat + i)` ≡ `&mat[i][0]`.'},
{id:'ptr-013',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Dangling pointer',difficulty:5,statement:'Que se passe-t-il à l\'exécution de ce programme qui utilise un pointeur après avoir libéré la mémoire ?',code:`int *p = (int*) malloc(sizeof(int));
*p = 42;
free(p);
printf("%d\\n", *p);`,multi:false,options:[{id:'a',text:'Affiche toujours 42'},{id:'b',text:'Affiche toujours 0'},{id:'c',text:'Erreur de compilation'},{id:'d',text:'Comportement indéfini'}],correct:['d'],explanation:'Après un appel à `free(p)`, la mémoire pointée par `p` n\'appartient plus au programme. Le pointeur `p` continue pourtant à contenir cette adresse : c\'est ce qu\'on appelle un **dangling pointer** (pointeur fantôme).\n\nLire `*p` dans cet état produit un **comportement indéfini**. Selon le contexte, cela peut afficher 42, afficher 0, afficher une valeur corrompue, ou provoquer un plantage (segfault).\n\nBonne pratique : après `free(p)`, il faut immédiatement écrire `p = NULL;` pour éviter toute utilisation accidentelle.'},
{id:'ptr-014',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Comparaison pointeurs',difficulty:4,statement:'Qu\'affiche ce programme, sachant que `q1` et `q2` pointent dans le même tableau ?',code:`int tab[5] = {1, 2, 3, 4, 5};
int *q1 = &tab[1];
int *q2 = &tab[3];
if (q1 < q2) printf("q1 avant q2\\n");
printf("%ld\\n", q2 - q1);`,expected:'q1 avant q2\n2',normalize:'trim-lines',explanation:'Comparer deux pointeurs qui appartiennent au même tableau revient à comparer leurs **indices**. Ici, `q1` pointe sur l\'indice 1 et `q2` sur l\'indice 3, donc `q1 < q2` est vrai et le programme affiche `q1 avant q2`.\n\nLe calcul `q2 - q1` donne 3 - 1 = **2 éléments** d\'écart.\n\nLes opérateurs `<`, `>`, `<=`, `>=`, `==` et `!=` sont tous utilisables sur les pointeurs, à condition qu\'ils désignent des positions dans le même tableau.'},
{id:'ptr-015',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Les 4 formalismes',difficulty:5,statement:'Complétez les quatre façons d\'écrire le même parcours de tableau, telles que présentées dans le cours.',template:`int tab[5] = {10, 20, 30, 40, 50};
int *q = tab;
for (int i = 0; i < 5; i++)
    printf("%d ", tab[i]);
for (int i = 0; i < 5; i++)
    printf("%d ", *{{1}});
for (int i = 0; i < 5; i++)
    printf("%d ", *{{2}});
for (q = tab; q < tab + 5; {{3}})
    printf("%d ", *q);`,blanks:[{id:'1',kind:'select',options:['(tab + i)','(tab + 1)','tab + i','tab'],correct:'(tab + i)'},{id:'2',kind:'select',options:['(q + i)','(q + 1)','q + i','q'],correct:'(q + i)'},{id:'3',kind:'select',options:['q++','i++','++q','q += 4'],correct:'q++',accept:['++q']}],explanation:'Le cours présente quatre formalismes équivalents pour parcourir un tableau :\n\n| Version | Écriture | Remarque |\n|---|---|---|\n| V1 | `tab[i]` | Notation classique, très lisible |\n| V2 | `*(tab + i)` | Pointeur constant, tab ne change pas |\n| V3 | `*(q + i)` | Pointeur `q` fixe |\n| V4 | `*q` puis `q++` | Pointeur qui avance |\n\nLa version 4 est souvent la plus efficace car elle évite l\'addition `+ i` à chaque tour. Attention : dans cette version, `q` est modifié et on perd l\'adresse de départ. `++q` est également accepté car dans une boucle `for`, le résultat de l\'expression est ignoré.'},
{id:'ptr-016',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Adresse vs contenu',difficulty:3,statement:'Soit `int x = 5; int *q = &x;`. Que contient la variable `q` ?',multi:false,options:[{id:'a',text:'La valeur de `x`, soit 5'},{id:'b',text:'L\'adresse mémoire de `x`'},{id:'c',text:'L\'adresse mémoire de `q`'},{id:'d',text:'La valeur `NULL`'}],correct:['b'],explanation:'Un pointeur stocke une **adresse mémoire**, et non une valeur. Après l\'instruction `q = &x`, la variable `q` contient l\'adresse où se trouve `x` en mémoire.\n\nPour distinguer les trois cas de figure :\n- `x` : la valeur de la variable, soit 5.\n- `&x` : l\'adresse de `x`.\n- `q` : l\'adresse de `x`, car elle a été copiée dedans.\n- `&q` : l\'adresse de `q` elle-même (différente).\n- `*q` : le contenu pointé, c\'est-à-dire la valeur de `x`, soit 5.'},
{id:'ptr-017',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'q1 = q2',difficulty:4,statement:'Qu\'affiche ce programme ? Observez l\'effet de la réaffectation d\'un pointeur.',code:`int a = 10, b = 20;
int *q1 = &a, *q2 = &b;
q1 = q2;
*q1 = 99;
printf("%d %d\\n", a, b);`,expected:'10 99',normalize:'trim',explanation:'L\'instruction `q1 = q2` **copie l\'adresse** contenue dans `q2` vers `q1`. Après cette opération, `q1` et `q2` pointent tous les deux sur la variable `b`.\n\nLa variable `a` n\'est donc plus accessible via `q1`. Ensuite, `*q1 = 99` modifie la valeur pointée, c\'est-à-dire `b`, qui passe de 20 à 99.\n\nLa variable `a` reste inchangée à 10. Le programme affiche donc `10 99`.'},
{id:'ptr-018',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Matrice dynamique',difficulty:5,statement:'Qu\'affiche ce programme qui alloue une matrice dynamique 2×3 et la remplit ?',code:`int **t = (int**) malloc(2 * sizeof(int*));
for (int i = 0; i < 2; i++) *(t + i) = (int*) malloc(3 * sizeof(int));
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        *(*(t + i) + j) = i * 10 + j;
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        printf("%d ", *(*(t + i) + j));`,expected:'0 1 2 10 11 12 ',normalize:'trim',explanation:'La matrice est allouée en **deux temps** :\n\n1. `t` est un tableau dynamique de 2 pointeurs (`malloc(2 * sizeof(int*))`).\n2. Chaque ligne est ensuite allouée séparément avec `malloc(3 * sizeof(int))`.\n\nL\'expression `*(*(t + i) + j)` est une notation pointeur équivalente à `t[i][j]`. Le remplissage attribue à chaque case la valeur `i * 10 + j`, ce qui donne :\n- Ligne 0 : 0, 1, 2\n- Ligne 1 : 10, 11, 12\n\nL\'affichage restitue ces six valeurs dans l\'ordre.'},
{id:'ptr-019',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Adresse invalide',difficulty:3,statement:'Que produit l\'expression `&5` où l\'on tente de prendre l\'adresse d\'une constante littérale ?',multi:false,options:[{id:'a',text:'Une adresse valide'},{id:'b',text:'Erreur de compilation'},{id:'c',text:'La valeur 0'},{id:'d',text:'NULL'}],correct:['b'],explanation:'L\'opérateur `&` (adresse de) ne s\'applique qu\'à des **objets stockés en mémoire** : variables, éléments de tableau, champs de structure. Une constante littérale comme `5` n\'a pas d\'emplacement mémoire stable : elle peut vivre dans un registre du processeur ou être intégrée directement dans l\'instruction machine.\n\nLe compilateur refuse donc `&5` avec une erreur du type `lvalue required as unary \'&\' operand`.\n\nMême chose pour `&(x + 1)` ou `&(a * b)` : ces expressions n\'ont pas d\'adresse fixe.'},
{id:'ptr-020',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Pointeur NULL',difficulty:3,statement:'Qu\'affiche ce programme qui teste si un pointeur est nul ?',code:`int *q = NULL;
if (q) printf("Non nul\\n");
else printf("Nul\\n");
if (q == NULL) printf("Est NULL\\n");`,expected:'Nul\nEst NULL',normalize:'trim-lines',explanation:'La constante `NULL` représente un pointeur **nul**, c\'est-à-dire qui ne pointe sur rien. Sa valeur numérique est 0.\n\nDans un test logique, un pointeur nul est considéré comme **faux** et un pointeur non nul comme **vrai**.\n\n- `if (q)` teste si `q` est non nul. Comme il est nul, la branche `else` s\'exécute et affiche `Nul`.\n- `if (q == NULL)` teste explicitement l\'égalité avec `NULL`, ce qui est vrai → affiche `Est NULL`.\n\nBonne pratique : toujours initialiser un pointeur à `NULL` quand il ne pointe sur rien, et le remettre à `NULL` après un `free`.'},
{id:'ptr-021',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Pointeur et fonction',difficulty:5,statement:'Complétez la fonction `echange` qui permute les valeurs de deux entiers via leurs adresses.',template:`void echange(int *a, int *b) {
    int tmp = {{1}};
    *a = {{2}};
    *b = {{3}};
}
int main() {
    int x = 5, y = 10;
    echange({{4}}, {{5}});
}`,blanks:[{id:'1',kind:'select',options:['*a','a','&a','*b'],correct:'*a'},{id:'2',kind:'select',options:['*a','a','*b','b'],correct:'*b'},{id:'3',kind:'select',options:['*a','a','tmp','&tmp'],correct:'tmp'},{id:'4',kind:'select',options:['&x','x','*x','&(x)'],correct:'&x'},{id:'5',kind:'select',options:['&y','y','*y','&(y)'],correct:'&y'}],explanation:'En C, les paramètres d\'une fonction sont passés **par valeur** : la fonction reçoit des copies. Pour modifier les variables originales, il faut passer leurs **adresses** grâce à l\'opérateur `&`.\n\nLa fonction `echange` reçoit deux pointeurs `a` et `b`. La permutation utilise un temporaire `tmp` :\n```\nint tmp = *a;  // sauvegarde la valeur pointée par a\n*a = *b;       // copie la valeur pointée par b dans a\n*b = tmp;      // restaure la valeur sauvegardée dans b\n```\n\nL\'appel `echange(&x, &y)` transmet les adresses des variables à permuter.'},
{id:'ptr-022',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'sizeof pointeur',difficulty:3,statement:'Sur une architecture 64-bit, qu\'affiche ce programme qui mesure la taille de trois pointeurs de types différents ?',code:`int *p; char *q; double *r;
printf("%zu\\n", sizeof(p));
printf("%zu\\n", sizeof(q));
printf("%zu\\n", sizeof(r));`,expected:'8\n8\n8',normalize:'trim-lines',explanation:'**Tous les pointeurs ont la même taille**, quel que soit le type pointé. Un pointeur n\'est qu\'une adresse mémoire, et toutes les adresses ont la même taille sur une architecture donnée.\n\nSur une architecture **64-bit**, un pointeur occupe 8 octets. Sur une architecture 32-bit, il en occupe 4.\n\nIl ne faut pas confondre :\n- `sizeof(p)` = 8 (la taille du **pointeur**).\n- `sizeof(*p)` = 4 (la taille de l\'`int` pointé).'}, 
{id:'ptr-023',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Oublier free',difficulty:3,statement:'Que se passe-t-il si on oublie d\'appeler `free` sur un bloc alloué par `malloc` ?',multi:false,options:[{id:'a',text:'Erreur de compilation'},{id:'b',text:'Erreur immédiate à l\'exécution'},{id:'c',text:'Fuite mémoire : le bloc reste occupé jusqu\'à la fin du programme'},{id:'d',text:'Aucune conséquence, free est facultatif'}],correct:['c'],explanation:'Quand on ne libère pas un bloc alloué par `malloc`, ce bloc reste occupé jusqu\'à la **fin du programme** — même si on n\'y accède plus jamais. C\'est ce qu\'on appelle une **fuite mémoire**.\n\nSur un programme court, la fuite est invisible. Sur un programme long — un serveur, une boucle infinie — la mémoire s\'accumule et finit par saturer le système, ce qui provoque un échec de `malloc` ou un plantage.\n\nBonne règle : **chaque `malloc` doit avoir son `free` correspondant**. Pensez « qui alloue libère ».'},
{id:'ptr-024',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Équivalence',difficulty:4,statement:'Qu\'affiche ce programme qui utilise quatre notations différentes pour accéder au même tableau ?',code:`int tab[3] = {10, 20, 30};
int *q = tab;
printf("%d\\n", *q);
printf("%d\\n", *(q + 1));
printf("%d\\n", *(q + 2));
printf("%d\\n", q[1]);`,expected:'10\n20\n30\n20',normalize:'trim-lines',explanation:'En C, `q[i]` et `*(q + i)` sont **strictement équivalents**, même pour un pointeur. Le compilateur traduit automatiquement l\'un en l\'autre.\n\n- `*q` équivaut à `q[0]`, soit 10.\n- `*(q + 1)` équivaut à `q[1]`, soit 20.\n- `*(q + 2)` équivaut à `q[2]`, soit 30.\n- `q[1]` affiche 20, comme la deuxième ligne.\n\nCette équivalence fonctionne dans les deux sens : `tab[i]` peut aussi s\'écrire `*(tab + i)`.'},
{id:'ptr-025',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Libération matrice',difficulty:5,statement:'Complétez le programme qui libère correctement une matrice dynamique 3×4.',template:`int l = 3, c = 4;
int **t = (int**) malloc(l * sizeof(int*));
for (int i = 0; i < l; i++)
    *(t + i) = (int*) malloc(c * sizeof(int));

for (int i = 0; i < l; i++) {
    {{1}}(*(t + i));
}
{{2}}(t);
t = {{3}};`,blanks:[{id:'1',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'2',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'3',kind:'select',options:['NULL','0','malloc(0)','(int**)0'],correct:'NULL'}],explanation:'La libération d\'une matrice dynamique se fait dans l\'**ordre inverse** de l\'allocation :\n\n1. D\'abord libérer chaque ligne avec `free(*(t + i))`.\n2. Puis libérer le tableau de pointeurs avec `free(t)`.\n\nSi on libère `t` en premier, on perd les adresses des lignes et on ne peut plus les libérer → fuite mémoire garantie.\n\nBonne pratique : remettre `t = NULL;` après la libération pour éviter les dangling pointers.'},
{id:'ptr-026',type:'trace',chapter:'Chapitre 4 — Pointeurs',title:'[Série 4] Trace A/B/C/P1/P2',difficulty:5,statement:'Remplissez le tableau en traçant l\'évolution des variables `A`, `B`, `C`, `*P1` et `*P2` après chaque instruction.',code:`int A = 1, B = 2, C = 3;
int *P1, *P2;
P1 = &A;
P2 = &C;
*P1 = (*P2)++;
P1 = P2;`,columns:['Étape','A','B','C','*P1','*P2'],rows:[['Initial','1','2','3','—','—'],['P1 = &A','1','2','3','1','—'],['P2 = &C','1','2','3','1','3'],['*P1 = (*P2)++','3','2','4','3','4'],['P1 = P2','3','2','4','4','4']],normalize:'trim',explanation:'Déroulons chaque étape :\n\n- **Initial** : `A = 1`, `B = 2`, `C = 3`.\n- **`P1 = &A`** : `P1` pointe sur A. `*P1` vaut 1.\n- **`P2 = &C`** : `P2` pointe sur C. `*P2` vaut 3.\n- **`*P1 = (*P2)++`** : l\'expression `(*P2)++` renvoie la valeur 3 puis incrémente C à 4. Cette valeur 3 est affectée à `*P1`, donc à A. A vaut 3, C vaut 4.\n- **`P1 = P2`** : `P1` pointe maintenant sur C, comme `P2`. `*P1` et `*P2` valent donc 4.\n\nCette trace illustre l\'ordre d\'évaluation de la post-incrémentation et le fait qu\'une affectation de pointeur copie l\'adresse.'},
{id:'ptr-027',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'[Série 4] Copie de tableaux',difficulty:4,statement:'Complétez le programme qui copie deux tableaux dynamiques `tab1` et `tab2` à la suite dans un troisième tableau `tab3` de taille `2n`.',template:`int *tab1 = (int*) malloc(n * sizeof(int));
int *tab2 = (int*) malloc(n * sizeof(int));
int *tab3 = (int*) malloc(2 * n * sizeof(int));
for (int i = 0; i < n; i++) tab3[i] = tab1[i];
for (int i = 0; i < n; i++) tab3[{{1}}] = tab2[i];`,blanks:[{id:'1',kind:'select',options:['i','n + i','2 * i','i + n - 1'],correct:'n + i'}],explanation:'Le tableau `tab3` a une capacité de `2n`. Les `n` premières cases reçoivent le contenu de `tab1`, puis les `n` suivantes celui de `tab2`.\n\nPour la seconde copie, il faut donc écrire à partir de l\'indice `n` et non 0. L\'indice de destination est `n + i` où `i` varie de 0 à `n - 1`.\n\nAinsi, `tab2[0]` va en `tab3[n]`, `tab2[1]` en `tab3[n+1]`, etc.'},
{id:'ptr-028',type:'findbug',chapter:'Chapitre 4 — Pointeurs',title:'[Bug] malloc sans sizeof',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui alloue un tableau de 10 entiers.',code:`int main() {
    int n = 10;
    int *tab;
    tab = (int*) malloc(n);
    if (!tab) return 1;
    for (int i = 0; i < n; i++)
        tab[i] = i;
    free(tab);
    return 0;
}`,bugLines:[4],explanation:'La ligne 4 appelle `malloc(n)` avec un seul argument, ce qui réserve **n octets** au lieu de `n × sizeof(int)` octets. Ici, cela réserve 10 octets, soit à peine 2 ou 3 entiers sur une architecture 32-bit, alors qu\'on en attend 10.\n\nÉcrire dans `tab[i]` pour `i` supérieur à 2 va donc déborder du bloc alloué et corrompre la mémoire voisine. C\'est un cas classique de **débordement de tampon**.\n\nLa ligne correcte est : `tab = (int*) malloc(n * sizeof(int));`.'},
{id:'ptr-029',type:'findbug',chapter:'Chapitre 4 — Pointeurs',title:'[Bug] Pointeur non initialisé',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui tente d\'écrire dans une variable via un pointeur.',code:`int main() {
    int *p;
    *p = 42;
    printf("%d\\n", *p);
    return 0;
}`,bugLines:[3],explanation:'La ligne 3 tente d\'écrire 42 à l\'adresse contenue dans `p`. Mais `p` n\'a **jamais été initialisé** : il contient une valeur aléatoire héritée de la pile. Écrire à cette adresse revient à écrire n\'importe où en mémoire.\n\nCela produit un **comportement indéfini** : le programme peut planter immédiatement (segfault), corrompre des données, ou — plus rarement — sembler fonctionner.\n\nAvant d\'utiliser un pointeur, il faut soit l\'initialiser avec l\'adresse d\'une variable existante (`p = &x;`), soit allouer de la mémoire (`p = malloc(sizeof(int));`).'},
{id:'ptr-030',type:'findbug',chapter:'Chapitre 4 — Pointeurs',title:'[Bug] Oubli de & dans scanf',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui lit un entier et l\'affiche.',code:`int main() {
    int x;
    int *p = &x;
    scanf("%d", x);
    printf("%d\\n", x);
    return 0;
}`,bugLines:[4],explanation:'La ligne 4 appelle `scanf` en lui passant `x` au lieu d\'une adresse. Or, `scanf` a besoin d\'une **adresse** pour pouvoir écrire la valeur lue. `x` contient une valeur indéterminée (non initialisée), que `scanf` va interpréter comme une adresse et essayer d\'écrire à cet emplacement.\n\nCela provoque une **corruption mémoire** ou une **erreur de segmentation**.\n\nLes deux écritures correctes sont : `scanf("%d", &x);` ou `scanf("%d", p);` — car `p` contient déjà l\'adresse de `x`.'},
{id:'ptr-031',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'[Variante] q avance de 2',difficulty:4,statement:'On suppose (adresses fictives) que `int = 4` et `tab[0] = F800`. Quelles adresses sont affichées ?',code:`int tab[10];
int *q = tab + 2;
printf("%p\\n", (void*)q);
printf("%p\\n", (void*)(q + 2));`,expected:'F808\nF810',normalize:'trim-lines',explanation:'L\'arithmétique typée ajoute `n × sizeof(int)` octets à l\'adresse de base.\n\n- `q = tab + 2` : on avance de 2 éléments depuis F800, soit 2 × 4 = 8 octets, ce qui donne F808.\n- `q + 2` : on avance encore de 2 éléments depuis F808, soit 8 octets, ce qui donne F810.\n\nL\'opérateur `+` sur un pointeur ne modifie pas le pointeur lui-même : `q` reste égal à F808 après l\'opération.'},
{id:'ptr-032',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'[Variante] Deux pointeurs',difficulty:4,statement:'Qu\'affiche ce programme, sachant que `p` pointe sur le premier élément et `q` sur le dernier ?',code:`int tab[5] = {1, 2, 3, 4, 5};
int *p = &tab[0];
int *q = &tab[4];
printf("%ld\\n", q - p);
printf("%d\\n", *p);
printf("%d\\n", *q);`,expected:'4\n1\n5',normalize:'trim-lines',explanation:'La soustraction de deux pointeurs donne le **nombre d\'éléments** entre eux, pas la distance en octets. Ici :\n\n- `p` pointe sur l\'indice 0.\n- `q` pointe sur l\'indice 4.\n- `q - p = 4 - 0 = 4` éléments d\'écart.\n\nEnsuite, `*p` et `*q` affichent les valeurs pointées : `1` et `5`. Le programme affiche donc `4`, `1` et `5` sur trois lignes.'},
{id:'ptr-033',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Après *q = 42',difficulty:3,statement:'Remplissez l\'état final des variables `x` et `q` après l\'exécution de ce programme.',code:`int x = 5;
int *q = &x;
*q = 42;`,memory:[{name:'x',type:'int',address:'F802',expected:'42'},{name:'q',type:'int*',address:'F400',expected:'F802'}],explanation:'- `x` est initialisée à 5 et occupe l\'adresse F802.\n- `q = &x` place l\'adresse F802 dans le pointeur. `q` contient donc F802.\n- `*q = 42` écrit 42 à l\'adresse pointée par `q`, c\'est-à-dire à F802, donc dans `x`.\n\nÉtat final : `x = 42` et `q = F802`.\n\nLe pointeur `q` n\'a pas changé de valeur : c\'est la case mémoire qu\'il désigne qui a été modifiée.'},
{id:'ptr-034',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Arithmétique typée',difficulty:4,statement:'Remplissez l\'état final des variables après ce programme, sachant qu\'un `int` occupe 4 octets et que `&tab[0] = F800`.',code:`int tab[4] = {10, 20, 30, 40};
int *q = tab;
q++;
q++;`,memory:[{name:'tab[0]',type:'int',address:'F800',expected:'10'},{name:'tab[1]',type:'int',address:'F804',expected:'20'},{name:'tab[2]',type:'int',address:'F808',expected:'30'},{name:'tab[3]',type:'int',address:'F80C',expected:'40'},{name:'q',type:'int*',address:'F400',expected:'F808'}],explanation:'Les valeurs du tableau `tab` ne changent pas : elles sont simplement lues par le programme.\n\n- `q = tab` : le pointeur pointe sur F800.\n- Premier `q++` : avance de 4 octets, donc à F804.\n- Deuxième `q++` : avance encore de 4 octets, donc à F808.\n\nÉtat final : `q` contient F808, l\'adresse de `tab[2]`.'},
{id:'ptr-035',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Deux pointeurs sur même case',difficulty:4,statement:'Remplissez l\'état final après ce programme qui fait pointer deux pointeurs vers la même variable.',code:`int a = 10, b = 20;
int *q1 = &a;
int *q2 = &b;
q1 = q2;
*q1 = 99;`,memory:[{name:'a',type:'int',address:'F100',expected:'10'},{name:'b',type:'int',address:'F104',expected:'99'},{name:'q1',type:'int*',address:'F400',expected:'F104'},{name:'q2',type:'int*',address:'F404',expected:'F104'}],explanation:'Étapes du raisonnement :\n\n- `q1 = &a` : `q1` pointe sur `a` (F100).\n- `q2 = &b` : `q2` pointe sur `b` (F104).\n- `q1 = q2` : **copie de l\'adresse**. Maintenant `q1` pointe aussi sur `b`.\n- `*q1 = 99` : modifie la valeur pointée par `q1`, donc `b`, qui passe de 20 à 99.\n\nLa variable `a` reste inchangée à 10. Les deux pointeurs contiennent F104.'},
{id:'ptr-036',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Tableau via pointeur',difficulty:4,statement:'Remplissez l\'état final du tableau et du pointeur après ce programme, sachant qu\'un `int` occupe 4 octets et que `&tab[0] = F800`.',code:`int tab[3];
int *q = tab;
q[0] = 5;
*(q + 1) = 10;
tab[2] = 15;`,memory:[{name:'tab[0]',type:'int',address:'F800',expected:'5'},{name:'tab[1]',type:'int',address:'F804',expected:'10'},{name:'tab[2]',type:'int',address:'F808',expected:'15'},{name:'q',type:'int*',address:'F400',expected:'F800'}],explanation:'Les trois notations `q[0]`, `*(q + 1)` et `tab[2]` désignent la même case mémoire que `tab[0]`, `tab[1]` et `tab[2]`.\n\n- `q[0] = 5` équivaut à `tab[0] = 5`.\n- `*(q + 1) = 10` équivaut à `tab[1] = 10`.\n- `tab[2] = 15` écrit directement dans `tab[2]`.\n\nLe pointeur `q` n\'a pas bougé : il contient toujours F800.'},

{id:'struct-001',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Accès via pointeur',difficulty:2,statement:'Soit `ETUDIANT etd;` et `ETUDIANT *e = &etd;`. Quelle expression est **équivalente** à `e->ce` ?',multi:false,options:[{id:'a',text:'`*e.ce`'},{id:'b',text:'`(*e).ce`'},{id:'c',text:'`&e.ce`'},{id:'d',text:'`e.ce`'}],correct:['b'],explanation:'L\'opérateur `->` est une **notation raccourcie** qui combine deux opérations : `(*e).ce` déréférence le pointeur `e` pour obtenir la structure, puis accède au champ `ce`.\n\nL\'expression `*e.ce` est **fausse** : l\'opérateur `.` est prioritaire sur `*`, donc le compilateur lit `*(e.ce)`. Or, `e` est un pointeur, pas une structure : `e.ce` n\'existe pas.\n\nC\'est pour éviter cette erreur que l\'opérateur `->` a été créé. Il s\'applique directement à un pointeur sur structure.'},
{id:'struct-002',type:'predict',chapter:'Chapitre 5 — Structures',title:'Précédence -> et &',difficulty:4,statement:'On suppose (adresses fictives) que `etd` est rangée à l\'adresse F100 et que `int` et `float` font 4 octets, sans alignement. Quelles adresses sont affichées ?',code:`typedef struct { int ce; float notes[3]; float moyenne; } ETUDIANT;

ETUDIANT etd;
ETUDIANT *e = &etd;
printf("%p\\n", (void*)&e->ce);
printf("%p\\n", (void*)&e->notes);
printf("%p\\n", (void*)&(e->ce));`,expected:'F100\nF104\nF100',normalize:'trim-lines',explanation:'L\'opérateur `->` a une priorité plus élevée que `&`. Donc `&e->ce` se lit `&(e->ce)` : on accède au champ, puis on prend son adresse.\n\n- Le champ `ce` est le **premier** de la structure, il commence à F100.\n- Le champ `notes` suit immédiatement `ce` (qui occupe 4 octets) : il commence à F100 + 4 = **F104**.\n- La troisième ligne répète la première expression, elle affiche donc la même adresse F100.'},
{id:'struct-003',type:'predict',chapter:'Chapitre 5 — Structures',title:'Imbrication',difficulty:4,statement:'Qu\'affiche ce programme qui manipule une structure `ETUDIANT` contenant elle-même une structure `DATE` ?',code:`typedef struct { int jour, mois, annee; } DATE;
typedef struct { int ce; DATE date_naiss; float moyenne; } ETUDIANT;
ETUDIANT etd;
etd.ce = 999;
etd.date_naiss.jour = 12;
etd.date_naiss.mois = 10;
etd.date_naiss.annee = 1993;
printf("%d\\n", etd.ce);
printf("%d/%d/%d\\n", etd.date_naiss.jour, etd.date_naiss.mois, etd.date_naiss.annee);`,expected:'999\n12/10/1993',normalize:'trim-lines',explanation:'L\'accès à un champ de structure imbriquée se fait en **chaînant les `.`** : chaque niveau de la hiérarchie ajoute un point.\n\n- `etd.ce` accède directement au champ `ce`.\n- `etd.date_naiss` désigne la sous-structure `DATE`.\n- `etd.date_naiss.jour` accède au champ `jour` **à l\'intérieur** de cette sous-structure.\n\nLe programme affiche donc `999` puis la date `12/10/1993`.'},
{id:'struct-004',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Saisie via pointeur',difficulty:4,statement:'Complétez la saisie des champs via le pointeur `e` sur une structure `ETUDIANT`.',template:`typedef struct { int jour, mois, annee; } DATE;
typedef struct { int ce; DATE date_naiss; float moyenne; } ETUDIANT;

ETUDIANT etd;
ETUDIANT *e = &etd;
scanf("%d", {{1}});
scanf("%d%d%d", {{2}}, {{3}}, {{4}});`,blanks:[{id:'1',kind:'select',options:['&e->ce','&e.ce','e->ce','&(*e).ce'],correct:'&e->ce'},{id:'2',kind:'select',options:['&e->date_naiss.jour','&e.date_naiss.jour','e->date_naiss.jour','&e.date_naiss->jour'],correct:'&e->date_naiss.jour'},{id:'3',kind:'select',options:['&e->date_naiss.mois','&e.date_naiss.mois','e->date_naiss.mois','&e.date_naiss->mois'],correct:'&e->date_naiss.mois'},{id:'4',kind:'select',options:['&e->date_naiss.annee','&e.date_naiss.annee','e->date_naiss.annee','&e.date_naiss->annee'],correct:'&e->date_naiss.annee'}],explanation:'La fonction `scanf` a besoin d\'une **adresse** pour écrire la valeur lue. Comme `e` est un pointeur sur structure, on accède aux champs avec `->`, puis on prend leur adresse avec `&`.\n\n- Pour un champ direct : `&e->ce`, équivalent à `&(e->ce)`.\n- Pour un champ imbriqué : `&e->date_naiss.jour`, équivalent à `&((*e).date_naiss.jour)`.\n\nAttention aux pièges : `&e.ce` est invalide car `e` est un pointeur et `e.ce` n\'existe pas. `e->ce` sans `&` passe la valeur, ce que `scanf` ne peut pas utiliser.'},
{id:'struct-005',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Affectation structures',difficulty:3,statement:'Soient `ETUDIANT etd, et;`. Que fait exactement l\'instruction `etd = et;` ?',multi:false,options:[{id:'a',text:'C\'est illégal en C'},{id:'b',text:'Elle copie uniquement le premier champ'},{id:'c',text:'Elle copie **tous les champs** (copie membre à membre)'},{id:'d',text:'Elle fait pointer `etd` sur `et`'}],correct:['c'],explanation:'Contrairement aux tableaux, les structures peuvent être copiées **en bloc** par une simple affectation. Le C effectue une copie **membre à membre** de tous les champs.\n\nAprès `etd = et;`, les deux variables sont **totalement indépendantes** : modifier l\'une ne change pas l\'autre.\n\nConditions :\n- Les deux variables doivent être du **même type** (même modèle `struct`).\n- Une affectation entre deux types différents est rejetée par le compilateur, même si les champs sont identiques.'},
{id:'struct-006',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau pointeurs',difficulty:5,statement:'Quelles valeurs sont affichées par ce programme qui utilise un tableau de pointeurs sur structures ?',code:`typedef struct { int ce; float moyenne; } ETUDIANT;

ETUDIANT *tab[2];
tab[0] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[1] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[0]->ce = 999;
tab[1]->ce = 888;
printf("%d\\n", tab[0]->ce);
printf("%d\\n", (*(tab + 1))->ce);
printf("%d\\n", tab[1]->ce);`,expected:'999\n888\n888',normalize:'trim-lines',explanation:'Trois notations différentes désignent les mêmes cases :\n\n- `tab[0]->ce` : notation tableau classique. Affiche 999.\n- `(*(tab + 1))->ce` : notation pointeur. `tab + 1` = adresse de la case 1, `*(tab + 1)` = contenu de cette case (le pointeur `tab[1]`), `->ce` accède au champ. Affiche 888.\n- `tab[1]->ce` : notation tableau à l\'indice 1. Affiche 888.\n\nLes parenthèses dans `(*(tab + 1))->ce` sont **obligatoires** car `->` est prioritaire sur `*`.'},
{id:'struct-007',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Tableau dyn. pointeurs',difficulty:5,statement:'Complétez le programme qui alloue un tableau dynamique de `n` pointeurs sur `ETUDIANT`, puis libère la mémoire.',template:`typedef struct { int ce; float moyenne; } ETUDIANT;

int n;
ETUDIANT **tab;
scanf("%d", &n);
tab = (ETUDIANT**) {{1}}(n * {{2}}(ETUDIANT*));
if (!tab) exit(-1);
for (int i = 0; i < n; i++) {
    *(tab + i) = (ETUDIANT*) {{3}}({{4}}(ETUDIANT));
    if (!*(tab + i)) exit(-2);
}
for (int i = 0; i < n; i++) {{5}}(*(tab + i));
{{6}}(tab);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','sizeof'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['malloc','calloc','free','sizeof'],correct:'malloc'},{id:'4',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'5',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'6',kind:'select',options:['free','malloc','delete','clear'],correct:'free'}],explanation:'L\'allocation se fait en **deux temps** :\n\n1. **Tableau de pointeurs** : `malloc(n * sizeof(ETUDIANT*))` réserve `n` cases, chacune contenant un pointeur.\n2. **Chaque étudiant** : `malloc(sizeof(ETUDIANT))` réserve la place d\'une structure complète, et son adresse est rangée dans la case correspondante.\n\nLa libération se fait dans l\'**ordre inverse** : d\'abord les `n` étudiants, puis le tableau de pointeurs. Si on libère le tableau avant les étudiants, on perd les adresses et on ne peut plus les libérer.'},
{id:'struct-008',type:'mcq',chapter:'Chapitre 5 — Structures',title:'4 formes tableaux',difficulty:4,statement:'Parmi les quatre déclarations suivantes, laquelle correspond à un **tableau dynamique d\'adresses d\'étudiants** ?',multi:false,options:[{id:'a',text:'`ETUDIANT tab[2];`'},{id:'b',text:'`ETUDIANT *tab;`'},{id:'c',text:'`ETUDIANT *tab[2];`'},{id:'d',text:'`ETUDIANT **tab;`'}],correct:['d'],explanation:'Le cours récapitule quatre formes de tableaux d\'étudiants :\n\n| Déclaration | Type |\n|---|---|\n| `ETUDIANT tab[2];` | Tableau **statique** de structures |\n| `ETUDIANT *tab;` | Tableau **dynamique** de structures |\n| `ETUDIANT *tab[2];` | Tableau **statique** d\'adresses |\n| `ETUDIANT **tab;` | Tableau **dynamique** d\'adresses |\n\nLa double étoile `**` indique un pointeur vers un pointeur, ce qui permet d\'allouer dynamiquement un tableau de pointeurs.'},
{id:'struct-009',type:'predict',chapter:'Chapitre 5 — Structures',title:'Champ tableau statique',difficulty:4,statement:'Qu\'affiche ce programme où la structure contient un tableau statique de notes ?',code:`typedef struct { int ce; float notes[3]; float moyenne; } ETUDIANT;

ETUDIANT etd;
etd.ce = 999;
etd.notes[0] = 14.5;
etd.notes[1] = 15.5;
etd.notes[2] = 16.5;
for (int i = 0; i < 3; i++) printf("%.1f ", etd.notes[i]);`,expected:'14.5 15.5 16.5 ',normalize:'trim',explanation:'Un champ de structure peut être un **tableau statique**. L\'accès se fait en combinant l\'opérateur `.` (accès au champ) et l\'opérateur `[]` (accès à l\'indice) : `etd.notes[i]`.\n\nCette notation est équivalente à `*(etd.notes + i)` ou à `*(&etd.notes[i])`.\n\nLe programme affecte successivement 14.5, 15.5 et 16.5 aux trois cases, puis les affiche avec une décimale : `14.5 15.5 16.5 `.'},
{id:'struct-010',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Champ tableau dynamique',difficulty:5,statement:'Complétez le programme qui alloue dynamiquement le champ `notes` d\'un étudiant, en fonction de son nombre de notes.',template:`typedef struct { int ce; int nb_notes; float *notes; float moyenne; } ETUDIANT;

ETUDIANT etd;
scanf("%d", &etd.nb_notes);
etd.notes = (float*) {{1}}(etd.nb_notes * {{2}}(float));
if (!etd.notes) exit(-1);
for (int i = 0; i < etd.nb_notes; i++)
    scanf("%f", {{3}});
{{4}}(etd.notes);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','realloc'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['&etd.notes[i]','etd.notes[i]','&etd->notes[i]','etd.notes+i'],correct:'&etd.notes[i]'},{id:'4',kind:'select',options:['free','malloc','delete','clear'],correct:'free'}],explanation:'Quand un champ de structure est un **pointeur** (ici `float *notes`), il faut lui allouer de la mémoire séparément :\n\n1. `etd.notes = malloc(etd.nb_notes * sizeof(float));` réserve la place pour les notes.\n2. `&etd.notes[i]` passe l\'adresse de chaque case à `scanf`.\n3. `free(etd.notes)` libère la mémoire à la fin.\n\nLe champ `notes` n\'est pas un tableau embarqué dans la structure, c\'est un pointeur vers un bloc séparé.'},
{id:'struct-011',type:'predict',chapter:'Chapitre 5 — Structures',title:'Pointeur + allocation',difficulty:5,statement:'Qu\'affiche ce programme qui alloue dynamiquement une structure `ETUDIANT`, la remplit, puis la libère ?',code:`typedef struct { int ce; float moyenne; } ETUDIANT;

ETUDIANT *e = (ETUDIANT*) malloc(sizeof(ETUDIANT));
e->ce = 999;
e->moyenne = 17.32;
printf("%d %.2f\\n", e->ce, e->moyenne);
free(e);
e = NULL;
printf("%s\\n", e == NULL ? "Libéré" : "Non nul");`,expected:'999 17.32\nLibéré',normalize:'trim-lines',explanation:'Ce programme illustre le cycle **allocation → utilisation → libération** :\n\n1. `malloc(sizeof(ETUDIANT))` réserve la place d\'une structure entière et renvoie son adresse.\n2. `e->ce` et `e->moyenne` accèdent aux champs via le pointeur.\n3. `free(e)` libère le bloc.\n4. `e = NULL` remet le pointeur à zéro pour éviter un dangling pointer.\n\nLe test `e == NULL ? "Libéré" : "Non nul"` affiche `Libéré`. Le programme affiche donc `999 17.32` puis `Libéré`.'},
{id:'struct-012',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau statique structures',difficulty:4,statement:'Qu\'affiche ce programme qui remplit un tableau statique de trois structures `ETUDIANT` ?',code:`typedef struct { int ce; float moyenne; } ETUDIANT;

ETUDIANT tab[3];
for (int i = 0; i < 3; i++) {
    tab[i].ce = 100 + i;
    tab[i].moyenne = 10.0 + i;
}
for (int i = 0; i < 3; i++) printf("%d %.1f\\n", tab[i].ce, tab[i].moyenne);`,expected:'100 10.0\n101 11.0\n102 12.0',normalize:'trim-lines',explanation:'Le programme remplit un tableau statique de 3 structures avec une boucle. Chaque case `tab[i]` est une structure complète à laquelle on accède par `tab[i].champ`.\n\n- `tab[0]` reçoit `ce = 100` et `moyenne = 10.0`.\n- `tab[1]` reçoit `ce = 101` et `moyenne = 11.0`.\n- `tab[2]` reçoit `ce = 102` et `moyenne = 12.0`.\n\nL\'affichage restitue chaque ligne avec un format `%d %.1f`.'},
{id:'struct-013',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau statique pointeurs',difficulty:5,statement:'Quelles valeurs sont affichées par ce programme qui utilise un tableau statique de deux pointeurs sur structures ?',code:`typedef struct { int ce; } ETUDIANT;

ETUDIANT *tab[2];
tab[0] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[1] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[0]->ce = 100;
tab[1]->ce = 200;
printf("%d\\n", tab[0]->ce);
printf("%d\\n", (*tab[1]).ce);
printf("%d\\n", (*tab)->ce);`,expected:'100\n200\n100',normalize:'trim-lines',explanation:'Le tableau `ETUDIANT *tab[2]` contient **deux pointeurs** sur structures. Chaque case doit être allouée séparément avec `malloc`.\n\n- `tab[0]->ce` accède au champ `ce` de la première structure pointée. Affiche 100.\n- `(*tab[1]).ce` est une notation équivalente à `tab[1]->ce`. Affiche 200.\n- `(*tab)->ce` : `*tab` équivaut à `tab[0]`, donc `(*tab)->ce` affiche 100.\n\nLes parenthèses sont obligatoires dans `(*tab)->ce` car `->` est prioritaire sur `*`.'},
{id:'struct-014',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Structure en paramètre',difficulty:4,statement:'Que se passe-t-il lorsqu\'on passe une structure **par valeur** à une fonction ?',multi:false,options:[{id:'a',text:'La structure est copiée, les modifications ne sont pas visibles à l\'extérieur'},{id:'b',text:'Un pointeur est passé, les modifications sont visibles'},{id:'c',text:'Erreur de compilation'},{id:'d',text:'Le comportement dépend du compilateur'}],correct:['a'],explanation:'Contrairement aux tableaux, les structures sont passées **par valeur** : la fonction reçoit une **copie complète** de la structure. Toute modification effectuée dans la fonction reste locale.\n\nPour modifier la structure originale, il faut passer un **pointeur** :\n```\nvoid f(ETUDIANT *e) {\n    e->ce = 999;\n}\nf(&etd);\n```\n\nCette copie peut aussi coûter cher si la structure est volumineuse. C\'est pour cela qu\'on privilégie souvent les pointeurs dans les signatures de fonctions.'},
{id:'struct-015',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau dynamique adresses',difficulty:5,statement:'Quelles valeurs sont affichées par ce programme qui alloue un tableau dynamique de trois pointeurs sur structures ?',code:`typedef struct { int ce; } ETUDIANT;

int n = 3;
ETUDIANT **tab;
tab = (ETUDIANT**) malloc(n * sizeof(ETUDIANT*));
for (int i = 0; i < n; i++) {
    *(tab + i) = (ETUDIANT*) malloc(sizeof(ETUDIANT));
    (*(tab + i))->ce = 100 + i;
}
for (int i = 0; i < n; i++) printf("%d ", (*(tab + i))->ce);`,expected:'100 101 102 ',normalize:'trim',explanation:'L\'allocation se fait en **deux niveaux** :\n\n1. `tab = malloc(n * sizeof(ETUDIANT*))` alloue un tableau de `n` pointeurs.\n2. Pour chaque case, `malloc(sizeof(ETUDIANT))` alloue une structure et son adresse est rangée dans la case.\n\nL\'accès `(*(tab + i))->ce` signifie :\n- `tab + i` : adresse de la case i.\n- `*(tab + i)` : le pointeur stocké dans cette case, équivalent à `tab[i]`.\n- `->ce` : accès au champ `ce` de la structure pointée.\n\nLes valeurs attribuées sont 100, 101 et 102.'},
{id:'struct-016',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'typedef',difficulty:3,statement:'Complétez les deux `typedef` qui créent les synonymes `DATE` et `ETUDIANT`.',template:`struct date { int jour, mois, annee; };
{{1}} struct date {{2}};
struct etudiant { int ce; DATE date_naiss; };
{{3}} struct etudiant {{4}};`,blanks:[{id:'1',kind:'select',options:['typedef','struct','define','type'],correct:'typedef'},{id:'2',kind:'select',options:['DATE','date','DATE_T','D'],correct:'DATE'},{id:'3',kind:'select',options:['typedef','struct','define','type'],correct:'typedef'},{id:'4',kind:'select',options:['ETUDIANT','etudiant','ETU','E'],correct:'ETUDIANT'}],explanation:'L\'instruction `typedef` crée un **synonyme de type**. Au lieu d\'écrire `struct date d;` partout, on définit `DATE` comme synonyme et on écrit simplement `DATE d;`.\n\nSyntaxe : `typedef <type_existant> <nouveau_nom>;`.\n\nAvantages :\n- Code plus court et plus lisible.\n- Facile à modifier si on change la définition.\n\nConvention fréquente : mettre le synonyme en **majuscules** pour le distinguer des variables. Ne pas oublier le point-virgule final.'},
{id:'struct-017',type:'predict',chapter:'Chapitre 5 — Structures',title:'sizeof structure',difficulty:4,statement:'On suppose que `int` et `float` occupent chacun 4 octets, sans alignement. Combien vaut `sizeof(ETUDIANT)` ?',code:`typedef struct {
    int ce;
    int jour, mois, annee;
    float moyenne;
} ETUDIANT;`,expected:'20',normalize:'trim',explanation:'La taille d\'une structure sans alignement est la **somme des tailles de ses champs** :\n\n| Champ | Taille |\n|---|---|\n| `ce` | 4 |\n| `jour` | 4 |\n| `mois` | 4 |\n| `annee` | 4 |\n| `moyenne` | 4 |\n| **Total** | **20 octets** |\n\nEn pratique, l\'**alignement mémoire** peut ajouter quelques octets de remplissage (padding) pour que chaque champ commence à une adresse multiple de sa taille. Ici, comme tous les champs font 4 octets, il n\'y a pas de padding.'},
{id:'struct-018',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Moyenne des notes',difficulty:4,statement:'Comment calculer correctement la **moyenne** des notes d\'un étudiant dont la structure contient `float *notes` et `int nb_notes` ?',multi:false,options:[{id:'a',text:'`etd.moyenne = etd.notes / etd.nb_notes;`'},{id:'b',text:'Boucle qui somme les `notes[i]`, puis divise par `nb_notes`'},{id:'c',text:'`etd.moyenne = sum(etd.notes);`'},{id:'d',text:'Impossible sans fonction externe'}],correct:['b'],explanation:'En C, il n\'existe **aucune fonction native** pour sommer les éléments d\'un tableau. Il faut écrire la boucle soi-même :\n```\nfloat som = 0;\nfor (int i = 0; i < etd.nb_notes; i++)\n    som += etd.notes[i];\netd.moyenne = som / etd.nb_notes;\n```\n\nPoints d\'attention :\n- Initialiser `som` à 0.\n- Utiliser un type `float` pour la somme, sinon la division devient entière.\n- Vérifier que `nb_notes > 0` pour éviter une division par zéro.'},
{id:'struct-019',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tri structures',difficulty:5,statement:'Après le tri décroissant par moyenne, quel est le `ce` de l\'étudiant en position 0 ?',code:`typedef struct { int ce; float moyenne; } ETUDIANT;

ETUDIANT tab[3];
tab[0].ce = 100; tab[0].moyenne = 12.5;
tab[1].ce = 101; tab[1].moyenne = 15.8;
tab[2].ce = 102; tab[2].moyenne = 14.2;
for (int i = 0; i < 2; i++)
    for (int j = i + 1; j < 3; j++)
        if (tab[j].moyenne > tab[i].moyenne) {
            ETUDIANT tmp = tab[i]; tab[i] = tab[j]; tab[j] = tmp;
        }
printf("%d\\n", tab[0].ce);`,expected:'101',normalize:'trim',explanation:'Le tri est un **tri à bulles décroissant** par moyenne, qui utilise l\'**affectation globale** de structures (via `ETUDIANT tmp`).\n\nMoyennes de départ : 12.5 (ce=100), 15.8 (ce=101), 14.2 (ce=102). Triées en décroissant : 15.8, 14.2, 12.5.\n\nDéroulement :\n- `i=0` : on compare `tab[1]` (15.8) et `tab[0]` (12.5), on échange. Puis `tab[2]` (14.2) vs `tab[0]` (15.8), pas d\'échange. `tab = [101, 100, 102]`.\n- `i=1` : on compare `tab[2]` (14.2) et `tab[1]` (12.5), on échange. `tab = [101, 102, 100]`.\n\nL\'étudiant en position 0 est celui dont le `ce` vaut 101.'},
{id:'struct-020',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Recherche dans tableau',difficulty:4,statement:'Complétez la recherche d\'un étudiant par son `ce` dans un tableau de structures.',template:`int recherche = 42, trouve = 0;
for (int i = 0; i < n; i++) {
    if ({{1}} == recherche) {
        trouve = 1;
        {{2}};
    }
}
if ({{3}}) printf("Non trouvé\\n");`,blanks:[{id:'1',kind:'select',options:['tab[i].ce','tab.ce','tab[i]->ce','tab[i]'],correct:'tab[i].ce'},{id:'2',kind:'select',options:['break','continue','return','exit'],correct:'break'},{id:'3',kind:'select',options:['!trouve','trouve','trouve == 1','trouve != 0'],correct:'!trouve'}],explanation:'La recherche séquentielle parcourt le tableau de structures jusqu\'à trouver le bon `ce` :\n\n1. **Accès au champ** : `tab[i].ce` — on utilise `.` car `tab[i]` est une structure (et non un pointeur).\n2. **Sortie anticipée** : `break` dès que la valeur est trouvée, pour éviter de parcourir le reste inutilement.\n3. **Drapeau** `trouve` : il reste à 0 si la boucle se termine sans avoir trouvé. Le test `!trouve` permet d\'afficher le message d\'erreur.'},
{id:'struct-021',type:'predict',chapter:'Chapitre 5 — Structures',title:'Notes et pointeur',difficulty:5,statement:'Qu\'affiche ce programme, sachant que `notes` est un tableau de trois flottants ?',code:`float notes[3] = {10.5, 12.5, 15.5};
float *p = notes;
float *q = notes + 2;
printf("%.1f\\n", *p);
printf("%.1f\\n", *q);
printf("%.1f\\n", *(p + 1));
printf("%ld\\n", q - p);`,expected:'10.5\n15.5\n12.5\n2',normalize:'trim-lines',explanation:'Les pointeurs sur tableau se comportent comme pour les `int`, mais avec la taille de `float` (4 octets).\n\n- `p = notes` : `p` pointe sur `notes[0]`, valeur 10.5.\n- `q = notes + 2` : `q` pointe sur `notes[2]`, valeur 15.5.\n- `*(p + 1)` : on avance d\'un élément depuis `p`, ce qui donne `notes[1]`, valeur 12.5.\n- `q - p` : différence de 2 éléments (indices 2 et 0), donc 2.\n\nAttention : `q - p` donne le nombre d\'**éléments**, pas le nombre d\'octets (qui serait 8).'}, 
{id:'struct-022',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Structure imbriquée via pointeur',difficulty:3,statement:'Soit `typedef struct { int jour, mois, annee; } DATE;` et `typedef struct { int ce; DATE date_naiss; } ETUDIANT;`. Avec `ETUDIANT etd; ETUDIANT *e = &etd;`, comment accéder au champ `jour` ?',multi:false,options:[{id:'a',text:'`e.date_naiss.jour`'},{id:'b',text:'`e->date_naiss.jour`'},{id:'c',text:'`e.date_naiss->jour`'},{id:'d',text:'`e->date_naiss->jour`'}],correct:['b'],explanation:'L\'accès à un champ de structure imbriquée via un pointeur utilise **un seul `->`** pour déréférencer le pointeur, puis un `.` pour accéder à la sous-structure.\n\n- `e` est un **pointeur** : on utilise `->` pour accéder à `date_naiss`.\n- `date_naiss` est une **structure** (pas un pointeur) : on utilise `.` pour accéder à `jour`.\n\nRésultat : `e->date_naiss.jour`.\n\nLes autres options sont fausses : `e.date_naiss.jour` utilise `.` sur un pointeur ; `e.date_naiss->jour` mélange les opérateurs ; `e->date_naiss->jour` utilise `->` sur une structure.'},
{id:'struct-023',type:'predict',chapter:'Chapitre 5 — Structures',title:'Moyenne pondérée',difficulty:5,statement:'Qu\'affiche ce programme qui calcule une moyenne pondérée à partir d\'une structure `NOTES` ?',code:`typedef struct { float tp, ds, examen; } NOTES;
NOTES n = {12.0, 14.0, 16.0};
float moyenne = n.tp * 0.2 + n.ds * 0.3 + n.examen * 0.5;
printf("%.2f\\n", moyenne);`,expected:'14.60',normalize:'trim',explanation:'La structure `NOTES` contient trois champs : `tp`, `ds` et `examen`. L\'initialisation `{12.0, 14.0, 16.0}` affecte respectivement ces trois valeurs.\n\nLe calcul de la moyenne pondérée applique les coefficients :\n\n- TP (20%) : 12.0 × 0.2 = 2.4\n- DS (30%) : 14.0 × 0.3 = 4.2\n- Examen (50%) : 16.0 × 0.5 = 8.0\n- Total : 2.4 + 4.2 + 8.0 = **14.6**\n\nLe format `%.2f` affiche le résultat avec deux décimales : `14.60`.'},
{id:'struct-024',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Structure + tableau dynamique',difficulty:5,statement:'Complétez le programme qui alloue dynamiquement une structure `ETUDIANT` puis son tableau de notes.',template:`typedef struct { int ce; int nb_notes; float *notes; float moyenne; } ETUDIANT;

ETUDIANT *e = (ETUDIANT*) malloc(sizeof(ETUDIANT));
scanf("%d", &e->nb_notes);
e->notes = (float*) {{1}}(e->nb_notes * {{2}}(float));
if (!e->notes) exit(-1);
for (int i = 0; i < e->nb_notes; i++)
    scanf("%f", {{3}});
{{4}}(e->notes);
{{5}}(e);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','realloc'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['&e->notes[i]','e->notes[i]','&e.notes[i]','e.notes+i'],correct:'&e->notes[i]'},{id:'4',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'5',kind:'select',options:['free','malloc','delete','clear'],correct:'free'}],explanation:'Quand on manipule une structure via un **pointeur** et que cette structure contient elle-même un pointeur, il faut deux allocations :\n\n1. **La structure** : `malloc(sizeof(ETUDIANT))` → `e` pointe sur la structure.\n2. **Le tableau de notes** : `malloc(nb_notes * sizeof(float))` → `e->notes` pointe sur le tableau.\n\nPour `scanf`, l\'adresse de chaque case est `&e->notes[i]` ou, de façon équivalente, `e->notes + i`.\n\nLa libération se fait dans l\'**ordre inverse** : d\'abord `e->notes`, puis `e`. Sinon, on perd l\'accès au bloc de notes et on crée une fuite mémoire.'},
{id:'struct-025',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Modèle vs variable',difficulty:2,statement:'Peut-on déclarer plusieurs variables à partir d\'un même **modèle** de structure ?',multi:false,options:[{id:'a',text:'Non, une seule'},{id:'b',text:'Oui, autant qu\'on veut'},{id:'c',text:'Seulement deux'},{id:'d',text:'Cela dépend du compilateur'}],correct:['b'],explanation:'Un modèle de structure (`struct etudiant { ... };`) est un **type**, pas une variable. Il décrit la forme des données mais ne réserve aucune mémoire.\n\nOn peut ensuite déclarer **autant de variables** que nécessaire à partir de ce modèle :\n```\nstruct etudiant etd1;\nstruct etudiant etd2;\nstruct etudiant tab[100];\n```\n\nChaque variable possède sa **propre copie** des champs, indépendante des autres.'},
{id:'struct-026',type:'mcq',chapter:'Chapitre 5 — Structures',title:'[Série 5] Q1 — Remplir et afficher',difficulty:3,statement:'Soit `typedef struct { int ce; float moyenne; } ETUDIANT;` et `ETUDIANT etd;`. Pour remplir `etd.ce` au clavier, quelle écriture est correcte ?',multi:false,options:[{id:'a',text:'`scanf("%d", etd.ce);`'},{id:'b',text:'`scanf("%d", &etd.ce);`'},{id:'c',text:'`scanf("%d", etd->ce);`'},{id:'d',text:'`scanf("%d", *etd.ce);`'}],correct:['b'],explanation:'`scanf` a besoin de l\'**adresse** de la variable à remplir. Or, `etd.ce` est un `int` : pour obtenir son adresse, il faut faire précéder le nom complet du champ par l\'opérateur `&`.\n\nL\'écriture correcte est donc : `scanf("%d", &etd.ce);`.\n\nLes autres options sont fausses :\n- `etd.ce` sans `&` passe une valeur, pas une adresse.\n- `etd->ce` suppose que `etd` est un pointeur, ce qui n\'est pas le cas.\n- `*etd.ce` tente de déréférencer un `int`, ce qui ne compile pas.'},
{id:'struct-027',type:'mcq',chapter:'Chapitre 5 — Structures',title:'[Série 5] Q2 — Pointeur sur variable',difficulty:4,statement:'Soit `typedef struct { int ce; float moyenne; } ETUDIANT;` et `ETUDIANT etd; ETUDIANT *e = &etd;`. Comment accéder au champ `ce` ?',multi:false,options:[{id:'a',text:'`e.ce`'},{id:'b',text:'`(*e).ce` ou `e->ce`'},{id:'c',text:'`&e.ce`'},{id:'d',text:'`*e.ce`'}],correct:['b'],explanation:'Deux notations sont **équivalentes** pour accéder à un champ via un pointeur :\n\n- `(*e).ce` : on déréférence explicitement le pointeur pour obtenir la structure, puis on accède au champ avec `.`.\n- `e->ce` : notation raccourcie créée exactement pour ce cas.\n\nLes autres options sont fausses :\n- `e.ce` est invalide car `e` est un pointeur, pas une structure.\n- `&e.ce` cumule l\'erreur ci-dessus et donne une adresse, pas la valeur.\n- `*e.ce` est lu `*(e.ce)`, ce qui ne compile pas.'},
{id:'struct-028',type:'mcq',chapter:'Chapitre 5 — Structures',title:'[Série 5] Q3 — Tableau dynamique',difficulty:4,statement:'Soit `typedef struct { int ce; float moyenne; } ETUDIANT;`. Pour créer un **tableau dynamique** de `n` ETUDIANT, quelle déclaration est correcte ?',multi:false,options:[{id:'a',text:'`ETUDIANT tab[n];`'},{id:'b',text:'`ETUDIANT *tab = malloc(n * sizeof(ETUDIANT));`'},{id:'c',text:'`ETUDIANT **tab;`'},{id:'d',text:'`ETUDIANT tab[];`'}],correct:['b'],explanation:'Un tableau dynamique en C se crée avec un **pointeur** et un appel à `malloc`. La bonne déclaration est donc :\n```\nETUDIANT *tab = malloc(n * sizeof(ETUDIANT));\n```\n\n- Option (a) : `ETUDIANT tab[n]` n\'est valide que si `n` est une constante connue à la compilation (VLA partiel). Ce n\'est pas un tableau vraiment dynamique.\n- Option (c) : `ETUDIANT **tab` est un pointeur sur pointeur, utile pour un tableau dynamique **d\'adresses** (voir struct-015).\n- Option (d) : `ETUDIANT tab[]` sans taille ni initialisation est une erreur de syntaxe.'},
{id:'struct-029',type:'findbug',chapter:'Chapitre 5 — Structures',title:'[Bug] -> vs .',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui accède à deux champs d\'une structure via un pointeur.',code:`typedef struct { int ce; float moyenne; } ETUDIANT;
int main() {
    ETUDIANT etd;
    ETUDIANT *e = &etd;
    e.ce = 999;
    e->moyenne = 15.5;
    return 0;
}`,bugLines:[5],explanation:'La ligne 5 utilise l\'opérateur `.` alors que `e` est un **pointeur**. L\'opérateur `.` ne s\'applique qu\'à une variable de type structure, pas à un pointeur.\n\nLe compilateur refuse cette ligne avec une erreur du type `request for member \'ce\' in something not a structure or union`.\n\nPour corriger, il faut utiliser `->` :\n```\ne->ce = 999;\n```\n\nOu, de façon équivalente : `(*e).ce = 999;`.'},
{id:'struct-030',type:'findbug',chapter:'Chapitre 5 — Structures',title:'[Bug] Modification perdue',difficulty:4,statement:'Cliquez sur la ou les lignes qui contiennent le bug dans ce programme qui essaie de modifier une structure via une fonction.',code:`typedef struct { int ce; } ETUDIANT;
void remplir(ETUDIANT e) {
    e.ce = 42;
}
int main() {
    ETUDIANT etd;
    remplir(etd);
    printf("%d\\n", etd.ce);
    return 0;
}`,bugLines:[2,3],explanation:'Les lignes 2 et 3 montrent le problème : la fonction `remplir` prend son paramètre **par valeur**, c\'est-à-dire qu\'elle reçoit une **copie** de la structure. Modifier `e.ce` dans la fonction modifie la copie locale, pas la structure d\'origine.\n\nAprès l\'appel, `etd.ce` reste inchangé (valeur indéterminée car non initialisée), et le programme affiche une valeur incohérente.\n\nPour corriger, il faut passer un **pointeur** :\n```\nvoid remplir(ETUDIANT *e) {\n    e->ce = 42;\n}\n// appel :\nremplir(&etd);\n```'},
{id:'struct-031',type:'memory',chapter:'Chapitre 5 — Structures',title:'[Mémoire] Champ de structure',difficulty:3,statement:'Remplissez l\'état final des deux champs de la structure après ce programme.',code:`typedef struct { int ce; float moyenne; } ETUDIANT;
ETUDIANT etd;
etd.ce = 999;
etd.moyenne = 15.5;`,memory:[{name:'etd.ce',type:'int',address:'F100',expected:'999'},{name:'etd.moyenne',type:'float',address:'F104',expected:'15.5'}],explanation:'Chaque champ d\'une structure occupe **sa propre adresse** en mémoire, à la suite du précédent.\n\n- Le champ `ce` (un `int`) est le premier : il est rangé à F100.\n- Le champ `moyenne` (un `float`) suit immédiatement, donc à F100 + 4 = F104.\n\nLes affectations `etd.ce = 999` et `etd.moyenne = 15.5` écrivent respectivement dans ces deux cases.'},
{id:'struct-032',type:'memory',chapter:'Chapitre 5 — Structures',title:'[Mémoire] Structure via pointeur',difficulty:4,statement:'Remplissez l\'état final après ce programme qui mélange accès direct et accès via pointeur.',code:`typedef struct { int ce; } ETUDIANT;
ETUDIANT etd;
ETUDIANT *e = &etd;
e->ce = 500;
etd.ce = etd.ce + 100;`,memory:[{name:'etd.ce',type:'int',address:'F100',expected:'600'},{name:'e',type:'ETUDIANT*',address:'F400',expected:'F100'}],explanation:'Les deux notations `e->ce` et `etd.ce` désignent **la même case mémoire**, car `e` pointe sur `etd`.\n\n- Après `e->ce = 500`, le champ `ce` vaut 500.\n- Puis `etd.ce = etd.ce + 100` lit 500 et y ajoute 100, ce qui donne 600.\n\nLe pointeur `e` contient l\'adresse F100, qui ne change pas.'},
{id:'struct-033',type:'memory',chapter:'Chapitre 5 — Structures',title:'[Mémoire] Tableau de structures',difficulty:4,statement:'Remplissez l\'état final des trois champs `ce` du tableau statique de structures.',code:`typedef struct { int ce; } ETUDIANT;
ETUDIANT tab[3];
tab[0].ce = 10;
tab[1].ce = 20;
tab[2].ce = 30;`,memory:[{name:'tab[0].ce',type:'int',address:'F100',expected:'10'},{name:'tab[1].ce',type:'int',address:'F104',expected:'20'},{name:'tab[2].ce',type:'int',address:'F108',expected:'30'}],explanation:'Un tableau statique de structures range les structures **les unes à la suite des autres** en mémoire. Chaque structure occupe la taille d\'un `ETUDIANT`, soit 4 octets.\n\n- `tab[0]` occupe F100 à F103, son champ `ce` est à F100.\n- `tab[1]` occupe F104 à F107, son champ `ce` est à F104.\n- `tab[2]` occupe F108 à F10B, son champ `ce` est à F108.\n\nLes trois affectations écrivent respectivement 10, 20 et 30.'},
{id:'struct-034',type:'findbug',chapter:'Chapitre 5 — Structures',title:'[Bug] Accès après free',difficulty:5,statement:'Cliquez sur la ligne qui contient le bug dans ce programme qui alloue, remplit, libère, puis utilise une structure.',code:`typedef struct { int ce; } ETUDIANT;
int main() {
    ETUDIANT *e = (ETUDIANT*) malloc(sizeof(ETUDIANT));
    e->ce = 42;
    free(e);
    printf("%d\\n", e->ce);
    return 0;
}`,bugLines:[6],explanation:'La ligne 6 utilise `e->ce` **après** l\'appel à `free(e)`. Le pointeur `e` continue à contenir l\'adresse du bloc libéré, mais cette mémoire n\'appartient plus au programme : c\'est un **dangling pointer**.\n\nLire `e->ce` dans cet état est un comportement indéfini. La valeur lue est arbitraire (résidus d\'anciennes données ou nouvelles données).\n\nBonnes pratiques :\n- Lire la valeur **avant** le `free`.\n- Ou remettre `e = NULL;` juste après le `free`.'},
{id:'struct-035',type:'predict',chapter:'Chapitre 5 — Structures',title:'[Variante] Affectation globale',difficulty:4,statement:'Qu\'affiche ce programme, sachant que la variable `a` est écrasée par une copie de `b` avant d\'être modifiée ?',code:`typedef struct { int ce; int note; } ETUDIANT;
ETUDIANT a, b;
a.ce = 100; a.note = 15;
b.ce = 200; b.note = 18;
a = b;
a.note = 5;
printf("%d %d\\n", b.ce, b.note);`,expected:'200 18',normalize:'trim',explanation:'L\'instruction `a = b` effectue une **copie membre à membre** de `b` vers `a`. Après cette ligne, `a` contient les mêmes valeurs que `b` : `ce = 200` et `note = 18`.\n\nLa ligne suivante `a.note = 5` modifie uniquement le champ `note` de `a`. La variable `b` reste **indépendante** et conserve ses valeurs originales.\n\nLe `printf` affiche donc `200 18`, c\'est-à-dire l\'état de `b`.'},
{id:'struct-036',type:'predict',chapter:'Chapitre 5 — Structures',title:'[Variante] Pointeur sur structure',difficulty:4,statement:'Qu\'affiche ce programme où l\'accès au même champ se fait à la fois par la variable et par un pointeur ?',code:`typedef struct { int ce; } ETUDIANT;
ETUDIANT etd;
etd.ce = 42;
ETUDIANT *p = &etd;
p->ce = p->ce + 8;
printf("%d\\n", etd.ce);
printf("%d\\n", p->ce);`,expected:'50\n50',normalize:'trim-lines',explanation:'Le pointeur `p` et la variable `etd` désignent **la même case mémoire**. Toute modification via l\'un est visible via l\'autre.\n\n- `etd.ce = 42` initialise le champ à 42.\n- `p->ce = p->ce + 8` lit 42, ajoute 8, écrit 50 dans la même case.\n\nLes deux `printf` affichent donc 50. Cette équivalence entre `etd.ce` et `p->ce` est fondamentale pour comprendre le passage par pointeur en C.'},

];

// Exposer la banque au scope global
window.EXERCISES = EXERCISES;
