/* Logique du site : navigation, console Python, exercices, animations */
try {

/* Exercices : banque générée + regroupement par thème puis par niveau */

(function () {
  const BANK = window.EXERCISE_BANK;
  const PATH = [["Afficher du texte avec print()", "debutant", ["ex31", "b1", "b2", "b3", "b4", "b5", "b6", "b7"]], ["Les variables", "debutant", ["ex32", "b8", "b9", "b10", "b11", "b12"]], ["Corriger les erreurs classiques", "debutant", ["ex33", "ex34", "ex35"]], ["Calculs et opérateurs", "debutant", ["b13", "b14", "b15", "b16"]], ["Conditions : if / else", "debutant", ["b17", "b18", "b19", "b20", "b21"]], ["Boucles for", "debutant", ["ex2", "b22", "b23", "b24", "b25", "b26", "b27", "b28", "ex3"]], ["Boucles while", "intermediaire", ["b29", "b30", "b31"]], ["Ma première fonction", "debutant", ["b32", "c1", "c2", "c3", "g1", "g2", "g3", "g4", "g5", "ex1"]], ["Fonctions : conditions et boucles", "intermediaire", ["g6", "g7", "g8", "g9", "g10"]], ["Défis", "difficile", ["g11"]]];
  const T = { bases: ['<svg class=ico aria-hidden=true><use href=#i-sprout></use></svg>', 'Bases'], listes: ['<svg class=ico aria-hidden=true><use href=#i-clipboard-list></use></svg>', 'Listes'], stats: ['<svg class=ico aria-hidden=true><use href=#i-chart-column></use></svg>', 'Statistiques'], comprehension: ['<svg class=ico aria-hidden=true><use href=#i-zap></use></svg>', 'Compréhension'], texte: ['<svg class=ico aria-hidden=true><use href=#i-type></use></svg>', 'Texte'], tri: ['<svg class=ico aria-hidden=true><use href=#i-shuffle></use></svg>', 'Tris'], recherche: ['<svg class=ico aria-hidden=true><use href=#i-search></use></svg>', 'Recherche'], tableaux: ['<svg class=ico aria-hidden=true><use href=#i-grid-3x3></use></svg>', 'Tableaux 2D'], dico: ['<svg class=ico aria-hidden=true><use href=#i-library></use></svg>', 'Dictionnaires'], recursivite: ['<svg class=ico aria-hidden=true><use href=#i-repeat></use></svg>', 'Récursivité'], pilesfiles: ['<svg class=ico aria-hidden=true><use href=#i-layers></use></svg>', 'Piles & Files'], arbres: ['<svg class=ico aria-hidden=true><use href=#i-git-branch></use></svg>', 'Arbres binaires'], graphes: ['<svg class=ico aria-hidden=true><use href=#i-network></use></svg>', 'Graphes'], poo: ['<svg class=ico aria-hidden=true><use href=#i-dna></use></svg>', 'Classes et POO'], progdyn: ['<svg class=ico aria-hidden=true><use href=#i-brain></use></svg>', 'Prog. dynamique'], erreur: ['<svg class=ico aria-hidden=true><use href=#i-bug></use></svg>', "Correction d'erreur"], problemes: ['<svg class=ico aria-hidden=true><use href=#i-puzzle></use></svg>', 'Problèmes'], sql: ['<svg class=ico aria-hidden=true><use href=#i-database></use></svg>', 'SQL'] };
  const L = { debutant: ['<svg class=ico style=color:var(--accent3) aria-hidden=true><use href=#i-dot></use></svg>', 'Débutant'], intermediaire: ['<svg class=ico style=color:var(--accent4) aria-hidden=true><use href=#i-dot></use></svg>', 'Intermédiaire'], difficile: ['<svg class=ico style=color:var(--red) aria-hidden=true><use href=#i-dot></use></svg>', 'Difficile'] };
  const grid = document.querySelector('.exo-grid'); if (!grid) return;
  const esc = x => x.replace(/&/g, '&amp;').replace(/</g, '&lt;'), md = x => esc(x).replace(/`([^`]+)`/g, '<code>$1</code>');
  BANK.forEach(([id, th, lv, ti, de, st, so, hi]) => {
    const c = document.createElement('div'); c.className = 'exercise-card'; c.dataset.theme = th; c.dataset.level = lv; c.dataset.testid = 'exercise-card-' + id;
    c.innerHTML = '<div class="exercise-header"><span class="exercise-num"></span><span class="card-level ' + lv + '">' + L[lv][1] + '</span><span class="exercise-theme-tag">' + T[th][0] + ' ' + T[th][1] + '</span></div>' +
      '<div class="exercise-title">' + esc(ti) + '</div><div class="exercise-desc">' + md(de) + '</div>' +
      '<div class="mini-console"><div class="mini-console-header"><span class="mini-console-title">' + (th === 'sql' ? 'Console SQL (SQLite)' : 'Console Python 3') + '</span><div class="mini-console-actions">' +
      '<button class="run-btn" onclick="runExercise(\'' + id + '\')"><svg class=ico aria-hidden=true><use href=#i-play></use></svg> Exécuter</button><button class="validate-btn" id="validate-btn-' + id + '" onclick="validateExercise(\'' + id + '\')"><svg class=ico aria-hidden=true><use href=#i-flask-conical></use></svg> Valider l\'exercice</button></div></div>' +
      '<textarea class="mini-editor" id="' + id + '" spellcheck="false"' + (th === 'sql' ? ' data-mode="text/x-sql"' : '') + '>' + esc(st) + '</textarea><div class="mini-output empty" id="out-' + id + '">Appuie sur Exécuter</div></div>' +
      '<div class="test-report" id="report-' + id + '"></div><div class="exercise-tools"><button class="tool-toggle-btn hint-btn" id="hint-btn-' + id + '" onclick="toggleHint(\'' + id + '\')"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg> Indice</button>' +
      '<button class="tool-toggle-btn solution-btn" id="solution-btn-' + id + '" onclick="toggleSolution(\'' + id + '\')"><svg class=ico aria-hidden=true><use href=#i-lock-open></use></svg> Solution</button></div>' +
      '<div class="hint-box" id="hint-' + id + '"><strong>Indice :</strong> ' + md(hi) + '</div><div class="solution-box" id="solution-' + id + '"><span class="solution-label">Solution</span><pre>' + esc(so) + '</pre></div>';
    grid.appendChild(c);
  });
  const statExos = document.getElementById('stat-exos');
  if (statExos) { const n = Math.floor(BANK.length / 10) * 10; statExos.dataset.count = n; statExos.textContent = '+' + n; }
  const cards = [...grid.querySelectorAll('.exercise-card')], themes = Object.keys(T).filter(k => cards.some(c => c.dataset.theme === k));
  grid.textContent = '';
  themes.forEach(k => {
    const sec = document.createElement('section'); sec.className = 'exo-theme'; sec.dataset.theme = k;
    const mine = cards.filter(c => c.dataset.theme === k);
    sec.innerHTML = '<h3 class="exo-theme-h">' + T[k][0] + ' ' + T[k][1] + ' <small>' + mine.length + ' exercices</small></h3>';
    let groups;
    if (k === 'bases') {
      const byId = {}; mine.forEach(c => { byId[c.querySelector('textarea.mini-editor').id] = c; });
      const used = new Set();
      groups = PATH.map(([name, lv, ids], n) => ({ lv, stage: 1, title: 'Étape ' + (n + 1) + ' · ' + name, m: ids.map(i => { used.add(i); return byId[i]; }).filter(Boolean) }));
      const rest = mine.filter(c => !used.has(c.querySelector('textarea.mini-editor').id));
      if (rest.length) groups.push({ lv: 'difficile', stage: 1, title: 'Pour aller plus loin', m: rest });
    } else groups = Object.keys(L).map(lv => ({ lv, title: L[lv][0] + ' ' + L[lv][1], m: mine.filter(c => c.dataset.level === lv) }));
    groups.forEach(({ lv, title, stage, m }) => {
      if (!m.length) return;
      const g = document.createElement('div'); g.className = 'exo-level' + (stage ? ' exo-stage' : ''); g.dataset.level = lv;
      g.innerHTML = '<h4>' + title + ' <small>' + m.length + '</small></h4><div class="exo-level-grid"></div>';
      m.forEach(c => g.lastChild.appendChild(c)); sec.appendChild(g);
    });
    grid.appendChild(sec);
  });
  [...grid.querySelectorAll('.exercise-card')].forEach((c, i) => { c.querySelector('.exercise-num').textContent = 'Exercice ' + String(i + 1).padStart(2, '0'); });
  const row = document.querySelector('.filter-btn[data-theme]').parentElement;
  row.querySelectorAll('.filter-btn').forEach(b => b.remove());
  [['tous', '', 'Tous']].concat(themes.map(k => [k, T[k][0], T[k][1]])).forEach(([k, i, l]) => {
    const b = document.createElement('button'); b.className = 'filter-btn' + (k === 'tous' ? ' active' : ''); b.dataset.theme = k;
    b.setAttribute('onclick', "filterByTheme('" + k + "')"); b.dataset.testid = 'filter-theme-' + k; b.innerHTML = (i ? i + ' ' : '') + l; row.appendChild(b);
  });
})();

} catch (e) { console.error('app bloc 1', e); }
;



// CHAPITRES : SOURCE UNIQUE DES CARTES 
// Avant, les 11 cartes de cours étaient recopiées à l'identique dans la
// section Accueil ET dans la section Cours (avec juste une description plus
// courte côté Cours). Un seul tableau ici, une fonction de rendu, et les deux
// grilles sont générées à partir de la même source : plus de copier-coller à
// maintenir à deux endroits.
const CHAPTERS = [
  { id: "bases", icon: "<svg class=ico aria-hidden=true><use href=#i-sprout></use></svg>", level: "debutant", levelLabel: "Débutant", title: "Les Bases de Python", chapterNum: 0, borderTint: "rgba(52,211,153,0.3)", homeDesc: "Tu n'as jamais codé ? Commence ici : variables, conditions, boucles expliquées pas à pas.", coursDesc: "Variables, conditions et boucles pour débuter." },
  { id: "listes", icon: "<svg class=ico aria-hidden=true><use href=#i-clipboard-list></use></svg>", level: "debutant", levelLabel: "Débutant", title: "Les Listes", chapterNum: 1, homeDesc: "Créer, parcourir et manipuler une liste. La base de tout en Python.", coursDesc: "Créer, parcourir et manipuler une liste." },
  { id: "fonctions", icon: "<svg class=ico aria-hidden=true><use href=#i-wrench></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "debutant", levelLabel: "Débutant", title: "Les Fonctions", chapterNum: 2, homeDesc: "Comprendre <code>def</code>, les paramètres et le <code>return</code>.", coursDesc: "<code>def</code>, paramètres, <code>return</code>." },
  { id: "tri", icon: "<svg class=ico aria-hidden=true><use href=#i-shuffle></use></svg>", iconClass: "green", accentClass: "green-accent", level: "difficile", levelLabel: "Difficile", title: "Tris : Insertion & Sélection", coursTitle: "Tris", chapterNum: 3, homeDesc: "Comprendre les deux algorithmes de tri vus en classe, étape par étape.", coursDesc: "Insertion & Sélection." },
  { id: "recherche", icon: "<svg class=ico aria-hidden=true><use href=#i-search></use></svg>", iconClass: "orange", accentClass: "orange-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Recherche & Dichotomie", chapterNum: 4, homeDesc: "Recherche séquentielle vs recherche dichotomique. La différence en complexité.", coursDesc: "Séquentielle vs binaire." },
  { id: "stats", icon: "<svg class=ico aria-hidden=true><use href=#i-chart-column></use></svg>", level: "debutant", levelLabel: "Débutant", title: "Min, Max, Moyenne & Seuil", coursTitle: "Min, Max, Moyenne", chapterNum: 5, homeDesc: "Parcourir une liste pour calculer des statistiques simples.", coursDesc: "Statistiques sur une liste." },
  { id: "comprehension", icon: "<svg class=ico aria-hidden=true><use href=#i-zap></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Listes par Compréhension", coursTitle: "Compréhension", chapterNum: 6, homeDesc: "Créer des listes en une seule ligne : la syntaxe de compréhension.", coursDesc: "Listes en une ligne." },
  { id: "tableaux", icon: "<svg class=ico aria-hidden=true><use href=#i-grid-3x3></use></svg>", iconClass: "green", accentClass: "green-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Tableaux 2D & Tables", coursTitle: "Tableaux 2D", chapterNum: 7, homeDesc: "Listes de listes : tableau 10×10 et table de multiplication.", coursDesc: "Listes de listes." },
  { id: "texte", icon: "<svg class=ico aria-hidden=true><use href=#i-message-square></use></svg>", iconClass: "orange", accentClass: "orange-accent", level: "debutant", levelLabel: "Débutant", title: "Listes de Texte & Lettres", coursTitle: "Texte & Lettres", chapterNum: 8, homeDesc: "Mettre des chaînes dans une liste, compter des apparitions.", coursDesc: "Chaînes et comptage." },
  { id: "dico", icon: "<svg class=ico aria-hidden=true><use href=#i-library></use></svg>", level: "intermediaire", levelLabel: "Intermédiaire", title: "Les Dictionnaires", coursTitle: "Dictionnaires", chapterNum: 9, homeDesc: "Stocker des données clé-valeur, modifier, supprimer, fusionner.", coursDesc: "Clé-valeur en Python." },
  { id: "modules", icon: "<svg class=ico aria-hidden=true><use href=#i-package></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "debutant", levelLabel: "Débutant", title: "Les Modules Python", coursTitle: "Les Modules", chapterNum: 10, homeDesc: "<code>random</code>, <code>math</code>, <code>datetime</code>, <code>os</code> : les modules de la bibliothèque standard.", coursDesc: "Modules de la bibliothèque standard." },

 // Programme de Terminale NSI 
  { id: "poo", icon: "<svg class=ico aria-hidden=true><use href=#i-dna></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Classe et Programmation Orientée Objet", coursTitle: "Classes et POO", chapterNum: 11, homeDesc: "Créer tes propres types d'objets avec des classes : attributs, méthodes, constructeur. La base de la POO au bac.", coursDesc: "Classes, objets, attributs, méthodes." },
  { id: "pilesfiles", icon: "<svg class=ico aria-hidden=true><use href=#i-layers></use></svg>", iconClass: "green", accentClass: "green-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Piles et Files", chapterNum: 12, homeDesc: "Deux structures fondamentales, LIFO et FIFO : empiler/dépiler, enfiler/défiler, et leurs usages concrets.", coursDesc: "LIFO vs FIFO, empiler/dépiler." },
  { id: "interfaces", icon: "<svg class=ico aria-hidden=true><use href=#i-plug></use></svg>", iconClass: "orange", accentClass: "orange-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Interfaces et Implémentation", chapterNum: 13, homeDesc: "Ce qu'une structure de données permet de faire (interface) vs comment c'est codé derrière (implémentation).", coursDesc: "Ce qu'on peut faire vs comment c'est codé." },
  { id: "recursivite", icon: "<svg class=ico aria-hidden=true><use href=#i-rotate-cw></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "difficile", levelLabel: "Difficile", title: "Récursivité", chapterNum: 14, homeDesc: "Une fonction qui s'appelle elle-même : cas de base, cas récursif, et la pile d'appels expliquée pas à pas.", coursDesc: "Une fonction qui s'appelle elle-même." },
  { id: "arbres", icon: "<svg class=ico aria-hidden=true><use href=#i-git-branch></use></svg>", iconClass: "green", accentClass: "green-accent", level: "difficile", levelLabel: "Difficile", title: "Arbre Binaire et Arbre Binaire de Recherche", coursTitle: "Arbres Binaires", chapterNum: 15, homeDesc: "Arborescences, parcours (préfixe/infixe/postfixe) et arbres binaires de recherche pour chercher en <code>O(log n)</code>.", coursDesc: "Parcours d'arbres et ABR." },
  { id: "modularite", icon: "<svg class=ico aria-hidden=true><use href=#i-puzzle></use></svg>", iconClass: "orange", accentClass: "orange-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Modularité", chapterNum: 16, homeDesc: "Découper ton code en plusieurs fichiers réutilisables : créer et importer tes propres modules.", coursDesc: "Créer et importer ses propres modules." },
  { id: "paradigmes", icon: "<svg class=ico aria-hidden=true><use href=#i-compass></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "intermediaire", levelLabel: "Intermédiaire", title: "Paradigme de Programmation", chapterNum: 17, homeDesc: "Impératif, objet, fonctionnel : les grandes familles de langages et comment on écrit du code dans chacune.", coursDesc: "Impératif, objet, fonctionnel." },
  { id: "trifusion", icon: "<svg class=ico aria-hidden=true><use href=#i-divide></use></svg>", iconClass: "green", accentClass: "green-accent", level: "difficile", levelLabel: "Difficile", title: "Tri Fusion", chapterNum: 18, homeDesc: "Un tri en <code>O(n log n)</code> par diviser pour régner : bien plus rapide que les tris vus en Première.", coursDesc: "Diviser pour régner, en <code>O(n log n)</code>." },
  { id: "graphes", icon: "<svg class=ico aria-hidden=true><use href=#i-network></use></svg>", iconClass: "orange", accentClass: "orange-accent", level: "difficile", levelLabel: "Difficile", title: "Graphes", chapterNum: 19, homeDesc: "Sommets, arêtes, parcours en largeur/profondeur, et l'algorithme de Dijkstra pour le plus court chemin.", coursDesc: "Sommets, arêtes, parcours, Dijkstra." },
  { id: "progdynamique", icon: "<svg class=ico aria-hidden=true><use href=#i-brain></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "avance", levelLabel: "Avancé", title: "Programmation Dynamique", coursTitle: "Prog. Dynamique", chapterNum: 20, homeDesc: "Résoudre un problème en réutilisant les résultats de sous-problèmes déjà calculés : mémoïsation et tabulation.", coursDesc: "Mémoïsation et tabulation." },
  { id: "sql", icon: "<svg class=ico aria-hidden=true><use href=#i-database></use></svg>", iconClass: "purple", accentClass: "purple-accent", level: "intermediaire", levelLabel: "Bonus", title: "Le SQL (bonus)", coursTitle: "Le SQL", chapterNum: 21, homeDesc: "Créer des tables, insérer des données, les interroger et relier les tables avec des clés.", coursDesc: "Tables, requêtes et clés." },
];

function renderLessonCard(ch, variant) {
  const isHome = variant === 'home';
  const title = (!isHome && ch.coursTitle) ? ch.coursTitle : ch.title;
  const desc = isHome ? ch.homeDesc : ch.coursDesc;
  const metaLabel = isHome ? ('chapitre ' + ch.chapterNum) : ('ch.' + ch.chapterNum);
  const iconClass = ch.iconClass ? (' ' + ch.iconClass) : '';
  const accentClass = ch.accentClass ? (' ' + ch.accentClass) : '';
  const styleAttr = ch.borderTint ? (' style="border-color: ' + ch.borderTint + ';"') : '';
  return '<div class="lesson-card' + accentClass + '" onclick="openLesson(\'' + ch.id + '\')" role="button" tabindex="0"' + styleAttr + '>'
    + '<div class="card-top"><div class="card-icon' + iconClass + '">' + ch.icon + '</div>'
    + '<span class="card-level ' + ch.level + '">' + ch.levelLabel + '</span></div>'
    + '<div class="card-title">' + title + '</div>'
    + '<div class="card-desc">' + desc + '</div>'
    + '<div class="card-footer"><span class="card-meta">' + metaLabel + '</span><span class="card-arrow"><svg class=ico aria-hidden=true><use href=#i-arrow-right></use></svg></span></div>'
    + '</div>';
}

function renderChapterGrids() {
  const homeGrid = document.getElementById('accueil-lesson-grid');
  const coursGrid = document.getElementById('cours-lesson-grid');
  if (homeGrid) homeGrid.innerHTML = CHAPTERS.map(ch => renderLessonCard(ch, 'home')).join('');
  if (coursGrid) coursGrid.innerHTML = CHAPTERS.map(ch => renderLessonCard(ch, 'cours')).join('');
}
renderChapterGrids();

// NAVIGATION 
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + name)?.classList.add('visible');

 // Highlight nav
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes("'" + name + "'")) n.classList.add('active');
  });

 // Console needs special handling. On bascule une CLASSE plutôt que de
 // poser un style inline : un style inline a une priorité plus forte que
 // les media queries, et écrasait le padding réduit prévu à 900px/680px
 // à chaque changement de section.
  document.querySelector('.main .hero').style.display = (name === 'console') ? 'none' : '';
  document.querySelector('.content').classList.toggle('console-padding', name === 'console');

 // CodeMirror calcule mal sa taille tant que sa section est display:none,
 // on rafraîchit juste après le changement de visibilité
  if (typeof cmInstances !== 'undefined') {
    setTimeout(() => {
      Object.keys(cmInstances).forEach(id => cmInstances[id].refresh());
    }, 0);
  }
}

// Passe par la navigation ET referme la sidebar mobile après un choix,
// sinon, sur téléphone, le menu resterait ouvert par-dessus le contenu.
function navTo(name) {
  showSection(name);
  closeSidebar();
 // Pyodide (~10 Mo) n'est utile que sur ces deux sections : on ne le charge
 // que si l'élève y navigue, pas au chargement de la page (la plupart des
 // visites ne font que lire un cours et n'ont jamais besoin de Python).
}

function toggleSidebar() {
  const open = document.getElementById('sidebar').classList.toggle('mobile-open');
  document.getElementById('sidebar-backdrop').classList.toggle('visible', open);
  document.getElementById('menu-toggle').setAttribute('aria-expanded', String(open));
  document.getElementById('menu-toggle').classList.toggle('hide', open);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-backdrop').classList.remove('visible');
  document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
  document.getElementById('menu-toggle').classList.remove('hide');
}

// LESSONS 
function openLesson(id) {
  const lesson = LESSONS[id];
  if (!lesson) return;

  showSection('cours');

  document.getElementById('lessons-list').style.display = 'none';
  const detail = document.getElementById('lesson-detail');
  detail.classList.add('visible');
  detail.innerHTML = lesson.content;
}

function backToList() {
  document.getElementById('lessons-list').style.display = '';
  const detail = document.getElementById('lesson-detail');
  detail.classList.remove('visible');
  detail.innerHTML = '';
}

// TABS 
function switchTab(btn, targetId) {
  const tabsEl = btn.closest('.tabs');
  const parent = tabsEl.parentElement;

  tabsEl.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  parent.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  const target = document.getElementById(targetId);
  if (target) target.classList.add('active');
}

// COPY 
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).then(() => {
    btn.textContent = 'Copié';
    setTimeout(() => btn.textContent = 'Copier', 2000);
  });
}

// CONSOLE HELPERS 
function setEditorValue(id, value) {
  if (cmInstances[id]) {
    cmInstances[id].setValue(value);
  } else {
    document.getElementById(id).value = value;
  }
}

function clearEditor() {
  setEditorValue('main-editor', '');
}

function clearOutput() {
  const out = document.getElementById('main-output');
  out.textContent = 'Lance ton code avec le bouton Exécuter…';
  out.style.color = 'var(--text-muted)';
  out.style.fontStyle = 'italic';
  out.classList.remove('has-error');
}

function loadTemplate() {
  setEditorValue('main-editor', `# Template NSI Python
# ─────────────────────────────────

L = [87, 12, 154, 3, 199, 45, 132, 76, 28, 190,
     64, 111, 5, 173, 92, 38, 140, 7, 166, 59]

def maximumListe(L):
    maximum = L[0]
    for i in range(len(L)):
        if L[i] > maximum:
            maximum = L[i]
    return maximum

def tri_selection(L):
    lg = len(L)
    for i in range(lg):
        minimum = i
        for j in range(i+1, lg):
            if L[j] < L[minimum]:
                minimum = j
        L[i], L[minimum] = L[minimum], L[i]
    return L

print("Maximum :", maximumListe(L))
print("Triée :", tri_selection(L[:]))
`);
}

// PYTHON ENGINE : PYODIDE 
// Pyodide est du vrai CPython compilé en WebAssembly : contrairement à
// Brython (réimplémentation JS de Python, peu fiable sur la récursion et
// le scope des fonctions), Pyodide exécute du code Python authentique.
// On le charge UNE SEULE FOIS (pas un iframe par exécution), ce qui le
// rend rapide après le premier chargement.
let pyodideReady = null;

async function getPyodide() {
  const badge = document.getElementById('pyodide-status');
  const etat = (cls, texte) => { if (badge) { badge.className = 'py-status' + (cls ? ' ' + cls : ''); badge.textContent = texte; } };
  if (!pyodideReady) {
    etat('', 'Chargement de Python');
    pyodideReady = Promise.resolve().then(() => loadPyodide())
      .then(py => { etat('ready', 'Python prêt'); return py; })
      .catch(err => { pyodideReady = null; etat('idle', 'Python indisponible, réessaie'); throw err; });
  }
  return pyodideReady;
}

// Chargement paresseux : déclenché par navTo() en entrant sur Exercices ou
// Console, pas ici. Ça évite ~10 Mo de téléchargement à quelqu'un qui vient
// juste lire un cours. Si la page s'ouvre directement sur l'une de ces deux
// sections (lien partagé, retour de navigateur), on démarre quand même :
if (document.querySelector('#section-exercices.visible, #section-console.visible')) {
  getPyodide();
}

async function executePython(code, outputEl, busyText) {
  outputEl.textContent = busyText || 'Exécution...';
  outputEl.style.color = 'var(--accent3)';
  outputEl.style.fontStyle = 'normal';
  outputEl.classList.remove('has-error');

  try {
    const premier = !pyodideReady;
    if (premier) outputEl.textContent = 'Chargement de Python (environ 10 Mo, une seule fois)...';
    const pyodide = await getPyodide();
    if (premier) outputEl.textContent = busyText || 'Exécution...';

 // On redirige stdout/stderr vers un buffer avant chaque exécution
    pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
`);

    await pyodide.runPythonAsync(code);

    const output = pyodide.runPython('sys.stdout.getvalue()');

    if (output === '') {
      outputEl.textContent = 'Code exécuté (aucune sortie)';
      outputEl.style.color = 'var(--text-muted)';
    } else {
      outputEl.textContent = output;
      outputEl.style.color = 'var(--accent3)';
    }
    outputEl.style.fontStyle = 'normal';
  } catch (error) {
 // Pyodide renvoie une trace Python complète ; on garde la dernière
 // ligne utile (le message d'erreur réel) plutôt que toute la stack JS/WASM
    let msg = error.message || String(error);
    const lines = msg.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    outputEl.textContent = (lastLine || msg);
    outputEl.style.color = 'var(--red)';
    outputEl.classList.add('has-error');
    outputEl.style.fontStyle = 'normal';
  }
}

