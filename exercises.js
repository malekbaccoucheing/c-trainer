// ═══════════════════════════════════════════════════════════════
//  BANQUE D'EXERCICES — 155 exercices
//  ⭐ C'est ICI que tu ajoutes / modifies des exercices
// ═══════════════════════════════════════════════════════════════

const EXERCISES = [
{id:'base-001',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'sizeof(char)',difficulty:1,statement:'Que vaut `sizeof(char)` en C ?',multi:false,options:[{id:'a',text:'1'},{id:'b',text:'2'},{id:'c',text:'4'},{id:'d',text:'Dépend de l\'architecture'}],correct:['a'],explanation:'`sizeof(char)` vaut **toujours 1** — c\'est la définition même de l\'octet.'},
{id:'base-002',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Division entière',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`int a = 5, b = 2;
printf("%d\\n", a / b);
printf("%f\\n", (float)a / b);
printf("%d\\n", a % b);`,expected:'2\n2.500000\n1',normalize:'trim-lines',explanation:'- `5 / 2` : division **entière** → `2`\n- `(float)a / b` : division **réelle** → `2.5`\n- `a % b` : reste → `1`'},
{id:'base-003',type:'predict',chapter:'Chapitre 1 — Généralités',title:'i++ vs ++i',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int i = 5;
int n = ++i - 5;
printf("i = %d, n = %d\\n", i, n);
i = 5;
n = i++ - 5;
printf("i = %d, n = %d\\n", i, n);`,expected:'i = 6, n = 1\ni = 6, n = 0',normalize:'trim-lines',explanation:'`++i` : incrémente **avant**. `i++` : **après**.'},
{id:'base-004',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Conversions implicites',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int x = 12;
float a = 12.48;
char b = 4;
x = a / b;
printf("%d\\n", x);`,expected:'3',normalize:'trim',explanation:'Troncature à l\'affectation.'},
{id:'base-005',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'Codes de format printf',difficulty:2,statement:'Complétez les codes de format.',template:`int n = 42;
float pi = 3.14159;
char c = 'A';
printf("Entier : {{1}}\\n", n);
printf("Réel   : {{2}}\\n", pi);
printf("Caractère : {{3}}\\n", c);
printf("Adresse de n : {{4}}\\n", &n);`,blanks:[{id:'1',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%d'},{id:'2',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%f'},{id:'3',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%c'},{id:'4',kind:'select',options:['%d','%f','%c','%p','%s'],correct:'%p'}],explanation:'`%d` entier · `%f` réel · `%c` caractère · `%p` adresse.'},
{id:'base-006',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Code ASCII',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`char c = 'A';
printf("%c\\n", c);
printf("%d\\n", c);
printf("%c\\n", c + 1);`,expected:'A\n65\nB',normalize:'trim-lines',explanation:'`\'A\'` vaut 65.'},
{id:'base-007',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Priorité des opérateurs',difficulty:3,statement:'Que vaut `2 + 3 * 4 - 10 / 2` ?',multi:false,options:[{id:'a',text:'9'},{id:'b',text:'5'},{id:'c',text:'14'},{id:'d',text:'7'}],correct:['a'],explanation:'`3*4=12`, `10/2=5`, `2+12-5=9`.'},
{id:'base-008',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Opérateurs logiques',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int a = 5, b = 0;
printf("%d\\n", a && b);
printf("%d\\n", a || b);
printf("%d\\n", !a);
printf("%d\\n", !b);`,expected:'0\n1\n0\n1',normalize:'trim-lines',explanation:'0 = faux.'},
{id:'base-009',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Opérateur ternaire',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int a = 12, b = 7;
int max = (a > b) ? a : b;
printf("%d\\n", max);
printf("%d\\n", (a < b) ? a : b);`,expected:'12\n7',normalize:'trim-lines',explanation:'`(cond) ? A : B`.'},
{id:'base-010',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Gabarit %4d',difficulty:3,statement:'Qu\'affiche ce programme ? (respectez les espaces)',code:`int x = 1, y = 2;
printf("%4d%4d\\n", x, y);
printf("%-4d|%d\\n", x, y);`,expected:'   1   2\n1   |2',normalize:'trim-lines',explanation:'`%4d` cadré à droite. `%-4d` à gauche.'},
{id:'base-011',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Const et compilation',difficulty:2,statement:'Que se passe-t-il ?',code:`const int n = 20;
n = 25;`,multi:false,options:[{id:'a',text:'Affiche 20'},{id:'b',text:'Affiche 25'},{id:'c',text:'Erreur de compilation'},{id:'d',text:'Comportement indéfini'}],correct:['c'],explanation:'`const` = lecture seule.'},
{id:'base-012',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'#define',difficulty:2,statement:'Complétez.',template:`#include <stdio.h>
{{1}} NB {{2}}
int main() { printf("NB = %d\\n", NB); }`,blanks:[{id:'1',kind:'select',options:['#define','#include','const','typedef'],correct:'#define'},{id:'2',kind:'select',options:['5','5;','= 5','(5)'],correct:'5'}],explanation:'Pas de point-virgule après `#define`.'},
{id:'base-013',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'sizeof tableau',difficulty:3,statement:'Pour `int tab[5]` (int=4), que valent `sizeof(tab)` et `sizeof(tab)/sizeof(tab[0])` ?',multi:false,options:[{id:'a',text:'`20` et `5`'},{id:'b',text:'`5` et `5`'},{id:'c',text:'`20` et `20`'},{id:'d',text:'Erreur'}],correct:['a'],explanation:'20 octets, 5 éléments.'},
{id:'base-014',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Modulo négatif',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`printf("%d\\n", 7 % 3);
printf("%d\\n", -7 % 3);
printf("%d\\n", 7 % -3);`,expected:'1\n-1\n1',normalize:'trim-lines',explanation:'Signe suit le dividende.'},
{id:'base-015',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'Incrémentations',difficulty:2,statement:'Complétez.',template:`int i = 5;
int x = {{1}};   // x = 5, puis i = 6
int y = {{2}};   // y = 7, puis i = 7
int z = {{3}};   // z = 7, puis i = 8`,blanks:[{id:'1',kind:'select',options:['i++','++i','i--','--i'],correct:'i++'},{id:'2',kind:'select',options:['i++','++i','i--','--i'],correct:'++i'},{id:'3',kind:'select',options:['i++','++i','i--','--i'],correct:'i++'}],explanation:'Post vs pré.'},
{id:'base-016',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Comparaison caractères',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`char c1 = '1', c2 = 'a';
if (c1 < c2) printf("inf\\n");
else printf("sup\\n");
printf("%d\\n", 'z' - 'a');`,expected:'inf\n25',normalize:'trim-lines',explanation:'ASCII : 49 < 97.'},
{id:'base-017',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Types et tailles',difficulty:2,statement:'Ordre croissant (64-bit) ?',multi:false,options:[{id:'a',text:'`char` < `int` < `long` < `double`'},{id:'b',text:'`int` < `char` < `long` < `double`'},{id:'c',text:'`char` < `short` < `int` < `double`'},{id:'d',text:'`char` < `int` < `double` < `long`'}],correct:['a'],explanation:'char=1, short=2, int=4, long=8, double=8.'},
{id:'base-018',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Cast explicite',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int n = 5, p = 2;
double r1 = n / p;
double r2 = (double)n / p;
printf("%.2f\\n", r1);
printf("%.2f\\n", r2);`,expected:'2.00\n2.50',normalize:'trim-lines',explanation:'Sans cast : division entière.'},
{id:'base-019',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Affichage flottants',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`float x = 2.3, y = 4.5;
printf("%f %f\\n", x, y);
printf("%.2f %.2f\\n", x, y);
printf("%5.2f|%-5.2f|\\n", x, y);`,expected:'2.300000 4.500000\n2.30 4.50\n 2.30|4.50 |',normalize:'trim-lines',explanation:'Précision et cadrage.'},
{id:'base-020',type:'fillblanks',chapter:'Chapitre 1 — Généralités',title:'Lecture clavier',difficulty:2,statement:'Complétez.',template:`int n;
float x;
char c;
scanf("{{1}}", {{2}});
scanf("{{3}}", {{4}});
scanf("{{5}}", {{6}});`,blanks:[{id:'1',kind:'select',options:['%d','%f','%c','%s'],correct:'%d'},{id:'2',kind:'select',options:['&n','n','*n','&&n'],correct:'&n'},{id:'3',kind:'select',options:['%d','%f','%c','%s'],correct:'%f'},{id:'4',kind:'select',options:['&x','x','*x','&&x'],correct:'&x'},{id:'5',kind:'select',options:['%d','%f','%c','%s'],correct:'%c'},{id:'6',kind:'select',options:['&c','c','*c','&&c'],correct:'&c'}],explanation:'scanf a besoin d\'adresses.'},
{id:'base-021',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Évaluation d\'expression',difficulty:3,statement:'Sachant `int A=20, B=5, C=-10, D=2, X=12;`, que vaut `(5*X)+2*((3*B)+4)` ?',code:`int A=20, B=5, C=-10, D=2, X=12;
int r = (5*X)+2*((3*B)+4);`,expected:'98',normalize:'trim',explanation:'5*12=60, 3*5=15, 15+4=19, 2*19=38, 60+38=98.'},
{id:'base-022',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Évaluation avec affectation',difficulty:4,statement:'Sachant `int A=20, X=5;`, que vaut A après `A += (X+5);` ?',code:`int A = 20, X = 5;
A += (X+5);`,expected:'30',normalize:'trim',explanation:'A = 20 + 10 = 30.'},
{id:'base-023',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Type et valeur d\'expression',difficulty:4,statement:'Sachant `long A=15; char B=\'A\'; short C=10;`, quel est le **type** de `C + B` ?',code:`long A = 15;
char B = 'A';
short C = 10;`,expected:'int',normalize:'trim',explanation:'char et short sont promus en `int`.'},
{id:'base-024',type:'predict',chapter:'Chapitre 1 — Généralités',title:'Valeur de C+B',difficulty:3,statement:'Sachant `char B=\'A\'; short C=10;`, que vaut `C + B` ?',code:`char B = 'A';
short C = 10;
int r = C + B;`,expected:'75',normalize:'trim',explanation:'65 + 10 = 75.'},
{id:'base-025',type:'mcq',chapter:'Chapitre 1 — Généralités',title:'Mauvais code de format',difficulty:3,statement:'Que se passe-t-il avec `printf("%d", 3.14);` ?',multi:false,options:[{id:'a',text:'Affiche 3'},{id:'b',text:'Affiche 3.14'},{id:'c',text:'Affiche une valeur indéterminée (comportement indéfini)'},{id:'d',text:'Erreur de compilation'}],correct:['c'],explanation:'`%d` attend un `int`, pas un `double`.'},
{id:'base-026',type:'predict',chapter:'Chapitre 1 — Généralités',title:'[Variante] Division entière (7/3)',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`int a = 7, b = 3;
printf("%d\\n", a / b);
printf("%d\\n", a % b);`,expected:'2\n1',normalize:'trim-lines',explanation:'7/3 = 2, 7%3 = 1.'},
{id:'base-027',type:'predict',chapter:'Chapitre 1 — Généralités',title:'[Variante] i++ sur 10',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int i = 10;
printf("%d\\n", i++);
printf("%d\\n", i);
printf("%d\\n", ++i);`,expected:'10\n11\n12',normalize:'trim-lines',explanation:'Post puis pré.'},
{id:'findbug-001',type:'findbug',chapter:'Chapitre 1 — Généralités',title:'[Bug] Format et division',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int a = 5;
    int b = 2;
    float resultat = a / b;
    printf("%f\\n", resultat);
    return 0;
}`,bugLines:[4],explanation:'**Ligne 4** : `a / b` est une **division entière** (les deux sont `int`), donc le résultat est 2 avant d\'être stocké dans un `float`. Il faut écrire `(float)a / b` pour obtenir 2.5.'},
{id:'findbug-002',type:'findbug',chapter:'Chapitre 1 — Généralités',title:'[Bug] Mauvais format',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int x = 42;
    float pi = 3.14;
    printf("%d\\n", x);
    printf("%d\\n", pi);
    return 0;
}`,bugLines:[5],explanation:'**Ligne 5** : `pi` est un `float`, mais le format `%d` attend un `int`. Il faut utiliser `%f`. Comportement indéfini.'},
{id:'mem-001',type:'memory',chapter:'Chapitre 1 — Généralités',title:'[Mémoire] Variables simples',difficulty:2,statement:'Remplissez la valeur finale de chaque variable.',code:`int x = 5;
int y = 10;
x = x + y;
y = x - y;`,memory:[{name:'x',type:'int',address:'F100',expected:'15'},{name:'y',type:'int',address:'F104',expected:'5'}],explanation:'x = 5+10 = 15, y = 15-10 = 5.'},

{id:'ctrl-001',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'while simple',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`int i = 1;
while (i <= 3) {
    printf("i = %d\\n", i);
    i++;
}
printf("Fin : i = %d\\n", i);`,expected:'i = 1\ni = 2\ni = 3\nFin : i = 4',normalize:'trim-lines',explanation:'i finit à 4.'},
{id:'ctrl-002',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'do-while vs while',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int x = 10;
while (x < 5) { printf("while : %d\\n", x); x++; }
do { printf("do-while : %d\\n", x); x++; } while (x < 5);`,expected:'do-while : 10',normalize:'trim-lines',explanation:'while teste avant, do-while après.'},
{id:'ctrl-003',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'for multi-variables',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int i, j;
for (i = 0, j = 10; i < j; i++, j--) {
    printf("%d %d\\n", i, j);
}`,expected:'0 10\n1 9\n2 8\n3 7\n4 6',normalize:'trim-lines',explanation:'5 itérations.'},
{id:'ctrl-004',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'break',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`for (int i = 1; i <= 10; i++) {
    if (i == 4) break;
    printf("%d ", i);
}
printf("\\nFini\\n");`,expected:'1 2 3 \nFini',normalize:'trim-lines',explanation:'Sortie à i=4.'},
{id:'ctrl-005',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'continue',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;
    printf("%d ", i);
}`,expected:'1 2 4 5 ',normalize:'trim',explanation:'3 sauté.'},
{id:'ctrl-006',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'switch sans break',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int x = 2;
switch (x) {
    case 1: printf("un ");
    case 2: printf("deux ");
    case 3: printf("trois ");
    case 4: printf("quatre ");
    default: printf("autre ");
}`,expected:'deux trois quatre autre ',normalize:'trim',explanation:'Fall-through.'},
{id:'ctrl-007',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Boucles imbriquées',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) printf("%d%d ", i, j);
    printf("\\n");
}`,expected:'11 12 13 \n21 22 23 ',normalize:'trim-lines',explanation:'2×3 = 6.'},
{id:'ctrl-008',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Somme jusqu\'à 100',difficulty:4,statement:'Saisies : 20, 60, 50. Qu\'affiche ce programme ?',code:`int x, som = 0;
while (som <= 100) { scanf("%d", &x); som += x; }
printf("La somme est %d\\n", som);`,expected:'La somme est 130',normalize:'trim',explanation:'20→80→130 puis sortie.'},
{id:'ctrl-009',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Comptage caractères',difficulty:5,statement:'Saisie `Azerty AA#`. Qu\'affiche ce programme ?',code:`char x;
int nb = 0;
while ((x = getchar()) != '#') {
    if (x == 'A') nb++;
}
printf("Nombre de A : %d\\n", nb);`,expected:'Nombre de A : 3',normalize:'trim',explanation:'3 A dans "Azerty AA#".'},
{id:'ctrl-010',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Comptage mots',difficulty:5,statement:'Saisie `..aaai;;bbb#`. Qu\'affiche ce programme ?',code:`char x, prec = ' ';
int nb = 0;
while ((x = getchar()) != '#') {
    if (x == ' ' || x == '.' || x == ';') {
        if (prec != ' ' && prec != '.' && prec != ';') nb++;
    }
    prec = x;
}
printf("Mots : %d\\n", nb);`,expected:'Mots : 1',normalize:'trim',explanation:'Le dernier mot n\'est pas compté.'},
{id:'ctrl-011',type:'mcq',chapter:'Chapitre 2 — Contrôle',title:'Boucle infinie',difficulty:3,statement:'Que se passe-t-il avec `while(1)` sans `break` ?',multi:false,options:[{id:'a',text:'S\'arrête'},{id:'b',text:'Boucle infinie'},{id:'c',text:'Erreur'},{id:'d',text:'1 itération'}],correct:['b'],explanation:'Toujours vrai.'},
{id:'ctrl-012',type:'fillblanks',chapter:'Chapitre 2 — Contrôle',title:'Factorielle',difficulty:4,statement:'Complétez.',template:`int n, i;
long fact = {{1}};
for (i = 1; i {{2}} n; i++) fact {{3}} i;`,blanks:[{id:'1',kind:'select',options:['0','1','n','n+1'],correct:'1'},{id:'2',kind:'select',options:['<','<=','>','>='],correct:'<='},{id:'3',kind:'select',options:['+=','-=','*=','/='],correct:'*='}],explanation:'Init à 1, boucle 1..n, multiplication.'},
{id:'ctrl-013',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'goto',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int i = 0;
debut:
    printf("%d ", i);
    i++;
    if (i < 3) goto debut;
printf("\\nFini\\n");`,expected:'0 1 2 \nFini',normalize:'trim-lines',explanation:'3 itérations.'},
{id:'ctrl-014',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Cascade if-else',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`int note = 14;
if (note >= 16) printf("Très bien\\n");
else if (note >= 14) printf("Bien\\n");
else if (note >= 12) printf("Assez bien\\n");
else printf("Passable\\n");`,expected:'Bien',normalize:'trim',explanation:'Première vraie.'},
{id:'ctrl-015',type:'mcq',chapter:'Chapitre 2 — Contrôle',title:'Quand do-while ?',difficulty:3,statement:'Dans quel cas `do-while` ?',multi:false,options:[{id:'a',text:'Exécuter au moins une fois'},{id:'b',text:'Condition fausse dès le départ'},{id:'c',text:'Nombre d\'itérations connu'},{id:'d',text:'Éviter boucle infinie'}],correct:['a'],explanation:'Garantit au moins 1.'},
{id:'ctrl-016',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Imbrication et break',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) break;
        printf("%d%d ", i, j);
    }
}`,expected:'11 21 31 ',normalize:'trim',explanation:'break sort de la boucle interne.'},
{id:'ctrl-017',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'Somme 1 à 100',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`int i, som;
for (i = 1, som = 0; i <= 100; i++) som += i;
printf("somme = %d\\n", som);`,expected:'somme = 5050',normalize:'trim',explanation:'n(n+1)/2 = 5050.'},
{id:'ctrl-018',type:'mcq',chapter:'Chapitre 2 — Contrôle',title:'Signe du produit',difficulty:4,statement:'Signe de A×B sans multiplier ?',multi:false,options:[{id:'a',text:'`(A > 0 && B > 0) || (A < 0 && B < 0)` → positif'},{id:'b',text:'`A * B > 0`'},{id:'c',text:'`A + B > 0`'},{id:'d',text:'`A == B`'}],correct:['a'],explanation:'Règle des signes.'},
{id:'ctrl-019',type:'fillblanks',chapter:'Chapitre 2 — Contrôle',title:'Triangle étoiles',difficulty:4,statement:'Complétez.',template:`int n = 4;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= {{1}}; j++) printf(" ");
    for (int k = 1; k <= {{2}}; k++) printf("*");
    printf("\\n");
}`,blanks:[{id:'1',kind:'select',options:['n - i','i','n','i - 1'],correct:'n - i'},{id:'2',kind:'select',options:['2*i - 1','i','2*i','i + 1'],correct:'2*i - 1'}],explanation:'Espaces : n-i, étoiles : 2i-1.'},
{id:'ctrl-020',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] for avec printf séparé',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int i;
for (i = 1; i < 3; i++)
    printf(" %d \\n", i);
printf("la valeur de i est %d \\n", i);`,expected:' 1 \n 2 \nla valeur de i est 3 ',normalize:'trim-lines',explanation:'i finit à 3.'},
{id:'ctrl-021',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] for avec 2 printf',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int i;
for (i = 1; i < 3; i++) {
    printf(" %d \\n", i);
    printf("la valeur de i est %d \\n", i);
}`,expected:' 1 \nla valeur de i est 1 \n 2 \nla valeur de i est 2 ',normalize:'trim-lines',explanation:'2 itérations.'},
{id:'ctrl-022',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] Programme 4',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int i, j;
for (i = 1; i < 3; i++) {
    for (j = 1; j < 4; j++) {
        printf("i : %d, j : %d \\n", i, j);
        printf("la valeur de j est %d \\n", j);
    }
}
printf("la valeur de i est %d \\n", i);`,expected:'i : 1, j : 1 \nla valeur de j est 1 \ni : 1, j : 2 \nla valeur de j est 2 \ni : 1, j : 3 \nla valeur de j est 3 \ni : 2, j : 1 \nla valeur de j est 1 \ni : 2, j : 2 \nla valeur de j est 2 \ni : 2, j : 3 \nla valeur de j est 3 \nla valeur de i est 3 ',normalize:'trim-lines',explanation:'2×3 = 6.'},
{id:'ctrl-023',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Série 2] break + continue',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`int i, j;
for (i = 0; i < 3; i++) {
    if (i == 1) continue;
    for (j = 0; j < 4; j++) {
        printf("\\n i:%d, et j:%d", i, j);
        if (j == 2) break;
    }
    printf("\\n i:%d, et j:%d", i, j);
}
printf("\\n i:%d, et j:%d", i, j);`,expected:'\n i:0, et j:0\n i:0, et j:1\n i:0, et j:2\n i:0, et j:3\n i:2, et j:0\n i:2, et j:1\n i:2, et j:2\n i:2, et j:3\n i:3, et j:3',normalize:'trim-lines',explanation:'continue saute i=1.'},
{id:'ctrl-024',type:'findbug',chapter:'Chapitre 2 — Contrôle',title:'[Bug] = au lieu de ==',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int x;
    scanf("%d", &x);
    if (x = 5)
        printf("x vaut 5\\n");
    else
        printf("x ne vaut pas 5\\n");
    return 0;
}`,bugLines:[4],explanation:'**Ligne 4** : `if (x = 5)` fait une **affectation**, pas une comparaison. Il faut `if (x == 5)`.'},
{id:'ctrl-025',type:'findbug',chapter:'Chapitre 2 — Contrôle',title:'[Bug] Boucle infinie',difficulty:3,statement:'Cliquez sur la ligne qui cause la boucle infinie.',code:`int main() {
    int i = 0;
    while (i < 10) {
        printf("%d\\n", i);
    }
    return 0;
}`,bugLines:[4],explanation:'**Ligne 4** : `i` n\'est jamais incrémenté.'},
{id:'ctrl-026',type:'findbug',chapter:'Chapitre 2 — Contrôle',title:'[Bug] switch sans break',difficulty:4,statement:'Cliquez sur la ligne où il manque un `break`.',code:`int main() {
    int x = 2;
    switch (x) {
        case 1: printf("un\\n");
        case 2: printf("deux\\n");
        case 3: printf("trois\\n");
    }
    return 0;
}`,bugLines:[5,6],explanation:'**Lignes 5 et 6** : fall-through. Il faut ajouter `break;`.'},
{id:'ctrl-027',type:'predict',chapter:'Chapitre 2 — Contrôle',title:'[Variante] continue sur 6',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`for (int i = 1; i <= 6; i++) {
    if (i == 4) continue;
    if (i == 6) break;
    printf("%d ", i);
}`,expected:'1 2 3 5 ',normalize:'trim',explanation:'4 sauté, 6 arrête.'},
{id:'mem-002',type:'memory',chapter:'Chapitre 2 — Contrôle',title:'[Mémoire] Trace de boucle',difficulty:3,statement:'Après `for (int k=0; k<4; k++) i += k;`, que valent `i` et `k` ?',code:`int i = 0;
for (int k = 0; k < 4; k++)
    i += k;`,memory:[{name:'i',type:'int',address:'F100',expected:'6'},{name:'k',type:'int',address:'F104',expected:'4'}],explanation:'i = 0+0+1+2+3 = 6. k = 4.'},

{id:'tab-001',type:'mcq',chapter:'Chapitre 3 — Tableaux',title:'Dernier indice',difficulty:2,statement:'Dernier indice valide de `int tab[10]` ?',multi:false,options:[{id:'a',text:'10'},{id:'b',text:'9'},{id:'c',text:'11'},{id:'d',text:'Dépend'}],correct:['b'],explanation:'Indices 0..n-1.'},
{id:'tab-002',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Init partielle',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int tab[5] = {11, 12, 13};
for (int i = 0; i < 5; i++) printf("%d ", tab[i]);`,expected:'11 12 13 0 0 ',normalize:'trim',explanation:'Non initialisés → 0.'},
{id:'tab-003',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Taille implicite',difficulty:3,statement:'Taille de `tab` et `tab2` ?',code:`int tab[] = {10, 20, 30, 40, 50};
int tab2[] = {1, 0, 0, 1, 1, 0, 1, 0, 1, 0};`,expected:'5\n10',normalize:'trim-lines',explanation:'Déduite.'},
{id:'tab-004',type:'trace',chapter:'Chapitre 3 — Tableaux',title:'Recherche du maximum',difficulty:3,statement:'Complétez.',code:`int tab[5] = {3, 8, 1, 9, 4};
int max = tab[0];
int indice = 0;
for (int i = 1; i < 5; i++) {
    if (tab[i] > max) { max = tab[i]; indice = i; }
}`,columns:['i','tab[i]','max','indice'],rows:[['1','8','8','1'],['2','1','8','1'],['3','9','9','3'],['4','4','9','3']],normalize:'trim',explanation:'Max = 9 à l\'indice 3.'},
{id:'tab-005',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Inversion',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int tab[6] = {1, 2, 3, 4, 5, 6};
int aide;
for (int i = 0, j = 5; i < j; i++, j--) {
    aide = tab[i]; tab[i] = tab[j]; tab[j] = aide;
}
for (int i = 0; i < 6; i++) printf("%d ", tab[i]);`,expected:'6 5 4 3 2 1 ',normalize:'trim',explanation:'Échange en place.'},
{id:'tab-006',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'Supprimer zéros',difficulty:5,statement:'Complétez.',template:`int tab[8] = {1, 0, 2, 0, 0, 3, 0, 4};
int n = 8, j = 0;
for (int i = 0; i < n; i++) {
    if (tab[i] {{1}} 0) {
        tab[{{2}}] = tab[i];
        j++;
    }
}
n = {{3}};`,blanks:[{id:'1',kind:'select',options:['!=','==','<=','>='],correct:'!='},{id:'2',kind:'select',options:['i','j','i+1','j+1'],correct:'j'},{id:'3',kind:'select',options:['i','j','8','i-1'],correct:'j'}],explanation:'Deux indices.'},
{id:'tab-007',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Tri sélection',difficulty:5,statement:'Après 1 itération ?',code:`int tab[5] = {5, 3, 8, 1, 4};
for (int i = 0; i < 4; i++) {
    int min = i;
    for (int j = i + 1; j < 5; j++)
        if (tab[j] < tab[min]) min = j;
    int aide = tab[i]; tab[i] = tab[min]; tab[min] = aide;
}`,expected:'1 3 8 5 4',normalize:'trim',explanation:'Min placé en position 0.'},
{id:'tab-008',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Tri bulles',difficulty:4,statement:'Après 1 passe ?',code:`int tab[5] = {5, 1, 4, 2, 8};
for (int j = 0; j < 4; j++) {
    if (tab[j] > tab[j+1]) {
        int aide = tab[j]; tab[j] = tab[j+1]; tab[j+1] = aide;
    }
}`,expected:'1 4 2 5 8',normalize:'trim',explanation:'Le plus grand remonte.'},
{id:'tab-009',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Recherche linéaire',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int tab[6] = {11, 22, 33, 44, 55, 66};
int val = 44, pos = -1;
for (int i = 0; i < 6; i++) {
    if (tab[i] == val) { pos = i; break; }
}
printf("Trouvé à l'indice %d\\n", pos);`,expected:'Trouvé à l\'indice 3',normalize:'trim',explanation:'44 à l\'indice 3.'},
{id:'tab-010',type:'mcq',chapter:'Chapitre 3 — Tableaux',title:'Complexité dichotomie',difficulty:3,statement:'Complexité de la recherche dichotomique ?',multi:false,options:[{id:'a',text:'O(1)'},{id:'b',text:'O(log n)'},{id:'c',text:'O(n)'},{id:'d',text:'O(n²)'}],correct:['b'],explanation:'Division par 2.'},
{id:'tab-011',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Fusion tableaux',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`int t1[3] = {1, 3, 5}, t2[3] = {2, 4, 6}, t[6];
int i = 0, j = 0, k = 0;
while (i < 3 && j < 3) {
    if (t1[i] < t2[j]) t[k++] = t1[i++];
    else t[k++] = t2[j++];
}
while (i < 3) t[k++] = t1[i++];
while (j < 3) t[k++] = t2[j++];
for (int m = 0; m < 6; m++) printf("%d ", t[m]);`,expected:'1 2 3 4 5 6 ',normalize:'trim',explanation:'Fusion triée.'},
{id:'tab-012',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Parcours matrice',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int mat[2][3] = {{1, 2, 3}, {4, 5, 6}};
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) printf("%d ", mat[i][j]);
    printf("\\n");
}`,expected:'1 2 3 \n4 5 6 ',normalize:'trim-lines',explanation:'Ligne par ligne.'},
{id:'tab-013',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'Transposée',difficulty:4,statement:'Complétez.',template:`int t[2][3], tr[3][2];
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        tr[{{1}}][{{2}}] = t[i][j];`,blanks:[{id:'1',kind:'select',options:['i','j','i+1','j+1'],correct:'j'},{id:'2',kind:'select',options:['i','j','i+1','j+1'],correct:'i'}],explanation:'`tr[j][i] = t[i][j]`.'},
{id:'tab-014',type:'mcq',chapter:'Chapitre 3 — Tableaux',title:'Tableau en paramètre',difficulty:4,statement:'Que reçoit une fonction à qui on passe `int tab[10]` ?',multi:false,options:[{id:'a',text:'Copie complète'},{id:'b',text:'Pointeur vers le premier élément'},{id:'c',text:'Nombre d\'éléments'},{id:'d',text:'Rien'}],correct:['b'],explanation:'Tableau → pointeur.'},
{id:'tab-015',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'Compression',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`int tab[8] = {1, 1, 2, 2, 2, 1, 1, 1};
int j = 0;
for (int i = 0; i < 8; i++) {
    if (i == 0 || tab[i] != tab[j-1]) tab[j++] = tab[i];
}
for (int i = 0; i < j; i++) printf("%d ", tab[i]);`,expected:'1 2 1 ',normalize:'trim',explanation:'Séquences réduites.'},
{id:'tab-016',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'[Série 3] Séparer positifs/négatifs',difficulty:4,statement:'Complétez.',template:`int tab[50], tpos[50], tneg[50];
int n, i, ip = 0, in = 0;
for (i = 0; i < n; i++) {
    if (tab[i] > 0) {
        tpos[{{1}}] = tab[i];
        {{2}};
    } else if (tab[i] < 0) {
        tneg[{{3}}] = tab[i];
        {{4}};
    }
}`,blanks:[{id:'1',kind:'select',options:['i','ip','in','0'],correct:'ip'},{id:'2',kind:'select',options:['ip++','in++','i++','rien'],correct:'ip++'},{id:'3',kind:'select',options:['i','ip','in','0'],correct:'in'},{id:'4',kind:'select',options:['ip++','in++','i++','rien'],correct:'in++'}],explanation:'Deux compteurs.'},
{id:'tab-017',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'[Série 3] Recherche dichotomique',difficulty:5,statement:'Complétez.',template:`int debut = 0, fin = n - 1, milieu, trouve = 0;
while (debut <= fin && !trouve) {
    milieu = (debut + fin) / 2;
    if (tab[milieu] == val) trouve = 1;
    else if (tab[milieu] < val) debut = {{1}};
    else fin = {{2}};
}`,blanks:[{id:'1',kind:'select',options:['milieu','milieu + 1','milieu - 1','debut + 1'],correct:'milieu + 1'},{id:'2',kind:'select',options:['milieu','milieu + 1','milieu - 1','fin - 1'],correct:'milieu - 1'}],explanation:'Resserrer autour du milieu.'},
{id:'tab-018',type:'fillblanks',chapter:'Chapitre 3 — Tableaux',title:'[Série 3] Fusion triée',difficulty:5,statement:'Complétez.',template:`int i = 0, j = 0, k = 0;
while (i < n1 && j < n2) {
    if (t1[i] < t2[j]) t[k++] = t1[{{1}}];
    else t[k++] = t2[{{2}}];
}
while (i < n1) t[k++] = t1[i++];
while (j < n2) t[k++] = t2[j++];`,blanks:[{id:'1',kind:'select',options:['i++','j++','k++','i'],correct:'i++'},{id:'2',kind:'select',options:['i++','j++','k++','j'],correct:'j++'}],explanation:'Fusion O(n1+n2).'},
{id:'tab-019',type:'findbug',chapter:'Chapitre 3 — Tableaux',title:'[Bug] Débordement de tampon',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int tab[5];
    for (int i = 0; i <= 5; i++) {
        tab[i] = i * 2;
    }
    for (int i = 0; i < 5; i++)
        printf("%d ", tab[i]);
    return 0;
}`,bugLines:[3],explanation:'**Ligne 3** : `i <= 5` fait 6 itérations pour un tableau de 5 éléments. `tab[5]` hors bornes. Écrire `i < 5`.'},
{id:'tab-020',type:'findbug',chapter:'Chapitre 3 — Tableaux',title:'[Bug] Swap incorrect',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int a = 5, b = 10;
    a = b;
    b = a;
    printf("a=%d, b=%d\\n", a, b);
    return 0;
}`,bugLines:[3],explanation:'**Ligne 3** : `a = b` écrase la valeur de `a`. Il faut une variable temporaire.'},
{id:'tab-021',type:'findbug',chapter:'Chapitre 3 — Tableaux',title:'[Bug] Parcours jusqu\'à n inclus',difficulty:3,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int tab[10] = {0};
    int n = 10;
    for (int i = 0; i <= n; i++)
        printf("%d ", tab[i]);
    return 0;
}`,bugLines:[4],explanation:'**Ligne 4** : `i <= n` accède à `tab[10]` → hors bornes.'},
{id:'tab-022',type:'memory',chapter:'Chapitre 3 — Tableaux',title:'[Mémoire] Après inversion',difficulty:4,statement:'Remplissez l\'état final du tableau.',code:`int tab[4] = {10, 20, 30, 40};
for (int i = 0, j = 3; i < j; i++, j--) {
    int tmp = tab[i];
    tab[i] = tab[j];
    tab[j] = tmp;
}`,memory:[{name:'tab[0]',type:'int',address:'F100',expected:'40'},{name:'tab[1]',type:'int',address:'F104',expected:'30'},{name:'tab[2]',type:'int',address:'F108',expected:'20'},{name:'tab[3]',type:'int',address:'F10C',expected:'10'}],explanation:'Inversion complète.'},
{id:'tab-023',type:'memory',chapter:'Chapitre 3 — Tableaux',title:'[Mémoire] Trace tri sélection',difficulty:5,statement:'Après la **première itération complète**, remplissez l\'état du tableau.',code:`int tab[5] = {5, 3, 8, 1, 4};
int min = 0;
for (int j = 1; j < 5; j++)
    if (tab[j] < tab[min]) min = j;
int tmp = tab[0];
tab[0] = tab[min];
tab[min] = tmp;`,memory:[{name:'tab[0]',type:'int',address:'F100',expected:'1'},{name:'tab[1]',type:'int',address:'F104',expected:'3'},{name:'tab[2]',type:'int',address:'F108',expected:'8'},{name:'tab[3]',type:'int',address:'F10C',expected:'5'},{name:'tab[4]',type:'int',address:'F110',expected:'4'}],explanation:'Min (1) en position 0.'},
{id:'tab-024',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'[Variante] Recherche max',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int tab[6] = {7, 2, 9, 4, 11, 3};
int max = tab[0];
for (int i = 1; i < 6; i++)
    if (tab[i] > max) max = tab[i];
printf("%d\\n", max);`,expected:'11',normalize:'trim',explanation:'Maximum = 11.'},
{id:'tab-025',type:'predict',chapter:'Chapitre 3 — Tableaux',title:'[Variante] Somme conditionnelle',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int tab[6] = {1, -2, 3, -4, 5, -6};
int som = 0;
for (int i = 0; i < 6; i++)
    if (tab[i] > 0) som += tab[i];
printf("%d\\n", som);`,expected:'9',normalize:'trim',explanation:'1+3+5 = 9.'},

{id:'ptr-001',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'*q modifie x',difficulty:2,statement:'Qu\'affiche ce programme ?',code:`int x = 5;
int *q = &x;
*q = *q + 10;
printf("%d\\n", x);
printf("%d\\n", *q);`,expected:'15\n15',normalize:'trim-lines',explanation:'`*q = *q + 10` ≡ `x = x + 10`.'},
{id:'ptr-002',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'tab[i] équivalents',difficulty:3,statement:'Équivalents de `tab[i]` ?',multi:true,options:[{id:'a',text:'`*(tab + i)`'},{id:'b',text:'`*(q + i)` avec q=tab'},{id:'c',text:'`*q + i`'},{id:'d',text:'`*(&tab[i])`'}],correct:['a','b','d'],explanation:'`*q + i` = `tab[0] + i`.'},
{id:'ptr-003',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Arithmétique typée',difficulty:4,statement:'`&tab[0] = F800`, int = 4 octets. Quelles adresses ?',code:`int tab[5];
int *q = tab;
printf("%p\\n", (void*)q);
printf("%p\\n", (void*)(q + 1));
printf("%p\\n", (void*)(q + 3));`,expected:'F800\nF804\nF80C',normalize:'trim-lines',explanation:'q+n ajoute n×4 octets.'},
{id:'ptr-004',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'tab est-il un pointeur ?',difficulty:3,statement:'Quelle affirmation est vraie ?',multi:false,options:[{id:'a',text:'On peut écrire `tab++`'},{id:'b',text:'`tab++` est illégal (constante d\'adresse)'},{id:'c',text:'`tab` est une variable modifiable'},{id:'d',text:'`tab` et `&tab` désignent des adresses différentes'}],correct:['b'],explanation:'Constante d\'adresse.'},
{id:'ptr-005',type:'trace',chapter:'Chapitre 4 — Pointeurs',title:'Trace parcours pointeur',difficulty:4,statement:'Complétez. `&tab[0] = F800`.',code:`int tab[5] = {11, 12, 13, 14, 15};
int *q = tab;
for (int i = 0; i < 3; i++) {
    printf("%p → %d\\n", (void*)q, *q);
    q++;
}`,columns:['Itération','q (adresse)','*q (valeur)'],rows:[['1','F800','11'],['2','F804','12'],['3','F808','13']],normalize:'trim',explanation:'q++ avance de 4 octets.'},
{id:'ptr-006',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Allocation correcte',difficulty:3,statement:'Complétez.',template:`int n, *tab;
scanf("%d", &n);
tab = (int*) {{1}}(n * {{2}}(int));
if ({{3}}) {
    printf("Erreur\\n");
    {{4}}(-1);
}`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','realloc'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['tab','!tab','tab == 1','tab != NULL'],correct:'!tab'},{id:'4',kind:'select',options:['return','exit','break','continue'],correct:'exit'}],explanation:'Pattern canonique.'},
{id:'ptr-007',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Priorité * et &',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int x = 5;
int *q = &x;
printf("%d\\n", *q + 1);
printf("%d\\n", *q);
printf("%d\\n", (*q)++);
printf("%d\\n", x);`,expected:'6\n5\n5\n6',normalize:'trim-lines',explanation:'`(*q)++` : affiche 5, puis x = 6.'},
{id:'ptr-008',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'malloc vs calloc',difficulty:3,statement:'Différence principale ?',multi:false,options:[{id:'a',text:'calloc plus rapide'},{id:'b',text:'calloc initialise à 0'},{id:'c',text:'malloc initialise à 0'},{id:'d',text:'Aucune'}],correct:['b'],explanation:'calloc met à 0.'},
{id:'ptr-009',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Soustraction pointeurs',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int tab[10] = {0,1,2,3,4,5,6,7,8,9};
int *q1 = &tab[2];
int *q2 = &tab[7];
printf("%ld\\n", q2 - q1);`,expected:'5',normalize:'trim',explanation:'Nombre d\'éléments.'},
{id:'ptr-010',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Pointeur sur pointeur',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int x = 5;
int *q1 = &x;
int **q2 = &q1;
int ***q3 = &q2;
printf("%d\\n", *q1);
printf("%d\\n", **q2);
printf("%d\\n", ***q3);`,expected:'5\n5\n5',normalize:'trim-lines',explanation:'Chaîne de déréférencements.'},
{id:'ptr-011',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'realloc',difficulty:4,statement:'Complétez.',template:`int *tab = (int*) malloc(100 * sizeof(int));
if (!tab) exit(-1);
tab = (int*) {{1}}(tab, {{2}} * sizeof(int));
if (!tab) exit(-2);
{{3}}(tab);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','realloc','free'],correct:'realloc'},{id:'2',kind:'select',options:['100','130','30','230'],correct:'130'},{id:'3',kind:'select',options:['free','delete','clear','release'],correct:'free'}],explanation:'realloc conserve le contenu.'},
{id:'ptr-012',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Tableau 2D',difficulty:5,statement:'`mat` à F800, int=4. Quelles adresses ?',code:`int mat[3][4];
printf("%p\\n", (void*)mat);
printf("%p\\n", (void*)mat[1]);
printf("%p\\n", (void*)&mat[2][0]);`,expected:'F800\nF810\nF820',normalize:'trim-lines',explanation:'Ligne i : F800 + i×16.'},
{id:'ptr-013',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Dangling pointer',difficulty:5,statement:'Que se passe-t-il ?',code:`int *p = (int*) malloc(sizeof(int));
*p = 42;
free(p);
printf("%d\\n", *p);`,multi:false,options:[{id:'a',text:'Affiche 42'},{id:'b',text:'Affiche 0'},{id:'c',text:'Erreur de compilation'},{id:'d',text:'Comportement indéfini'}],correct:['d'],explanation:'Dangling pointer → UB.'},
{id:'ptr-014',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Comparaison pointeurs',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int tab[5] = {1, 2, 3, 4, 5};
int *q1 = &tab[1];
int *q2 = &tab[3];
if (q1 < q2) printf("q1 avant q2\\n");
printf("%ld\\n", q2 - q1);`,expected:'q1 avant q2\n2',normalize:'trim-lines',explanation:'Comparaison par indices.'},
{id:'ptr-015',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Les 4 formalismes',difficulty:5,statement:'Complétez.',template:`int tab[5] = {10, 20, 30, 40, 50};
int *q = tab;
for (int i = 0; i < 5; i++)
    printf("%d ", tab[i]);
for (int i = 0; i < 5; i++)
    printf("%d ", *{{1}});
for (int i = 0; i < 5; i++)
    printf("%d ", *{{2}});
for (q = tab; q < tab + 5; {{3}})
    printf("%d ", *q);`,blanks:[{id:'1',kind:'select',options:['(tab + i)','(tab + 1)','tab + i','tab'],correct:'(tab + i)'},{id:'2',kind:'select',options:['(q + i)','(q + 1)','q + i','q'],correct:'(q + i)'},{id:'3',kind:'select',options:['q++','i++','++q','q += 4'],correct:'q++',accept:['++q']}],explanation:'4 formalismes. `++q` accepté.'},
{id:'ptr-016',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Adresse vs contenu',difficulty:3,statement:'Que vaut `q` si `int *q = &x;` ?',multi:false,options:[{id:'a',text:'La valeur de x'},{id:'b',text:'L\'adresse de x'},{id:'c',text:'L\'adresse de q'},{id:'d',text:'NULL'}],correct:['b'],explanation:'q contient une adresse.'},
{id:'ptr-017',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'q1 = q2',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int a = 10, b = 20;
int *q1 = &a, *q2 = &b;
q1 = q2;
*q1 = 99;
printf("%d %d\\n", a, b);`,expected:'10 99',normalize:'trim',explanation:'q1 pointe sur b.'},
{id:'ptr-018',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Matrice dynamique',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`int **t = (int**) malloc(2 * sizeof(int*));
for (int i = 0; i < 2; i++) *(t + i) = (int*) malloc(3 * sizeof(int));
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        *(*(t + i) + j) = i * 10 + j;
for (int i = 0; i < 2; i++)
    for (int j = 0; j < 3; j++)
        printf("%d ", *(*(t + i) + j));`,expected:'0 1 2 10 11 12 ',normalize:'trim',explanation:'Deux allocations.'},
{id:'ptr-019',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Adresse invalide',difficulty:3,statement:'Que vaut `&5` ?',multi:false,options:[{id:'a',text:'Une adresse valide'},{id:'b',text:'Erreur de compilation'},{id:'c',text:'0'},{id:'d',text:'NULL'}],correct:['b'],explanation:'`&` ne s\'applique qu\'à des objets.'},
{id:'ptr-020',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Pointeur NULL',difficulty:3,statement:'Qu\'affiche ce programme ?',code:`int *q = NULL;
if (q) printf("Non nul\\n");
else printf("Nul\\n");
if (q == NULL) printf("Est NULL\\n");`,expected:'Nul\nEst NULL',normalize:'trim-lines',explanation:'NULL = 0 = faux.'},
{id:'ptr-021',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Pointeur et fonction',difficulty:5,statement:'Complétez.',template:`void echange(int *a, int *b) {
    int tmp = {{1}};
    *a = {{2}};
    *b = {{3}};
}
int main() {
    int x = 5, y = 10;
    echange({{4}}, {{5}});
}`,blanks:[{id:'1',kind:'select',options:['*a','a','&a','*b'],correct:'*a'},{id:'2',kind:'select',options:['*a','a','*b','b'],correct:'*b'},{id:'3',kind:'select',options:['*a','a','tmp','&tmp'],correct:'tmp'},{id:'4',kind:'select',options:['&x','x','*x','&(x)'],correct:'&x'},{id:'5',kind:'select',options:['&y','y','*y','&(y)'],correct:'&y'}],explanation:'Passage par adresse.'},
{id:'ptr-022',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'sizeof pointeur',difficulty:3,statement:'Sur 64-bit ?',code:`int *p; char *q; double *r;
printf("%zu\\n", sizeof(p));
printf("%zu\\n", sizeof(q));
printf("%zu\\n", sizeof(r));`,expected:'8\n8\n8',normalize:'trim-lines',explanation:'Tous les pointeurs : 8 octets.'},
{id:'ptr-023',type:'mcq',chapter:'Chapitre 4 — Pointeurs',title:'Oublier free',difficulty:3,statement:'Que se passe-t-il si on oublie free ?',multi:false,options:[{id:'a',text:'Erreur de compilation'},{id:'b',text:'Erreur à l\'exécution'},{id:'c',text:'Fuite mémoire'},{id:'d',text:'Rien'}],correct:['c'],explanation:'Fuite mémoire.'},
{id:'ptr-024',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'Équivalence',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int tab[3] = {10, 20, 30};
int *q = tab;
printf("%d\\n", *q);
printf("%d\\n", *(q + 1));
printf("%d\\n", *(q + 2));
printf("%d\\n", q[1]);`,expected:'10\n20\n30\n20',normalize:'trim-lines',explanation:'`q[i]` ≡ `*(q+i)`.'},
{id:'ptr-025',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'Libération matrice',difficulty:5,statement:'Complétez.',template:`int l = 3, c = 4;
int **t = (int**) malloc(l * sizeof(int*));
for (int i = 0; i < l; i++)
    *(t + i) = (int*) malloc(c * sizeof(int));

for (int i = 0; i < l; i++) {
    {{1}}(*(t + i));
}
{{2}}(t);
t = {{3}};`,blanks:[{id:'1',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'2',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'3',kind:'select',options:['NULL','0','malloc(0)','(int**)0'],correct:'NULL'}],explanation:'Ordre inverse.'},
{id:'ptr-026',type:'trace',chapter:'Chapitre 4 — Pointeurs',title:'[Série 4] Trace A/B/C/P1/P2',difficulty:5,statement:'Remplissez les valeurs après chaque instruction.',code:`int A = 1, B = 2, C = 3;
int *P1, *P2;
P1 = &A;
P2 = &C;
*P1 = (*P2)++;
P1 = P2;`,columns:['Étape','A','B','C','*P1','*P2'],rows:[['Initial','1','2','3','—','—'],['P1 = &A','1','2','3','1','—'],['P2 = &C','1','2','3','1','3'],['*P1 = (*P2)++','3','2','4','3','4'],['P1 = P2','3','2','4','4','4']],normalize:'trim',explanation:'`(*P2)++` : post-incrémentation sur C.'},
{id:'ptr-027',type:'fillblanks',chapter:'Chapitre 4 — Pointeurs',title:'[Série 4] Copie de tableaux',difficulty:4,statement:'Complétez.',template:`int *tab1 = (int*) malloc(n * sizeof(int));
int *tab2 = (int*) malloc(n * sizeof(int));
int *tab3 = (int*) malloc(2 * n * sizeof(int));
for (int i = 0; i < n; i++) tab3[i] = tab1[i];
for (int i = 0; i < n; i++) tab3[{{1}}] = tab2[i];`,blanks:[{id:'1',kind:'select',options:['i','n + i','2 * i','i + n - 1'],correct:'n + i'}],explanation:'tab2 après tab1.'},
{id:'ptr-028',type:'findbug',chapter:'Chapitre 4 — Pointeurs',title:'[Bug] malloc sans sizeof',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int n = 10;
    int *tab;
    tab = (int*) malloc(n);
    if (!tab) return 1;
    for (int i = 0; i < n; i++)
        tab[i] = i;
    free(tab);
    return 0;
}`,bugLines:[4],explanation:'**Ligne 4** : `malloc(n)` réserve **n octets** au lieu de `n * sizeof(int)`. Écrire `malloc(n * sizeof(int))`.'},
{id:'ptr-029',type:'findbug',chapter:'Chapitre 4 — Pointeurs',title:'[Bug] Pointeur non initialisé',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int *p;
    *p = 42;
    printf("%d\\n", *p);
    return 0;
}`,bugLines:[3],explanation:'**Ligne 3** : `p` n\'est **jamais initialisé**. Il contient une adresse aléatoire → comportement indéfini.'},
{id:'ptr-030',type:'findbug',chapter:'Chapitre 4 — Pointeurs',title:'[Bug] Oubli de & dans scanf',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug.',code:`int main() {
    int x;
    int *p = &x;
    scanf("%d", x);
    printf("%d\\n", x);
    return 0;
}`,bugLines:[4],explanation:'**Ligne 4** : `scanf` exige une **adresse mémoire**. Passer `x` au lieu de `&x` (ou du pointeur `p`) transmet une valeur non initialisée au lieu d\'une adresse, ce qui provoque une **corruption mémoire** ou une **erreur de segmentation**.\n\n✅ Écritures correctes : `scanf("%d", &x);` ou `scanf("%d", p);`.'},
{id:'ptr-031',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'[Variante] q avance de 2',difficulty:4,statement:'Quelles adresses sont affichées ? (int = 4, tab[0] = F800)',code:`int tab[10];
int *q = tab + 2;
printf("%p\\n", (void*)q);
printf("%p\\n", (void*)(q + 2));`,expected:'F808\nF810',normalize:'trim-lines',explanation:'q = F800 + 2×4 = F808. q+2 = F810.'},
{id:'ptr-032',type:'predict',chapter:'Chapitre 4 — Pointeurs',title:'[Variante] Deux pointeurs',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`int tab[5] = {1, 2, 3, 4, 5};
int *p = &tab[0];
int *q = &tab[4];
printf("%ld\\n", q - p);
printf("%d\\n", *p);
printf("%d\\n", *q);`,expected:'4\n1\n5',normalize:'trim-lines',explanation:'4 éléments entre les deux.'},
{id:'ptr-033',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Après *q = 42',difficulty:3,statement:'Remplissez l\'état final.',code:`int x = 5;
int *q = &x;
*q = 42;`,memory:[{name:'x',type:'int',address:'F802',expected:'42'},{name:'q',type:'int*',address:'F400',expected:'F802'}],explanation:'q contient F802 (adresse de x). x = 42.'},
{id:'ptr-034',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Arithmétique typée',difficulty:4,statement:'Remplissez les valeurs (int = 4, &tab[0] = F800).',code:`int tab[4] = {10, 20, 30, 40};
int *q = tab;
q++;
q++;`,memory:[{name:'tab[0]',type:'int',address:'F800',expected:'10'},{name:'tab[1]',type:'int',address:'F804',expected:'20'},{name:'tab[2]',type:'int',address:'F808',expected:'30'},{name:'tab[3]',type:'int',address:'F80C',expected:'40'},{name:'q',type:'int*',address:'F400',expected:'F808'}],explanation:'Après 2 incréments, q pointe sur F808.'},
{id:'ptr-035',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Deux pointeurs sur même case',difficulty:4,statement:'Remplissez l\'état final.',code:`int a = 10, b = 20;
int *q1 = &a;
int *q2 = &b;
q1 = q2;
*q1 = 99;`,memory:[{name:'a',type:'int',address:'F100',expected:'10'},{name:'b',type:'int',address:'F104',expected:'99'},{name:'q1',type:'int*',address:'F400',expected:'F104'},{name:'q2',type:'int*',address:'F404',expected:'F104'}],explanation:'q1 et q2 pointent sur b.'},
{id:'ptr-036',type:'memory',chapter:'Chapitre 4 — Pointeurs',title:'[Mémoire] Tableau via pointeur',difficulty:4,statement:'Remplissez l\'état final (int = 4, &tab[0] = F800).',code:`int tab[3];
int *q = tab;
q[0] = 5;
*(q + 1) = 10;
tab[2] = 15;`,memory:[{name:'tab[0]',type:'int',address:'F800',expected:'5'},{name:'tab[1]',type:'int',address:'F804',expected:'10'},{name:'tab[2]',type:'int',address:'F808',expected:'15'},{name:'q',type:'int*',address:'F400',expected:'F800'}],explanation:'3 notations pour les mêmes cases.'},

{id:'struct-001',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Accès via pointeur',difficulty:2,statement:'Équivalent de `e->ce` ?',multi:false,options:[{id:'a',text:'`*e.ce`'},{id:'b',text:'`(*e).ce`'},{id:'c',text:'`&e.ce`'},{id:'d',text:'`e.ce`'}],correct:['b'],explanation:'`e->ce` = `(*e).ce`.'},
{id:'struct-002',type:'predict',chapter:'Chapitre 5 — Structures',title:'Précédence -> et &',difficulty:4,statement:'Quelles adresses ?',code:`ETUDIANT etd;
ETUDIANT *e = &etd;
printf("%p\\n", (void*)&e->ce);
printf("%p\\n", (void*)&e->notes);
printf("%p\\n", (void*)&(e->ce));`,expected:'F100\nF150\nF100',normalize:'trim-lines',explanation:'`->` prioritaire sur `&`.'},
{id:'struct-003',type:'predict',chapter:'Chapitre 5 — Structures',title:'Imbrication',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`typedef struct { int jour, mois, annee; } DATE;
typedef struct { int ce; DATE date_naiss; float moyenne; } ETUDIANT;
ETUDIANT etd;
etd.ce = 999;
etd.date_naiss.jour = 12;
etd.date_naiss.mois = 10;
etd.date_naiss.annee = 1993;
printf("%d\\n", etd.ce);
printf("%d/%d/%d\\n", etd.date_naiss.jour, etd.date_naiss.mois, etd.date_naiss.annee);`,expected:'999\n12/10/1993',normalize:'trim-lines',explanation:'Accès en cascade.'},
{id:'struct-004',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Saisie via pointeur',difficulty:4,statement:'Complétez.',template:`ETUDIANT etd;
ETUDIANT *e = &etd;
scanf("%d", {{1}});
scanf("%d%d%d", {{2}}, {{3}}, {{4}});`,blanks:[{id:'1',kind:'select',options:['&e->ce','&e.ce','e->ce','&(*e).ce'],correct:'&e->ce'},{id:'2',kind:'select',options:['&e->date_naiss.jour','&e.date_naiss.jour','e->date_naiss.jour','&e.date_naiss->jour'],correct:'&e->date_naiss.jour'},{id:'3',kind:'select',options:['&e->date_naiss.mois','&e.date_naiss.mois','e->date_naiss.mois','&e.date_naiss->mois'],correct:'&e->date_naiss.mois'},{id:'4',kind:'select',options:['&e->date_naiss.annee','&e.date_naiss.annee','e->date_naiss.annee','&e.date_naiss->annee'],correct:'&e->date_naiss.annee'}],explanation:'scanf a besoin d\'adresses.'},
{id:'struct-005',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Affectation structures',difficulty:3,statement:'`etd = et;` fait ?',multi:false,options:[{id:'a',text:'Illégal'},{id:'b',text:'Copie 1er champ'},{id:'c',text:'Copie tous les champs'},{id:'d',text:'Pointeur'}],correct:['c'],explanation:'Copie membre à membre.'},
{id:'struct-006',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau pointeurs',difficulty:5,statement:'Quelles valeurs ?',code:`ETUDIANT *tab[2];
tab[0] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[1] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[0]->ce = 999;
tab[1]->ce = 888;
printf("%d\\n", tab[0]->ce);
printf("%d\\n", (*(tab + 1))->ce);
printf("%d\\n", tab[1]->ce);`,expected:'999\n888\n888',normalize:'trim-lines',explanation:'3 notations équivalentes.'},
{id:'struct-007',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Tableau dyn. pointeurs',difficulty:5,statement:'Complétez.',template:`int n;
ETUDIANT **tab;
scanf("%d", &n);
tab = (ETUDIANT**) {{1}}(n * {{2}}(ETUDIANT*));
if (!tab) exit(-1);
for (int i = 0; i < n; i++) {
    *(tab + i) = (ETUDIANT*) {{3}}({{4}}(ETUDIANT));
    if (!*(tab + i)) exit(-2);
}
for (int i = 0; i < n; i++) {{5}}(*(tab + i));
{{6}}(tab);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','sizeof'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['malloc','calloc','free','sizeof'],correct:'malloc'},{id:'4',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'5',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'6',kind:'select',options:['free','malloc','delete','clear'],correct:'free'}],explanation:'Double allocation + libération inverse.'},
{id:'struct-008',type:'mcq',chapter:'Chapitre 5 — Structures',title:'4 formes tableaux',difficulty:4,statement:'Tableau dynamique d\'adresses ?',multi:false,options:[{id:'a',text:'`ETUDIANT tab[2];`'},{id:'b',text:'`ETUDIANT *tab;`'},{id:'c',text:'`ETUDIANT *tab[2];`'},{id:'d',text:'`ETUDIANT **tab;`'}],correct:['d'],explanation:'`**` = tableau dynamique de pointeurs.'},
{id:'struct-009',type:'predict',chapter:'Chapitre 5 — Structures',title:'Champ tableau statique',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`ETUDIANT etd;
etd.ce = 999;
etd.notes[0] = 14.5;
etd.notes[1] = 15.5;
etd.notes[2] = 16.5;
for (int i = 0; i < 3; i++) printf("%.1f ", etd.notes[i]);`,expected:'14.5 15.5 16.5 ',normalize:'trim',explanation:'Accès etd.notes[i].'},
{id:'struct-010',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Champ tableau dynamique',difficulty:5,statement:'Complétez.',template:`ETUDIANT etd;
scanf("%d", &etd.nb_notes);
etd.notes = (float*) {{1}}(etd.nb_notes * {{2}}(float));
if (!etd.notes) exit(-1);
for (int i = 0; i < etd.nb_notes; i++)
    scanf("%f", {{3}});
{{4}}(etd.notes);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','realloc'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['&etd.notes[i]','etd.notes[i]','&etd->notes[i]','etd.notes+i'],correct:'&etd.notes[i]'},{id:'4',kind:'select',options:['free','malloc','delete','clear'],correct:'free'}],explanation:'Champ pointeur + allocation.'},
{id:'struct-011',type:'predict',chapter:'Chapitre 5 — Structures',title:'Pointeur + allocation',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`ETUDIANT *e = (ETUDIANT*) malloc(sizeof(ETUDIANT));
e->ce = 999;
e->moyenne = 17.32;
printf("%d %.2f\\n", e->ce, e->moyenne);
free(e);
e = NULL;
printf("%s\\n", e == NULL ? "Libéré" : "Non nul");`,expected:'999 17.32\nLibéré',normalize:'trim-lines',explanation:'Pattern allocation + libération.'},
{id:'struct-012',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau statique structures',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`ETUDIANT tab[3];
for (int i = 0; i < 3; i++) {
    tab[i].ce = 100 + i;
    tab[i].moyenne = 10.0 + i;
}
for (int i = 0; i < 3; i++) printf("%d %.1f\\n", tab[i].ce, tab[i].moyenne);`,expected:'100 10.0\n101 11.0\n102 12.0',normalize:'trim-lines',explanation:'Accès tab[i].champ.'},
{id:'struct-013',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau statique pointeurs',difficulty:5,statement:'Quelles valeurs ?',code:`ETUDIANT *tab[2];
tab[0] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[1] = (ETUDIANT*) malloc(sizeof(ETUDIANT));
tab[0]->ce = 100;
tab[1]->ce = 200;
printf("%d\\n", tab[0]->ce);
printf("%d\\n", (*tab[1]).ce);
printf("%d\\n", (*tab)->ce);`,expected:'100\n200\n100',normalize:'trim-lines',explanation:'`(*tab)->ce` = `tab[0]->ce`.'},
{id:'struct-014',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Structure en paramètre',difficulty:4,statement:'Que se passe-t-il en passant une structure à une fonction ?',multi:false,options:[{id:'a',text:'Copiée par valeur'},{id:'b',text:'Pointeur passé'},{id:'c',text:'Erreur'},{id:'d',text:'Dépend'}],correct:['a'],explanation:'Passage par valeur.'},
{id:'struct-015',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tableau dynamique adresses',difficulty:5,statement:'Quelles valeurs ?',code:`int n = 3;
ETUDIANT **tab;
tab = (ETUDIANT**) malloc(n * sizeof(ETUDIANT*));
for (int i = 0; i < n; i++) {
    *(tab + i) = (ETUDIANT*) malloc(sizeof(ETUDIANT));
    (*(tab + i))->ce = 100 + i;
}
for (int i = 0; i < n; i++) printf("%d ", (*(tab + i))->ce);`,expected:'100 101 102 ',normalize:'trim',explanation:'Double allocation.'},
{id:'struct-016',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'typedef',difficulty:3,statement:'Complétez.',template:`struct date { int jour, mois, annee; };
{{1}} struct date {{2}};
struct etudiant { int ce; DATE date_naiss; };
{{3}} struct etudiant {{4}};`,blanks:[{id:'1',kind:'select',options:['typedef','struct','define','type'],correct:'typedef'},{id:'2',kind:'select',options:['DATE','date','DATE_T','D'],correct:'DATE'},{id:'3',kind:'select',options:['typedef','struct','define','type'],correct:'typedef'},{id:'4',kind:'select',options:['ETUDIANT','etudiant','ETU','E'],correct:'ETUDIANT'}],explanation:'typedef crée un synonyme.'},
{id:'struct-017',type:'predict',chapter:'Chapitre 5 — Structures',title:'sizeof structure',difficulty:4,statement:'On suppose `int` et `float` = **4 octets** chacun, sans alignement. Combien vaut `sizeof(ETUDIANT)` ?',code:`typedef struct {
    int ce;
    int jour, mois, annee;
    float moyenne;
} ETUDIANT;`,expected:'20',normalize:'trim',explanation:'5 × 4 = 20 octets.'},
{id:'struct-018',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Moyenne des notes',difficulty:4,statement:'Comment calculer la moyenne ?',multi:false,options:[{id:'a',text:'`etd.notes / etd.nb_notes`'},{id:'b',text:'Boucle qui somme puis divise'},{id:'c',text:'`sum(etd.notes)`'},{id:'d',text:'Impossible'}],correct:['b'],explanation:'Boucle obligatoire en C.'},
{id:'struct-019',type:'predict',chapter:'Chapitre 5 — Structures',title:'Tri structures',difficulty:5,statement:'Après tri, ce en position 0 ?',code:`ETUDIANT tab[3];
tab[0].ce = 100; tab[0].moyenne = 12.5;
tab[1].ce = 101; tab[1].moyenne = 15.8;
tab[2].ce = 102; tab[2].moyenne = 14.2;
for (int i = 0; i < 2; i++)
    for (int j = i + 1; j < 3; j++)
        if (tab[j].moyenne > tab[i].moyenne) {
            ETUDIANT tmp = tab[i]; tab[i] = tab[j]; tab[j] = tmp;
        }
printf("%d\\n", tab[0].ce);`,expected:'101',normalize:'trim',explanation:'Tri décroissant.'},
{id:'struct-020',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Recherche dans tableau',difficulty:4,statement:'Complétez.',template:`int recherche = 42, trouve = 0;
for (int i = 0; i < n; i++) {
    if ({{1}} == recherche) {
        trouve = 1;
        {{2}};
    }
}
if ({{3}}) printf("Non trouvé\\n");`,blanks:[{id:'1',kind:'select',options:['tab[i].ce','tab.ce','tab[i]->ce','tab[i]'],correct:'tab[i].ce'},{id:'2',kind:'select',options:['break','continue','return','exit'],correct:'break'},{id:'3',kind:'select',options:['!trouve','trouve','trouve == 1','trouve != 0'],correct:'!trouve'}],explanation:'Drapeau trouve.'},
{id:'struct-021',type:'predict',chapter:'Chapitre 5 — Structures',title:'Notes et pointeur',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`float notes[3] = {10.5, 12.5, 15.5};
float *p = notes;
float *q = notes + 2;
printf("%.1f\\n", *p);
printf("%.1f\\n", *q);
printf("%.1f\\n", *(p + 1));
printf("%ld\\n", q - p);`,expected:'10.5\n15.5\n12.5\n2',normalize:'trim-lines',explanation:'q-p = nb d\'éléments.'},
{id:'struct-022',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Structure imbriquée via pointeur',difficulty:3,statement:'Accès via `e` pointeur sur ETUDIANT ?',multi:false,options:[{id:'a',text:'`e.date_naiss.jour`'},{id:'b',text:'`e->date_naiss.jour`'},{id:'c',text:'`e.date_naiss->jour`'},{id:'d',text:'`e->date_naiss->jour`'}],correct:['b'],explanation:'Un seul `->`.'},
{id:'struct-023',type:'predict',chapter:'Chapitre 5 — Structures',title:'Moyenne pondérée',difficulty:5,statement:'Qu\'affiche ce programme ?',code:`typedef struct { float tp, ds, examen; } NOTES;
NOTES n = {12.0, 14.0, 16.0};
float moyenne = n.tp * 0.2 + n.ds * 0.3 + n.examen * 0.5;
printf("%.2f\\n", moyenne);`,expected:'14.60',normalize:'trim',explanation:'12×0.2 + 14×0.3 + 16×0.5 = 14.6.'},
{id:'struct-024',type:'fillblanks',chapter:'Chapitre 5 — Structures',title:'Structure + tableau dynamique',difficulty:5,statement:'Complétez.',template:`ETUDIANT *e = (ETUDIANT*) malloc(sizeof(ETUDIANT));
scanf("%d", &e->nb_notes);
e->notes = (float*) {{1}}(e->nb_notes * {{2}}(float));
if (!e->notes) exit(-1);
for (int i = 0; i < e->nb_notes; i++)
    scanf("%f", {{3}});
{{4}}(e->notes);
{{5}}(e);`,blanks:[{id:'1',kind:'select',options:['malloc','calloc','free','realloc'],correct:'malloc'},{id:'2',kind:'select',options:['sizeof','size','len','malloc'],correct:'sizeof'},{id:'3',kind:'select',options:['&e->notes[i]','e->notes[i]','&e.notes[i]','e.notes+i'],correct:'&e->notes[i]'},{id:'4',kind:'select',options:['free','malloc','delete','clear'],correct:'free'},{id:'5',kind:'select',options:['free','malloc','delete','clear'],correct:'free'}],explanation:'Libérer d\'abord notes, puis e.'},
{id:'struct-025',type:'mcq',chapter:'Chapitre 5 — Structures',title:'Modèle vs variable',difficulty:2,statement:'Peut-on avoir plusieurs variables d\'un même modèle ?',multi:false,options:[{id:'a',text:'Non'},{id:'b',text:'Oui'},{id:'c',text:'Seulement 2'},{id:'d',text:'Dépend'}],correct:['b'],explanation:'Un modèle est un type.'},
{id:'struct-026',type:'mcq',chapter:'Chapitre 5 — Structures',title:'[Série 5] Q1 — Remplir et afficher',difficulty:3,statement:'Pour remplir une variable `ETUDIANT etd`, quelle écriture est correcte ?',multi:false,options:[{id:'a',text:'`scanf("%d", etd.ce);`'},{id:'b',text:'`scanf("%d", &etd.ce);`'},{id:'c',text:'`scanf("%d", etd->ce);`'},{id:'d',text:'`scanf("%d", *etd.ce);`'}],correct:['b'],explanation:'Il faut l\'adresse : `&etd.ce`.'},
{id:'struct-027',type:'mcq',chapter:'Chapitre 5 — Structures',title:'[Série 5] Q2 — Pointeur sur variable',difficulty:4,statement:'Avec `ETUDIANT etd; ETUDIANT *e = &etd;`, comment accéder à `ce` ?',multi:false,options:[{id:'a',text:'`e.ce`'},{id:'b',text:'`(*e).ce` ou `e->ce`'},{id:'c',text:'`&e.ce`'},{id:'d',text:'`*e.ce`'}],correct:['b'],explanation:'Équivalentes.'},
{id:'struct-028',type:'mcq',chapter:'Chapitre 5 — Structures',title:'[Série 5] Q3 — Tableau dynamique',difficulty:4,statement:'Pour un tableau dynamique de `n` ETUDIANT, quelle déclaration ?',multi:false,options:[{id:'a',text:'`ETUDIANT tab[n];`'},{id:'b',text:'`ETUDIANT *tab = malloc(n * sizeof(ETUDIANT));`'},{id:'c',text:'`ETUDIANT **tab;`'},{id:'d',text:'`ETUDIANT tab[];`'}],correct:['b'],explanation:'Pointeur + malloc = tableau dynamique.'},
{id:'struct-029',type:'findbug',chapter:'Chapitre 5 — Structures',title:'[Bug] -> vs .',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug.',code:`typedef struct { int ce; float moyenne; } ETUDIANT;
int main() {
    ETUDIANT etd;
    ETUDIANT *e = &etd;
    e.ce = 999;
    e->moyenne = 15.5;
    return 0;
}`,bugLines:[5],explanation:'**Ligne 5** : `e` est un pointeur, il faut `e->ce = 999;` ou `(*e).ce = 999;`.'},
{id:'struct-030',type:'findbug',chapter:'Chapitre 5 — Structures',title:'[Bug] Modification perdue',difficulty:4,statement:'Cliquez sur la ligne qui contient le bug.',code:`typedef struct { int ce; } ETUDIANT;
void remplir(ETUDIANT e) {
    e.ce = 42;
}
int main() {
    ETUDIANT etd;
    remplir(etd);
    printf("%d\\n", etd.ce);
    return 0;
}`,bugLines:[2,3],explanation:'**Lignes 2-3** : passage par valeur. Il faut `void remplir(ETUDIANT *e) { e->ce = 42; }` et `remplir(&etd);`.'},
{id:'struct-031',type:'memory',chapter:'Chapitre 5 — Structures',title:'[Mémoire] Champ de structure',difficulty:3,statement:'Remplissez l\'état final.',code:`typedef struct { int ce; float moyenne; } ETUDIANT;
ETUDIANT etd;
etd.ce = 999;
etd.moyenne = 15.5;`,memory:[{name:'etd.ce',type:'int',address:'F100',expected:'999'},{name:'etd.moyenne',type:'float',address:'F104',expected:'15.5'}],explanation:'Chaque champ a sa propre adresse.'},
{id:'struct-032',type:'memory',chapter:'Chapitre 5 — Structures',title:'[Mémoire] Structure via pointeur',difficulty:4,statement:'Remplissez l\'état final.',code:`typedef struct { int ce; } ETUDIANT;
ETUDIANT etd;
ETUDIANT *e = &etd;
e->ce = 500;
etd.ce = etd.ce + 100;`,memory:[{name:'etd.ce',type:'int',address:'F100',expected:'600'},{name:'e',type:'ETUDIANT*',address:'F400',expected:'F100'}],explanation:'e->ce ≡ etd.ce.'},
{id:'struct-033',type:'memory',chapter:'Chapitre 5 — Structures',title:'[Mémoire] Tableau de structures',difficulty:4,statement:'Remplissez l\'état final.',code:`typedef struct { int ce; } ETUDIANT;
ETUDIANT tab[3];
tab[0].ce = 10;
tab[1].ce = 20;
tab[2].ce = 30;`,memory:[{name:'tab[0].ce',type:'int',address:'F100',expected:'10'},{name:'tab[1].ce',type:'int',address:'F104',expected:'20'},{name:'tab[2].ce',type:'int',address:'F108',expected:'30'}],explanation:'Tableau statique de structures.'},
{id:'struct-034',type:'findbug',chapter:'Chapitre 5 — Structures',title:'[Bug] Accès après free',difficulty:5,statement:'Cliquez sur la ligne qui contient le bug.',code:`typedef struct { int ce; } ETUDIANT;
int main() {
    ETUDIANT *e = (ETUDIANT*) malloc(sizeof(ETUDIANT));
    e->ce = 42;
    free(e);
    printf("%d\\n", e->ce);
    return 0;
}`,bugLines:[6],explanation:'**Ligne 6** : après `free(e)`, `e` est un dangling pointer. Accès = UB. Lire avant free, ou faire `e = NULL;`.'},
{id:'struct-035',type:'predict',chapter:'Chapitre 5 — Structures',title:'[Variante] Affectation globale',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`typedef struct { int ce; int note; } ETUDIANT;
ETUDIANT a, b;
a.ce = 100; a.note = 15;
b.ce = 200; b.note = 18;
a = b;
a.note = 5;
printf("%d %d\\n", b.ce, b.note);`,expected:'200 18',normalize:'trim',explanation:'`a = b` copie. Modifier a.note ensuite n\'affecte pas b.'},
{id:'struct-036',type:'predict',chapter:'Chapitre 5 — Structures',title:'[Variante] Pointeur sur structure',difficulty:4,statement:'Qu\'affiche ce programme ?',code:`typedef struct { int ce; } ETUDIANT;
ETUDIANT etd;
etd.ce = 42;
ETUDIANT *p = &etd;
p->ce = p->ce + 8;
printf("%d\\n", etd.ce);
printf("%d\\n", p->ce);`,expected:'50\n50',normalize:'trim-lines',explanation:'Les deux notations pour la même case.'},

];

// Exposer la banque au scope global
window.EXERCISES = EXERCISES;