function runPython(code, outputEl) {
  executePython(code, outputEl);
}

// EXERCICES : INDICE / SOLUTION 
// SAUVEGARDE LOCALE (progression) 
// Le code tapé dans les exercices, les indices/solutions ouverts et les
// exercices validés sont perdus au moindre rechargement. Tout est stocké
// dans localStorage sous un même préfixe, avec des try/catch : si le
// stockage local est bloqué (navigation privée, aperçu dans un cadre
// restreint...), le site continue de fonctionner normalement, simplement
// sans mémoriser la progression.
const STORAGE_PREFIX = 'nsi-revision:';

function saveState(key, value) {
  try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); }
  catch (e) { /* stockage indisponible : on continue sans sauvegarder */ }
}

function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (e) { return fallback; }
}

function resetProgress() {
  if (!confirm('Effacer tout le code enregistré et la progression sur les exercices ?')) return;
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith(STORAGE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  } catch (e) { /* rien à faire si le stockage est indisponible */ }
  location.reload();
}

function toggleHint(id) {
  const box = document.getElementById('hint-' + id);
  const btn = document.getElementById('hint-btn-' + id);
  const open = box.classList.toggle('open');
  btn.classList.toggle('active', open);
  saveState('hint-' + id, open);
}

function toggleSolution(id) {
  const box = document.getElementById('solution-' + id);
  const btn = document.getElementById('solution-btn-' + id);
  const open = box.classList.toggle('open');
  btn.classList.toggle('active', open);
  saveState('solution-' + id, open);
}

// EXERCICES : FILTRES COMBINÉS (THÈME + NIVEAU) 
let currentThemeFilter = 'tous';
let currentLevelFilter = 'tous';

function filterByTheme(theme) {
  currentThemeFilter = theme;
  document.querySelectorAll('.filter-btn[data-theme]').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-theme="' + theme + '"]').classList.add('active');
  applyExerciseFilters();
}

function filterByLevel(level) {
  currentLevelFilter = level;
  document.querySelectorAll('.filter-btn[data-level]').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-level="' + level + '"]').classList.add('active');
  applyExerciseFilters();
}

function applyExerciseFilters() {
  let visibleCount = 0;
  document.querySelectorAll('.exercise-card').forEach(card => {
    const themeMatch = currentThemeFilter === 'tous' || card.dataset.theme === currentThemeFilter;
    const levelMatch = currentLevelFilter === 'tous' || card.dataset.level === currentLevelFilter;
    if (themeMatch && levelMatch) {
      card.classList.remove('hidden-by-filter');
      visibleCount++;
    } else {
      card.classList.add('hidden-by-filter');
    }
  });
  const counter = document.getElementById('exo-count');
  if (counter) {
    counter.textContent = visibleCount + ' exercice' + (visibleCount > 1 ? 's' : '') + ' affiché' + (visibleCount > 1 ? 's' : '');
  }
}

// EXERCICES : TESTS UNITAIRES 
// Chaque entrée décrit comment vérifier un exercice automatiquement.
// type "call" : on appelle une fonction du code élève avec des arguments,
// et on compare sa valeur de retour à "expected".
// type "output" : on exécute le code tel quel et on compare le texte
// affiché par print() (utile pour les exercices de
// correction d'erreur, où il n'y a pas toujours une
// fonction unique et pure à isoler).
const EXERCISE_TESTS = {
  ex1: { type: 'call', fn: 'est_pair', cases: [
    { args: [7], expected: false },
    { args: [12], expected: true },
    { args: [0], expected: true },
    { args: [1], expected: false },
  ]},
  ex2: { type: 'output', args: [], expectedOutput: '1\n2\n3\n4\n5' },
  ex3: { type: 'output', args: [], expectedOutput: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70' },
  ex4: { type: 'call', fn: 'mon_max', cases: [
    { args: [[5, 12, 3, 99, 47]], expected: 99 },
    { args: [[-5, -1, -10]], expected: -1 },
    { args: [[42]], expected: 42 },
  ]},
  ex5: { type: 'call', fn: 'mon_min', cases: [
    { args: [[34, 8, 21, 3, 56, 12]], expected: 3 },
    { args: [[-5, -1, -10]], expected: -10 },
    { args: [[42]], expected: 42 },
  ]},
  ex6: { type: 'call', fn: 'somme', cases: [
    { args: [[4, 8, 15, 16, 23, 42]], expected: 108 },
    { args: [[]], expected: 0 },
    { args: [[-5, 5]], expected: 0 },
  ]},
  ex7: { type: 'call', fn: 'inverse', cases: [
    { args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
    { args: [[1]], expected: [1] },
    { args: [[]], expected: [] },
  ]},
  ex8: { type: 'call', fn: 'tri_bulles', cases: [
    { args: [[64, 34, 25, 12, 22, 11, 90]], expected: [11, 12, 22, 25, 34, 64, 90] },
    { args: [[1]], expected: [1] },
    { args: [[3, 2, 1]], expected: [1, 2, 3] },
  ]},
  ex9: { type: 'call', fn: 'tri_selection', cases: [
    { args: [[29, 10, 14, 37, 14]], expected: [10, 14, 14, 29, 37] },
    { args: [[1]], expected: [1] },
    { args: [[3, 2, 1]], expected: [1, 2, 3] },
  ]},
  ex10: { type: 'call', fn: 'fusion', cases: [
    { args: [[1, 4, 7, 10], [2, 3, 8, 9, 15]], expected: [1, 2, 3, 4, 7, 8, 9, 10, 15] },
    { args: [[], [1, 2, 3]], expected: [1, 2, 3] },
    { args: [[1, 2], []], expected: [1, 2] },
  ]},
  ex11: { type: 'call', fn: 'cherche', cases: [
    { args: [[12, 45, 7, 89, 23], 89], expected: 3 },
    { args: [[12, 45, 7, 89, 23], 100], expected: -1 },
    { args: [[5], 5], expected: 0 },
  ]},
  ex12: { type: 'call', fn: 'dicho', cases: [
    { args: [[2, 10, 23, 40, 55, 71, 88], 55], expected: 4 },
    { args: [[2, 10, 23, 40, 55, 71, 88], 99], expected: -1 },
    { args: [[5], 5], expected: 0 },
  ]},
  ex13: { type: 'call', fn: 'manquant', cases: [
    { args: [[1, 2, 4, 5, 6], 6], expected: 3 },
    { args: [[2, 3, 4, 5], 5], expected: 1 },
  ]},
  ex14: { type: 'call', fn: 'moyenne', cases: [
    { args: [[10, 14, 18, 12, 16]], expected: 14.0 },
    { args: [[5, 5, 5]], expected: 5.0 },
  ]},
  ex15: { type: 'call', fn: 'compte', cases: [
    { args: [3, [3, 7, 3, 3, 2, 7, 3]], expected: 4 },
    { args: [9, [1, 2, 3]], expected: 0 },
  ]},
  ex16: { type: 'call', fn: 'mediane', cases: [
    { args: [[7, 2, 9, 4, 5]], expected: 5 },
    { args: [[1, 3, 5, 7]], expected: 4.0 },
  ]},
  ex17: { type: 'output', args: [], expectedOutput: '0\n1\n2\n3\n4' },
  ex18: { type: 'output', args: [], expectedOutput: 'Majeur' },
  ex19: { type: 'output', args: [], expectedOutput: '0 : 10\n1 : 20\n2 : 30' },
  ex20: { type: 'output', args: [], expectedOutput: "J'ai 17 ans" },
  ex21: { type: 'call', fn: 'mon_max', cases: [
    { args: [[-5, -12, -3, -8]], expected: -3 },
    { args: [[1, 2, 3]], expected: 3 },
  ]},
  ex22: { type: 'contains-only', args: [], expectedContains: ["'note': 18", "'nom'", "'prenom'"], expectedNotContains: ["'classe'"] },
  ex23: { type: 'call', fn: 'compte_lettres', cases: [
    { args: ['nsi'], expected: {n: 1, s: 1, i: 1} },
  ]},
  ex24: { type: 'call', fn: 'mot_frequent', cases: [
    { args: [['nsi', 'python', 'nsi', 'code', 'nsi', 'python']], expected: 'nsi' },
  ]},
  ex25: { type: 'contains-only', args: [], expectedContains: ['[1, 0, 0, 0, 0]', '[0, 1, 0, 0, 0]', '[0, 0, 1, 0, 0]', '[0, 0, 0, 1, 0]', '[0, 0, 0, 0, 1]'] },
  ex26: { type: 'call', fn: 'sommes_lignes', cases: [
    { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [6, 15, 24] },
  ]},
  ex27: { type: 'call', fn: 'transposee', cases: [
    { args: [[[1, 2, 3], [4, 5, 6]]], expected: [[1, 4], [2, 5], [3, 6]] },
  ]},
  ex28: { type: 'call', fn: 'factorielle', cases: [
    { args: [6], expected: 720 },
    { args: [0], expected: 1 },
    { args: [1], expected: 1 },
  ]},
  ex29: { type: 'call', fn: 'premiers', cases: [
    { args: [50], expected: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47] },
    { args: [10], expected: [2, 3, 5, 7] },
  ]},
  ex30: { type: 'call', fn: 'est_palindrome', cases: [
    { args: ['radar'], expected: true },
    { args: ['python'], expected: false },
    { args: ['kayak'], expected: true },
  ]},
  ex31: { type: 'contains-only', args: [], expectedContains: ["Bonjour NSI", "J'ai", "17", "ans"] },
  ex32: { type: 'output', args: [], expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>" },
  ex33: { type: 'output', args: [], expectedOutput: 'Bonjour, bienvenue en NSI !' },
  ex34: { type: 'output', args: [], expectedOutput: 'Accès autorisé' },
  ex35: { type: 'output', args: [], expectedOutput: 'Score : 10' },
};

// Compare deux valeurs Python déjà converties en JS (listes, nombres,
// booléens, dictionnaires). On compare par valeur, pas par référence.
function deepEqualPy(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return Math.abs(a - b) < 1e-9; // tolérance pour les flottants
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqualPy(v, b[i]));
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a), keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(k => deepEqualPy(a[k], b[k]));
  }
  return a === b;
}

// Les valeurs affichées dans le rapport de tests (formatPyValue, sortie
// console...) proviennent du code tapé par l'élève. La console (executePython)
// les affichait déjà correctement via textContent, mais le rapport de tests
// les injectait en HTML brut par concaténation, ce helper comble cet écart.
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

// Les dictionnaires des tests (graphes...) sont des objets JS : on les passe
// en Map pour que Pyodide les convertisse à coup sûr en dict Python.
function jsToMaps(v) {
  if (Array.isArray(v)) return v.map(jsToMaps);
  if (v && typeof v === 'object') return new Map(Object.entries(v).map(([k, x]) => [k, jsToMaps(x)]));
  return v;
}

function formatPyValue(v) {
  if (typeof v === 'string') return "'" + escapeHtml(v) + "'";
  if (Array.isArray(v)) return '[' + v.map(formatPyValue).join(', ') + ']';
  if (v && typeof v === 'object') {
    return '{' + Object.entries(v).map(([k,val]) => "'" + escapeHtml(k) + "': " + formatPyValue(val)).join(', ') + '}';
  }
  return String(v);
}

async function validateExercise(id) {
  const test = EXERCISE_TESTS[id];
  const reportEl = document.getElementById('report-' + id);
  const btn = document.getElementById('validate-btn-' + id);
  if (!test || !reportEl) return;

  btn.disabled = true;
  btn.textContent = 'Vérification...';
  reportEl.classList.add('open');
  reportEl.innerHTML = '<div class="test-report-header"><svg class=ico aria-hidden=true><use href=#i-hourglass></use></svg> Exécution des tests...</div>';

  const code = document.getElementById(id).value;

  try {
    const pyodide = await getPyodide();
    pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = sys.stdout
`);

 // On exécute le code de l'élève dans un namespace DÉDIÉ à ce test,
 // pour ne jamais laisser les variables d'un exercice polluer un autre.
    const namespace = pyodide.globals.get('dict')();
    await pyodide.runPythonAsync(code, { globals: namespace });
    const stdout = pyodide.runPython('sys.stdout.getvalue()');

    let results = [];

    if (test.type === 'call') {
      const fn = namespace.get(test.fn);
      if (fn === undefined) {
        throw new Error('La fonction "' + test.fn + '" est introuvable. As-tu bien gardé son nom exact ?');
      }
      for (const c of test.cases) {
        try {
          const pyArgs = c.args.map(a => pyodide.toPy(jsToMaps(a)));
          const rawResult = fn(...pyArgs);
 // .toJs() convertit déjà correctement les listes/dicts Python en
 // tableaux/objets JS natifs. Les types simples (int, float, bool,
 // str, None) sont déjà convertis automatiquement par Pyodide et
 // n'ont pas de méthode .toJs, d'où le test avant de l'appeler.
          const jsResult = (rawResult && typeof rawResult.toJs === 'function')
            ? rawResult.toJs({ dict_converter: Object.fromEntries })
            : rawResult;
          const pass = deepEqualPy(jsResult, c.expected);
          results.push({
            pass,
            label: test.fn + '(' + c.args.map(formatPyValue).join(', ') + ')',
            detail: pass
              ? 'a retourné ' + formatPyValue(jsResult)
              : 'a retourné ' + formatPyValue(jsResult) + ', attendu : ' + formatPyValue(c.expected)
          });
        } catch (e) {
          results.push({
            pass: false,
            label: test.fn + '(' + c.args.map(formatPyValue).join(', ') + ')',
            detail: 'a provoqué une erreur : ' + escapeHtml((e.message || String(e)).split('\n').pop())
          });
        }
      }
    } else if (test.type === 'output') {
      const actual = stdout.trim();
      const expected = test.expectedOutput.trim();
      const pass = actual === expected;
      results.push({
        pass,
        label: 'Sortie du programme',
        detail: pass ? 'correspond exactement à ce qui est attendu' : 'affiche :\n' + escapeHtml(actual) + '\n\nattendu :\n' + escapeHtml(expected)
      });
    }
 // Si test.type === 'contains-only', on ne fait rien ici : on passe
 // directement au bloc suivant qui vérifie expectedContains/expectedNotContains.

 // Type spécial pour ex22 et ex25 : vérifier la présence/absence de motifs dans la sortie
    if (test.expectedContains || test.expectedNotContains) {
      const actual = stdout;
      if (test.expectedContains) {
        for (const motif of test.expectedContains) {
          const pass = actual.includes(motif);
          results.push({
            pass,
            label: 'Contient : ' + motif,
            detail: pass ? 'trouvé dans la sortie' : 'absent de la sortie affichée'
          });
        }
      }
      if (test.expectedNotContains) {
        for (const motif of test.expectedNotContains) {
          const pass = !actual.includes(motif);
          results.push({
            pass,
            label: 'Ne doit plus contenir : ' + motif,
            detail: pass ? 'bien absent, comme attendu' : 'encore présent, vérifie ta suppression'
          });
        }
      }
    }

    const allPass = results.every(r => r.pass);
    renderTestReport(reportEl, results, allPass);
    if (allPass) {
      saveState('done-' + id, true);
      document.getElementById(id)?.closest('.exercise-card')?.classList.add('done');
    }

  } catch (error) {
    let msg = escapeHtml((error.message || String(error)).split('\n').pop());
    reportEl.innerHTML = '<div class="test-report-header crashed"><svg class=ico aria-hidden=true><use href=#i-circle-x></use></svg> Le code n\'a pas pu s\'exécuter</div>' +
      '<div class="test-list"><div class="test-item fail"><span class="test-item-icon"><svg class=ico aria-hidden=true><use href=#i-x></use></svg></span><span class="test-item-detail">' + msg + '</span></div></div>';
  }

  btn.disabled = false;
  btn.innerHTML = '<svg class=ico aria-hidden=true><use href=#i-flask-conical></use></svg> Valider l\'exercice';
}

function renderTestReport(reportEl, results, allPass) {
  const passCount = results.filter(r => r.pass).length;
  const headerClass = allPass ? 'all-pass' : 'some-fail';
  const headerText = allPass
    ? '<svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg> Tous les tests passent (' + passCount + '/' + results.length + ')'
    : '<svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg> ' + passCount + '/' + results.length + ' test(s) réussi(s)';

  let html = '<div class="test-report-header ' + headerClass + '">' + headerText + '</div><div class="test-list">';
  for (const r of results) {
    html += '<div class="test-item ' + (r.pass ? 'pass' : 'fail') + '">' +
      '<span class="test-item-icon">' + (r.pass ? '<svg class=ico aria-hidden=true><use href=#i-check></use></svg>' : '<svg class=ico aria-hidden=true><use href=#i-x></use></svg>') + '</span>' +
      '<span class="test-item-detail"><strong>' + r.label + '</strong> : ' + r.detail + '</span>' +
      '</div>';
  }
  html += '</div>';
  reportEl.innerHTML = html;
}

function runExercise(id) {
  const code = document.getElementById(id).value;
  const out = document.getElementById('out-' + id);
  out.className = 'mini-output';
  executePython(code, out);
}

function runMain() {
  const code = document.getElementById('main-editor').value;
  const out = document.getElementById('main-output');
  executePython(code, out, 'Exécution en cours...');
}

// CODEMIRROR INIT 
// On attache un éditeur CodeMirror par-dessus chaque textarea, et on garde
// le textarea synchronisé en arrière-plan pour ne rien casser ailleurs
// (runMain, runExercise, clearEditor, loadTemplate lisent/écrivent .value).
const cmInstances = {};

function attachCodeMirror(textarea) {
  if (!textarea || textarea.cmAttached) return;
  textarea.cmAttached = true;

  const cm = CodeMirror.fromTextArea(textarea, {
    mode: textarea.dataset.mode || 'python',
    theme: 'nsi',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    matchBrackets: true,
    autoCloseBrackets: true,
    viewportMargin: Infinity,
    extraKeys: {
      "Tab": function(cm) { cm.replaceSelection("    "); }
    }
  });

 // Restaure le code de la session précédente s'il y en a un
  const saved = loadState('code-' + textarea.id, null);
  if (saved !== null) cm.setValue(saved);

 // Le textarea original reste la "source de vérité" pour le reste du code
  let saveTimeout = null;
  cm.on('change', () => {
    textarea.value = cm.getValue();
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => saveState('code-' + textarea.id, cm.getValue()), 400);
  });

  cmInstances[textarea.id] = cm;
  return cm;
}

function refreshCM(id) {
  if (cmInstances[id]) cmInstances[id].refresh();
}

document.addEventListener('DOMContentLoaded', function() {
 // Editeur principal de la console
  const mainTa = document.getElementById('main-editor');
  if (mainTa) attachCodeMirror(mainTa);

 // Mini-éditeurs des exercices
  const cmIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { cmIO.unobserve(e.target); const ta = e.target.querySelector('textarea.mini-editor'); attachCodeMirror(ta); const w = ta.nextElementSibling; if (w && w.CodeMirror) { const i = w.querySelector('textarea'); if (i) i.setAttribute('aria-label', (i.closest('.exercise-card') && i.closest('.exercise-card').dataset.theme === 'sql' ? 'Éditeur de code SQL' : 'Éditeur de code Python')); requestAnimationFrame(() => w.CodeMirror.refresh()); } } }), { rootMargin: '600px 0px' });
  document.querySelectorAll('.exercise-card').forEach(c => cmIO.observe(c));

 // CodeMirror calcule mal sa taille s'il est initialisé pendant que sa
 // section est display:none (cours/exercices cachés au chargement) →
 // on rafraîchit dès que la section console ou exercices devient visible.
  const observer = new MutationObserver(() => {
    Object.keys(cmInstances).forEach(refreshCM);
  });
  document.querySelectorAll('.section').forEach(sec => {
    observer.observe(sec, { attributes: true, attributeFilter: ['class'] });
  });
});

document.addEventListener('DOMContentLoaded', function() {
 // Restaure les indices/solutions laissés ouverts et les exercices déjà validés
  Object.keys(EXERCISE_TESTS).forEach(id => {
    if (loadState('hint-' + id, false)) {
      document.getElementById('hint-' + id)?.classList.add('open');
      document.getElementById('hint-btn-' + id)?.classList.add('active');
    }
    if (loadState('solution-' + id, false)) {
      document.getElementById('solution-' + id)?.classList.add('open');
      document.getElementById('solution-btn-' + id)?.classList.add('active');
    }
    if (loadState('done-' + id, false)) {
      document.getElementById(id)?.closest('.exercise-card')?.classList.add('done');
    }
  });

 // Accessibilité clavier : les cartes de cours et les liens de navigation
 // gardent un onclick sur des div/a pour rester visuellement identiques à
 // l'existant (plutôt que de les transformer en vrais boutons, ce qui aurait
 // changé leur rendu). Le rôle et le focus sont posés dans le HTML ; il
 // reste à simuler un clic quand on les active au clavier (Entrée/Espace).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest('[role="button"]');
    if (!el) return;
    e.preventDefault();
    el.click();
  });
});

// Tab support in editor (fallback pour textareas non encore transformées en CodeMirror)
document.addEventListener('DOMContentLoaded', function() {
  const editors = document.querySelectorAll('textarea');
  editors.forEach(ed => {
    ed.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
      }
    });
  });
});

;
try {

// REFONTE : EXPÉRIENCE & INTERACTIONS 
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktop = window.innerWidth >= 900 && finePointer;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  const scrollMode = false; // navigation par vues (sidebar) : pas de pin ScrollTrigger
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = n => String(n).padStart(2, '0');
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

 // Smooth scroll (Lenis) 
  let lenis = null;
  if (false && !reduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  function scrollToY(y, immediate) {
    if (lenis) lenis.scrollTo(y, { immediate: !!immediate, duration: 1.2, force: true });
    else window.scrollTo({ top: y, behavior: immediate || reduced ? 'auto' : 'smooth' });
  }
  function scrollToEl(el) {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(y);
  }

 // Navigation (remplace l'ancien système d'onglets) 
  const reader = $('#lesson-detail');
  window.navTo = function (name) {
    if (reader.classList.contains('visible')) window.backToList();
    closeMenu();
    const el = name === 'hero' ? $('#hero') : document.getElementById('section-' + name);
    scrollToEl(el);
  };
  window.showSection = window.navTo;
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-nav]');
    if (a) { e.preventDefault(); window.navTo(a.dataset.nav); }
    const skip = e.target.closest('[data-skip]');
    if (skip) { e.preventDefault(); scrollToEl(document.getElementById(skip.dataset.skip)); }
  });

 // Menu mobile 
  const burger = $('#menu-toggle'), menu = $('#mobile-menu');
  function closeMenu() {
    menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    $$('a', menu).forEach(a => a.tabIndex = -1);
    if (lenis && !reader.classList.contains('visible')) lenis.start();
  }
  window.toggleSidebar = function () {
    const open = !menu.classList.contains('open');
    if (!open) return closeMenu();
    menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    $$('a', menu).forEach(a => a.tabIndex = 0);
    if (lenis) lenis.stop();
  };
  window.closeSidebar = closeMenu;
  burger.addEventListener('click', window.toggleSidebar);

 // Navbar : compacte + section active 
  const nav = $('#nav'), pill = $('#nav-pill');
  const onScrollNav = () => nav.classList.toggle('compact', window.scrollY > 80);
  window.addEventListener('scroll', onScrollNav, { passive: true });
  function setActive(name) {
    $$('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.nav === name));
    const link = $('.nav-link.active');
    if (link) { pill.style.opacity = 1; pill.style.width = link.offsetWidth + 'px'; pill.style.transform = 'translateX(' + link.offsetLeft + 'px)'; }
    else pill.style.opacity = 0;
  }
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id === 'hero' ? 'accueil' : en.target.id.replace('section-', '')); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section').forEach(s => secObs.observe(s));

 // Pyodide paresseux : dès qu'on approche des sections qui en ont besoin 
  const pyObs = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { pyObs.disconnect(); }
  }, { rootMargin: '600px 0px' });
  pyObs.observe($('#section-exercices')); pyObs.observe($('#section-console'));

 // Niveaux 
  const tone = l => (l === 'avance' ? 'difficile' : l);
  

 // Carrousel des cours 
  const coursStage = $('#cours-stage');
  coursStage.innerHTML = CHAPTERS.map(ch =>
    '<div class="cc-item" data-level-tone="' + tone(ch.level) + '" data-testid="cours-card-' + ch.id + '">'
    + '<div class="cc-smear"></div><div class="cc-card">'
    + '<div class="cc-label">Chapitre ' + pad(ch.chapterNum) + '<small>' + ch.levelLabel + '</small></div>'
    + '<div class="cc-figure" aria-hidden="true">' + ch.icon + '<i>' + ch.icon + '</i><i>' + ch.icon + '</i></div>'
    + '<div class="cc-foot"><div class="cc-title">' + (ch.coursTitle || ch.title) + '</div><div class="cc-desc">' + ch.coursDesc + '</div>'
    + '<button class="cc-open" tabindex="-1" data-testid="cours-open-' + ch.id + '">Ouvrir le chapitre <svg class=ico aria-hidden=true><use href=#i-arrow-right></use></svg></button></div>'
    + '</div></div>').join('');

 // Fiches de la cheat sheet : on colore chaque carte en alternant les tons
  const tones = ['intermediaire', 'difficile', 'debutant'];
  const cheatItems = $$('#cheat-stage .cc-item');
  cheatItems.forEach((it, i) => { it.dataset.levelTone = tones[i % 3]; it.insertAdjacentHTML('afterbegin', '<div class="cc-smear"></div>'); });
  $('#cheat-total').textContent = pad(cheatItems.length);

  function makeCarousel(section, stage, counter, onOpen) {
    const items = $$('.cc-item', stage);
    const n = items.length;
    const bar = $('.cc-progress i', section);
    // fond animé : décalage parallax proportionnel à la position du carrousel
    const bgLayers = $$('.cc-bg-layer', section);
    bgLayers.forEach(l => { l._par = parseFloat(l.dataset.par) || 0; });
    const bgOn = bgLayers.length > 0;
    const bgMove = c => {
      if (!bgOn) return;
      const tile = Math.max(window.innerHeight, 640) * 3.5555556;
      for (let k = 0; k < bgLayers.length; k++) bgLayers[k].style.transform = 'translate3d(' + (-c * tile * bgLayers[k]._par).toFixed(1) + 'px,0,0)';
    };
    let current = 0, target = 0, raf = null, cw = 340, ch = 450, st = null, lastCenter = -1, prevFrame = 0;
    let rw = -1, rh = 0, rq = 0;
    // éléments animés et dernières valeurs écrites : on ne touche au DOM que si la valeur change
    const streaks = items.map(it => Array.from(it.querySelectorAll('.cc-figure i')));
    const smears = items.map(it => it.firstElementChild);
    const memo = items.map(() => ({}));
    const isCheat = stage.id === 'cheat-stage';

    // Fiches cheat : le contenu ne doit jamais être coupé.
    // 1) la fiche s'agrandit si besoin  2) sinon le texte rétrécit un peu (min 85 %)  3) sinon la fiche défile avec un fondu en bas.
    const cheatCards = isCheat ? $$('.cheat-card', stage) : [];
    cheatCards.forEach(c => {
      if (c.querySelector(':scope > .cheat-scroll')) return;
      const sc = document.createElement('div');
      sc.className = 'cheat-scroll';
      sc.setAttribute('data-lenis-prevent', '');
      while (c.firstChild) sc.appendChild(c.firstChild);
      c.appendChild(sc);
    });
    const cheatScrollers = cheatCards.map(c => c.querySelector(':scope > .cheat-scroll'));
    const hasMore = sc => sc.scrollHeight - sc.scrollTop - sc.clientHeight > 4;
    cheatScrollers.forEach(sc => sc.addEventListener('scroll', () => sc.parentElement.classList.toggle('has-more', hasMore(sc)), { passive: true }));
    function updMore() {
      cheatScrollers.forEach(sc => {
        const scrollable = sc.scrollHeight > sc.clientHeight + 4;
        sc.parentElement.classList.toggle('has-more', hasMore(sc));
        if (scrollable) { sc.setAttribute('tabindex', '0'); sc.setAttribute('aria-label', 'Contenu de la fiche (défilable)'); }
        else { sc.removeAttribute('tabindex'); sc.removeAttribute('aria-label'); }
      });
    }
    function fitCheat(baseCh, h) {
      const cap = Math.floor(h * 0.92);
      let fit = 1;
      const setFit = f => stage.style.setProperty('--fit', f.toFixed(3));
      const natural = () => {
        cheatCards.forEach(c => { c.style.height = 'auto'; });
        let m = 0;
        cheatCards.forEach(c => { m = Math.max(m, c.offsetHeight); });
        cheatCards.forEach(c => { c.style.height = ''; });
        return m;
      };
      setFit(1);
      let need = natural(), out = baseCh;
      if (need > out) out = Math.min(need, cap);
      for (let i = 0; i < 4 && need > out + 1 && fit > 0.85; i++) {
        fit = Math.max(0.85, fit * out / need);
        setFit(fit);
        need = natural();
      }
      return Math.max(baseCh, Math.min(out, need));
    }

    function layout() {
      rw = stage.clientWidth; rh = window.innerHeight;
      const w = stage.clientWidth, h = stage.clientHeight || 500;
      const ratio = isCheat ? 1.36 : 1.3;
      cw = window.innerWidth < 680 ? Math.min(w * 0.74, 300) : clamp(w * 0.27, 280, 390);
      ch = cw * ratio;
      if (ch > h * 0.9) { ch = h * 0.9; cw = ch / ratio; }
      stage.style.setProperty('--cw', cw + 'px');
      if (isCheat && w > 0) ch = fitCheat(ch, h);
      stage.style.setProperty('--ch', ch + 'px');
      if (isCheat && w > 0) updMore();
      render();
    }
    function render() {
      const vel = target - current;
      const av = Math.min(Math.abs(vel), 1);
      const gap = cw * (window.innerWidth < 680 ? 0.9 : 1.12);
      items.forEach((it, i) => {
        const d = i - current, ad = Math.abs(d), k = memo[i];
        if (ad > 3.3) { if (k.vis !== 0) { it.style.visibility = 'hidden'; k.vis = 0; } return; }
        if (k.vis !== 1) { it.style.visibility = 'visible'; k.vis = 1; }
        const x = Math.sign(d) * (ad <= 1 ? ad * gap : gap + (ad - 1) * gap * 0.62);
        const rot = clamp(-d * 34, -62, 62);
        const z = -Math.min(ad, 3) * 170;
        const sc = 1 - Math.min(ad, 2) * 0.05;
        const tf = 'translate3d(' + x.toFixed(1) + 'px,0,' + z.toFixed(1) + 'px) rotateY(' + rot.toFixed(2) + 'deg) scale(' + sc.toFixed(3) + ')';
        if (tf !== k.tf) { it.style.transform = tf; k.tf = tf; }
        const op = Math.max(0, 1 - ad * 0.3).toFixed(2);
        if (op !== k.op) { it.style.opacity = op; k.op = op; }
        const zi = String(100 - Math.round(ad * 10));
        if (zi !== k.zi) { it.style.zIndex = zi; k.zi = zi; }
        // traînées de l'icône : transform écrit directement (pas de variable CSS, donc pas de recalcul de style de la carte)
        const v = av * (d === 0 ? 0.3 : 1), sx = (1.3 + v * 3).toFixed(3);
        if (sx !== k.sx && streaks[i].length > 1) {
          streaks[i][0].style.transform = 'translateX(10%) scaleX(' + sx + ')';
          streaks[i][1].style.transform = 'translateX(25%) scaleX(' + (2 + v * 5).toFixed(3) + ')';
          k.sx = sx;
        }
        const so = Math.min(Math.min(ad, 1) * 0.22 + av * 0.5, 0.55).toFixed(2);
        if (so !== k.so) { smears[i].style.opacity = so; k.so = so; }
      });
      const c = clamp(Math.round(current), 0, n - 1);
      if (c !== lastCenter) {
        items.forEach((it, i) => it.classList.toggle('is-center', i === c));
        counter.textContent = pad(c + 1);
        lastCenter = c;
      }
      bar.style.transform = 'scaleX(' + (n > 1 ? current / (n - 1) : 1).toFixed(4) + ')';
      bgMove(current);
    }
    function tick(now) {
      const dt = prevFrame ? Math.min(now - prevFrame, 50) : 16.667;
      prevFrame = now;
      current += (target - current) * (reduced ? 1 : 1 - Math.pow(1 - 0.11, dt / 16.667));
      if (Math.abs(target - current) < 0.0008) { current = target; render(); raf = null; prevFrame = 0; return; }
      render();
      raf = requestAnimationFrame(tick);
    }
    function setTarget(t) { target = clamp(t, 0, n - 1); if (!raf) raf = requestAnimationFrame(tick); }
    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let lock = false;
    function go(i) {
      i = clamp(Math.round(i), 0, n - 1);
      if (st) { lock = true; setTarget(i); scrollToY(st.start + (i / (n - 1)) * (st.end - st.start), true); requestAnimationFrame(() => { lock = false; }); }
      else setTarget(i);
    }

    if (scrollMode) {
      st = ScrollTrigger.create({
        trigger: section, pin: $('.cc-pin', section), start: 'top top',
        end: () => '+=' + (n - 1) * 190, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: self => {
          if (lock || dragging) return;
          const p = self.progress * (n - 1), base = Math.floor(p);
          setTarget(base + ease(p - base));
        }
      });
    }

 // glisser (souris / doigt)
    let dragging = false, sx = 0, sy = 0, sIdx = 0, moved = 0, lastX = 0, lastT = 0, vx = 0, pid = null;
    stage.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      dragging = true; moved = 0; sx = lastX = e.clientX; sy = e.clientY; sIdx = current; lastT = performance.now(); vx = 0; pid = e.pointerId;
    });
    stage.addEventListener('pointermove', e => {
      if (!dragging || e.pointerId !== pid) return;
      const dx = e.clientX - sx;
      if (moved < 6 && Math.abs(e.clientY - sy) > Math.abs(dx) && e.pointerType !== 'mouse') { dragging = false; return; }
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 6) { stage.classList.add('dragging'); if (!stage.hasPointerCapture(pid)) stage.setPointerCapture(pid); }
      const now = performance.now();
      vx = (e.clientX - lastX) / Math.max(now - lastT, 1); lastX = e.clientX; lastT = now;
      setTarget(sIdx - dx / (cw * 0.95));
    });
    const end = e => {
      if (!dragging) return;
      dragging = false; stage.classList.remove('dragging');
      if (moved > 6) { go(target - clamp(vx * 0.6, -2, 2)); return; }
      const item = e.target.closest && e.target.closest('.cc-item');
      if (!item) return;
      const i = items.indexOf(item);
      if (i === Math.round(current)) onOpen(i); else go(i);
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', () => { dragging = false; stage.classList.remove('dragging'); go(target); });
    stage.addEventListener('dragstart', e => e.preventDefault());

 // clavier
    stage.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(Math.round(target) + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(Math.round(target) - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(Math.round(current)); }
    });
    $$('.cc-arrow', section).forEach(b => b.addEventListener('click', () => go(Math.round(target) + Number(b.dataset.dir))));

 // molette horizontale (trackpad) quand le carrousel n'est pas piloté par le scroll
    if (!st) stage.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) { e.preventDefault(); setTarget(target + e.deltaX / 400); clearTimeout(stage._w); stage._w = setTimeout(() => go(target), 140); }
    }, { passive: false });

    window.addEventListener('resize', () => {
      if (rq) return;
      rq = requestAnimationFrame(() => {
        rq = 0;
        if (stage.clientWidth === rw && Math.abs(window.innerHeight - rh) < 120) return;
        layout();
      });
    });
    layout();
    if (isCheat && document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    return { go, layout };
  }

  const coursCarousel = makeCarousel($('#section-cours'), coursStage, $('#cours-idx'), i => openLesson(CHAPTERS[i].id));
  makeCarousel($('#section-cheatsheet'), $('#cheat-stage'), $('#cheat-idx'), () => {});

 // Lecteur de chapitre (overlay plein écran) 
  let lastFocus = null;
  window.openLesson = function (id) {
    const lesson = LESSONS[id];
    if (!lesson) return;
    const chap = CHAPTERS.find(c => c.id === id);
    lastFocus = document.activeElement;
    reader.setAttribute('data-level-tone', tone(chap ? chap.level : lesson.level));
    reader.innerHTML = '<div class="lesson-hero"></div><div class="lesson-inner">' + lesson.content + '</div>';
    reader.scrollTop = 0;
    reader.classList.add('visible');
    if (lenis) lenis.stop(); else document.documentElement.style.overflow = 'hidden';
    const back = $('.back-btn', reader);
    if (back) { back.setAttribute('data-testid', 'lesson-back-btn'); setTimeout(() => back.focus({ preventScroll: true }), 50); }
    if (hasGsap && !reduced) gsap.fromTo($$('.lesson-inner > *', reader).slice(0, 6), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .06, ease: 'expo.out', delay: .25, clearProps: 'transform,opacity' });
    document.body.classList.remove('cursor-label', 'cursor-hover');
  };
  window.backToList = function () {
    if (!reader.classList.contains('visible')) return;
    reader.classList.remove('visible');
    if (lenis) lenis.start(); else document.documentElement.style.overflow = '';
    setTimeout(() => { if (!reader.classList.contains('visible')) reader.innerHTML = ''; }, 750);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (reader.classList.contains('visible')) window.backToList();
    else if (menu.classList.contains('open')) closeMenu();
  });

 // Exercices : filtres animés + rafraîchissements 
  const _theme = window.filterByTheme, _level = window.filterByLevel;
  function afterFilter() {
    $$('.exercise-card:not(.hidden-by-filter)').forEach((c, i) => {
      c.classList.remove('pop'); void c.offsetWidth;
      c.style.animationDelay = Math.min(i, 8) * 0.04 + 's';
      c.classList.add('pop', 'in');
    });
    setTimeout(() => Object.values(cmInstances).forEach(cm => cm.refresh()), 30);
  }
  window.filterByTheme = t => { _theme(t); afterFilter(); };
  window.filterByLevel = l => { _level(l); afterFilter(); };
  $$('.filter-btn').forEach(b => {
    const m = (b.getAttribute('onclick') || '').match(/filterBy(Theme|Level)\('([^']+)'\)/);
    if (m) b.setAttribute('data-testid', 'filter-' + m[1].toLowerCase() + '-' + m[2]);
  });
  $$('.exercise-card').forEach(c => {
    c.setAttribute('data-reveal', '');
    const ta = $('textarea.mini-editor', c);
    if (ta) c.setAttribute('data-testid', 'exercise-card-' + ta.id);
  });
  $$('.run-btn').forEach(b => { const m = b.getAttribute('onclick').match(/'(ex\d+)'/); if (m) b.setAttribute('data-testid', 'run-btn-' + m[1]); });
  $$('.validate-btn, .hint-btn, .solution-btn, .mini-output, .test-report').forEach(el => el.id && el.setAttribute('data-testid', el.id));

 // Reveals au scroll 
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revObs.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  $$('[data-reveal]').forEach(el => revObs.observe(el));

 // Halo lumineux du hero qui suit la souris 
  const halo = $('#hero-halo'), hero = $('#hero');
  if (finePointer && !reduced) {
    let tx = innerWidth * 0.6, ty = innerHeight * 0.35, hx = tx, hy = ty, hraf = null;
    const loop = () => {
      hx += (tx - hx) * 0.06; hy += (ty - hy) * 0.06;
      halo.style.setProperty('--mx', hx.toFixed(1) + 'px'); halo.style.setProperty('--my', hy.toFixed(1) + 'px');
      hraf = (Math.abs(tx - hx) + Math.abs(ty - hy) > 0.5) ? requestAnimationFrame(loop) : null;
    };
    hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!hraf) hraf = requestAnimationFrame(loop); });
  }

 // Cartes d'exercices : lumière suivant la souris 
  if (finePointer && !reduced) {
    $('.exo-grid').addEventListener('pointermove', e => {
      const c = e.target.closest('.exercise-card'); if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--px', (e.clientX - r.left) + 'px'); c.style.setProperty('--py', (e.clientY - r.top) + 'px');
    });
  }

 // Curseur personnalisé + effet magnétique 
  if (finePointer && !reduced) {
    const dot = $('.cursor-dot'), ring = $('.cursor-ring'), label = $('#cursor-label');
    let mx = -100, my = -100, rx = -100, ry = -100, craf = null;
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
      craf = (Math.abs(mx - rx) + Math.abs(my - ry) > 0.3) ? requestAnimationFrame(loop) : null;
    };
    window.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      document.body.classList.add('has-cursor');
      if (!craf) craf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('pointerleave', () => document.body.classList.remove('has-cursor'));
    document.addEventListener('pointerover', e => {
      const t = e.target, b = document.body;
      const inEditor = t.closest('.CodeMirror, textarea, input');
      b.classList.toggle('cursor-hidden', !!inEditor);
      const centerCard = t.closest('.cc-item.is-center');
      const labelEl = centerCard ? null : t.closest('[data-cursor-label]');
      const interactive = t.closest('a, button, [role="button"], .cc-item');
      if (centerCard) { label.textContent = 'Ouvrir'; b.classList.add('cursor-label'); b.classList.remove('cursor-hover'); }
      else if (labelEl && !t.closest('button, a')) { label.textContent = labelEl.dataset.cursorLabel; b.classList.add('cursor-label'); b.classList.remove('cursor-hover'); }
      else { b.classList.remove('cursor-label'); b.classList.toggle('cursor-hover', !!interactive); }
    });
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

 // Titres : découpage en lettres 
  $$('[data-split]').forEach(el => {
    el.classList.add('is-split');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = el.textContent.split('').map(c => '<span class="ch">' + (c === ' ' ? '&nbsp;' : c) + '</span>').join('');
  });
 // dégradé continu sur « Python » malgré le découpage en lettres
  function paintGradient() {
    $$('.hero-title .py').forEach(row => {
      const w = $$('.ch', row).reduce((m, c) => Math.max(m, c.offsetLeft + c.offsetWidth), 0);
      $$('.ch', row).forEach(c => { c.style.backgroundSize = w + 'px 100%'; c.style.backgroundPosition = (-c.offsetLeft) + 'px 0'; });
    });
  }
  paintGradient(); window.addEventListener('resize', paintGradient);
  if (document.fonts) document.fonts.ready.then(paintGradient);

 // Animation d'entrée + scroll 
  const loader = $('#loader'), loaderCount = $('#loader-count');
  function countUp(el) {
    const to = Number(el.dataset.count); if (!to) return;
    if (!hasGsap || reduced) { el.textContent = (el.dataset.prefix || '') + to; return; }
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.4, ease: 'power3.out', onUpdate: () => { el.textContent = (el.dataset.prefix || '') + Math.round(o.v); } });
  }
  function intro() {
    if (!hasGsap || reduced || true) { loader.classList.add('done'); $$('.stat-num[data-count]').forEach(countUp); return; }
    gsap.set('.hero-title .ch', { yPercent: 115 });
    gsap.set('.intro-fade', { y: 30, opacity: 0 });
    gsap.set('#nav', { y: -30, opacity: 0 });
    gsap.set('.hero-bg', { opacity: 0 });
    gsap.set('#hero-stack .mini', { opacity: 0, y: 60 });
    const o = { v: 0 };
    gsap.to(o, { v: 100, duration: .7, ease: 'power2.inOut', onUpdate: () => { loaderCount.textContent = String(Math.round(o.v)).padStart(3, '0'); } });
    const tl = gsap.timeline({ delay: .78, defaults: { ease: 'expo.out' } });
    tl.add(() => loader.classList.add('done'))
      .to('.hero-bg', { opacity: 1, duration: 1.2 }, .1)
      .to('#nav', { y: 0, opacity: 1, duration: .9, clearProps: 'transform' }, .25)
      .to('.hero-title .ch', { yPercent: 0, duration: 1.1, stagger: .035 }, .3)
      .to('#hero-stack .mini', { opacity: 1, y: 0, duration: 1, stagger: .08, clearProps: 'transform' }, .45)
      .to('.intro-fade', { y: 0, opacity: 1, duration: .9, stagger: .08 }, .6)
      .add(() => $$('.stat-num[data-count]').forEach(countUp), .7);
  }
  if (document.readyState === 'complete') intro(); else window.addEventListener('load', intro, { once: true });
 // sécurité : si le chargement des ressources traîne (réseau lent), on ne bloque jamais l'accès au contenu
  setTimeout(() => { if (!loader.classList.contains('done')) { if (hasGsap) gsap.globalTimeline.progress(1); loader.classList.add('done'); $$('.intro-fade, #nav, .hero-bg').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; }); $$('.hero-title .ch').forEach(c => c.style.transform = 'none'); } }, 3500);

  if (hasGsap && !reduced) {
    gsap.to('.hero-title', { yPercent: 18, opacity: .25, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-orb.a', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    if (desktop) gsap.to('#hero-stack', { y: -140, rotate: -4, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    $$('[data-line]').forEach(line => {
      gsap.from(line, { yPercent: 110, rotate: 2, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: line, start: 'top 90%' } });
    });
    $$('.cc-section .cc-head').forEach(h => gsap.from(h.children, { y: 50, opacity: 0, filter: 'blur(8px)', duration: 1, stagger: .1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    $$('.cc-section .cc-stage').forEach(s => gsap.from(s, { scale: .85, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 85%' } }));

 // les hauteurs changent (filtres, indices, CodeMirror) : on recalcule les zones épinglées
    let rt = null;
    new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 200); }).observe($('#section-exercices'));
  }
})();


} catch (e) { console.error('app bloc 3', e); }
;
try {

/* Vues + sidebar : une seule section affichée à la fois, chapitres listés dans la barre latérale */
(function () {
  const $ = (q, r = document) => r.querySelector(q), $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const VIEWS = ['accueil', 'cours', 'exercices', 'cheatsheet', 'console'];
  const reader = $('#lesson-detail');
  const tone = l => (l === 'avance' ? 'difficile' : l);
  $('#side-chapters').innerHTML = '<h4>Chapitres</h4>' + CHAPTERS.map(c =>
    '<button type="button" class="side-ch" data-ch="' + c.id + '" data-level-tone="' + tone(c.level) + '"><i aria-hidden="true"></i><span>' +
    String(c.chapterNum).padStart(2, '0') + ' · ' + (c.coursTitle || c.title) + '</span></button>').join('');
  $('#side-chapters').addEventListener('click', e => { const b = e.target.closest('.side-ch'); if (b) window.openLesson(b.dataset.ch); });

  function show(name) {
    if (!VIEWS.includes(name)) name = 'accueil';
    document.body.dataset.view = name;
    VIEWS.forEach(v => { const el = v === 'accueil' ? $('#hero') : $('#section-' + v); if (el) el.classList.toggle('is-view', v === name); });
    $('.marquee').classList.toggle('is-view', name === 'accueil');
    $$('.nav-link').forEach(l => { const on = l.dataset.nav === name; l.classList.toggle('active', on); on ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current'); });
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event('resize'));
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    const v = name === 'accueil' ? $('#hero') : $('#section-' + name);
    if (v) { v.classList.remove('view-in'); void v.offsetWidth; v.classList.add('view-in'); }
  }
  window.navTo = window.showSection = function (n) {
    n = (n === 'hero' ? 'accueil' : String(n || '')).replace('section-', '');
    if (reader.classList.contains('visible')) window.backToList();
    if (window.closeSidebar) window.closeSidebar();
    show(n);
    try { history.replaceState(null, '', '#' + document.body.dataset.view); } catch (e) {}
  };
  const _open = window.openLesson, _back = window.backToList;
  window.openLesson = function (id) { _open(id); $$('.side-ch').forEach(b => b.classList.toggle('active', b.dataset.ch === id)); };
  window.backToList = function () { _back(); $$('.side-ch.active').forEach(b => b.classList.remove('active')); };
  window.addEventListener('hashchange', () => window.navTo(location.hash.slice(1)));
  show(location.hash.slice(1).replace('section-', ''));
})();

} catch (e) { console.error('app bloc 4', e); }
;
try {

Object.assign(EXERCISE_TESTS, window.GEN_TESTS);
document.querySelectorAll('.CodeMirror textarea').forEach(t => t.setAttribute('aria-label', (t.closest('.exercise-card') && t.closest('.exercise-card').dataset.theme === 'sql' ? 'Éditeur de code SQL' : 'Éditeur de code Python')));
(function () {
  const ov = window.validateExercise;
  window.validateExercise = async function (id) {
    const t = window.GEN_TESTS[id];
    if (!t || t.type !== 'script') return ov(id);
    const rep = document.getElementById('report-' + id), btn = document.getElementById('validate-btn-' + id), res = [];
    btn.disabled = true; btn.textContent = 'Vérification...'; rep.classList.add('open');
    try {
      const py = await getPyodide(), code = document.getElementById(id).value;
      const clean = code.split('\n').filter(l => !t.names.some(n => new RegExp('^' + n + '\\s*=').test(l))).join('\n');
      for (const c of t.cases) {
        const label = escapeHtml(c.label || (c.pre ? c.pre.replace(/\n/g, ' ; ') : 'Sortie du programme'));
        try {
          py.runPython('import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = sys.stdout');
          await py.runPythonAsync(c.pre + '\n' + clean + (c.post ? '\n' + c.post : ''), { globals: py.globals.get('dict')() });
          const got = py.runPython('sys.stdout.getvalue()').trim(), ok = got === c.out.trim();
          res.push({ pass: ok, label, detail: ok ? 'affiche exactement ce qui est attendu' : 'affiche :\n' + escapeHtml(got) + '\n\nattendu :\n' + escapeHtml(c.out) });
        } catch (e) { res.push({ pass: false, label, detail: 'erreur : ' + escapeHtml((e.message || String(e)).split('\n').pop()) }); }
      }
      const all = res.every(r => r.pass);
      renderTestReport(rep, res, all);
      if (all) { saveState('done-' + id, true); document.getElementById(id).closest('.exercise-card').classList.add('done'); }
    } catch (e) { rep.innerHTML = '<div class="test-report-header crashed"><svg class=ico aria-hidden=true><use href=#i-circle-x></use></svg> Le code n\'a pas pu s\'exécuter</div>'; }
    btn.disabled = false; btn.innerHTML = '<svg class=ico aria-hidden=true><use href=#i-flask-conical></use></svg> Valider l\'exercice';
  };
  const o = window.applyExerciseFilters;
  window.applyExerciseFilters = function () {
    o();
    document.querySelectorAll('.exo-level').forEach(l => { l.hidden = !l.querySelector('.exercise-card:not(.hidden-by-filter)'); });
    document.querySelectorAll('.exo-theme').forEach(t => { t.hidden = !t.querySelector('.exo-level:not([hidden])'); });
  };
  window.applyExerciseFilters();
})();

/* Accessibilité + chargement de Python à la demande */
(function () {
  const lab = () => document.querySelectorAll('.CodeMirror textarea').forEach(t => { if (!t.getAttribute('aria-label')) t.setAttribute('aria-label', (t.closest('.exercise-card') && t.closest('.exercise-card').dataset.theme === 'sql' ? 'Éditeur de code SQL' : 'Éditeur de code Python')); });
  const scroll = () => document.querySelectorAll('.CodeMirror-scroll, .mini-output, .solution-box pre').forEach(e => {
    if (e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1) { if (e.tabIndex < 0) e.tabIndex = 0; } });
  lab();
  const nav = window.navTo;
  window.navTo = window.showSection = function (n) { nav(n); requestAnimationFrame(() => { lab(); scroll(); }); };
  let warm = false;
  document.addEventListener('focusin', e => { if (!warm && e.target.closest && e.target.closest('.CodeMirror') && typeof getPyodide === 'function') { warm = true; getPyodide(); } });
})();

} catch (e) { console.error('app bloc 5', e); }
;
try {

/* SQL : exécution avec le module sqlite3 de Python (Pyodide), tout reste dans le navigateur */
(function () {
  const SQL_TESTS = {"sql1": {"setup": "", "after": "", "check": "SELECT name, upper(type) FROM pragma_table_info('livres') ORDER BY cid", "expected": [["id", "INTEGER"], ["titre", "TEXT"], ["auteur", "TEXT"], ["annee", "INTEGER"]], "ordered": true, "must": [["CREATE\\s+TABLE\\s+livres", "CREATE TABLE livres"]]}, "sql2": {"setup": "", "after": "INSERT INTO joueurs(pseudo) VALUES ('Zoe');", "check": "SELECT id, pseudo, score FROM joueurs", "expected": [[1, "Zoe", 0]], "ordered": true, "must": [["PRIMARY\\s+KEY", "PRIMARY KEY"], ["pseudo\\s+TEXT\\s+NOT\\s+NULL", "pseudo en NOT NULL"], ["DEFAULT\\s+0", "DEFAULT 0"]]}, "sql3": {"setup": "", "after": "", "check": "SELECT \"table\", \"from\", \"to\" FROM pragma_foreign_key_list('livres')", "expected": [["auteurs", "auteur_id", "id"]], "ordered": true, "must": [["CREATE\\s+TABLE\\s+auteurs", "table auteurs créée"]]}, "sql4": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "SELECT id, nom, age, classe, moyenne FROM eleves ORDER BY id", "expected": [[1, "Ada", 17, "Terminale A", 15.5], [2, "Linus", 18, "Terminale A", 12.0], [3, "Grace", 17, "Terminale B", 17.25], [4, "Alan", 16, "Seconde C", 9.5], [5, "Margaret", 18, "Terminale B", 14.0], [6, "Tim", 17, "Terminale A", 11.0], [7, "Barbara", 17, "Terminale A", 16.0]], "ordered": true, "must": []}, "sql5": {"setup": "CREATE TABLE fruits (nom TEXT, prix REAL);", "after": "", "check": "SELECT nom, prix FROM fruits ORDER BY nom", "expected": [["kiwi", 0.8], ["poire", 1.5], ["pomme", 1.2]], "ordered": true, "must": [["INSERT", "un INSERT"]]}, "sql6": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "SELECT id, nom, moyenne FROM eleves ORDER BY id", "expected": [[1, "Ada", 15.5], [2, "Linus", 12.0], [3, "Grace", 17.25], [4, "Alan", 10.5], [5, "Margaret", 14.0], [6, "Tim", 11.0]], "ordered": true, "must": [["WHERE", "une clause WHERE"]]}, "sql7": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "SELECT id FROM eleves ORDER BY id", "expected": [[1], [2], [3], [5]], "ordered": true, "must": [["WHERE", "une clause WHERE"]]}, "sql8": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [[1, "Ada", 17, "Terminale A", 15.5], [2, "Linus", 18, "Terminale A", 12.0], [3, "Grace", 17, "Terminale B", 17.25], [4, "Alan", 16, "Seconde C", 9.5], [5, "Margaret", 18, "Terminale B", 14.0], [6, "Tim", 17, "Terminale A", 11.0]], "ordered": false, "must": []}, "sql9": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [["Ada", 15.5], ["Linus", 12.0], ["Grace", 17.25], ["Alan", 9.5], ["Margaret", 14.0], ["Tim", 11.0]], "ordered": false, "must": []}, "sql10": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [["Ada"], ["Linus"], ["Tim"]], "ordered": false, "must": []}, "sql11": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [["Grace", 17.25], ["Ada", 15.5], ["Margaret", 14.0], ["Linus", 12.0], ["Tim", 11.0], ["Alan", 9.5]], "ordered": true, "must": [["ORDER\\s+BY", "ORDER BY"]]}, "sql12": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [["Ada"], ["Grace"]], "ordered": false, "must": []}, "sql13": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [[2]], "ordered": false, "must": []}, "sql14": {"setup": "CREATE TABLE eleves (id INTEGER PRIMARY KEY, nom TEXT, age INTEGER, classe TEXT, moyenne REAL);\nINSERT INTO eleves VALUES (1,'Ada',17,'Terminale A',15.5),(2,'Linus',18,'Terminale A',12.0),(3,'Grace',17,'Terminale B',17.25),(4,'Alan',16,'Seconde C',9.5),(5,'Margaret',18,'Terminale B',14.0),(6,'Tim',17,'Terminale A',11.0);", "after": "", "check": "", "expected": [["Seconde C", 9.5], ["Terminale A", 12.83], ["Terminale B", 15.63]], "ordered": true, "must": [["GROUP\\s+BY", "GROUP BY"]]}, "sql15": {"setup": "CREATE TABLE auteurs (id INTEGER PRIMARY KEY, nom TEXT NOT NULL);\nCREATE TABLE livres (id INTEGER PRIMARY KEY, titre TEXT NOT NULL, annee INTEGER, auteur_id INTEGER, FOREIGN KEY (auteur_id) REFERENCES auteurs(id));\nINSERT INTO auteurs VALUES (1,'Hugo'),(2,'Camus'),(3,'Sand');\nINSERT INTO livres VALUES (1,'Les Miserables',1862,1),(2,'L''Etranger',1942,2),(3,'La Peste',1947,2),(4,'Notre-Dame de Paris',1831,1);", "after": "", "check": "", "expected": [["Les Miserables", "Hugo"], ["L'Etranger", "Camus"], ["La Peste", "Camus"], ["Notre-Dame de Paris", "Hugo"]], "ordered": false, "must": [["JOIN", "JOIN"]]}, "sql16": {"setup": "CREATE TABLE auteurs (id INTEGER PRIMARY KEY, nom TEXT NOT NULL);\nCREATE TABLE livres (id INTEGER PRIMARY KEY, titre TEXT NOT NULL, annee INTEGER, auteur_id INTEGER, FOREIGN KEY (auteur_id) REFERENCES auteurs(id));\nINSERT INTO auteurs VALUES (1,'Hugo'),(2,'Camus'),(3,'Sand');\nINSERT INTO livres VALUES (1,'Les Miserables',1862,1),(2,'L''Etranger',1942,2),(3,'La Peste',1947,2),(4,'Notre-Dame de Paris',1831,1);", "after": "", "check": "", "expected": [["L'Etranger"], ["La Peste"]], "ordered": false, "must": [["JOIN", "JOIN"]]}, "sql17": {"setup": "CREATE TABLE auteurs (id INTEGER PRIMARY KEY, nom TEXT NOT NULL);\nCREATE TABLE livres (id INTEGER PRIMARY KEY, titre TEXT NOT NULL, annee INTEGER, auteur_id INTEGER, FOREIGN KEY (auteur_id) REFERENCES auteurs(id));\nINSERT INTO auteurs VALUES (1,'Hugo'),(2,'Camus'),(3,'Sand');\nINSERT INTO livres VALUES (1,'Les Miserables',1862,1),(2,'L''Etranger',1942,2),(3,'La Peste',1947,2),(4,'Notre-Dame de Paris',1831,1);", "after": "", "check": "SELECT livres.titre, auteurs.nom FROM livres JOIN auteurs ON livres.auteur_id = auteurs.id WHERE livres.id = 5", "expected": [["Germinal", "Zola"]], "ordered": true, "must": []}, "sql18": {"setup": "CREATE TABLE auteurs (id INTEGER PRIMARY KEY, nom TEXT NOT NULL);\nCREATE TABLE livres (id INTEGER PRIMARY KEY, titre TEXT NOT NULL, annee INTEGER, auteur_id INTEGER, FOREIGN KEY (auteur_id) REFERENCES auteurs(id));\nINSERT INTO auteurs VALUES (1,'Hugo'),(2,'Camus'),(3,'Sand');\nINSERT INTO livres VALUES (1,'Les Miserables',1862,1),(2,'L''Etranger',1942,2),(3,'La Peste',1947,2),(4,'Notre-Dame de Paris',1831,1);", "after": "", "check": "", "expected": [["Camus", 2], ["Hugo", 2], ["Sand", 0]], "ordered": true, "must": [["LEFT\\s+JOIN", "LEFT JOIN"]]}};
  const HELPER = String.raw`import sqlite3, json, re

def _nsi_sql(setup, code, after, check, mode):
    out = {"error": None, "text": "", "rows": None}
    con = sqlite3.connect(":memory:")

    def fmt(cols, rows):
        if not rows:
            return " | ".join(cols) + "\n(aucune ligne)"
        cells = [[("NULL" if v is None else str(v)) for v in r] for r in rows[:50]]
        w = [max(len(c), *(len(r[i]) for r in cells)) for i, c in enumerate(cols)]
        lines = [" | ".join(c.ljust(w[i]) for i, c in enumerate(cols)),
                 "-+-".join("-" * x for x in w)]
        for r in cells:
            lines.append(" | ".join(r[i].ljust(w[i]) for i in range(len(cols))))
        n = len(rows)
        lines.append("(" + str(n) + " ligne" + ("s" if n > 1 else "") + (", 50 premières affichées" if n > 50 else "") + ")")
        return "\n".join(lines)

    try:
        con.execute("PRAGMA foreign_keys = ON")
        if setup:
            con.executescript(setup)
        base = con.total_changes
        stmts, buf = [], ""
        for line in code.splitlines(keepends=True):
            buf += line
            if sqlite3.complete_statement(buf):
                stmts.append(buf.strip())
                buf = ""
        rest = re.sub(r"/\*.*?\*/", "", re.sub(r"--[^\n]*", "", buf), flags=re.S).strip()
        if rest:
            stmts.append(buf.strip())
        last = None
        last_sql = ""
        for n, st in enumerate(stmts, 1):
            try:
                cur = con.execute(st)
            except sqlite3.Error as e:
                out["error"] = str(e) + (" (requête " + str(n) + ")" if len(stmts) > 1 else "")
                break
            last_sql = st
            last = ([d[0] for d in cur.description], cur.fetchall()) if cur.description else None
        if out["error"] is None:
            if mode == "test":
                if after:
                    con.executescript(after)
                if check:
                    rows = con.execute(check).fetchall()
                elif last:
                    rows = last[1]
                else:
                    rows = None
                out["rows"] = None if rows is None else [list(r) for r in rows]
            else:
                if not stmts:
                    out["text"] = "Écris une requête, puis appuie sur Exécuter."
                elif last:
                    out["text"] = fmt(*last)
                else:
                    kind = re.sub(r"(?s)(/\*.*?\*/|--[^\n]*)", "", last_sql).split()[0].upper() if last_sql else ""
                    msg = "Requête exécutée."
                    if kind in ("INSERT", "UPDATE", "DELETE"):
                        k = con.total_changes - base
                        msg = str(k) + " ligne" + ("s" if k > 1 else "") + " modifiée" + ("s" if k > 1 else "") + " au total."
                        m = re.search(r"(?i)\b(?:INTO|UPDATE|FROM)\s+(\w+)", last_sql)
                        if m:
                            try:
                                cur = con.execute("SELECT * FROM " + m.group(1))
                                msg += "\n\nContenu de " + m.group(1) + " :\n" + fmt([d[0] for d in cur.description], cur.fetchall())
                            except sqlite3.Error:
                                pass
                    elif kind == "CREATE":
                        info = con.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").fetchall()
                        msg = "Table(s) existante(s) : " + ", ".join(r[0] for r in info)
                        for (t,) in info:
                            cols = con.execute("PRAGMA table_info(" + t + ")").fetchall()
                            msg += "\n  " + t + " (" + ", ".join(c[1] + " " + (c[2] or "") + (" PK" if c[5] else "") for c in cols) + ")"
                    out["text"] = msg
    except sqlite3.Error as e:
        out["error"] = str(e)
    finally:
        con.close()
    return json.dumps(out, default=str, ensure_ascii=False)
`;
  async function sqlPy() {
    const py = await getPyodide();
    if (!py._nsiSql) {
      try { await py.loadPackage('sqlite3'); } catch (e) { /* peut déjà être intégré */ }
      py.runPython(HELPER);
      py._nsiSql = true;
    }
    return py;
  }
  const norm = v => (typeof v === 'number' ? Math.round(v * 100) / 100 : v);
  const key = r => JSON.stringify(r.map(norm));
  const show = rows => !rows.length ? '(aucune ligne)' : rows.slice(0, 8).map(r => r.map(v => v === null ? 'NULL' : String(v)).join(' | ')).join('\n') + (rows.length > 8 ? '\n...' : '');
  const strip = c => c.replace(/\/\*[\s\S]*?\*\//g, '').replace(/--[^\n]*/g, '');
  const btnHtml = '<svg class=ico aria-hidden=true><use href=#i-flask-conical></use></svg> Valider l\'exercice';

  async function runSql(id) {
    const t = SQL_TESTS[id], out = document.getElementById('out-' + id);
    out.className = 'mini-output'; out.textContent = 'Exécution...'; out.style.color = 'var(--accent3)'; out.style.fontStyle = 'normal';
    try {
      const py = await sqlPy();
      const r = JSON.parse(py.globals.get('_nsi_sql')(t.setup || '', document.getElementById(id).value, '', '', 'run'));
      if (r.error) { out.textContent = 'Erreur SQL : ' + r.error; out.style.color = 'var(--red)'; out.classList.add('has-error'); }
      else { out.textContent = r.text; out.style.color = 'var(--accent3)'; }
    } catch (e) { out.textContent = String((e && e.message) || e).trim().split('\n').pop(); out.style.color = 'var(--red)'; out.classList.add('has-error'); }
  }

  async function validateSql(id) {
    const t = SQL_TESTS[id], rep = document.getElementById('report-' + id), btn = document.getElementById('validate-btn-' + id), res = [];
    btn.disabled = true; btn.textContent = 'Vérification...'; rep.classList.add('open');
    try {
      const py = await sqlPy(), code = document.getElementById(id).value, bare = strip(code);
      for (const [re, label] of (t.must || [])) {
        const ok = new RegExp(re, 'i').test(bare);
        res.push({ pass: ok, label: label, detail: ok ? 'présent dans ton code' : 'absent de ton code' });
      }
      const r = JSON.parse(py.globals.get('_nsi_sql')(t.setup || '', code, t.after || '', t.check || '', 'test'));
      if (r.error) res.push({ pass: false, label: 'Exécution', detail: 'erreur SQL : ' + escapeHtml(r.error) });
      else if (r.rows === null) res.push({ pass: false, label: 'Résultat', detail: 'ton code ne retourne aucun résultat : il faut une requête SELECT' });
      else {
        let a = r.rows.map(key), b = t.expected.map(key);
        if (!t.ordered) { a = a.slice().sort(); b = b.slice().sort(); }
        const ok = a.length === b.length && a.every((x, i) => x === b[i]);
        res.push({ pass: ok, label: t.check ? 'Contenu de la base après ton code' : 'Résultat de ta requête',
          detail: ok ? 'correspond exactement à ce qui est attendu' : 'tu obtiens :\n' + escapeHtml(show(r.rows)) + '\n\nattendu :\n' + escapeHtml(show(t.expected)) });
      }
      const all = res.every(x => x.pass);
      renderTestReport(rep, res, all);
      if (all) { saveState('done-' + id, true); document.getElementById(id).closest('.exercise-card').classList.add('done'); }
    } catch (e) {
      rep.innerHTML = '<div class="test-report-header crashed"><svg class=ico aria-hidden=true><use href=#i-circle-x></use></svg> Le code n\'a pas pu s\'exécuter</div>';
    }
    btn.disabled = false; btn.innerHTML = btnHtml;
  }

  const ov = window.validateExercise, or = window.runExercise;
  window.validateExercise = function (id) { return SQL_TESTS[id] ? validateSql(id) : ov(id); };
  window.runExercise = function (id) { return SQL_TESTS[id] ? runSql(id) : or(id); };
})();

} catch (e) { console.error('app bloc 6', e); }
;
try {

/* Accueil : chaque carte affiche, en boucle, les chapitres de son niveau (liste lue dans CHAPTERS) */
(function () {
  const stack = document.getElementById('hero-stack'), hero = document.getElementById('hero');
  if (!stack || typeof CHAPTERS === 'undefined') return;
  const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;'), lvl = c => (/avanc|diffic/.test(c.level) ? 'difficile' : c.level);
  [['debutant', '.mini.g', 24], ['intermediaire', '.mini.o', 32], ['difficile', '.mini.v', 20]].forEach(([lv, sel, speed]) => {
    const card = stack.querySelector(sel); let list = CHAPTERS.filter(c => lvl(c) === lv); if (!card || !list.length) return;
    while (list.length < 8) list = list.concat(list);
    const html = list.map(c => '<div class="chip"><i class="ic">' + (c.icon || '') + '</i><em class="t">' + esc(c.title) + '</em><i class="n">' + String(c.chapterNum).padStart(2, '0') + '</i></div>').join('');
    card.insertAdjacentHTML('beforeend', '<div class="reel-win" aria-hidden="true"><div class="reel" style="--d:' + Math.round(list.length * 52 / speed) + 's">' + html + html + '</div></div>');
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) window.addEventListener('load', () => setTimeout(() => stack.classList.add('orbit'), 4200));
  let seen = true, tabOn = true; const sync = () => stack.classList.toggle('paused', !seen || !tabOn);
  if ('IntersectionObserver' in window && hero) new IntersectionObserver(es => { seen = es[0].isIntersecting; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', () => { tabOn = !document.hidden; sync(); });
})();

} catch (e) { console.error('app bloc 7', e); }
;
try {

/* Sidebar : pastille lumineuse qui glisse sous l'élément survolé + effet « dock » sur les voisins */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const SEL = '.nav-link, .side-ch';
  const desk = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const lens = document.createElement('div');
  lens.className = 'side-lens';
  lens.setAttribute('aria-hidden', 'true');
  nav.appendChild(lens);

  let px = 0, py = 0, inside = false, focusEl = null, raf = 0, current = null, shown = false;

  function hide() { lens.classList.remove('on'); shown = false; current = null; }

  function show(el, centered) {
    const n = nav.getBoundingClientRect(), r = el.getBoundingClientRect();
    let top = r.top, bottom = r.bottom;
    const box = el.closest('.side-chapters');            // ne pas déborder de la liste qui défile
    if (box) { const b = box.getBoundingClientRect(); top = Math.max(top, b.top); bottom = Math.min(bottom, b.bottom); }
    if (bottom - top < 6) { hide(); return; }
    const snap = !shown || reduced.matches;               // 1re apparition : pas de glissement depuis le coin
    if (snap) lens.classList.add('snap');
    if (el !== current) {
      const c = el.classList.contains('side-ch') ? getComputedStyle(el).getPropertyValue('--tone').trim() : '';
      lens.style.setProperty('--lens-c', c || 'var(--accent)');   // lueur de la couleur du niveau du chapitre
      current = el;
    }
    lens.style.width = r.width + 'px';
    lens.style.height = (bottom - top) + 'px';
    lens.style.transform = 'translate(' + (r.left - n.left) + 'px,' + (top - n.top) + 'px)';
    lens.style.setProperty('--lx', (centered ? r.width / 2 : px - r.left) + 'px');
    if (snap) { void lens.offsetWidth; lens.classList.remove('snap'); }
    lens.classList.add('on'); shown = true;
  }

  function magnify(on) {
    const els = [...nav.querySelectorAll(SEL)];
    if (!on || reduced.matches) { els.forEach(el => el.style.removeProperty('--mag')); return; }
    const R = 100;                                        // portée de la loupe en px
    const vals = els.map(el => {                          // 1) on lit tout…
      const r = el.getBoundingClientRect();
      const k = Math.max(0, 1 - Math.abs(py - (r.top + r.height / 2)) / R);
      return k * k * (3 - 2 * k);
    });
    els.forEach((el, i) => {                              // 2) …puis on écrit tout
      if (vals[i] > .002) el.style.setProperty('--mag', vals[i].toFixed(3));
      else el.style.removeProperty('--mag');
    });
  }

  function update() {
    raf = 0;
    if (!desk.matches) { hide(); magnify(false); return; }
    if (inside) {
      const hit = document.elementFromPoint(px, py);
      const it = hit && hit.closest ? hit.closest(SEL) : null;
      if (it && nav.contains(it)) { show(it, false); magnify(true); return; }
      if (current) {                                      // petit espace entre deux lignes : on ne clignote pas
        const r = current.getBoundingClientRect();
        if (Math.abs(py - (r.top + r.height / 2)) <= r.height / 2 + 4) { magnify(true); return; }
      }
      hide(); magnify(false); return;
    }
    if (focusEl) { show(focusEl, true); magnify(false); return; }   // navigation au clavier
    hide(); magnify(false);
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

  nav.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    inside = true; px = e.clientX; py = e.clientY; schedule();
  }, { passive: true });
  nav.addEventListener('pointerleave', () => { inside = false; schedule(); });
  nav.addEventListener('focusin', e => {
    if (e.target.matches && e.target.matches(SEL) && e.target.matches(':focus-visible')) { focusEl = e.target; schedule(); }
  });
  nav.addEventListener('focusout', () => { focusEl = null; schedule(); });
  const chap = document.getElementById('side-chapters');
  if (chap) chap.addEventListener('scroll', () => { if (inside || focusEl) schedule(); }, { passive: true });
  desk.addEventListener('change', schedule);
  window.addEventListener('blur', () => { inside = false; schedule(); });
})();

} catch (e) { console.error('app bloc 8', e); }
