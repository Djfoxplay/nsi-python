/* Cours de Première et Terminale (objet LESSONS) */
const LESSONS = {
  sql: {
    title: "Le SQL",
    icon: "<svg class=ico aria-hidden=true><use href=#i-database></use></svg>",
    level: "intermediaire",
    duration: "30 min",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-database></use></svg> Le SQL</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 21</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~30 min</span>
  <span class="detail-meta-item" style="color:var(--accent2)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Bonus</span>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span>Les données de presque tous les sites et applications vivent dans une base de données, et on leur parle en <strong>SQL</strong>. Ce chapitre bonus couvre l'essentiel : créer des tables, y insérer des données, les interroger, puis relier les tables entre elles grâce aux clés. Les exercices s'exécutent directement ici, avec SQLite.</span>
</div>
<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-sql-creer')" role="tab" aria-selected="true" aria-controls="tab-sql-creer">Créer une table</button>
  <button class="tab" onclick="switchTab(this, 'tab-sql-inserer')" role="tab" aria-selected="false" aria-controls="tab-sql-inserer">Insérer des données</button>
  <button class="tab" onclick="switchTab(this, 'tab-sql-requetes')" role="tab" aria-selected="false" aria-controls="tab-sql-requetes">Faire des requêtes</button>
  <button class="tab" onclick="switchTab(this, 'tab-sql-cles')" role="tab" aria-selected="false" aria-controls="tab-sql-cles">Clés primaire et étrangère</button>
</div>

<div id="tab-sql-creer" class="tab-content active" role="tabpanel">
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-database></use></svg> Une table, c'est un tableau typé</div>
  <div class="concept-body">
    Une <strong>base de données</strong> range l'information dans des <strong>tables</strong>. Chaque colonne a un nom et un type, chaque ligne est un enregistrement. Avant de stocker quoi que ce soit, il faut donc décrire la forme de la table avec <code>CREATE TABLE</code>.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">creer_table.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm">-- Crée une table eleves avec 5 colonnes.</span>
<span class="cm">-- Chaque colonne : un nom, un type, puis des contraintes éventuelles.</span>
<span class="kw">CREATE</span> <span class="kw">TABLE</span> eleves (
    id <span class="builtin">INTEGER</span> <span class="kw">PRIMARY</span> <span class="kw">KEY</span>,       <span class="cm">-- identifiant unique de chaque ligne</span>
    nom <span class="builtin">TEXT</span> <span class="kw">NOT</span> <span class="kw">NULL</span>,            <span class="cm">-- obligatoire : jamais vide</span>
    age <span class="builtin">INTEGER</span>,
    classe <span class="builtin">TEXT</span>,
    moyenne <span class="builtin">REAL</span> <span class="kw">DEFAULT</span> <span class="num">0</span>        <span class="cm">-- vaut 0 si on ne donne pas de valeur</span>
);

<span class="cm">-- Supprimer une table (et toutes ses données)</span>
<span class="kw">DROP</span> <span class="kw">TABLE</span> eleves;</pre>
</div>
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-tag></use></svg> Les types et les contraintes à connaître</div>
  <div class="concept-body">
    <code>INTEGER</code> pour les entiers, <code>REAL</code> pour les nombres à virgule, <code>TEXT</code> pour le texte.<br>Les contraintes : <code>PRIMARY KEY</code> (identifiant unique), <code>NOT NULL</code> (valeur obligatoire), <code>DEFAULT v</code> (valeur par défaut), <code>UNIQUE</code> (pas de doublon).
  </div>
</div>
<div class="callout callout-tip">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
  <span>Écris les mots-clés SQL en majuscules et les noms de tables et colonnes en minuscules, sans espaces ni accents : le code se lit beaucoup plus vite.</span>
</div>
<div class="callout callout-warn">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
  <span>Chaque instruction se termine par un point-virgule. Et <code>DROP TABLE</code> efface tout sans demander confirmation.</span>
</div>
</div>

<div id="tab-sql-inserer" class="tab-content" role="tabpanel">
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-plus></use></svg> Ajouter, modifier, supprimer</div>
  <div class="concept-body">
    Trois instructions manipulent le contenu d'une table : <code>INSERT INTO</code> ajoute des lignes, <code>UPDATE</code> modifie des lignes existantes, <code>DELETE FROM</code> en supprime. Le texte s'écrit entre apostrophes.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">inserer.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm">-- Ajouter une ligne : une valeur par colonne, dans l'ordre</span>
<span class="kw">INSERT</span> <span class="kw">INTO</span> eleves <span class="kw">VALUES</span> (<span class="num">1</span>, <span class="str">'Ada'</span>, <span class="num">17</span>, <span class="str">'Terminale A'</span>, <span class="num">15.5</span>);

<span class="cm">-- Ou en nommant les colonnes (les autres prennent leur valeur par défaut)</span>
<span class="kw">INSERT</span> <span class="kw">INTO</span> eleves (id, nom, age) <span class="kw">VALUES</span> (<span class="num">2</span>, <span class="str">'Linus'</span>, <span class="num">18</span>);

<span class="cm">-- Ajouter plusieurs lignes en une seule instruction</span>
<span class="kw">INSERT</span> <span class="kw">INTO</span> eleves <span class="kw">VALUES</span>
    (<span class="num">3</span>, <span class="str">'Grace'</span>, <span class="num">17</span>, <span class="str">'Terminale B'</span>, <span class="num">17.25</span>),
    (<span class="num">4</span>, <span class="str">'Alan'</span>, <span class="num">16</span>, <span class="str">'Seconde C'</span>, <span class="num">9.5</span>);</pre>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">modifier_supprimer.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm">-- Modifier : SET donne la nouvelle valeur, WHERE choisit les lignes</span>
<span class="kw">UPDATE</span> eleves <span class="kw">SET</span> moyenne = <span class="num">10.5</span> <span class="kw">WHERE</span> nom = <span class="str">'Alan'</span>;

<span class="cm">-- Supprimer les lignes qui vérifient la condition</span>
<span class="kw">DELETE</span> <span class="kw">FROM</span> eleves <span class="kw">WHERE</span> moyenne &lt; <span class="num">10</span>;</pre>
</div>
<div class="callout callout-warn">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
  <span>Sans <code>WHERE</code>, <code>UPDATE</code> et <code>DELETE</code> s'appliquent à <strong>toutes</strong> les lignes de la table. Vérifie toujours ta condition avant de lancer.</span>
</div>
</div>

<div id="tab-sql-requetes" class="tab-content" role="tabpanel">
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-search></use></svg> SELECT : interroger les données</div>
  <div class="concept-body">
    <code>SELECT</code> lit des données sans les modifier. Tu choisis les colonnes après <code>SELECT</code>, la table après <code>FROM</code>, puis tu affines avec <code>WHERE</code> (filtrer), <code>ORDER BY</code> (trier) et <code>LIMIT</code> (limiter).
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">requetes.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm">-- Toutes les colonnes de toutes les lignes</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> eleves;

<span class="cm">-- Seulement certaines colonnes</span>
<span class="kw">SELECT</span> nom, moyenne <span class="kw">FROM</span> eleves;

<span class="cm">-- Filtrer avec WHERE (AND, OR, NOT pour combiner)</span>
<span class="kw">SELECT</span> nom <span class="kw">FROM</span> eleves <span class="kw">WHERE</span> classe = <span class="str">'Terminale A'</span> <span class="kw">AND</span> moyenne &gt;= <span class="num">12</span>;

<span class="cm">-- Recherche partielle : noms qui commencent par A</span>
<span class="kw">SELECT</span> nom <span class="kw">FROM</span> eleves <span class="kw">WHERE</span> nom <span class="kw">LIKE</span> <span class="str">'A%'</span>;

<span class="cm">-- Trier (DESC = décroissant) et garder les 3 premiers</span>
<span class="kw">SELECT</span> nom, moyenne <span class="kw">FROM</span> eleves <span class="kw">ORDER</span> <span class="kw">BY</span> moyenne <span class="kw">DESC</span> <span class="kw">LIMIT</span> <span class="num">3</span>;</pre>
</div>
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-chart-column></use></svg> Calculer : fonctions d'agrégation et GROUP BY</div>
  <div class="concept-body">
    <code>COUNT</code>, <code>AVG</code>, <code>SUM</code>, <code>MIN</code> et <code>MAX</code> résument plusieurs lignes en une seule valeur. Avec <code>GROUP BY</code>, le calcul se fait séparément pour chaque groupe.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">agregation.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm">-- Combien d'élèves ?</span>
<span class="kw">SELECT</span> <span class="fn">COUNT</span>(*) <span class="kw">FROM</span> eleves;

<span class="cm">-- La meilleure moyenne</span>
<span class="kw">SELECT</span> <span class="fn">MAX</span>(moyenne) <span class="kw">FROM</span> eleves;

<span class="cm">-- Une moyenne par classe, arrondie à 2 décimales</span>
<span class="kw">SELECT</span> classe, <span class="fn">ROUND</span>(<span class="fn">AVG</span>(moyenne), <span class="num">2</span>)
<span class="kw">FROM</span> eleves
<span class="kw">GROUP</span> <span class="kw">BY</span> classe;</pre>
</div>
<div class="callout callout-info">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-compass></use></svg></span>
  <span>L'ordre des mots est toujours le même : <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code>, <code>LIMIT</code>.</span>
</div>
</div>

<div id="tab-sql-cles" class="tab-content" role="tabpanel">
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-key></use></svg> Clé primaire : identifier chaque ligne</div>
  <div class="concept-body">
    Une <strong>clé primaire</strong> est une colonne dont la valeur est unique pour chaque ligne et jamais vide. Elle sert à désigner une ligne sans ambiguïté, même si deux élèves ont le même nom.
  </div>
</div>
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-link></use></svg> Clé étrangère : relier deux tables</div>
  <div class="concept-body">
    Plutôt que de recopier le nom de l'auteur sur chaque livre, on met les auteurs dans leur propre table et on stocke dans <code>livres</code> uniquement l'<strong>identifiant</strong> de l'auteur. Cette colonne s'appelle une <strong>clé étrangère</strong> : elle pointe vers la clé primaire d'une autre table.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">cles.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="kw">CREATE</span> <span class="kw">TABLE</span> auteurs (
    id <span class="builtin">INTEGER</span> <span class="kw">PRIMARY</span> <span class="kw">KEY</span>,
    nom <span class="builtin">TEXT</span> <span class="kw">NOT</span> <span class="kw">NULL</span>
);

<span class="kw">CREATE</span> <span class="kw">TABLE</span> livres (
    id <span class="builtin">INTEGER</span> <span class="kw">PRIMARY</span> <span class="kw">KEY</span>,
    titre <span class="builtin">TEXT</span> <span class="kw">NOT</span> <span class="kw">NULL</span>,
    annee <span class="builtin">INTEGER</span>,
    auteur_id <span class="builtin">INTEGER</span>,
    <span class="kw">FOREIGN</span> <span class="kw">KEY</span> (auteur_id) <span class="kw">REFERENCES</span> auteurs(id)
);

<span class="cm">-- SQLite demande d'activer la vérification des clés étrangères</span>
<span class="kw">PRAGMA</span> foreign_keys = <span class="kw">ON</span>;

<span class="kw">INSERT</span> <span class="kw">INTO</span> auteurs <span class="kw">VALUES</span> (<span class="num">1</span>, <span class="str">'Hugo'</span>);
<span class="kw">INSERT</span> <span class="kw">INTO</span> livres <span class="kw">VALUES</span> (<span class="num">1</span>, <span class="str">'Les Miserables'</span>, <span class="num">1862</span>, <span class="num">1</span>);   <span class="cm">-- accepté</span>
<span class="kw">INSERT</span> <span class="kw">INTO</span> livres <span class="kw">VALUES</span> (<span class="num">2</span>, <span class="str">'Livre fantome'</span>, <span class="num">2000</span>, <span class="num">99</span>);   <span class="cm">-- refusé : l'auteur 99 n'existe pas</span></pre>
</div>
<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span>C'est ce qu'on appelle l'<strong>intégrité référentielle</strong> : la base refuse d'enregistrer un livre dont l'auteur n'existe pas. L'ordre des insertions compte donc : l'auteur d'abord, le livre ensuite.</span>
</div>
<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-git-compare></use></svg> Recoller les morceaux avec JOIN</div>
  <div class="concept-body">
    <code>JOIN ... ON</code> associe chaque clé étrangère à la clé primaire qu'elle désigne. Avec <code>LEFT JOIN</code>, on garde aussi les lignes de la table de gauche qui n'ont aucune correspondance.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">jointure.sql</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm">-- Chaque livre avec le nom de son auteur</span>
<span class="kw">SELECT</span> livres.titre, auteurs.nom
<span class="kw">FROM</span> livres
<span class="kw">JOIN</span> auteurs <span class="kw">ON</span> livres.auteur_id = auteurs.id;

<span class="cm">-- Tous les auteurs, même ceux sans livre</span>
<span class="kw">SELECT</span> auteurs.nom, <span class="fn">COUNT</span>(livres.id)
<span class="kw">FROM</span> auteurs
<span class="kw">LEFT</span> <span class="kw">JOIN</span> livres <span class="kw">ON</span> livres.auteur_id = auteurs.id
<span class="kw">GROUP</span> <span class="kw">BY</span> auteurs.id;</pre>
</div>
</div>

`
  },
  listes: {
    title: "Les Listes",
    icon: "<svg class=ico aria-hidden=true><use href=#i-clipboard-list></use></svg>",
    level: "debutant",
    duration: "20 min",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-clipboard-list></use></svg> Les Listes</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 1</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~20 min</span>
  <span class="detail-meta-item" style="color:var(--accent3)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Débutant</span>
</div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-listes-debutant')" role="tab" aria-selected="true" aria-controls="tab-listes-debutant">Débutant</button>
  <button class="tab" onclick="switchTab(this, 'tab-listes-intermediaire')" role="tab" aria-selected="false" aria-controls="tab-listes-intermediaire">Intermédiaire</button>
</div>

<div id="tab-listes-debutant" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brain></use></svg> C'est quoi une liste, et pourquoi ça existe ?</div>
    <div class="concept-body">
      Imagine que tu dois stocker les notes de 30 élèves. Tu pourrais créer 30 variables (<code>note1</code>, <code>note2</code>, ... <code>note30</code>), mais ce serait ingérable : impossible de les parcourir facilement, impossible de savoir combien il y en a sans compter à la main, et un cauchemar à maintenir.<br><br>
      Une <strong>liste</strong> résout ce problème : c'est une <strong>seule variable</strong> qui contient plusieurs valeurs, rangées dans l'ordre. C'est la structure de données la plus utilisée en Python, car presque tous les problèmes qu'on te posera au bac (trier, chercher, calculer une moyenne...) partent d'une liste de valeurs.
    </div>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-hash></use></svg> Pourquoi les indices commencent à 0 (et pas à 1)</div>
    <div class="concept-body">
      C'est LA question que tout le monde se pose en débutant. La réponse : un indice ne représente pas "le combientième élément", mais <strong>le décalage par rapport au début de la liste</strong>. Le premier élément est à 0 pas de décalage de lui-même. Ce choix vient de très bas niveau (comment l'ordinateur retrouve une case en mémoire), mais retiens surtout ceci : c'est une convention universelle dans presque tous les langages de programmation, donc autant s'y habituer tout de suite plutôt que de lutter contre.<br><br>
      Par exemple : <code>L = [87, 12, 3]</code>, <code>L[0]</code> vaut 87 (le 1er), <code>L[1]</code> vaut 12 (le 2e), <code>L[2]</code> vaut 3 (le 3e, et aussi le dernier).
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">liste_bases.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># On crée une liste avec des crochets [ ], les valeurs séparées par des virgules</span>
L = [<span class="num">87</span>, <span class="num">12</span>, <span class="num">3</span>, <span class="num">199</span>]

<span class="cm"># On accède à un élément avec son indice entre crochets</span>
<span class="builtin">print</span>(L[<span class="num">0</span>])    <span class="cm"># → 87 (le 1er élément, indice 0)</span>
<span class="builtin">print</span>(L[<span class="num">2</span>])    <span class="cm"># → 3  (le 3e élément, indice 2)</span>

<span class="cm"># L[-1] veut dire "le dernier". Pratique quand on ne connaît pas
# la longueur exacte de la liste : pas besoin de calculer len(L)-1 !</span>
<span class="builtin">print</span>(L[-<span class="num">1</span>])   <span class="cm"># → 199 (le dernier, quelle que soit la taille de L)</span>

<span class="cm"># len() retourne le NOMBRE d'éléments (pas le dernier indice !)
# Si la liste a 4 éléments, len(L) vaut 4, mais le dernier indice est 3</span>
<span class="builtin">print</span>(<span class="builtin">len</span>(L))   <span class="cm"># → 4</span>

<span class="cm"># .append() ajoute un élément à LA FIN de la liste, en place
# (pas besoin de faire L = L.append(42), ça écraserait L !)</span>
L.<span class="fn">append</span>(<span class="num">42</span>)
<span class="builtin">print</span>(L)        <span class="cm"># → [87, 12, 3, 199, 42]</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Erreur très fréquente : essayer d'accéder à <code>L[len(L)]</code> en pensant avoir le dernier élément. C'est faux ! Si <code>len(L)</code> vaut 4, les indices valides sont 0, 1, 2, 3 : <code>L[4]</code> provoque une <code>IndexError</code>. Le dernier indice valide est toujours <code>len(L) - 1</code>, ou plus simplement <code>L[-1]</code>.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-refresh-cw></use></svg> Parcourir une liste : pourquoi utiliser une boucle plutôt que tout écrire à la main</div>
    <div class="concept-body">
      Si ta liste contient 3 éléments, tu pourrais écrire <code>print(L[0])</code>, <code>print(L[1])</code>, <code>print(L[2])</code> à la main. Mais si elle en contient 1000 ? Ou si tu ne sais même pas combien elle en contient à l'avance (par exemple, une liste remplie par l'utilisateur) ? C'est exactement le problème que la boucle <code>for</code> résout : elle répète une action pour chaque indice, <strong>peu importe la taille de la liste</strong>.<br><br>
      On utilise <code>range(len(L))</code> pour générer automatiquement tous les indices valides, de <code>0</code> à <code>len(L) - 1</code>. C'est cette combinaison (longueur de la liste + range + boucle for) que tu vas retrouver dans quasiment tous tes algorithmes de tri et de recherche.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">parcours.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>L = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>]

<span class="cm"># On calcule la longueur UNE SEULE FOIS et on la stocke dans "lg".
# Pourquoi ? Si on écrivait range(len(L)) directement dans la boucle,
# Python recalculerait len(L) à chaque tour, inutile ici, mais c'est
# une bonne habitude à prendre pour des calculs plus coûteux.</span>
lg = <span class="builtin">len</span>(L)

<span class="cm"># "i" représente l'INDICE (la position), pas la valeur elle-même.
# range(lg) génère 0, 1, 2 (jamais lg lui-même, donc jamais hors limites)</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(lg):
    <span class="builtin">print</span>(<span class="str">"L["</span>, i, <span class="str">"] ="</span>, L[i])

<span class="cm"># Affiche :
# L[ 0 ] = 10
# L[ 1 ] = 20
# L[ 2 ] = 30</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>À quoi ça sert concrètement ?</strong> Ce pattern (parcourir une liste avec ses indices) est la base de presque tous les algorithmes qu'on te demandera en NSI : trouver le maximum d'une liste, compter combien de fois un élément apparaît, trier une liste, chercher une valeur précise... Tous ces algorithmes commencent par "on parcourt la liste avec une boucle for et range(len(L))".</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-git-compare></use></svg> for i in range(len(L)) vs for x in L</div>
    <div class="concept-body">
      Il existe une deuxième façon de parcourir une liste : <code>for x in L:</code>, qui donne directement les <strong>valeurs</strong> (pas les indices). Elle est plus simple à lire, mais elle a une limite : si tu as besoin de <strong>modifier</strong> la liste, ou de connaître la <strong>position</strong> d'un élément (par exemple pour un tri, où l'on doit échanger deux positions), tu as besoin des indices, donc de <code>range(len(L))</code>.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">deux_methodes.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>L = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>]

<span class="cm"># Méthode 1 : avec les indices, utile si on a besoin de la POSITION</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="builtin">len</span>(L)):
    <span class="builtin">print</span>(<span class="str">"indice"</span>, i, <span class="str">"→ valeur"</span>, L[i])

<span class="cm"># Méthode 2 : directement sur les valeurs, plus simple, mais
# on ne connaît PAS la position de x dans la liste</span>
<span class="kw">for</span> x <span class="kw">in</span> L:
    <span class="builtin">print</span>(<span class="str">"valeur :"</span>, x)</pre>
  </div>

  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Règle simple : si tu dois <strong>modifier</strong> la liste ou comparer des <strong>positions</strong> entre elles (comme dans un tri), utilise <code>range(len(L))</code>. Si tu veux juste <strong>lire</strong> chaque valeur une par une, <code>for x in L</code> est plus lisible.</span>
  </div>

</div>

<div id="tab-listes-intermediaire" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-settings></use></svg> Mutabilité : pourquoi L2 = L ne fait PAS une copie</div>
    <div class="concept-body">
      C'est un des pièges les plus fréquents en Python, et comprendre le "pourquoi" évite de le refaire toute sa vie. Une variable qui contient une liste ne contient pas réellement les valeurs : elle contient une <strong>adresse</strong>, un peu comme un post-it avec l'adresse d'une maison, pas la maison elle-même. Quand tu fais <code>L2 = L</code>, tu recopies juste l'adresse sur un nouveau post-it, les <strong>deux post-its pointent vers la même maison</strong>. Si tu modifies la maison via <code>L2</code>, <code>L</code> "voit" aussi le changement, car c'est littéralement la même liste en mémoire.<br><br>
      On dit qu'une liste est <strong>mutable</strong> (modifiable en place). C'est très différent d'un nombre ou d'un texte, qui eux sont <strong>immuables</strong> : <code>x = 5; y = x; y = 6</code> ne change jamais la valeur de <code>x</code>, car les nombres ne peuvent pas être "modifiés en place".
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">mutabilite.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># PIÈGE : L2 = L ne copie pas la liste, ça copie juste l'ADRESSE</span>
L = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]
L2 = L                 <span class="cm"># L2 pointe vers la MÊME liste que L</span>
L2[<span class="num">0</span>] = <span class="num">99</span>
<span class="builtin">print</span>(L)             <span class="cm"># → [99, 2, 3], L a changé aussi !</span>
<span class="builtin">print</span>(L2)            <span class="cm"># → [99, 2, 3]</span>

<span class="cm"># SOLUTION : .copy() crée une VRAIE nouvelle liste, indépendante</span>
L = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]
L3 = L.<span class="fn">copy</span>()
L3[<span class="num">0</span>] = <span class="num">99</span>
<span class="builtin">print</span>(L)             <span class="cm"># → [1, 2, 3]   (inchangée, comme attendu)</span>
<span class="builtin">print</span>(L3)            <span class="cm"># → [99, 2, 3]  (seule celle-ci a changé)</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Ce piège est une source d'erreurs très fréquente dans les exercices de tri ou de recherche : si ta fonction de tri modifie la liste "en place" avec <code>L[i], L[j] = L[j], L[i]</code>, elle modifie la <strong>liste d'origine</strong> aussi, même si tu l'as appelée depuis une autre variable. Utilise <code>.copy()</code> quand tu veux garder l'originale intacte pour comparer avant/après.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-scissors></use></svg> Le slicing : découper une liste sans boucle</div>
    <div class="concept-body">
      Le slicing (<code>L[début:fin]</code>) permet d'extraire une sous-partie d'une liste sans écrire de boucle. C'est utile pour des algorithmes comme le tri fusion, où l'on doit régulièrement séparer une liste en deux moitiés. Retiens que la borne de <strong>fin est exclue</strong>, encore une fois, c'est cohérent avec le fait que les indices comptent à partir de 0.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">slicing.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>L = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]

<span class="cm"># L[1:3] veut dire "de l'indice 1 INCLUS à l'indice 3 EXCLU"
# donc on récupère les indices 1 et 2, pas 3 !</span>
<span class="builtin">print</span>(L[<span class="num">1</span>:<span class="num">3</span>])   <span class="cm"># → [2, 3]</span>

<span class="cm"># Omettre le début = "depuis le tout début"</span>
<span class="builtin">print</span>(L[:<span class="num">3</span>])    <span class="cm"># → [1, 2, 3]</span>

<span class="cm"># Omettre la fin = "jusqu'à la toute fin"</span>
<span class="builtin">print</span>(L[<span class="num">2</span>:])    <span class="cm"># → [3, 4, 5]</span>

<span class="cm"># Astuce utile : L[:] fait une copie complète de la liste,
# tout comme L.copy(), les deux évitent le piège de mutabilité vu plus haut</span>
<span class="builtin">print</span>(L[:])     <span class="cm"># → [1, 2, 3, 4, 5] (nouvelle liste)</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>À quoi ça sert concrètement ?</strong> Le tri fusion (un algorithme de tri très efficace) fonctionne en séparant la liste en deux avec le slicing (<code>L[:milieu]</code> et <code>L[milieu:]</code>), en triant chaque moitié séparément, puis en les fusionnant. Sans le slicing, il faudrait écrire des boucles bien plus complexes pour faire la même chose.</span>
  </div>

</div>
`
  },

  fonctions: {
    title: "Les Fonctions",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-wrench></use></svg> Les Fonctions</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 2</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~22 min</span>
  <span class="detail-meta-item" style="color:var(--accent3)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Débutant</span>
</div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-fn-deb')" role="tab" aria-selected="true" aria-controls="tab-fn-deb">Débutant</button>
  <button class="tab" onclick="switchTab(this, 'tab-fn-inter')" role="tab" aria-selected="false" aria-controls="tab-fn-inter">Intermédiaire</button>
</div>

<div id="tab-fn-deb" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brain></use></svg> Pourquoi des fonctions ? Le problème qu'elles résolvent</div>
    <div class="concept-body">
      Imagine que dans ton programme, tu dois calculer la moyenne d'une liste à 5 endroits différents. Sans fonction, tu copierais-collerais le même code 5 fois. Le jour où tu trouves un bug dans ce calcul, il faut le corriger... 5 fois, en espérant ne pas en oublier un.<br><br>
      Une <strong>fonction</strong> résout ça : tu écris le code <strong>une seule fois</strong>, tu lui donnes un nom, et tu l'appelles autant de fois que tu veux. Si tu dois corriger un bug, tu le corriges à un seul endroit. C'est aussi ce qui permet de découper un gros problème en petits problèmes plus simples à résoudre et à tester séparément.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">fonctions.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># "def" (define = définir) crée une fonction nommée "saluer"
# qui prend un PARAMÈTRE : "prenom". Un paramètre, c'est une
# variable qui n'existe QUE pendant l'exécution de la fonction.</span>
<span class="kw">def</span> <span class="fn">saluer</span>(prenom):
    <span class="builtin">print</span>(<span class="str">"Bonjour"</span>, prenom, <span class="str">"!"</span>)

<span class="cm"># On "appelle" la fonction en lui donnant une valeur concrète.
# Cette valeur remplace "prenom" à l'intérieur de la fonction.</span>
<span class="fn">saluer</span>(<span class="str">"Alice"</span>)   <span class="cm"># → Bonjour Alice !</span>
<span class="fn">saluer</span>(<span class="str">"Bob"</span>)     <span class="cm"># → Bonjour Bob !</span>

<span class="cm"># Le code À L'INTÉRIEUR de la fonction ne s'exécute QUE quand
# on l'appelle. Écrire "def saluer(prenom): ..." n'affiche rien
# tout seul, c'est juste une "recette" prête à être utilisée.</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>À quoi ça sert concrètement ?</strong> Dans tous tes exercices NSI, tu écris des fonctions comme <code>maximum(L)</code>, <code>tri_bulles(L)</code>, <code>recherche(L, x)</code>. Ce sont des "outils" que tu construis une fois, que tu peux ensuite réutiliser et combiner entre eux pour résoudre des problèmes plus complexes.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-upload></use></svg> Le return : pourquoi print() ne suffit pas</div>
    <div class="concept-body">
      Une fonction qui utilise <code>print()</code> affiche quelque chose à l'écran, mais ne <strong>renvoie</strong> rien d'utilisable dans le reste du programme. <code>return</code> permet à la fonction de "rendre" un résultat, que tu peux ensuite stocker dans une variable, comparer, ou réutiliser dans un calcul. C'est la différence entre "afficher un résultat" et "produire un résultat exploitable".<br><br>
      Si une fonction n'a pas de <code>return</code>, Python lui fait quand même renvoyer une valeur spéciale : <code>None</code> (qui veut dire "rien"). C'est une source d'erreur fréquente : oublier le <code>return</code> et se demander pourquoi le résultat vaut <code>None</code>.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">return.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">carre</span>(x):
    <span class="kw">return</span> x * x   <span class="cm"># la fonction "rend" x*x à qui l'a appelée</span>

<span class="cm"># On peut stocker le résultat retourné dans une variable...</span>
resultat = <span class="fn">carre</span>(<span class="num">5</span>)
<span class="builtin">print</span>(resultat)   <span class="cm"># → 25</span>

<span class="cm"># ...ou l'utiliser directement dans un calcul, car carre(3) est
# littéralement REMPLACÉ par sa valeur de retour (9) une fois calculé</span>
<span class="builtin">print</span>(<span class="fn">carre</span>(<span class="num">3</span>) + <span class="fn">carre</span>(<span class="num">4</span>))   <span class="cm"># → 9 + 16 = 25</span>

<span class="cm"># PIÈGE : sans return, on récupère None (pas d'erreur, mais faux résultat)</span>
<span class="kw">def</span> <span class="fn">carre_bugge</span>(x):
    x * x   <span class="cm"># calcul fait, mais jamais renvoyé !</span>

<span class="builtin">print</span>(<span class="fn">carre_bugge</span>(<span class="num">5</span>))   <span class="cm"># → None (pas 25 !)</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Dès que <code>return</code> est exécuté, la fonction <strong>s'arrête immédiatement</strong> : aucune ligne après le <code>return</code> ne sera exécutée dans cet appel. C'est très utile pour sortir tôt d'une fonction dès qu'on a trouvé ce qu'on cherchait (par exemple dans une recherche).</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> Paramètre vs variable locale : ce qui reste "à l'intérieur"</div>
    <div class="concept-body">
      Toute variable créée <strong>à l'intérieur</strong> d'une fonction (y compris ses paramètres) est <strong>locale</strong> : elle n'existe que pendant l'exécution de cette fonction, et elle est totalement invisible depuis l'extérieur. C'est volontaire : ça évite qu'une fonction "pollue" accidentellement le reste du programme avec ses variables internes.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">scope.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">calcul</span>():
    resultat_intermediaire = <span class="num">42</span>   <span class="cm"># variable LOCALE à calcul()</span>
    <span class="kw">return</span> resultat_intermediaire

<span class="fn">calcul</span>()
<span class="builtin">print</span>(resultat_intermediaire)   <span class="cm"># NameError !
# resultat_intermediaire n'existe pas ici, elle a été détruite
# dès la fin de l'exécution de calcul()</span></pre>
  </div>

  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Règle d'or : une bonne fonction fait <strong>une seule chose</strong>, et la fait bien. Si tu as du mal à nommer ta fonction simplement (par exemple <code>traiter_et_afficher_et_sauvegarder</code>), c'est souvent le signe qu'elle devrait être découpée en plusieurs fonctions plus petites.</span>
  </div>
</div>

<div id="tab-fn-inter" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-repeat></use></svg> La récursion : quand une fonction s'appelle elle-même</div>
    <div class="concept-body">
      Une fonction peut <strong>s'appeler elle-même</strong> : ça s'appelle la récursion. Pourquoi faire ça ? Parce que certains problèmes se décomposent naturellement en un sous-problème identique mais plus petit. Calculer <code>5!</code> (factorielle de 5), c'est <code>5 × 4!</code>. Et <code>4!</code>, c'est <code>4 × 3!</code>. On retombe toujours sur le même type de calcul, juste avec un nombre plus petit, jusqu'à atteindre un cas si simple qu'on connaît directement la réponse (le <strong>cas de base</strong>).<br><br>
      Sans cas de base, la fonction s'appellerait indéfiniment jusqu'à faire planter le programme (erreur <code>RecursionError</code>). Le cas de base est donc <strong>obligatoire</strong>, pas optionnel.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">recursion.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">factorielle</span>(n):
    <span class="kw">if</span> n == <span class="num">0</span>:                        <span class="cm"># CAS DE BASE : on connaît la réponse directement</span>
        <span class="kw">return</span> <span class="num">1</span>
    <span class="kw">return</span> n * <span class="fn">factorielle</span>(n - <span class="num">1</span>)   <span class="cm"># CAS RÉCURSIF : on ramène le problème
                                       # à une version plus petite de lui-même</span>

<span class="builtin">print</span>(<span class="fn">factorielle</span>(<span class="num">5</span>))  <span class="cm"># → 120</span></pre>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-puzzle></use></svg> Comment Python déroule vraiment cet appel</div>
    <div class="concept-body">
      Pour bien comprendre la récursion, il faut visualiser ce que Python fait réellement : chaque appel de <code>factorielle()</code> est mis "en attente" jusqu'à ce que l'appel suivant renvoie sa réponse. C'est comme une pile d'assiettes : on empile les appels un par un, puis on les dépile en calculant chaque résultat, du dernier appel (le cas de base) jusqu'au premier.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">deroulement.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Appel de factorielle(3), étape par étape :
#
# factorielle(3) demande 3 * factorielle(2)     → en attente...
#   factorielle(2) demande 2 * factorielle(1)   → en attente...
#     factorielle(1) demande 1 * factorielle(0) → en attente...
#       factorielle(0) → CAS DE BASE → retourne 1 directement
#     factorielle(1) reçoit 1, calcule 1 * 1 = 1, retourne 1
#   factorielle(2) reçoit 1, calcule 2 * 1 = 2, retourne 2
# factorielle(3) reçoit 2, calcule 3 * 2 = 6, retourne 6
#
# Résultat final : 6 (= 3 × 2 × 1)</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>Pourquoi apprendre la récursion si une boucle for fait souvent la même chose ?</strong> Certains problèmes sont beaucoup plus naturels à écrire en récursif qu'avec des boucles : parcourir un arbre, résoudre les tours de Hanoï, ou implémenter le tri fusion (qui divise la liste en deux, trie chaque moitié récursivement, puis fusionne). La récursion devient indispensable dès que le problème se découpe lui-même en sous-problèmes similaires.</span>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Chaque appel récursif doit se rapprocher du cas de base (ici, <code>n</code> doit diminuer). Si tu écris <code>return n * factorielle(n)</code> par erreur (sans le <code>- 1</code>), <code>n</code> ne change jamais, le cas de base n'est jamais atteint, et Python finit par planter avec une <code>RecursionError: maximum recursion depth exceeded</code>.</span>
  </div>

</div>
`
  },

  tri: {
    title: "Tris : Insertion & Sélection",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-shuffle></use></svg> Tris : Insertion & Sélection</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 3</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~25 min</span>
  <span class="detail-meta-item" style="color:var(--red)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Difficile</span>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>Pourquoi apprendre à coder un tri, alors que <code>sorted()</code> existe déjà ?</strong> Parce qu'en NSI, l'objectif n'est pas seulement de trier une liste, mais de comprendre <strong>comment un algorithme de tri fonctionne à l'intérieur</strong>, c'est une compétence qu'on évaluera au bac, et qui te prépare à comprendre des algorithmes bien plus complexes plus tard.</span>
</div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-tri-sel')" role="tab" aria-selected="true" aria-controls="tab-tri-sel">Tri Sélection</button>
  <button class="tab" onclick="switchTab(this, 'tab-tri-ins')" role="tab" aria-selected="false" aria-controls="tab-tri-ins">Tri Insertion</button>
  <button class="tab" onclick="switchTab(this, 'tab-tri-comp')" role="tab" aria-selected="false" aria-controls="tab-tri-comp">Comparaison</button>
</div>

<div id="tab-tri-sel" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> Tri par Sélection : l'idée générale</div>
    <div class="concept-body">
      L'idée est simple, presque naturelle : pour trier une liste, on cherche d'abord le <strong>plus petit élément</strong> de toute la liste et on le met en première position. Puis on cherche le plus petit élément <strong>parmi ceux qui restent</strong> (donc à partir de la 2e position), et on le met en 2e position. On répète jusqu'à ce qu'il ne reste plus qu'un élément (forcément déjà à sa place).<br><br>
      <strong>Exemple pas à pas :</strong> <code>[5, 3, 8, 1]</code> → le minimum de toute la liste est <code>1</code> (indice 3), on l'échange avec la position 0 → <code>[1, 3, 8, 5]</code> → le minimum du reste (<code>[3, 8, 5]</code>) est <code>3</code>, déjà à la bonne place → le minimum de <code>[8, 5]</code> est <code>5</code>, on l'échange avec <code>8</code> → <code>[1, 3, 5, 8]</code>, trié !
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">tri_selection.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">tri_selection</span>(L):
    lg = <span class="builtin">len</span>(L)

    <span class="cm"># La boucle EXTÉRIEURE représente la position qu'on est en train
    # de "fixer" définitivement. À chaque tour, tout ce qui est AVANT
    # l'indice i est déjà trié et ne bougera plus.</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(lg):

        <span class="cm"># On suppose d'abord (par optimisme) que L[i] est déjà le minimum
        # du reste de la liste. "minimum" stocke un INDICE, pas une valeur.</span>
        minimum = i

        <span class="cm"># La boucle INTÉRIEURE explore tout ce qui reste APRÈS i,
        # pour vérifier si notre supposition était correcte.</span>
        <span class="kw">for</span> j <span class="kw">in</span> <span class="builtin">range</span>(i+<span class="num">1</span>, lg):
            <span class="kw">if</span> L[j] < L[minimum]:
                minimum = j     <span class="cm"># On a trouvé plus petit : on met à jour</span>

        <span class="cm"># Une fois qu'on a exploré TOUT le reste, "minimum" contient
        # l'indice du plus petit élément restant. On l'échange avec
        # la position i pour le "fixer" à sa place définitive.</span>
        L[i], L[minimum] = L[minimum], L[i]

    <span class="kw">return</span> L

L = [<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>]
<span class="builtin">print</span>(<span class="fn">tri_selection</span>(L))  <span class="cm"># → [1, 3, 5, 8]</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>Pourquoi deux boucles imbriquées ?</strong> La boucle extérieure dit "je m'occupe de la position i". La boucle intérieure répond à la question "quel est le plus petit élément qui n'est pas encore à sa place ?". On ne peut pas répondre à cette question sans regarder chaque élément restant un par un, d'où la deuxième boucle. C'est ce mécanisme "boucle qui en contient une autre" que tu retrouveras dans presque tous les algorithmes de tri.</span>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Piège fréquent : écrire <code>if L[j] < L[i]</code> au lieu de <code>if L[j] < L[minimum]</code> dans la boucle intérieure. Ça casse tout l'algorithme, car <code>L[i]</code> ne représente plus forcément le minimum actuel une fois qu'on a commencé à trouver de meilleurs candidats, il faut toujours comparer au <strong>minimum trouvé jusqu'ici</strong>, pas à la valeur de départ.</span>
  </div>

</div>

<div id="tab-tri-ins" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-spade></use></svg> Tri par Insertion : comme trier des cartes à la main</div>
    <div class="concept-body">
      Pense à la façon dont tu tries naturellement des cartes à jouer : tu regardes la carte suivante dans ton paquet, et tu la glisses à la bonne place parmi les cartes déjà triées dans ta main. C'est exactement le principe du tri par insertion : à chaque étape, la partie gauche de la liste est déjà triée, et on <strong>insère</strong> l'élément suivant à sa juste position dans cette partie triée, en décalant les autres pour lui faire de la place.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">tri_insertion.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">tri_insertion</span>(L):
    lg = <span class="builtin">len</span>(L)

    <span class="cm"># On commence à l'indice 1, pas 0 ! Un seul élément (L[0]) est
    # toujours "déjà trié" tout seul, inutile de le traiter.</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">1</span>, lg):

        <span class="cm"># x est l'élément qu'on va "insérer" dans la partie triée à gauche.
        # On le sauvegarde AVANT de décaler quoi que ce soit, sinon
        # on perdrait sa valeur en écrasant la case.</span>
        x = L[i]
        j = i - <span class="num">1</span>

        <span class="cm"># Tant qu'on n'est pas arrivé au début (j >= 0) ET que l'élément
        # à gauche est plus grand que x, on décale cet élément vers
        # la droite pour "libérer" une place pour x.</span>
        <span class="kw">while</span> j >= <span class="num">0</span> <span class="kw">and</span> x < L[j]:
            L[j + <span class="num">1</span>] = L[j]   <span class="cm"># décalage vers la droite</span>
            j = j - <span class="num">1</span>

        <span class="cm"># Dès que la condition du while est fausse (soit j < 0, soit
        # on a trouvé un élément plus petit que x), c'est ici que
        # x doit être inséré : juste après ce dernier j.</span>
        L[j + <span class="num">1</span>] = x

    <span class="kw">return</span> L

L = [<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>]
<span class="builtin">print</span>(<span class="fn">tri_insertion</span>(L))  <span class="cm"># → [1, 3, 5, 8]</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>Pourquoi sauvegarder x avant de décaler ?</strong> Si on écrivait directement <code>L[j+1] = L[j]</code> sans avoir gardé <code>x = L[i]</code> à part, on écraserait la valeur qu'on cherche justement à replacer ailleurs, elle serait perdue dès le premier décalage. C'est un principe général en programmation : sauvegarder une valeur avant de l'écraser si on en aura encore besoin plus tard.</span>
  </div>

</div>

<div id="tab-tri-comp" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-scale></use></svg> Comparaison des deux tris : lequel choisir, et pourquoi</div>
    <div class="concept-body">
      <strong>Tri Sélection :</strong> il fait <strong>toujours</strong> le même nombre de comparaisons, peu importe si la liste de départ est déjà bien rangée ou complètement dans le désordre. Sa complexité est toujours O(n²).<br><br>
      <strong>Tri Insertion :</strong> lui s'adapte à la situation. Si la liste est déjà presque triée, le <code>while</code> intérieur ne fait presque aucun tour à chaque étape, la complexité descend jusqu'à O(n) dans le meilleur cas (liste déjà triée). Mais dans le pire cas (liste triée à l'envers), il reste O(n²), comme le tri sélection.<br><br>
      Les deux sont suffisants pour le programme du Bac NSI, mais savoir expliquer <strong>pourquoi</strong> l'un peut être plus rapide que l'autre selon les données est une vraie compétence attendue à l'oral comme à l'écrit.
    </div>
  </div>

  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>La complexité O(n²) signifie concrètement : si la liste est 2 fois plus grande, l'algorithme prend environ 4 fois plus de temps (2² = 4). C'est pour ça qu'on cherche des algorithmes de tri plus efficaces (comme le tri fusion, en O(n log n)) pour de très grandes listes, <code>sorted()</code> en Python utilise justement un algorithme bien plus rapide que ceux qu'on code ici, mais comprendre les tris "simples" est la première étape avant de comprendre les plus complexes.</span>
  </div>

</div>
`
  },

  recherche: {
    title: "Recherche & Dichotomie",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-search></use></svg> Recherche & Dichotomie</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 4</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~22 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-rech-seq')" role="tab" aria-selected="true" aria-controls="tab-rech-seq">Recherche séquentielle</button>
  <button class="tab" onclick="switchTab(this, 'tab-rech-dicho')" role="tab" aria-selected="false" aria-controls="tab-rech-dicho">Dichotomie</button>
</div>

<div id="tab-rech-seq" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-snail></use></svg> Recherche séquentielle : la méthode naturelle</div>
    <div class="concept-body">
      C'est la méthode la plus intuitive : on regarde chaque élément de la liste, un par un, dans l'ordre, jusqu'à trouver celui qu'on cherche (ou jusqu'à avoir tout regardé sans le trouver). Elle fonctionne <strong>toujours</strong>, même sur une liste dans le désordre, c'est son gros avantage. Son inconvénient : dans le pire des cas, il faut regarder <strong>tous les éléments</strong> avant de conclure, ce qui devient lent sur une très grande liste (on appelle ça une complexité O(n) : le temps augmente proportionnellement à la taille de la liste).
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">recherche_seq.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">recherche_element</span>(L, x):
    <span class="cm"># On part du principe que x n'est PAS dans la liste (-1 = "pas trouvé").
    # C'est une convention très courante : -1 est un indice impossible,
    # donc on le distingue facilement d'un vrai indice de la liste.</span>
    indice = -<span class="num">1</span>
    lg = <span class="builtin">len</span>(L)

    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(lg):
        <span class="kw">if</span> L[i] == x:
            indice = i    <span class="cm"># On a trouvé x à la position i, on la retient</span>

    <span class="kw">return</span> indice

L = [<span class="num">87</span>, <span class="num">12</span>, <span class="num">28</span>, <span class="num">5</span>]
<span class="builtin">print</span>(<span class="fn">recherche_element</span>(L, <span class="num">28</span>))  <span class="cm"># → 2</span>
<span class="builtin">print</span>(<span class="fn">recherche_element</span>(L, <span class="num">99</span>))  <span class="cm"># → -1 (absent de la liste)</span></pre>
  </div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><strong>Pourquoi ne pas s'arrêter dès qu'on a trouvé x ?</strong> Ici, la version montrée continue de parcourir toute la liste même après avoir trouvé <code>x</code>, car s'il y a des doublons, elle retient le <strong>dernier</strong> indice trouvé. Si tu veux t'arrêter dès la première occurrence (ce qui est plus rapide en moyenne), ajoute un <code>return i</code> directement dans le <code>if</code>, la fonction s'arrêtera immédiatement, sans regarder le reste de la liste inutilement.</span>
  </div>

</div>

<div id="tab-rech-dicho" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-zap></use></svg> Recherche dichotomique : pourquoi c'est tellement plus rapide</div>
    <div class="concept-body">
      Imagine que tu cherches un mot dans un dictionnaire papier. Tu ne commences pas à la page 1 et tu ne tournes pas les pages une par une, tu ouvres le dictionnaire <strong>au milieu</strong>, tu regardes si le mot cherché vient avant ou après alphabétiquement, puis tu répètes la même stratégie sur la moitié concernée. C'est exactement le principe de la recherche dichotomique.<br><br>
      <strong>Condition indispensable :</strong> la liste doit être <strong>déjà triée</strong>. Sans ça, comparer avec le milieu ne nous dit rien sur où se trouve l'élément cherché : la stratégie ne fonctionne que parce qu'on sait que tout ce qui est à gauche du milieu est plus petit, et tout ce qui est à droite est plus grand.
    </div>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-ruler></use></svg> Pourquoi c'est tellement plus rapide (O(log n) vs O(n))</div>
    <div class="concept-body">
      Avec la recherche séquentielle, chercher dans une liste de 1000 éléments peut nécessiter jusqu'à 1000 comparaisons. Avec la dichotomie, on divise la zone de recherche par 2 à chaque étape : 1000 → 500 → 250 → 125 → ... jusqu'à 1. Il ne faut qu'environ 10 étapes (car 2¹⁰ = 1024) au lieu de 1000. C'est la différence entre une complexité <strong>O(n)</strong> et <strong>O(log n)</strong>, et cet écart devient énorme quand la liste grandit : pour un million d'éléments, la dichotomie n'a besoin que d'environ 20 étapes.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">dichotomie.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">recherche_dichotomique</span>(L, x):
    <span class="cm"># debut et fin délimitent la ZONE où x peut encore se trouver.
    # Au départ, cette zone, c'est toute la liste.</span>
    debut = <span class="num">0</span>
    fin = <span class="builtin">len</span>(L) - <span class="num">1</span>

    <span class="cm"># Tant que la zone de recherche n'est pas vide (debut <= fin),
    # il reste des éléments à examiner.</span>
    <span class="kw">while</span> debut <= fin:

        <span class="cm"># // fait une DIVISION ENTIÈRE (sans virgule). On a besoin d'un
        # indice valide, donc jamais un nombre décimal comme 3.5.</span>
        milieu = (debut + fin) // <span class="num">2</span>

        <span class="kw">if</span> x == L[milieu]:
            <span class="kw">return</span> milieu             <span class="cm"># Trouvé ! On arrête tout de suite.</span>
        <span class="kw">elif</span> x < L[milieu]:
            <span class="cm"># x est plus petit que le milieu : comme la liste est TRIÉE,
            # x ne peut être que dans la moitié GAUCHE. On réduit
            # la zone en ramenant "fin" juste avant le milieu.</span>
            fin = milieu - <span class="num">1</span>
        <span class="kw">else</span>:
            <span class="cm"># x est plus grand : il ne peut être que dans la moitié DROITE.</span>
            debut = milieu + <span class="num">1</span>

    <span class="cm"># Si on sort de la boucle, c'est que debut a dépassé fin :
    # la zone de recherche est vide, x n'existe pas dans la liste.</span>
    <span class="kw">return</span> -<span class="num">1</span>

L = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>, <span class="num">7</span>, <span class="num">8</span>]  <span class="cm"># Déjà triée !</span>
<span class="builtin">print</span>(<span class="fn">recherche_dichotomique</span>(L, <span class="num">7</span>))  <span class="cm"># → 6</span></pre>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-search></use></svg> Déroulement pas à pas</div>
    <div class="concept-body">
      Reprenons l'exemple ci-dessus, chercher <code>7</code> dans <code>[1,2,3,4,5,6,7,8]</code> (indices 0 à 7) :<br><br>
      <strong>Étape 1 :</strong> debut=0, fin=7 → milieu=3 → <code>L[3]=4</code>. Comme 7 &gt; 4, on cherche à droite : debut=4.<br>
      <strong>Étape 2 :</strong> debut=4, fin=7 → milieu=5 → <code>L[5]=6</code>. Comme 7 &gt; 6, on cherche à droite : debut=6.<br>
      <strong>Étape 3 :</strong> debut=6, fin=7 → milieu=6 → <code>L[6]=7</code>. Trouvé ! On retourne l'indice 6.<br><br>
      Seulement 3 comparaisons ont suffi, contre potentiellement 7 avec une recherche séquentielle.
    </div>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>La dichotomie ne fonctionne <strong>que sur une liste déjà triée</strong>. Si tu l'utilises sur une liste dans le désordre, elle donnera souvent un résultat faux (elle peut conclure "pas trouvé" alors que l'élément est bien présent, juste au mauvais endroit par rapport à l'hypothèse de tri). Si ta liste n'est pas triée, il faut la trier d'abord (avec un des algorithmes du chapitre précédent, ou <code>sorted()</code>) avant d'utiliser la dichotomie.</span>
  </div>

</div>
`
  },

  stats: {
    title: "Min, Max, Moyenne & Seuil",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-chart-column></use></svg> Min, Max, Moyenne & Seuil</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 5</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~18 min</span>
  <span class="detail-meta-item" style="color:var(--accent3)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Débutant</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-trophy></use></svg> Maximum & Minimum : pourquoi initialiser avec L[0] et pas 0</div>
  <div class="concept-body">
    Pour trouver le plus grand élément d'une liste, l'idée est de garder une variable "meilleur candidat trouvé jusqu'ici", et de la mettre à jour à chaque fois qu'on trouve mieux. La question piège : avec quelle valeur commencer cette variable ?<br><br>
    Beaucoup de débutants écrivent <code>maximum = 0</code> par réflexe. C'est une erreur silencieuse : si <strong>tous</strong> les éléments de la liste sont négatifs (par exemple des températures en hiver), aucun ne sera jamais supérieur à 0, et la fonction renverra 0 au lieu du vrai maximum, sans provoquer d'erreur, ce qui rend le bug très difficile à repérer. La bonne pratique est d'initialiser avec <code>L[0]</code>, le premier élément réel de la liste : ainsi, peu importe si toutes les valeurs sont négatives, positives, ou mélangées, la fonction reste correcte.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">stats.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="kw">def</span> <span class="fn">maximumListe</span>(L):
    <span class="cm"># On part du premier élément RÉEL de la liste, pas d'une valeur
    # arbitraire comme 0, sinon une liste de nombres négatifs
    # donnerait un résultat faux (voir explication au-dessus).</span>
    maximum = L[<span class="num">0</span>]
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="builtin">len</span>(L)):
        <span class="kw">if</span> L[i] > maximum:
            maximum = L[i]     <span class="cm"># On a trouvé mieux, on met à jour</span>
    <span class="kw">return</span> maximum

<span class="kw">def</span> <span class="fn">valeur_moyenne</span>(L):
    <span class="cm"># La moyenne = somme de tous les éléments / nombre d'éléments.
    # On doit calculer la somme AVANT de pouvoir diviser.</span>
    somme = <span class="num">0</span>   <span class="cm"># Ici, 0 est correct : c'est un ÉLÉMENT NEUTRE de l'addition
              # (ajouter 0 ne change jamais rien), pas un candidat comme
              # dans maximumListe. C'est une situation différente !</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="builtin">len</span>(L)):
        somme = somme + L[i]
    <span class="kw">return</span> somme / <span class="builtin">len</span>(L)

<span class="kw">def</span> <span class="fn">plus_grand_sous_seuil</span>(L, seuil):
    <span class="cm"># Ici, l'initialisation à 0 EST un piège potentiel : si tous les
    # éléments sous le seuil sont négatifs, cette fonction renverrait
    # 0 par erreur, alors que 0 n'est peut-être même pas dans la liste !
    # Une version plus sûre initialiserait avec le premier élément
    # respectant déjà la condition <= seuil.</span>
    plus_grand = <span class="num">0</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="builtin">len</span>(L)):
        <span class="kw">if</span> L[i] <= seuil <span class="kw">and</span> L[i] > plus_grand:
            plus_grand = L[i]
    <span class="kw">return</span> plus_grand

L = [<span class="num">87</span>, <span class="num">3</span>, <span class="num">199</span>, <span class="num">45</span>, <span class="num">22</span>]
<span class="builtin">print</span>(<span class="fn">maximumListe</span>(L))               <span class="cm"># → 199</span>
<span class="builtin">print</span>(<span class="fn">valeur_moyenne</span>(L))             <span class="cm"># → 71.2</span>
<span class="builtin">print</span>(<span class="fn">plus_grand_sous_seuil</span>(L, <span class="num">50</span>))  <span class="cm"># → 45</span></pre>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>À quoi ça sert de faire attention à ce détail ?</strong> Ce genre de bug silencieux (pas d'erreur, mais un résultat parfois faux) est exactement le type de piège qu'on te demandera de repérer à l'écrit du Bac, dans les exercices "que fait ce code ?" ou "corrige ce code". Comprendre pourquoi <code>L[0]</code> est plus sûr que <code>0</code> te permettra de repérer ce genre d'erreur instantanément.</span>
</div>

<div class="callout callout-warn">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
  <span>Teste toujours tes fonctions avec des cas "limites" : une liste de nombres négatifs, une liste avec un seul élément, une liste où le résultat cherché est le premier ou le dernier élément. C'est souvent dans ces cas particuliers que les bugs silencieux se révèlent.</span>
</div>
`
  },

  comprehension: {
    title: "Listes par Compréhension",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-zap></use></svg> Listes par Compréhension</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 6</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~18 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brain></use></svg> Pourquoi cette syntaxe existe : le problème qu'elle résout</div>
  <div class="concept-body">
    Créer une liste de carrés avec une boucle classique demande 3 lignes : créer une liste vide, boucler, puis ajouter avec <code>.append()</code> à chaque tour. Cette suite d'opérations ("créer liste vide" → "boucler" → "ajouter") est tellement fréquente en Python que le langage propose une écriture condensée : la <strong>liste en compréhension</strong>. Elle fait exactement la même chose, mais en une seule ligne, ce qui rend le code plus court et, une fois qu'on est habitué à la lire, souvent plus clair d'un coup d'œil.<br><br>
    La syntaxe : <code>[expression for variable in iterable]</code>. On peut lire ça presque comme une phrase en anglais : "la liste de [expression], pour chaque [variable] dans [iterable]".
  </div>
</div>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">avant_apres.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm"># AVANT : la méthode classique avec une boucle (3 lignes)</span>
carres = []
<span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">10</span>):
    carres.<span class="fn">append</span>(i * i)

<span class="cm"># APRÈS : la même chose en compréhension (1 ligne)
# On lit : "la liste de i*i, pour chaque i dans range(10)"</span>
carres = [i * i <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">10</span>)]

<span class="builtin">print</span>(carres)  <span class="cm"># → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81] (les deux versions donnent CE MÊME résultat)</span></pre>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-sliders-horizontal></use></svg> Ajouter une condition avec if</div>
    <div class="concept-body">
      On peut filtrer les éléments à inclure en ajoutant un <code>if</code> à la fin. Ce <code>if</code> se lit comme une condition classique : seuls les éléments qui la vérifient sont gardés dans la liste finale. C'est l'équivalent condensé d'une boucle avec un <code>if</code> à l'intérieur avant le <code>.append()</code>.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">comprehension.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
  <pre><span class="cm"># 25 zéros, utile pour initialiser une liste avant de la remplir</span>
zeros = [<span class="num">0</span> <span class="kw">for</span> x <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">25</span>)]

<span class="cm"># Nombres de 1 à 25 : on ajoute +1 car range(25) donne 0..24</span>
addition = [x + <span class="num">1</span> <span class="kw">for</span> x <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">25</span>)]

<span class="cm"># Nombres pairs : 2*x est toujours pair, quel que soit x</span>
pairs = [<span class="num">2</span> * x <span class="kw">for</span> x <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">25</span>)]

<span class="cm"># Nombres impairs : 2*x est pair, donc 2*x+1 est TOUJOURS impair</span>
impairs = [(<span class="num">2</span> * x) + <span class="num">1</span> <span class="kw">for</span> x <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">25</span>)]

<span class="cm"># Carrés</span>
carres = [i * i <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">25</span>)]

<span class="cm"># Avec condition : le "if" filtre, seuls les nombres qui le
# vérifient sont gardés dans la liste finale.
# Ici : pairs (x % 2 == 0) ET strictement supérieurs à 10</span>
grands_pairs = [x <span class="kw">for</span> x <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">50</span>) <span class="kw">if</span> x % <span class="num">2</span> == <span class="num">0</span> <span class="kw">and</span> x > <span class="num">10</span>]
<span class="builtin">print</span>(grands_pairs)  <span class="cm"># → [12, 14, 16, 18, ...]</span></pre>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>À quoi ça sert concrètement ?</strong> Les listes en compréhension sont partout dans le code Python "idiomatique" (écrit à la façon Python) : filtrer des données, transformer une liste de mesures, générer des tableaux 2D (chapitre suivant). Savoir les lire est indispensable, car tu les croiseras constamment ; savoir les écrire te fera gagner du temps et rendra ton code plus court à corriger.</span>
</div>

<div class="callout callout-tip">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
  <span>Règle de lisibilité : si l'expression ou la condition devient trop complexe pour tenir clairement sur une ligne, il vaut mieux revenir à une boucle classique avec <code>.append()</code>. Le but d'une compréhension est de <strong>clarifier</strong> le code, pas de le rendre illisible pour "faire court".</span>
</div>
`
  },

  tableaux: {
    title: "Tableaux 2D & Tables",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-grid-3x3></use></svg> Tableaux 2D & Tables</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 7</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~18 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-folders></use></svg> Pourquoi "une liste de listes" pour représenter une grille</div>
  <div class="concept-body">
    Beaucoup de problèmes du monde réel se représentent naturellement en grille : un plateau de jeu (échecs, morpion), une image (grille de pixels), une feuille de calcul, une carte. Python n'a pas de type "tableau 2D" natif, mais on peut simuler une grille avec une <strong>liste dont chaque élément est lui-même une liste</strong>, chaque sous-liste représente une ligne de la grille.<br><br>
    Pour accéder à une case précise, on utilise deux indices entre crochets : <code>T[ligne][colonne]</code>. Le premier crochet sélectionne la ligne (donc une sous-liste), le second sélectionne l'élément dans cette sous-liste.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">tableau2d.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm"># On crée un tableau 10×10 rempli de 0, avec une compréhension imbriquée.
# Se lit de l'extérieur vers l'intérieur : "une liste de 10 lignes (j),
# où CHAQUE ligne est elle-même une liste de 10 zéros (i)".</span>
tableau = [[ <span class="num">0</span> <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">10</span>)] <span class="kw">for</span> j <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">10</span>)]

<span class="cm"># Modifier un élément précis : ligne 3, colonne 5.
# On accède d'abord à la ligne (tableau[3], une liste), puis
# à l'élément de cette ligne (index 5 de cette sous-liste).</span>
tableau[<span class="num">3</span>][<span class="num">5</span>] = <span class="num">99</span>

<span class="cm"># Pour afficher toute la grille, on parcourt chaque LIGNE
# (qui est elle-même une liste), et print() l'affiche entière</span>
<span class="kw">def</span> <span class="fn">afficher</span>(T):
    <span class="kw">for</span> ligne <span class="kw">in</span> T:
        <span class="builtin">print</span>(ligne)

<span class="cm"># Table de multiplication : multi[i][j] contiendra i*j.
# C'est un très bon exemple pour comprendre les tableaux 2D :
# la valeur d'une case dépend directement de sa POSITION.</span>
multi = [[i * j <span class="kw">for</span> j <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">10</span>)] <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">10</span>)]
<span class="fn">afficher</span>(multi)</pre>
</div>

<div class="callout callout-warn">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
  <span>Piège fréquent : écrire <code>tableau = [[0] * 10] * 10</code> au lieu de la compréhension. Ça a l'air plus court, mais ça crée <strong>10 références vers la MÊME liste interne</strong> ! Modifier une case en modifie 10 en même temps, à cause du même principe de mutabilité vu dans le chapitre "Les Listes". La compréhension <code>[[0 for i in range(10)] for j in range(10)]</code> crée bien 10 listes vraiment indépendantes.</span>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>À quoi ça sert concrètement ?</strong> Les tableaux 2D apparaissent dans énormément de sujets du Bac NSI : simuler une grille de jeu, représenter une matrice pour des calculs, stocker un plan de ville sous forme de carte quadrillée. Maîtriser <code>T[i][j]</code> et les compréhensions imbriquées est une compétence transversale à beaucoup d'exercices.</span>
</div>
`
  },

  texte: {
    title: "Listes de Texte & Lettres",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-message-square></use></svg> Listes de Texte & Lettres</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 8</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~15 min</span>
  <span class="detail-meta-item" style="color:var(--accent3)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Débutant</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-file-text></use></svg> Un texte est aussi une sorte de liste</div>
  <div class="concept-body">
    En Python, une chaîne de caractères (<code>str</code>) se comporte en partie comme une liste : on peut la parcourir lettre par lettre avec <code>for lettre in mot</code>, tout comme on parcourt une liste avec <code>for x in L</code>. C'est pour ça qu'on peut appliquer les mêmes réflexes (boucles, comptage, comparaison) sur du texte que sur des listes de nombres.
  </div>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-repeat></use></svg> Pourquoi deux boucles imbriquées pour chercher une lettre dans une liste de mots</div>
  <div class="concept-body">
    Si on veut compter les occurrences d'une lettre dans <strong>une liste de mots</strong> (pas juste un seul mot), il faut deux niveaux de parcours : d'abord parcourir chaque <strong>mot</strong> de la liste, puis, pour chaque mot, parcourir chaque <strong>lettre</strong> de ce mot. C'est le même principe de double boucle que pour les tableaux 2D, on descend d'un niveau de structure à la fois.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">texte.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre>texte = [<span class="str">"bonjour"</span>, <span class="str">"je suis"</span>, <span class="str">"en cours"</span>, <span class="str">"de"</span>, <span class="str">"nsi"</span>]

<span class="kw">def</span> <span class="fn">nombre_apparitions_lettres</span>(x, texte):
    nb = <span class="num">0</span>
    <span class="cm"># Boucle EXTÉRIEURE : on parcourt la liste des mots, un par un</span>
    <span class="kw">for</span> mot <span class="kw">in</span> texte:
        <span class="cm"># Boucle INTÉRIEURE : pour CE mot, on parcourt chaque lettre.
        # C'est possible car un str se parcourt comme une liste de lettres.</span>
        <span class="kw">for</span> lettre <span class="kw">in</span> mot:
            <span class="cm"># .lower() met tout en minuscule AVANT de comparer, pour
            # que "N" et "n" soient considérés comme identiques.
            # Sans ça, "Nsi" et une recherche de "n" ne matcheraient pas.</span>
            <span class="kw">if</span> lettre.<span class="fn">lower</span>() == x.<span class="fn">lower</span>():
                nb += <span class="num">1</span>
    <span class="kw">return</span> nb

<span class="builtin">print</span>(<span class="fn">nombre_apparitions_lettres</span>(<span class="str">"n"</span>, texte))  <span class="cm"># → 3</span>
<span class="builtin">print</span>(<span class="fn">nombre_apparitions_lettres</span>(<span class="str">"s"</span>, texte))  <span class="cm"># → 3</span></pre>
</div>

<div class="callout callout-tip">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
  <span><code>.lower()</code> convertit en minuscule (et <code>.upper()</code> fait l'inverse). Comparer systématiquement des versions "normalisées" (toutes en minuscule) est une technique générale très utile dès qu'on compare du texte saisi par un utilisateur, qui peut taper indifféremment en majuscule ou minuscule.</span>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>À quoi ça sert concrètement ?</strong> Ce pattern (double boucle mot → lettre) est la base d'analyses de texte plus poussées : compter la fréquence des lettres dans un texte (utile en cryptographie pour "casser" un chiffrement simple par analyse de fréquence), vérifier si un mot contient certaines lettres, ou construire un dictionnaire de comptage comme dans le chapitre suivant.</span>
</div>
`
  },

  dico: {
    title: "Les Dictionnaires",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-library></use></svg> Les Dictionnaires</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 9</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~22 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-key></use></svg> Pourquoi les listes ne suffisent pas toujours</div>
  <div class="concept-body">
    Imagine que tu veuilles stocker les informations d'un article : son type, sa matière, sa couleur, son prix. Avec une liste, tu pourrais écrire <code>article = ["pantalon", "lin", "beige", 40]</code>, mais comment te souvenir que l'indice 0 c'est le type, l'indice 2 la couleur ? C'est illisible et source d'erreurs dès que la liste s'allonge ou change d'ordre.<br><br>
    Un <strong>dictionnaire</strong> résout ce problème en remplaçant les indices numériques par des <strong>clés nommées</strong>, qui décrivent directement ce qu'elles contiennent. On accède à une valeur par son nom (<code>article["prix"]</code>), pas par sa position, beaucoup plus lisible et beaucoup moins fragile si l'ordre des données change.
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">dictionnaire.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="cm"># Un dictionnaire se crée avec des accolades { }.
# Chaque paire "clé": valeur est séparée par une virgule.
# La clé doit être unique (pas deux fois "prix" par exemple).</span>
article = {
    <span class="str">"type"</span>: <span class="str">"pantalon"</span>,
    <span class="str">"matiere"</span>: <span class="str">"lin"</span>,
    <span class="str">"couleur"</span>: <span class="str">"beige"</span>,
    <span class="str">"prix"</span>: <span class="num">40</span>,
    <span class="str">"marque"</span>: <span class="str">"bershka"</span>
}

<span class="cm"># Lire une valeur : on donne la CLÉ entre crochets, pas un indice</span>
<span class="builtin">print</span>(article[<span class="str">"prix"</span>])       <span class="cm"># → 40</span>

<span class="cm"># Modifier : même syntaxe qu'une liste, mais avec une clé au lieu d'un indice</span>
article[<span class="str">"prix"</span>] = <span class="num">50</span>
<span class="builtin">print</span>(article[<span class="str">"prix"</span>])       <span class="cm"># → 50</span>

<span class="cm"># Supprimer une paire clé/valeur entière avec .pop()</span>
article.<span class="fn">pop</span>(<span class="str">"marque"</span>)

<span class="cm"># Parcourir : .items() donne à la fois la clé ET la valeur
# à chaque tour de boucle, contrairement à une liste où on
# n'a "que" la valeur (ou "que" l'indice avec range(len(L)))</span>
<span class="kw">for</span> cle, valeur <span class="kw">in</span> article.<span class="fn">items</span>():
    <span class="builtin">print</span>(cle, <span class="str">"→"</span>, valeur)</pre>
</div>

<div class="callout callout-warn">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
  <span>Accéder à une clé qui n'existe pas avec <code>article["taille"]</code> provoque une <code>KeyError</code>, contrairement à une liste où on aurait une <code>IndexError</code> pour un indice trop grand. Pour éviter ce plantage, utilise <code>article.get("taille")</code>, qui renvoie <code>None</code> (au lieu de planter) si la clé n'existe pas, ou <code>article.get("taille", "inconnue")</code> pour définir une valeur par défaut.</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-calculator></use></svg> Le pattern le plus utile : compter avec un dictionnaire</div>
  <div class="concept-body">
    Un des usages les plus fréquents des dictionnaires en NSI : compter combien de fois chaque élément apparaît dans une liste (lettres, mots, notes...). Chaque élément devient une clé, et sa valeur associée est son nombre d'occurrences. La méthode <code>.get(cle, 0)</code> est la clé de ce pattern : elle renvoie la valeur actuelle du compteur, ou <code>0</code> si l'élément n'a encore jamais été vu, ce qui évite d'avoir à vérifier "est-ce que cette clé existe déjà ?" avant chaque incrémentation.
  </div>
</div>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">compter_avec_dico.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre>mots = [<span class="str">"nsi"</span>, <span class="str">"python"</span>, <span class="str">"nsi"</span>, <span class="str">"code"</span>, <span class="str">"nsi"</span>]

compteur = {}   <span class="cm"># dictionnaire vide au départ</span>

<span class="kw">for</span> mot <span class="kw">in</span> mots:
    <span class="cm"># .get(mot, 0) : "donne-moi la valeur actuelle de compteur[mot],
    # ou 0 si cette clé n'existe pas encore". On ajoute ensuite 1.
    # Sans .get(), il faudrait écrire un if/else pour vérifier
    # l'existence de la clé avant de l'incrémenter.</span>
    compteur[mot] = compteur.<span class="fn">get</span>(mot, <span class="num">0</span>) + <span class="num">1</span>

<span class="builtin">print</span>(compteur)  <span class="cm"># → {'nsi': 3, 'python': 1, 'code': 1}</span>

<span class="cm"># Trouver la clé avec la plus grande valeur :
# max(dictionnaire, key=dictionnaire.get) compare les VALEURS
# associées à chaque clé, et renvoie la clé qui gagne.</span>
mot_frequent = <span class="builtin">max</span>(compteur, key=compteur.<span class="fn">get</span>)
<span class="builtin">print</span>(mot_frequent)  <span class="cm"># → "nsi"</span></pre>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>À quoi ça sert concrètement ?</strong> Les dictionnaires sont partout en informatique dès qu'on dépasse le niveau lycée : le format JSON (utilisé par presque toutes les API web) est structurellement un dictionnaire, les bases de données stockent des enregistrements comme des dictionnaires, et de nombreux algorithmes de graphes ou de cache utilisent des dictionnaires pour un accès ultra-rapide aux données par clé.</span>
</div>
`
  },

  modules: {
    title: "Les Modules Python",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-package></use></svg> Les Modules Python</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 10</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~15 min</span>
  <span class="detail-meta-item" style="color:var(--accent3)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Débutant</span>
</div>

<div class="concept">
  <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-download></use></svg> Pourquoi importer plutôt que tout réécrire soi-même</div>
  <div class="concept-body">
    Si tu as besoin d'une racine carrée, tu pourrais essayer de coder toi-même l'algorithme qui la calcule. Mais quelqu'un l'a déjà fait, testé, et optimisé pour toi, c'est exactement ce que contient un <strong>module</strong> : une bibliothèque de fonctions déjà écrites et prêtes à l'emploi, rangées par thème (calcul, dates, aléatoire...).<br><br>
    On importe un module avec <code>import nom_module</code>, une seule fois en général tout en haut du fichier. Ensuite, on accède à ses fonctions avec la syntaxe <code>nom_module.fonction()</code> : le point signifie "va chercher cette fonction à l'intérieur de ce module".
  </div>
</div>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">modules.py</span></div>
    <button class="copy-btn" onclick="copyCode(this)">Copier</button>
  </div>
  <pre><span class="kw">import</span> random
<span class="kw">import</span> math
<span class="kw">import</span> datetime

<span class="cm"># random : génère des valeurs aléatoires, utile pour simuler
# un dé, mélanger des cartes, ou créer un jeu de test aléatoire</span>
nb = random.<span class="fn">randint</span>(<span class="num">1</span>, <span class="num">100</span>)   <span class="cm"># un entier entre 1 et 100 INCLUS</span>
<span class="builtin">print</span>(<span class="str">"Aléatoire :"</span>, nb)

<span class="cm"># random.sample(population, k) tire k éléments SANS répétition
# (contrairement à randint qui pourrait redonner le même nombre
# plusieurs fois si on l'appelait en boucle)</span>
liste_aleatoire = random.<span class="fn">sample</span>(<span class="builtin">range</span>(<span class="num">200</span>), <span class="num">10</span>)
<span class="builtin">print</span>(<span class="str">"Liste aléatoire :"</span>, liste_aleatoire)

<span class="cm"># math : fonctions mathématiques qu'il serait fastidieux
# de recoder soi-même à chaque fois</span>
<span class="builtin">print</span>(math.<span class="fn">sqrt</span>(<span class="num">144</span>))   <span class="cm"># → 12.0 (racine carrée)</span>
<span class="builtin">print</span>(math.pi)          <span class="cm"># → 3.14159... (constante, pas une fonction : pas de parenthèses !)</span>
<span class="builtin">print</span>(math.<span class="fn">floor</span>(<span class="num">3.7</span>)) <span class="cm"># → 3 (arrondi vers le bas)</span>
<span class="builtin">print</span>(math.<span class="fn">ceil</span>(<span class="num">3.2</span>))  <span class="cm"># → 4 (arrondi vers le haut)</span>

<span class="cm"># datetime : manipuler dates et heures, utile pour horodater
# un événement, calculer une durée, afficher la date du jour</span>
maintenant = datetime.<span class="fn">datetime</span>.<span class="fn">now</span>()
<span class="builtin">print</span>(<span class="str">"Heure :"</span>, maintenant)</pre>
</div>

<div class="callout callout-info">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
  <span>Remarque bien la différence entre <code>math.pi</code> (sans parenthèses, car c'est une <strong>valeur</strong> déjà calculée, une constante) et <code>math.sqrt(144)</code> (avec parenthèses, car c'est une <strong>fonction</strong> qui a besoin d'un argument pour calculer un résultat).</span>
</div>

<div class="callout callout-why">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
  <span><strong>À quoi ça sert concrètement ?</strong> Savoir chercher et utiliser un module existant est une compétence au moins aussi importante que savoir coder soi-même un algorithme, en NSI comme dans la vraie vie du développement logiciel, on réutilise en permanence du code écrit par d'autres plutôt que de tout reconstruire à chaque fois depuis zéro.</span>
</div>
`
  },

  bases: {
    title: "Les Bases de Python",
    icon: "<svg class=ico aria-hidden=true><use href=#i-sprout></use></svg>",
    level: "debutant",
    duration: "20 min",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-sprout></use></svg> Les Bases de Python</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 0</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~20 min</span>
  <span class="detail-meta-item" style="color:var(--accent3)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Débutant</span>
</div>

<div class="callout callout-tip">
  <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-sprout></use></svg></span>
  <span>Ce chapitre est fait pour ceux qui <strong>n'ont jamais codé</strong>. Si tu connais déjà les variables, les boucles et les conditions, tu peux passer directement au chapitre "Les Listes". Sinon, prends ton temps : chaque ligne de code est expliquée en détail.</span>
</div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-bases-debutant')" role="tab" aria-selected="true" aria-controls="tab-bases-debutant">Débutant</button>
  <button class="tab" onclick="switchTab(this, 'tab-bases-intermediaire')" role="tab" aria-selected="false" aria-controls="tab-bases-intermediaire">Intermédiaire</button>
  <button class="tab" onclick="switchTab(this, 'tab-bases-difficile')" role="tab" aria-selected="false" aria-controls="tab-bases-difficile">Difficile</button>
</div>

<div id="tab-bases-debutant" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brain></use></svg> C'est quoi, "programmer" ?</div>
    <div class="concept-body">
      Programmer, c'est donner des <strong>instructions précises</strong> à l'ordinateur, dans un ordre précis, pour qu'il fasse exactement ce qu'on veut. Python est un <strong>langage de programmation</strong> : une façon d'écrire ces instructions que l'ordinateur peut comprendre et exécuter.<br><br>
      L'ordinateur exécute le code <strong>ligne par ligne, de haut en bas</strong>, sauf si on lui dit explicitement de faire autrement (avec des conditions ou des boucles, qu'on verra plus bas).
    </div>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-package></use></svg> Les variables : stocker une information</div>
    <div class="concept-body">
      Une <strong>variable</strong>, c'est une <strong>étiquette</strong> qu'on colle sur une valeur pour pouvoir la réutiliser plus tard. On crée une variable avec le signe <code>=</code> (qu'on appelle "l'affectation", attention, ce n'est <strong>pas</strong> le signe d'égalité mathématique, c'est "range cette valeur dans cette boîte").
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">variables.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># On crée une variable "age" et on lui donne la valeur 67</span>
age = <span class="num">67</span>

<span class="cm"># On crée une variable "prenom" avec une chaîne de caractères (texte)</span>
<span class="cm"># Le texte doit toujours être entre guillemets " " ou apostrophes ' '</span>
prenom = <span class="str">"Gibaud"</span>

<span class="cm"># On affiche les variables avec print()</span>
<span class="builtin">print</span>(prenom)   <span class="cm"># → Gibaud</span>
<span class="builtin">print</span>(age)      <span class="cm"># → 67</span>

<span class="cm"># On peut changer la valeur d'une variable à tout moment</span>
age = age + <span class="num">1</span>
<span class="builtin">print</span>(age)      <span class="cm"># → 68</span></pre>
  </div>

  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Le nom d'une variable ne peut pas commencer par un chiffre, ne peut pas contenir d'espace, et ne doit pas être un mot réservé de Python (comme <code>print</code> ou <code>for</code>). Utilise des noms qui veulent dire quelque chose : <code>age</code> plutôt que <code>x</code>, <code>nom_eleve</code> plutôt que <code>n</code>.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-hash></use></svg> Les types de données</div>
    <div class="concept-body">
      Chaque valeur en Python a un <strong>type</strong>. Les 4 types de base que tu vas utiliser tout le temps :
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">types.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># int : un nombre entier (sans virgule)</span>
age = <span class="num">67</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(age))    <span class="cm"># → &lt;class 'int'&gt;</span>

<span class="cm"># float : un nombre décimal (avec un point, pas une virgule !)</span>
taille = <span class="num">1.75</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(taille))  <span class="cm"># → &lt;class 'float'&gt;</span>

<span class="cm"># str : une chaîne de caractères (du texte)</span>
prenom = <span class="str">"Gibaud"</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(prenom))  <span class="cm"># → &lt;class 'str'&gt;</span>

<span class="cm"># bool : un booléen, soit True (vrai), soit False (faux)</span>
majeur = <span class="kw">True</span>
<span class="builtin">print</span>(<span class="builtin">type</span>(majeur))  <span class="cm"># → &lt;class 'bool'&gt;</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Erreur très fréquente chez les débutants : écrire <code>"67"</code> (avec guillemets, donc un <strong>texte</strong>) au lieu de <code>67</code> (un <strong>nombre</strong>). Python ne fait pas de calcul sur du texte : <code>"67" + 1</code> provoque une erreur !</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-plus></use></svg> Les opérateurs de base</div>
    <div class="concept-body">
      Pour faire des calculs ou des comparaisons, Python utilise des <strong>opérateurs</strong>.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">operateurs.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Opérateurs mathématiques</span>
<span class="builtin">print</span>(<span class="num">5</span> + <span class="num">3</span>)   <span class="cm"># → 8   (addition)</span>
<span class="builtin">print</span>(<span class="num">5</span> - <span class="num">3</span>)   <span class="cm"># → 2   (soustraction)</span>
<span class="builtin">print</span>(<span class="num">5</span> * <span class="num">3</span>)   <span class="cm"># → 15  (multiplication)</span>
<span class="builtin">print</span>(<span class="num">5</span> / <span class="num">3</span>)   <span class="cm"># → 1.666... (division, donne toujours un float)</span>
<span class="builtin">print</span>(<span class="num">5</span> // <span class="num">3</span>)  <span class="cm"># → 1   (division entière, sans le reste)</span>
<span class="builtin">print</span>(<span class="num">5</span> % <span class="num">3</span>)   <span class="cm"># → 2   (modulo : LE RESTE de la division)</span>
<span class="builtin">print</span>(<span class="num">5</span> ** <span class="num">2</span>)  <span class="cm"># → 25  (puissance : 5 au carré)</span>

<span class="cm"># Opérateurs de comparaison (donnent True ou False)</span>
<span class="builtin">print</span>(<span class="num">5</span> == <span class="num">3</span>)  <span class="cm"># → False (== compare l'égalité, PAS = !)</span>
<span class="builtin">print</span>(<span class="num">5</span> != <span class="num">3</span>)  <span class="cm"># → True  (différent de)</span>
<span class="builtin">print</span>(<span class="num">5</span> > <span class="num">3</span>)   <span class="cm"># → True</span>
<span class="builtin">print</span>(<span class="num">5</span> <= <span class="num">3</span>)  <span class="cm"># → False</span></pre>
  </div>

  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span><code>=</code> et <code>==</code> sont <strong>très différents</strong> ! <code>=</code> sert à donner une valeur à une variable. <code>==</code> sert à comparer deux valeurs et répond toujours par <code>True</code> ou <code>False</code>. C'est l'erreur n°1 des débutants.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-shuffle></use></svg> Les conditions : if / elif / else</div>
    <div class="concept-body">
      Une condition permet d'exécuter du code <strong>seulement si</strong> quelque chose est vrai. C'est la base de toute logique en programmation.<br><br>
      Règle <strong>essentielle</strong> en Python : après <code>if</code>, <code>elif</code>, <code>else</code> (et plus tard <code>for</code>, <code>while</code>, <code>def</code>), il faut toujours mettre <strong>deux points <code>:</code></strong>, et le code qui suit doit être <strong>indenté</strong> (décalé de 4 espaces). C'est cette indentation qui dit à Python "ce bloc de code fait partie de la condition".
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">conditions.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>note = <span class="num">14</span>

<span class="kw">if</span> note >= <span class="num">16</span>:
    <span class="builtin">print</span>(<span class="str">"Très bien !"</span>)
<span class="kw">elif</span> note >= <span class="num">10</span>:
    <span class="builtin">print</span>(<span class="str">"Admis"</span>)       <span class="cm"># ← cette ligne s'exécute (14 >= 10)</span>
<span class="kw">else</span>:
    <span class="builtin">print</span>(<span class="str">"Recalé"</span>)

<span class="cm"># elif = "sinon si", on peut en mettre plusieurs
# else = "sinon", s'exécute si AUCUNE condition au-dessus n'est vraie</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Oublier les deux points <code>:</code> ou mal indenter (mélanger espaces et tabulations) sont les deux erreurs de syntaxe les plus fréquentes en début d'apprentissage. Si Python affiche <code>IndentationError</code>, vérifie ton indentation !</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-repeat></use></svg> Les boucles : répéter des instructions</div>
    <div class="concept-body">
      Une boucle permet de répéter un bloc de code plusieurs fois, sans avoir à le réécrire. Il y a deux types principaux : <code>for</code> (on sait combien de fois on répète) et <code>while</code> (on répète tant qu'une condition est vraie).
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">boucle_for.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># range(5) génère les nombres 0, 1, 2, 3, 4 (5 nombres, mais PAS 5 !)</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">5</span>):
    <span class="builtin">print</span>(<span class="str">"Tour numéro"</span>, i)

<span class="cm"># Affiche :
# Tour numéro 0
# Tour numéro 1
# Tour numéro 2
# Tour numéro 3
# Tour numéro 4</span></pre>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">boucle_while.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># while répète TANT QUE la condition est vraie</span>
compteur = <span class="num">0</span>

<span class="kw">while</span> compteur < <span class="num">3</span>:
    <span class="builtin">print</span>(<span class="str">"Compteur :"</span>, compteur)
    compteur = compteur + <span class="num">1</span>   <span class="cm"># très important : sinon boucle infinie !</span>

<span class="cm"># Affiche :
# Compteur : 0
# Compteur : 1
# Compteur : 2</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span><strong>Boucle infinie</strong> : si tu utilises <code>while</code> et que tu oublies de faire évoluer la variable de la condition (ici <code>compteur</code>), le programme ne s'arrêtera jamais et plantera ton navigateur. Vérifie toujours que la condition du <code>while</code> finira par devenir fausse.</span>
  </div>

</div>

<div id="tab-bases-intermediaire" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-puzzle></use></svg> Combiner conditions avec and / or / not</div>
    <div class="concept-body">
      On peut combiner plusieurs conditions avec <code>and</code> (et : les deux doivent être vraies), <code>or</code> (ou : au moins une doit être vraie), et <code>not</code> (inverse une condition).
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">logique.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>age = <span class="num">17</span>
autorisation = <span class="kw">True</span>

<span class="kw">if</span> age >= <span class="num">18</span> <span class="kw">or</span> autorisation:
    <span class="builtin">print</span>(<span class="str">"Accès autorisé"</span>)   <span class="cm"># s'exécute (autorisation est True)</span>

<span class="kw">if</span> age >= <span class="num">16</span> <span class="kw">and</span> age < <span class="num">18</span>:
    <span class="builtin">print</span>(<span class="str">"Mineur de plus de 16 ans"</span>)

<span class="kw">print</span>(<span class="kw">not</span> autorisation)   <span class="cm"># → False (inverse True)</span></pre>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-keyboard></use></svg> input() : demander une saisie à l'utilisateur</div>
    <div class="concept-body">
      <code>input()</code> permet de demander une information à l'utilisateur au clavier. <strong>Attention</strong> : <code>input()</code> retourne toujours du <strong>texte (str)</strong>, même si l'utilisateur tape un nombre ! Il faut convertir avec <code>int()</code> ou <code>float()</code> si tu veux faire des calculs.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">input_conversion.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Dans la console de ce site, input() peut ne pas fonctionner
# comme dans un terminal classique. Voici le principe :</span>

texte = <span class="builtin">input</span>(<span class="str">"Quel est ton âge ? "</span>)
<span class="builtin">print</span>(<span class="builtin">type</span>(texte))    <span class="cm"># → &lt;class 'str'&gt; même si on tape "17" !</span>

age = <span class="builtin">int</span>(texte)        <span class="cm"># on convertit le texte en entier</span>
<span class="builtin">print</span>(age + <span class="num">1</span>)        <span class="cm"># fonctionne maintenant</span>

<span class="cm"># str(x) fait l'inverse : transforme un nombre en texte</span>
age = <span class="num">17</span>
message = <span class="str">"J'ai "</span> + <span class="builtin">str</span>(age) + <span class="str">" ans"</span>
<span class="builtin">print</span>(message)   <span class="cm"># → J'ai 17 ans</span></pre>
  </div>

  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>On ne peut pas additionner directement un texte et un nombre : <code>"J'ai " + 17</code> provoque une erreur <code>TypeError</code>. Il faut convertir le nombre en texte avec <code>str()</code> d'abord.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-wrench></use></svg> Premiers pas avec les fonctions</div>
    <div class="concept-body">
      Une fonction permet de regrouper des instructions sous un nom, pour les réutiliser sans tout réécrire. On la définit avec <code>def</code>, et elle peut renvoyer un résultat avec <code>return</code>.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">premiere_fonction.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">carre</span>(x):
    resultat = x * x
    <span class="kw">return</span> resultat

<span class="cm"># On "appelle" la fonction avec une valeur entre parenthèses</span>
<span class="builtin">print</span>(<span class="fn">carre</span>(<span class="num">5</span>))    <span class="cm"># → 25</span>
<span class="builtin">print</span>(<span class="fn">carre</span>(<span class="num">10</span>))   <span class="cm"># → 100</span>

<span class="cm"># x est un "paramètre" : une valeur qu'on donne à la fonction
# resultat est une variable LOCALE : elle n'existe que dans la fonction</span></pre>
  </div>

  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Le chapitre "Les Fonctions" plus bas dans les cours détaille tout ça en profondeur (paramètres multiples, valeurs par défaut, etc.). Ce chapitre n'en donne que les bases pour débloquer la suite.</span>
  </div>

</div>

<div id="tab-bases-difficile" class="tab-content" role="tabpanel">

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico style=color:var(--red) aria-hidden=true><use href=#i-dot></use></svg></span>
    <span>Cet onglet va plus loin que le programme de début d'année. Il est utile pour comprendre des erreurs un peu plus subtiles et préparer le terrain pour la suite du programme NSI.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> Portée des variables (scope)</div>
    <div class="concept-body">
      Une variable créée <strong>à l'intérieur</strong> d'une fonction est <strong>locale</strong> : elle n'existe que pendant l'exécution de cette fonction, et elle est invisible depuis l'extérieur. C'est une source d'erreurs fréquente quand on débute.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">scope.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">ma_fonction</span>():
    x = <span class="num">10</span>   <span class="cm"># x est LOCALE à la fonction</span>
    <span class="builtin">print</span>(x)

<span class="fn">ma_fonction</span>()    <span class="cm"># → 10</span>
<span class="builtin">print</span>(x)        <span class="cm"># NameError : x n'existe pas ici !

# La variable x créée DANS la fonction est détruite
# dès que la fonction se termine.</span></pre>
  </div>

  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Si tu vois l'erreur <code>NameError: name 'x' is not defined</code>, vérifie que tu n'essaies pas d'utiliser une variable créée à l'intérieur d'une fonction depuis l'extérieur de cette fonction.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-zap></use></svg> Évaluation paresseuse de and / or</div>
    <div class="concept-body">
      Python arrête d'évaluer une expression <code>and</code>/<code>or</code> dès qu'il connaît le résultat final. Avec <code>and</code>, si le premier terme est <code>False</code>, le second n'est jamais évalué (le résultat est forcément <code>False</code>). C'est une optimisation, mais ça peut aussi servir à éviter des erreurs.
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">court_circuit.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>L = []

<span class="cm"># Sans court-circuit, accéder à L[0] sur une liste vide planterait.
# Mais comme "len(L) > 0" est False, Python n'évalue JAMAIS L[0] !</span>
<span class="kw">if</span> <span class="builtin">len</span>(L) > <span class="num">0</span> <span class="kw">and</span> L[<span class="num">0</span>] == <span class="num">5</span>:
    <span class="builtin">print</span>(<span class="str">"trouvé"</span>)
<span class="kw">else</span>:
    <span class="builtin">print</span>(<span class="str">"liste vide ou pas trouvé"</span>)   <span class="cm"># → s'exécute, sans erreur</span></pre>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-flame></use></svg> Erreurs courantes et comment les lire</div>
    <div class="concept-body">
      Quand Python plante, il affiche un message d'erreur (une "exception"). Apprendre à le lire est une compétence clé. Voici les erreurs les plus fréquentes en NSI :
    </div>
  </div>

  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">erreurs_frequentes.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># NameError : variable utilisée avant d'être créée, ou faute de frappe
# print(toto)  →  NameError: name 'toto' is not defined

# TypeError : on mélange des types incompatibles
# "5" + 5  →  TypeError: can only concatenate str (not "int") to str

# IndexError : on accède à un indice qui n'existe pas dans la liste
# L = [1, 2, 3]
# L[10]  →  IndexError: list index out of range

# ZeroDivisionError : division par zéro
# 5 / 0  →  ZeroDivisionError: division by zero

# IndentationError : indentation incorrecte ou incohérente
# if True:
# print("test")  →  IndentationError: expected an indented block</span></pre>
  </div>

  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Quand tu as une erreur, lis-la <strong>de bas en haut</strong> : la dernière ligne te dit le <strong>type d'erreur</strong> et le message. Les lignes au-dessus montrent le chemin (la pile d'appels) qui a mené à cette erreur. C'est presque toujours suffisant pour comprendre le problème.</span>
  </div>

</div>
`
  },

 // Programme de Terminale NSI 
  poo: {
    title: "Classe et Programmation Orientée Objet",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-dna></use></svg> Classe et Programmation Orientée Objet</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 11</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~25 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>En Première, tu manipulais des types déjà tout faits : listes, dictionnaires, tuples... La Programmation Orientée Objet (POO) te permet de créer <strong>tes propres types</strong>, sur mesure, en regroupant des données et les fonctions qui les manipulent dans un seul bloc : la <strong>classe</strong>.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-poo-classe')" role="tab" aria-selected="true" aria-controls="tab-poo-classe">Classe & Instanciation</button>
  <button class="tab" onclick="switchTab(this, 'tab-poo-init')" role="tab" aria-selected="false" aria-controls="tab-poo-init">Constructeur __init__</button>
  <button class="tab" onclick="switchTab(this, 'tab-poo-methodes')" role="tab" aria-selected="false" aria-controls="tab-poo-methodes">Les méthodes</button>
</div>

<div id="tab-poo-classe" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brick-wall></use></svg> Qu'est-ce qu'une classe ?</div>
    <div class="concept-body">
      Depuis la Première, tu utilises des types déjà tout prêts : <code>list</code>, <code>dict</code>, <code>str</code>... Une <strong>classe</strong>, c'est un type que TU crées toi-même. C'est un <strong>moule</strong> : il décrit la forme que vont avoir les objets fabriqués avec lui (quelles données ils contiennent, quelles actions ils savent faire).<br><br>
      Un <strong>objet</strong> (on dit aussi une <strong>instance</strong>) est une chose concrète construite à partir de ce moule. La classe <code>Personnage</code> est le plan ; <code>heros</code> et <code>ennemi</code> sont deux personnages bien réels, chacun avec ses propres valeurs, exactement comme un plan de maison n'est pas une maison, mais permet d'en construire plusieurs, toutes différentes.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">classe_minimale.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Personnage</span>:
    <span class="kw">pass</span>

<span class="cm"># On crée deux objets (deux instances) à partir de la classe</span>
heros = <span class="fn">Personnage</span>()
ennemi = <span class="fn">Personnage</span>()

<span class="builtin">print</span>(<span class="builtin">type</span>(heros))       <span class="cm"># &lt;class '__main__.Personnage'&gt;</span>
<span class="builtin">print</span>(heros <span class="kw">is</span> ennemi)   <span class="cm"># False : ce sont deux objets differents</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-tag></use></svg> Donner un état à un objet : les attributs</div>
    <div class="concept-body">
      Un objet tout nu (comme <code>heros</code> ci-dessus) ne sert pas à grand-chose. On veut qu'il porte des données : son nom, ses points de vie... Ces variables attachées à un objet s'appellent des <strong>attributs</strong>. On les lit et on les modifie avec la notation pointée <code>objet.attribut</code>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">attributs.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Personnage</span>:
    <span class="kw">pass</span>

heros = <span class="fn">Personnage</span>()
ennemi = <span class="fn">Personnage</span>()

heros.nom = <span class="str">"Aria"</span>
heros.pv = <span class="num">100</span>
<span class="builtin">print</span>(heros.nom, heros.pv)   <span class="cm"># Aria 100</span>

<span class="cm"># ennemi est un objet different : il n'a pas ces attributs</span>
<span class="builtin">print</span>(<span class="fn">hasattr</span>(ennemi, <span class="str">"nom"</span>))   <span class="cm"># False</span></pre>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Ajouter des attributs « à la main » comme ci-dessus fonctionne, mais c'est fragile : rien ne garantit qu'un <code>Personnage</code> aura bien un attribut <code>nom</code>, et il faut répéter ces lignes pour chaque objet. L'onglet suivant montre la vraie façon de faire.</span>
  </div>

</div>

<div id="tab-poo-init" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-wrench></use></svg> Le constructeur __init__</div>
    <div class="concept-body">
      Le <strong>constructeur</strong> est une méthode spéciale, toujours nommée <code>__init__</code>, que Python appelle <strong>automatiquement</strong> dès qu'on crée un objet avec <code>NomDeClasse(...)</code>. Son rôle : initialiser les attributs de l'objet qui vient de naître.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">constructeur.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Personnage</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, nom, pv=<span class="num">100</span>):
        self.nom = nom
        self.pv = pv

heros = <span class="fn">Personnage</span>(<span class="str">"Aria"</span>)
ennemi = <span class="fn">Personnage</span>(<span class="str">"Gobelin"</span>, <span class="num">30</span>)

<span class="builtin">print</span>(heros.nom, heros.pv)     <span class="cm"># Aria 100</span>
<span class="builtin">print</span>(ennemi.nom, ennemi.pv)   <span class="cm"># Gobelin 30</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-hand></use></svg> self, c'est quoi exactement ?</div>
    <div class="concept-body">
      <code>self</code> désigne <strong>l'objet en train d'être construit ou manipulé</strong>. Tu ne le donnes jamais toi-même entre les parenthèses à l'appel : Python le fournit automatiquement.<br><br>
      <code>Personnage("Aria")</code> revient à peu près à exécuter <code>Personnage.__init__(heros, "Aria")</code> où <code>heros</code> est le nouvel objet : <code>self</code> prend la place de <code>heros</code>, et <code>self.nom = nom</code> crée bien l'attribut <code>nom</code> sur <strong>cet</strong> objet précis, pas sur un autre.
    </div>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span><code>self</code> doit être le <strong>premier paramètre</strong> de toute méthode, <code>__init__</code> compris. L'oublier est l'erreur numéro 1 en Terminale : Python renvoie alors <code>TypeError: __init__() takes 1 positional argument but 2 were given</code> (ou similaire), car il essaie de passer l'objet automatiquement sans place prévue pour lui.</span>
  </div>

</div>

<div id="tab-poo-methodes" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-settings></use></svg> Une méthode, c'est une fonction qui vit dans la classe</div>
    <div class="concept-body">
      Une <strong>méthode</strong> est définie comme une fonction normale, mais à l'intérieur du bloc <code>class</code>, et avec <code>self</code> en premier paramètre. Elle peut lire et modifier les attributs de l'objet via <code>self.attribut</code>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">methodes.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Personnage</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, nom, pv=<span class="num">100</span>):
        self.nom = nom
        self.pv = pv

    <span class="kw">def</span> <span class="fn">subir_degats</span>(self, degats):
        self.pv = self.pv - degats
        <span class="kw">if</span> self.pv &lt; <span class="num">0</span>:
            self.pv = <span class="num">0</span>

    <span class="kw">def</span> <span class="fn">est_vivant</span>(self):
        <span class="kw">return</span> self.pv &gt; <span class="num">0</span>

    <span class="kw">def</span> <span class="fn">__str__</span>(self):
        <span class="kw">return</span> self.nom + <span class="str">" ("</span> + <span class="builtin">str</span>(self.pv) + <span class="str">" PV)"</span>


heros = <span class="fn">Personnage</span>(<span class="str">"Aria"</span>)
heros.<span class="fn">subir_degats</span>(<span class="num">30</span>)
<span class="builtin">print</span>(heros)                 <span class="cm"># Aria (70 PV)</span>
<span class="builtin">print</span>(heros.<span class="fn">est_vivant</span>())    <span class="cm"># True</span>
heros.<span class="fn">subir_degats</span>(<span class="num">1000</span>)
<span class="builtin">print</span>(heros.<span class="fn">est_vivant</span>())    <span class="cm"># False</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-printer></use></svg> __str__ : contrôler l'affichage</div>
    <div class="concept-body">
      <code>__str__</code> est une autre méthode spéciale : elle doit renvoyer une chaîne, et Python l'appelle automatiquement quand on fait <code>print(objet)</code>. Sans elle, <code>print(heros)</code> afficherait quelque chose de peu lisible comme <code>&lt;__main__.Personnage object at 0x...&gt;</code>.
    </div>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Une méthode <strong>lit ou modifie l'état d'un objet précis</strong> (via <code>self</code>) ; une fonction classique n'a accès qu'à ce qu'on lui donne en paramètre. Regrouper les données (attributs) et les actions qui vont avec (méthodes) dans une seule classe, c'est le principe central de la POO.</span>
  </div>

</div>

`
  },

  pilesfiles: {
    title: "Piles et Files",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-layers></use></svg> Piles et Files</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 12</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~20 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Jusqu'ici, une liste servait à tout : ajouter, lire ou retirer n'importe où. Piles et files sont des structures plus contraintes, qui n'autorisent qu'un seul point d'entrée-sortie. Cette contrainte n'est pas un défaut : c'est elle qui garantit un ordre précis, et c'est ce qui les rend si utiles.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-pf-pile')" role="tab" aria-selected="true" aria-controls="tab-pf-pile">Pile (LIFO)</button>
  <button class="tab" onclick="switchTab(this, 'tab-pf-file')" role="tab" aria-selected="false" aria-controls="tab-pf-file">File (FIFO)</button>
  <button class="tab" onclick="switchTab(this, 'tab-pf-usage')" role="tab" aria-selected="false" aria-controls="tab-pf-usage">Cas d'usage</button>
</div>

<div id="tab-pf-pile" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-download></use></svg> Le principe : LIFO</div>
    <div class="concept-body">
      Une <strong>pile</strong> (<em>stack</em>) fonctionne comme une pile d'assiettes : tu ne peux poser une assiette que sur le dessus, et tu ne peux retirer que celle du dessus. Impossible d'attraper celle du milieu sans d'abord enlever celles au-dessus.<br><br>
      On dit qu'une pile est <strong>LIFO</strong> : <em>Last In, First Out</em>. Le dernier élément ajouté est le premier retiré. Le raccourci <kbd>Ctrl+Z</kbd> (annuler) fonctionne exactement comme ça : la dernière action faite est la première annulée.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-clipboard-list></use></svg> Les opérations d'une pile</div>
    <div class="concept-body">
      Une pile n'offre que trois opérations : <strong>empiler</strong> (ajouter un élément au sommet), <strong>dépiler</strong> (retirer et renvoyer l'élément du sommet), et <strong>est_vide</strong> (tester s'il reste des éléments). C'est justement cette liste courte et fermée d'opérations, son <em>interface</em>, qui définit ce qu'est une pile, quelle que soit la façon dont elle est codée derrière.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">pile.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>pile = []

<span class="cm"># empiler = ajouter au sommet</span>
pile.<span class="fn">append</span>(<span class="num">1</span>)
pile.<span class="fn">append</span>(<span class="num">2</span>)
pile.<span class="fn">append</span>(<span class="num">3</span>)
<span class="builtin">print</span>(pile)            <span class="cm"># [1, 2, 3]  -- le sommet est a droite</span>

<span class="cm"># depiler = retirer le sommet</span>
sommet = pile.<span class="fn">pop</span>()
<span class="builtin">print</span>(sommet)          <span class="cm"># 3</span>
<span class="builtin">print</span>(pile)            <span class="cm"># [1, 2]</span>

<span class="kw">def</span> <span class="fn">est_vide</span>(p):
    <span class="kw">return</span> <span class="builtin">len</span>(p) == <span class="num">0</span>

<span class="builtin">print</span>(<span class="fn">est_vide</span>(pile))   <span class="cm"># False</span></pre>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Pourquoi choisir le <strong>bout de droite</strong> de la liste comme sommet ? Parce que <code>liste.append(x)</code> et <code>liste.pop()</code> (sans indice) travaillent tous les deux en <strong>O(1)</strong> à la fin d'une liste Python. Empiler/dépiler en début de liste obligerait Python à décaler tous les autres éléments : ce serait en O(n).</span>
  </div>

</div>

<div id="tab-pf-file" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-upload></use></svg> Le principe : FIFO</div>
    <div class="concept-body">
      Une <strong>file</strong> (<em>queue</em>) fonctionne comme une file d'attente à la caisse : le premier client arrivé est le premier servi, et les nouveaux arrivants se placent au bout de la file.<br><br>
      On dit qu'une file est <strong>FIFO</strong> : <em>First In, First Out</em>. Le premier élément ajouté est le premier retiré. C'est le principe d'une imprimante partagée : le premier document envoyé s'imprime en premier.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-clipboard-list></use></svg> Les opérations d'une file</div>
    <div class="concept-body">
      Une file offre <strong>enfiler</strong> (ajouter un élément à l'arrière), <strong>défiler</strong> (retirer et renvoyer l'élément à l'avant), et <strong>est_vide</strong>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">file.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">from</span> collections <span class="kw">import</span> deque

file = <span class="fn">deque</span>()

<span class="cm"># enfiler = ajouter a la fin</span>
file.<span class="fn">append</span>(<span class="str">"Client A"</span>)
file.<span class="fn">append</span>(<span class="str">"Client B"</span>)
file.<span class="fn">append</span>(<span class="str">"Client C"</span>)
<span class="builtin">print</span>(file)              <span class="cm"># deque(['Client A', 'Client B', 'Client C'])</span>

<span class="cm"># defiler = retirer le premier arrive</span>
premier = file.<span class="fn">popleft</span>()
<span class="builtin">print</span>(premier)           <span class="cm"># Client A</span>
<span class="builtin">print</span>(file)              <span class="cm"># deque(['Client B', 'Client C'])</span></pre>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Avec une liste Python classique, <code>file.pop(0)</code> retirerait bien le premier élément... mais en <strong>O(n)</strong> : Python doit décaler tous les éléments restants d'une case vers la gauche. Le type <code>deque</code> du module <code>collections</code> est prévu pour ça : <code>append()</code> et <code>popleft()</code> y sont tous les deux en O(1). Pour une file, utilise toujours <code>deque</code>, jamais une liste.</span>
  </div>

</div>

<div id="tab-pf-usage" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> Où ça sert, concrètement ?</div>
    <div class="concept-body">
      <strong>Pile</strong> : annuler une action (Ctrl+Z), vérifier que des parenthèses sont bien équilibrées, revenir en arrière dans un navigateur, parcourir un labyrinthe ou un arbre en profondeur (tu reverras ça au chapitre sur les graphes). La pile d'appels d'une fonction récursive est elle-même... une pile !<br><br>
      <strong>File</strong> : gérer des tickets de support dans l'ordre d'arrivée, une file d'impression, et le parcours en largeur d'un graphe (également vu plus loin).
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">parentheses.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">parentheses_equilibrees</span>(expression):
    pile = []
    <span class="kw">for</span> caractere <span class="kw">in</span> expression:
        <span class="kw">if</span> caractere == <span class="str">"("</span>:
            pile.<span class="fn">append</span>(caractere)
        <span class="kw">elif</span> caractere == <span class="str">")"</span>:
            <span class="kw">if</span> <span class="builtin">len</span>(pile) == <span class="num">0</span>:
                <span class="kw">return</span> <span class="kw">False</span>
            pile.<span class="fn">pop</span>()
    <span class="kw">return</span> <span class="builtin">len</span>(pile) == <span class="num">0</span>


<span class="builtin">print</span>(<span class="fn">parentheses_equilibrees</span>(<span class="str">"(a+b)*(c-d)"</span>))    <span class="cm"># True</span>
<span class="builtin">print</span>(<span class="fn">parentheses_equilibrees</span>(<span class="str">"(a+b))*(c-d)"</span>))   <span class="cm"># False : une parenthese fermante en trop</span>
<span class="builtin">print</span>(<span class="fn">parentheses_equilibrees</span>(<span class="str">"((a+b)"</span>))         <span class="cm"># False : une parenthese ouvrante non fermee</span></pre>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Pour choisir entre les deux : tu veux annuler ou revenir en arrière → <strong>pile</strong> (dernier arrivé, premier reparti). Tu veux respecter l'ordre d'arrivée → <strong>file</strong> (premier arrivé, premier servi).</span>
  </div>

</div>

`
  },

  interfaces: {
    title: "Interfaces et Implémentation",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-plug></use></svg> Interfaces et Implémentation</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 13</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~15 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Une même structure de données peut souvent être codée de plusieurs façons différentes. Savoir séparer « ce qu'une structure permet de faire » de « comment c'est codé derrière » est une des idées les plus réutilisées de tout le programme de Terminale.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-scroll-text></use></svg> L'interface : ce qu'on a le droit de faire</div>
    <div class="concept-body">
      Au chapitre précédent, une pile proposait exactement trois opérations : <code>empiler</code>, <code>dépiler</code>, <code>est_vide</code>. Cette liste d'opérations disponibles (avec ce que chacune fait, sans se soucier de comment) s'appelle l'<strong>interface</strong> de la structure. C'est un contrat : « voici ce que tu peux me demander, et voici ce que je te promets en retour ».
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-settings></use></svg> L'implémentation : ce qu'il y a derrière</div>
    <div class="concept-body">
      L'<strong>implémentation</strong>, c'est la façon concrète dont le contrat est tenu en code : quelle structure de données est utilisée en interne, quel algorithme fait le travail. Le point important : <strong>une même interface peut avoir plusieurs implémentations différentes</strong>, invisibles de l'extérieur tant que le contrat est respecté.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">deux_implementations.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Implementation 1 : avec une liste Python</span>
<span class="kw">class</span> <span class="fn">PileListe</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self.donnees = []

    <span class="kw">def</span> <span class="fn">empiler</span>(self, x):
        self.donnees.<span class="fn">append</span>(x)

    <span class="kw">def</span> <span class="fn">depiler</span>(self):
        <span class="kw">return</span> self.donnees.<span class="fn">pop</span>()

    <span class="kw">def</span> <span class="fn">est_vide</span>(self):
        <span class="kw">return</span> <span class="builtin">len</span>(self.donnees) == <span class="num">0</span>


<span class="cm"># Implementation 2 : avec un dictionnaire indexe par un compteur</span>
<span class="kw">class</span> <span class="fn">PileDict</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self.donnees = {}
        self.taille = <span class="num">0</span>

    <span class="kw">def</span> <span class="fn">empiler</span>(self, x):
        self.donnees[self.taille] = x
        self.taille += <span class="num">1</span>

    <span class="kw">def</span> <span class="fn">depiler</span>(self):
        self.taille -= <span class="num">1</span>
        <span class="kw">return</span> self.donnees.<span class="fn">pop</span>(self.taille)

    <span class="kw">def</span> <span class="fn">est_vide</span>(self):
        <span class="kw">return</span> self.taille == <span class="num">0</span>


<span class="cm"># Les DEUX respectent la meme interface : on les utilise EXACTEMENT pareil</span>
<span class="kw">for</span> Pile <span class="kw">in</span> (PileListe, PileDict):
    p = <span class="fn">Pile</span>()
    p.<span class="fn">empiler</span>(<span class="num">1</span>)
    p.<span class="fn">empiler</span>(<span class="num">2</span>)
    <span class="builtin">print</span>(p.<span class="fn">depiler</span>(), p.<span class="fn">est_vide</span>())   <span class="cm"># 2 False</span></pre>
  </div>
  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Pourquoi séparer les deux ? Parce que tant que l'interface ne change pas, on peut changer l'implémentation <strong>sans casser le code qui utilise la structure</strong>, par exemple pour la rendre plus rapide. Le code qui appelle <code>p.empiler(2)</code> n'a jamais besoin de savoir si <code>p</code> est une <code>PileListe</code> ou une <code>PileDict</code>.</span>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-repeat></use></svg> Une idée qui revient tout le long de ce cours</div>
    <div class="concept-body">
      Cette distinction n'est pas propre aux piles : tu la retrouveras pour les <strong>arbres binaires de recherche</strong> (interface : <code>inserer</code>, <code>rechercher</code> ; implémentation : des nœuds liés par des références) et pour les <strong>graphes</strong> (interface : « quels sont les voisins d'un sommet ? » ; implémentation : matrice ou dictionnaire d'adjacence). Une bonne habitude à prendre : quand tu utilises une structure, demande-toi d'abord <em>ce qu'elle permet de faire</em>, avant de te demander comment elle est codée.
    </div>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Un mot que tu croiseras peut-être : <strong>type abstrait</strong> (ou ADT, <em>Abstract Data Type</em>). C'est exactement ça : un type défini uniquement par son interface, indépendamment de toute implémentation.</span>
  </div>

`
  },

  recursivite: {
    title: "Récursivité",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-rotate-cw></use></svg> Récursivité</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 14</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~25 min</span>
  <span class="detail-meta-item" style="color:var(--red)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Difficile</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Jusqu'ici, une fonction en appelait d'autres, mais jamais elle-même. La récursivité, c'est une fonction qui s'appelle elle-même pour résoudre un problème en le ramenant à une version plus petite du même problème. C'est une des idées les plus puissantes de l'algorithmique, et la base de plusieurs chapitres qui suivent : tri fusion, arbres, programmation dynamique.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-rec-principe')" role="tab" aria-selected="true" aria-controls="tab-rec-principe">Le principe</button>
  <button class="tab" onclick="switchTab(this, 'tab-rec-exemples')" role="tab" aria-selected="false" aria-controls="tab-rec-exemples">Exemples classiques</button>
  <button class="tab" onclick="switchTab(this, 'tab-rec-vs')" role="tab" aria-selected="false" aria-controls="tab-rec-vs">Récursivité vs Itération</button>
</div>

<div id="tab-rec-principe" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> Cas de base + cas récursif</div>
    <div class="concept-body">
      Une fonction est <strong>récursive</strong> quand elle s'appelle elle-même. Pour que ça se termine un jour, il lui faut toujours deux ingrédients : un <strong>cas de base</strong> (une situation simple, traitée directement, sans nouvel appel) et un <strong>cas récursif</strong> (qui appelle la fonction sur une version <em>plus petite</em> du problème, en se rapprochant à chaque fois du cas de base).
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">factorielle.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">factorielle</span>(n):
    <span class="kw">if</span> n == <span class="num">0</span>:               <span class="cm"># cas de base</span>
        <span class="kw">return</span> <span class="num">1</span>
    <span class="kw">else</span>:                    <span class="cm"># cas recursif</span>
        <span class="kw">return</span> n * <span class="fn">factorielle</span>(n - <span class="num">1</span>)


<span class="builtin">print</span>(<span class="fn">factorielle</span>(<span class="num">5</span>))   <span class="cm"># 120</span>
<span class="builtin">print</span>(<span class="fn">factorielle</span>(<span class="num">0</span>))   <span class="cm"># 1</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-library></use></svg> La pile d'appels</div>
    <div class="concept-body">
      <code>factorielle(5)</code> a besoin du résultat de <code>factorielle(4)</code>, qui a besoin de <code>factorielle(3)</code>, etc. Chaque appel en attente d'un autre est empilé (oui, une vraie <strong>pile</strong>, comme au chapitre précédent !) jusqu'à atteindre le cas de base. Ensuite, les appels se dépilent un par un, chacun terminant son calcul avec le résultat reçu.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">deroulement</span></div>
    </div>
    <pre>factorielle(5)
= 5 * factorielle(4)
= 5 * (4 * factorielle(3))
= 5 * (4 * (3 * factorielle(2)))
= 5 * (4 * (3 * (2 * factorielle(1))))
= 5 * (4 * (3 * (2 * (1 * factorielle(0)))))
= 5 * (4 * (3 * (2 * (1 * 1))))
= 120</pre>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Si le cas de base est oublié, ou n'est jamais atteint, la fonction s'appelle indéfiniment : Python finit par lever <code>RecursionError: maximum recursion depth exceeded</code> (la pile d'appels a une taille limitée). Vérifie toujours que chaque appel récursif se rapproche bien du cas de base.</span>
  </div>

</div>

<div id="tab-rec-exemples" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-shell></use></svg> Fibonacci</div>
    <div class="concept-body">
      La suite de Fibonacci se définit déjà de façon récursive : <code>fib(n) = fib(n-1) + fib(n-2)</code>, avec <code>fib(0) = 0</code> et <code>fib(1) = 1</code> comme cas de base. Le code Python suit presque mot pour mot cette définition mathématique.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">fibonacci.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">fibonacci</span>(n):
    <span class="kw">if</span> n == <span class="num">0</span>:
        <span class="kw">return</span> <span class="num">0</span>
    <span class="kw">elif</span> n == <span class="num">1</span>:
        <span class="kw">return</span> <span class="num">1</span>
    <span class="kw">else</span>:
        <span class="kw">return</span> <span class="fn">fibonacci</span>(n - <span class="num">1</span>) + <span class="fn">fibonacci</span>(n - <span class="num">2</span>)


resultats = [<span class="fn">fibonacci</span>(i) <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">8</span>)]
<span class="builtin">print</span>(resultats)   <span class="cm"># [0, 1, 1, 2, 3, 5, 8, 13]</span></pre>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Ce <code>fibonacci</code> recalcule plusieurs fois les mêmes valeurs (<code>fibonacci(2)</code> est recalculé à chaque appel de <code>fibonacci(4)</code> ET de <code>fibonacci(5)</code>...). C'est très inefficace pour un grand <code>n</code> : le chapitre sur la <strong>programmation dynamique</strong> montre comment corriger exactement ce défaut.</span>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-file-text></use></svg> Récursivité sur une liste</div>
    <div class="concept-body">
      La récursivité ne sert pas qu'aux calculs numériques : elle marche sur toute structure qui peut se voir comme « un premier élément + le reste, qui est lui-même une version plus petite de la structure ». Ici, le cas de base est la <strong>liste vide</strong>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">somme_recursive.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">somme</span>(liste):
    <span class="kw">if</span> <span class="builtin">len</span>(liste) == <span class="num">0</span>:        <span class="cm"># cas de base : liste vide</span>
        <span class="kw">return</span> <span class="num">0</span>
    <span class="kw">else</span>:
        <span class="kw">return</span> liste[<span class="num">0</span>] + <span class="fn">somme</span>(liste[<span class="num">1</span>:])


<span class="builtin">print</span>(<span class="fn">somme</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>]))   <span class="cm"># 15</span>
<span class="builtin">print</span>(<span class="fn">somme</span>([]))                <span class="cm"># 0</span></pre>
  </div>

</div>

<div id="tab-rec-vs" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-repeat></use></svg> Deux outils pour le même problème</div>
    <div class="concept-body">
      Tout ce qui se calcule avec une boucle peut aussi se calculer avec de la récursivité, et réciproquement. La récursivité rend souvent le code plus <strong>lisible</strong> quand le problème se décompose naturellement (un arbre, une liste, un intervalle qu'on coupe en deux). L'itération (boucle) est en général plus <strong>efficace</strong> : pas d'empilement d'appels en attente.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">comparaison.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">factorielle_recursive</span>(n):
    <span class="kw">if</span> n == <span class="num">0</span>:
        <span class="kw">return</span> <span class="num">1</span>
    <span class="kw">return</span> n * <span class="fn">factorielle_recursive</span>(n - <span class="num">1</span>)


<span class="kw">def</span> <span class="fn">factorielle_iterative</span>(n):
    resultat = <span class="num">1</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">1</span>, n + <span class="num">1</span>):
        resultat = resultat * i
    <span class="kw">return</span> resultat


<span class="builtin">print</span>(<span class="fn">factorielle_recursive</span>(<span class="num">6</span>), <span class="fn">factorielle_iterative</span>(<span class="num">6</span>))   <span class="cm"># 720 720</span></pre>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Python limite la profondeur de récursion (1000 appels imbriqués par défaut, réglable avec <code>sys.setrecursionlimit</code>, mais ça ne fait que reculer le problème). Une version itérative n'a pas cette limite : pour un très grand <code>n</code>, préfère-la.</span>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>En résumé : le problème ressemble à « un cas simple + une version plus petite du même problème » (arbre, division en deux, structure imbriquée) → la récursivité clarifie le code. Simple parcours linéaire, gros volumes → la boucle est plus sûre et plus rapide.</span>
  </div>

</div>

`
  },

  arbres: {
    title: "Arbre Binaire et Arbre Binaire de Recherche",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-git-branch></use></svg> Arbre Binaire et Arbre Binaire de Recherche</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 15</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~30 min</span>
  <span class="detail-meta-item" style="color:var(--red)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Difficile</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Une liste range les données les unes après les autres. Un arbre les organise en hiérarchie. C'est la structure naturelle pour des données qui s'emboîtent (une arborescence de fichiers, un arbre généalogique), et, bien construit, il permet de chercher en temps logarithmique plutôt que linéaire.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-arb-vocab')" role="tab" aria-selected="true" aria-controls="tab-arb-vocab">Vocabulaire & Parcours</button>
  <button class="tab" onclick="switchTab(this, 'tab-arb-abr')" role="tab" aria-selected="false" aria-controls="tab-arb-abr">Arbre Binaire de Recherche</button>
  <button class="tab" onclick="switchTab(this, 'tab-arb-recherche')" role="tab" aria-selected="false" aria-controls="tab-arb-recherche">Recherche & Insertion</button>
</div>

<div id="tab-arb-vocab" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-sprout></use></svg> Vocabulaire</div>
    <div class="concept-body">
      Un <strong>arbre binaire</strong> est fait de <strong>nœuds</strong> reliés entre eux : chaque nœud a au plus deux enfants, appelés <strong>fils gauche</strong> et <strong>fils droit</strong>. Le nœud tout en haut est la <strong>racine</strong> ; un nœud sans enfant est une <strong>feuille</strong>. Un fils, avec tout ce qui est en dessous de lui, forme un <strong>sous-arbre</strong>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">noeud.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Noeud</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, valeur, gauche=<span class="kw">None</span>, droite=<span class="kw">None</span>):
        self.valeur = valeur
        self.gauche = gauche
        self.droite = droite


<span class="cm"># Construction "a la main" d'un petit arbre :</span>
<span class="cm">#         4</span>
<span class="cm">#        / \\</span>
<span class="cm">#       2   6</span>
<span class="cm">#      / \\ / \\</span>
<span class="cm">#     1  3 5  7</span>
arbre = <span class="fn">Noeud</span>(<span class="num">4</span>,
    <span class="fn">Noeud</span>(<span class="num">2</span>, <span class="fn">Noeud</span>(<span class="num">1</span>), <span class="fn">Noeud</span>(<span class="num">3</span>)),
    <span class="fn">Noeud</span>(<span class="num">6</span>, <span class="fn">Noeud</span>(<span class="num">5</span>), <span class="fn">Noeud</span>(<span class="num">7</span>)))

<span class="builtin">print</span>(arbre.valeur)                 <span class="cm"># 4</span>
<span class="builtin">print</span>(arbre.gauche.valeur)          <span class="cm"># 2</span>
<span class="builtin">print</span>(arbre.droite.droite.valeur)   <span class="cm"># 7</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-compass></use></svg> Les trois parcours classiques</div>
    <div class="concept-body">
      « Parcourir » un arbre, c'est visiter tous ses nœuds dans un certain ordre. Il en existe trois, qui ne diffèrent que par la place où l'on traite la racine : <strong>préfixe</strong> (racine, puis gauche, puis droite), <strong>infixe</strong> (gauche, puis racine, puis droite), <strong>postfixe</strong> (gauche, puis droite, puis racine).
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">parcours_infixe.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Noeud</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, valeur, gauche=<span class="kw">None</span>, droite=<span class="kw">None</span>):
        self.valeur = valeur
        self.gauche = gauche
        self.droite = droite


<span class="cm"># Construction "a la main" d'un petit arbre :</span>
<span class="cm">#         4</span>
<span class="cm">#        / \\</span>
<span class="cm">#       2   6</span>
<span class="cm">#      / \\ / \\</span>
<span class="cm">#     1  3 5  7</span>
arbre = <span class="fn">Noeud</span>(<span class="num">4</span>,
    <span class="fn">Noeud</span>(<span class="num">2</span>, <span class="fn">Noeud</span>(<span class="num">1</span>), <span class="fn">Noeud</span>(<span class="num">3</span>)),
    <span class="fn">Noeud</span>(<span class="num">6</span>, <span class="fn">Noeud</span>(<span class="num">5</span>), <span class="fn">Noeud</span>(<span class="num">7</span>)))

<span class="kw">def</span> <span class="fn">parcours_infixe</span>(noeud):
    <span class="kw">if</span> noeud <span class="kw">is</span> <span class="kw">None</span>:      <span class="cm"># cas de base : arbre vide</span>
        <span class="kw">return</span> []
    <span class="kw">return</span> <span class="fn">parcours_infixe</span>(noeud.gauche) + [noeud.valeur] + <span class="fn">parcours_infixe</span>(noeud.droite)


<span class="builtin">print</span>(<span class="fn">parcours_infixe</span>(arbre))   <span class="cm"># [1, 2, 3, 4, 5, 6, 7]</span></pre>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Les deux autres s'écrivent sur le même modèle, seul l'endroit où l'on place <code>[noeud.valeur]</code> change :<br><br><code>parcours_prefixe</code> → <code>[noeud.valeur] + parcours_prefixe(noeud.gauche) + parcours_prefixe(noeud.droite)</code><br><code>parcours_postfixe</code> → <code>parcours_postfixe(noeud.gauche) + parcours_postfixe(noeud.droite) + [noeud.valeur]</code></span>
  </div>

</div>

<div id="tab-arb-abr" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-ruler></use></svg> La propriété d'un ABR</div>
    <div class="concept-body">
      Un <strong>arbre binaire de recherche</strong> (ABR) est un arbre binaire où, <strong>pour chaque nœud</strong> : toutes les valeurs de son sous-arbre gauche lui sont inférieures, et toutes celles de son sous-arbre droit lui sont supérieures. Cette règle doit être vraie à <strong>tous les niveaux</strong>, pas seulement à la racine.<br><br>
      L'arbre du premier onglet en est justement un : à la racine 4, le sous-arbre gauche (2 avec 1 et 3) ne contient que des valeurs < 4, le sous-arbre droit (6 avec 5 et 7) que des valeurs > 4, et c'est vrai récursivement dans chaque sous-arbre aussi.
    </div>
  </div>
  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Remarque que le parcours infixe calculé au premier onglet donne <code>[1, 2, 3, 4, 5, 6, 7]</code> : une liste <strong>triée</strong>. Ce n'est pas un hasard : parcourir un ABR en infixe donne toujours les valeurs dans l'ordre croissant, exactement parce que « gauche < nœud < droite » à chaque étage.</span>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-zap></use></svg> Pourquoi c'est intéressant</div>
    <div class="concept-body">
      Grâce à cette propriété, chercher une valeur revient à faire une <strong>recherche dichotomique</strong> (déjà vue en Première) : à chaque nœud, une seule comparaison suffit à éliminer un sous-arbre entier. Si l'arbre est <strong>équilibré</strong> (les deux sous-arbres de chaque nœud ont des hauteurs comparables), sa hauteur est en <code>O(log n)</code>, et donc la recherche aussi.
    </div>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Un ABR n'est efficace que s'il reste à peu près équilibré. En insérant des valeurs déjà triées (1, puis 2, puis 3...), chaque nœud n'a un enfant que d'un seul côté : l'arbre dégénère en une chaîne, de hauteur <code>n</code>. La recherche redevient alors en <code>O(n)</code>, comme dans une liste.</span>
  </div>

</div>

<div id="tab-arb-recherche" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-search></use></svg> Rechercher dans un ABR</div>
    <div class="concept-body">
      On compare la valeur cherchée au nœud courant : égale → trouvée ; plus petite → on continue à gauche ; plus grande → on continue à droite. Arriver sur <code>None</code> signifie que la valeur n'est pas dans l'arbre.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">rechercher.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Noeud</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, valeur, gauche=<span class="kw">None</span>, droite=<span class="kw">None</span>):
        self.valeur = valeur
        self.gauche = gauche
        self.droite = droite


<span class="kw">def</span> <span class="fn">rechercher</span>(noeud, valeur):
    <span class="kw">if</span> noeud <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">return</span> <span class="kw">False</span>
    <span class="kw">if</span> valeur == noeud.valeur:
        <span class="kw">return</span> <span class="kw">True</span>
    <span class="kw">elif</span> valeur &lt; noeud.valeur:
        <span class="kw">return</span> <span class="fn">rechercher</span>(noeud.gauche, valeur)
    <span class="kw">else</span>:
        <span class="kw">return</span> <span class="fn">rechercher</span>(noeud.droite, valeur)


<span class="cm"># Construction "a la main" d'un petit arbre :</span>
<span class="cm">#         4</span>
<span class="cm">#        / \\</span>
<span class="cm">#       2   6</span>
<span class="cm">#      / \\ / \\</span>
<span class="cm">#     1  3 5  7</span>
arbre = <span class="fn">Noeud</span>(<span class="num">4</span>,
    <span class="fn">Noeud</span>(<span class="num">2</span>, <span class="fn">Noeud</span>(<span class="num">1</span>), <span class="fn">Noeud</span>(<span class="num">3</span>)),
    <span class="fn">Noeud</span>(<span class="num">6</span>, <span class="fn">Noeud</span>(<span class="num">5</span>), <span class="fn">Noeud</span>(<span class="num">7</span>)))

<span class="builtin">print</span>(<span class="fn">rechercher</span>(arbre, <span class="num">5</span>))    <span class="cm"># True</span>
<span class="builtin">print</span>(<span class="fn">rechercher</span>(arbre, <span class="num">9</span>))    <span class="cm"># False</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-plus></use></svg> Insérer dans un ABR</div>
    <div class="concept-body">
      Même principe : on descend dans l'arbre en comparant, jusqu'à trouver la place vide (<code>None</code>) où accrocher un nouveau nœud, ce qui préserve automatiquement la propriété d'ABR.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">inserer.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">class</span> <span class="fn">Noeud</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, valeur, gauche=<span class="kw">None</span>, droite=<span class="kw">None</span>):
        self.valeur = valeur
        self.gauche = gauche
        self.droite = droite


<span class="kw">def</span> <span class="fn">inserer</span>(noeud, valeur):
    <span class="kw">if</span> noeud <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">return</span> <span class="fn">Noeud</span>(valeur)
    <span class="kw">if</span> valeur &lt; noeud.valeur:
        noeud.gauche = <span class="fn">inserer</span>(noeud.gauche, valeur)
    <span class="kw">elif</span> valeur &gt; noeud.valeur:
        noeud.droite = <span class="fn">inserer</span>(noeud.droite, valeur)
    <span class="kw">return</span> noeud


<span class="kw">def</span> <span class="fn">parcours_infixe</span>(noeud):
    <span class="kw">if</span> noeud <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">return</span> []
    <span class="kw">return</span> <span class="fn">parcours_infixe</span>(noeud.gauche) + [noeud.valeur] + <span class="fn">parcours_infixe</span>(noeud.droite)


<span class="cm"># Construction "a la main" d'un petit arbre :</span>
<span class="cm">#         4</span>
<span class="cm">#        / \\</span>
<span class="cm">#       2   6</span>
<span class="cm">#      / \\ / \\</span>
<span class="cm">#     1  3 5  7</span>
arbre = <span class="fn">Noeud</span>(<span class="num">4</span>,
    <span class="fn">Noeud</span>(<span class="num">2</span>, <span class="fn">Noeud</span>(<span class="num">1</span>), <span class="fn">Noeud</span>(<span class="num">3</span>)),
    <span class="fn">Noeud</span>(<span class="num">6</span>, <span class="fn">Noeud</span>(<span class="num">5</span>), <span class="fn">Noeud</span>(<span class="num">7</span>)))

arbre = <span class="fn">inserer</span>(arbre, <span class="num">8</span>)
<span class="builtin">print</span>(<span class="fn">parcours_infixe</span>(arbre))   <span class="cm"># [1, 2, 3, 4, 5, 6, 7, 8]</span></pre>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Complexités à retenir : recherche et insertion dans un ABR <strong>équilibré</strong> → <code>O(log n)</code>. Dans le pire cas (arbre dégénéré en chaîne) → <code>O(n)</code>.</span>
  </div>

</div>

`
  },

  modularite: {
    title: "Modularité",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-puzzle></use></svg> Modularité</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 16</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~15 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span><code>random</code>, <code>math</code>, <code>os</code>... tu utilises des modules depuis la Première. Ce chapitre montre comment en <strong>écrire un toi-même</strong> : découper un programme en plusieurs fichiers réutilisables plutôt que tout entasser au même endroit.</span>
  </div>

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brick-wall></use></svg> Pourquoi découper son code ?</div>
    <div class="concept-body">
      Un programme qui grossit devient vite difficile à relire, à corriger, à réutiliser : tout est mélangé dans un seul fichier. La solution : découper le code en plusieurs fichiers <code>.py</code>, organisés par rôle, et les faire communiquer avec <code>import</code>. Chaque fichier <code>.py</code> est, en Python, ce qu'on appelle un <strong>module</strong>.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-package></use></svg> Créer et importer son propre module</div>
    <div class="concept-body">
      Rien de spécial à faire pour <em>créer</em> un module : n'importe quel fichier <code>.py</code> en est déjà un. Pour l'utiliser depuis un autre fichier situé dans le même dossier, il suffit de faire <code>import nom_du_fichier</code> (sans le <code>.py</code>), puis d'accéder à son contenu avec <code>nom_du_fichier.chose</code>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">deux_fichiers.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># --- fichier outils.py ---</span>
<span class="kw">def</span> <span class="fn">double</span>(x):
    <span class="kw">return</span> x * <span class="num">2</span>

<span class="kw">def</span> <span class="fn">est_pair</span>(n):
    <span class="kw">return</span> n % <span class="num">2</span> == <span class="num">0</span>

PI_APPROX = <span class="num">3.14159</span>


<span class="cm"># --- fichier principal.py ---</span>
<span class="kw">import</span> outils

<span class="builtin">print</span>(outils.<span class="fn">double</span>(<span class="num">5</span>))       <span class="cm"># 10</span>
<span class="builtin">print</span>(outils.<span class="fn">est_pair</span>(<span class="num">7</span>))     <span class="cm"># False</span>
<span class="builtin">print</span>(outils.PI_APPROX)       <span class="cm"># 3.14159</span></pre>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>C'est exactement ce que tu fais depuis la Première avec <code>import random</code> ou <code>import math</code> : ce sont des modules, sauf qu'ils sont déjà écrits pour toi. Ici, tu écris toi-même le module <code>outils.py</code>.</span>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-door-open></use></svg> Le piège : le code s'exécute aussi à l'import</div>
    <div class="concept-body">
      Quand Python importe un fichier, il <strong>exécute réellement tout son code</strong> une première fois, pas seulement les définitions de fonctions. Un <code>print()</code> écrit au premier niveau du fichier s'affichera donc aussi chez quelqu'un qui se contente d'importer ce fichier, ce qui est rarement voulu pour du code de test.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">sans_garde.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">carre</span>(x):
    <span class="kw">return</span> x * x

<span class="builtin">print</span>(<span class="str">"Test :"</span>, <span class="fn">carre</span>(<span class="num">4</span>))   <span class="cm"># ce print s'execute AUSSI si ce fichier est importe !</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-shield></use></svg> La solution : if __name__ == "__main__":</div>
    <div class="concept-body">
      Python donne automatiquement une valeur à la variable spéciale <code>__name__</code> : elle vaut <code>"__main__"</code> quand le fichier est lancé <strong>directement</strong> (<code>python calc.py</code>), et elle vaut le nom du module quand ce fichier est <strong>importé</strong> depuis un autre. En mettant le code de test derrière ce test, il ne s'exécute que dans le premier cas.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">avec_garde.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># --- fichier calc.py (sans garde) ---</span>
<span class="kw">def</span> <span class="fn">carre</span>(x):
    <span class="kw">return</span> x * x

<span class="builtin">print</span>(<span class="str">"Test :"</span>, <span class="fn">carre</span>(<span class="num">4</span>))   <span class="cm"># ce print s'execute AUSSI si ce fichier est importe !</span>


<span class="cm"># --- fichier calc.py (avec garde) ---</span>
<span class="kw">def</span> <span class="fn">carre</span>(x):
    <span class="kw">return</span> x * x

<span class="kw">if</span> __name__ == <span class="str">"__main__"</span>:
    <span class="builtin">print</span>(<span class="str">"Test :"</span>, <span class="fn">carre</span>(<span class="num">4</span>))   <span class="cm"># ne s'execute QUE si ce fichier est lance directement</span></pre>
  </div>
  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Découper son code en modules apporte trois choses : la <strong>réutilisabilité</strong> (le même <code>outils.py</code> sert dans plusieurs projets), la <strong>lisibilité</strong> (chaque fichier a un rôle clair) et la possibilité de <strong>tester</strong> chaque module isolément.</span>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Le bloc <code>if __name__ == "__main__":</code> est une convention tellement répandue que tu la verras dans presque tout code Python un peu sérieux. Prends l'habitude de l'utiliser dans tes propres fichiers dès qu'ils contiennent à la fois des fonctions réutilisables et du code de test.</span>
  </div>

`
  },

  paradigmes: {
    title: "Paradigme de Programmation",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-compass></use></svg> Paradigme de Programmation</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 17</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~18 min</span>
  <span class="detail-meta-item" style="color:var(--accent4)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Intermédiaire</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Jusqu'ici tu as écrit du code sans forcément remarquer quel style tu utilisais. Ce chapitre prend du recul : il existe plusieurs grandes familles de langages, les <strong>paradigmes</strong>, qui proposent des façons différentes de penser un programme.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-par-impobj')" role="tab" aria-selected="true" aria-controls="tab-par-impobj">Impératif & Objet</button>
  <button class="tab" onclick="switchTab(this, 'tab-par-fonctionnel')" role="tab" aria-selected="false" aria-controls="tab-par-fonctionnel">Fonctionnel</button>
  <button class="tab" onclick="switchTab(this, 'tab-par-comparaison')" role="tab" aria-selected="false" aria-controls="tab-par-comparaison">Comparaison</button>
</div>

<div id="tab-par-impobj" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-map></use></svg> Qu'est-ce qu'un paradigme ?</div>
    <div class="concept-body">
      Un <strong>paradigme de programmation</strong> est une façon de penser un programme : quel est le « bloc de base » avec lequel on construit (une instruction ? un objet ? une fonction ?), et comment on combine ces blocs. Un même langage peut souvent s'écrire dans plusieurs styles : Python est dit <strong>multi-paradigme</strong>.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-arrow-right></use></svg> Le paradigme impératif</div>
    <div class="concept-body">
      C'est celui que tu pratiques depuis la Première : le programme est une suite <strong>d'instructions explicites</strong> qui modifient un état (des variables), une par une, avec des affectations, des boucles, des tests.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">imperatif.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>total = <span class="num">0</span>
nombres = [<span class="num">3</span>, <span class="num">7</span>, <span class="num">2</span>, <span class="num">9</span>]
<span class="kw">for</span> n <span class="kw">in</span> nombres:
    <span class="kw">if</span> n % <span class="num">2</span> == <span class="num">0</span>:
        total = total + n
<span class="builtin">print</span>(total)   <span class="cm"># 2</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-dna></use></svg> Le paradigme objet</div>
    <div class="concept-body">
      Vu au premier chapitre de ce cours : on organise le programme autour d'<strong>objets</strong> qui regroupent des données (attributs) et les actions qui vont avec (méthodes), et le programme avance en faisant interagir ces objets entre eux.
    </div>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Impératif et objet ne s'opposent pas : une méthode, à l'intérieur, est en général écrite dans un pur style impératif (boucles, tests, affectations sur <code>self</code>). La POO ajoute une <strong>organisation</strong> par-dessus, elle ne remplace pas l'impératif.</span>
  </div>

</div>

<div id="tab-par-fonctionnel" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> L'idée centrale : décrire, pas modifier</div>
    <div class="concept-body">
      Le paradigme <strong>fonctionnel</strong> pense le programme comme une combinaison de fonctions, un peu comme en mathématiques : on <strong>évalue des expressions</strong> plutôt que de modifier un état pas à pas. Il évite autant que possible de changer des variables en place.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-flask-conical></use></svg> Fonction pure</div>
    <div class="concept-body">
      Une fonction est dite <strong>pure</strong> si son résultat ne dépend que de ses arguments, et si elle ne modifie rien en dehors d'elle-même (pas d'affichage, pas de variable globale modifiée). Appelée deux fois avec les mêmes arguments, elle renvoie toujours exactement le même résultat.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">pure_vs_impure.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Pure : le resultat ne depend que de x, rien d'autre n'est modifie</span>
<span class="kw">def</span> <span class="fn">double_pur</span>(x):
    <span class="kw">return</span> x * <span class="num">2</span>


<span class="cm"># Impure : modifie une variable en dehors de la fonction (effet de bord)</span>
compteur = <span class="num">0</span>

<span class="kw">def</span> <span class="fn">double_impur</span>(x):
    <span class="kw">global</span> compteur
    compteur = compteur + <span class="num">1</span>
    <span class="kw">return</span> x * <span class="num">2</span>


<span class="builtin">print</span>(<span class="fn">double_pur</span>(<span class="num">5</span>), <span class="fn">double_pur</span>(<span class="num">5</span>))     <span class="cm"># 10 10 : toujours pareil</span>
<span class="fn">double_impur</span>(<span class="num">5</span>)
<span class="fn">double_impur</span>(<span class="num">5</span>)
<span class="builtin">print</span>(compteur)                          <span class="cm"># 2 : un effet de bord s'est accumule</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-backpack></use></svg> Les fonctions sont des valeurs comme les autres</div>
    <div class="concept-body">
      En Python, une fonction peut être stockée dans une variable, passée en argument à une autre fonction, ou renvoyée par une fonction. Une fonction qui prend une autre fonction en paramètre s'appelle une <strong>fonction d'ordre supérieur</strong>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">fonctions_valeurs.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">carre</span>(x):
    <span class="kw">return</span> x * x

ma_fonction = carre        <span class="cm"># une fonction peut etre stockee dans une variable</span>
<span class="builtin">print</span>(<span class="fn">ma_fonction</span>(<span class="num">5</span>))      <span class="cm"># 25</span>

<span class="kw">def</span> <span class="fn">applique_deux_fois</span>(f, x):
    <span class="kw">return</span> <span class="fn">f</span>(<span class="fn">f</span>(x))

<span class="builtin">print</span>(<span class="fn">applique_deux_fois</span>(carre, <span class="num">3</span>))   <span class="cm"># 81  (carre(carre(3)) = carre(9) = 81)</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title">λ map, filter et les lambdas</div>
    <div class="concept-body">
      Une <code>lambda</code> est une fonction anonyme, écrite en une ligne, pratique pour un usage ponctuel. <code>filter(f, iterable)</code> ne garde que les éléments pour lesquels <code>f</code> renvoie <code>True</code> ; <code>map(f, iterable)</code> applique <code>f</code> à chaque élément.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">map_filter.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>nombres = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>]

pairs = <span class="builtin">list</span>(<span class="builtin">filter</span>(<span class="kw">lambda</span> n: n % <span class="num">2</span> == <span class="num">0</span>, nombres))
<span class="builtin">print</span>(pairs)     <span class="cm"># [2, 4, 6]</span>

doubles = <span class="builtin">list</span>(<span class="builtin">map</span>(<span class="kw">lambda</span> n: n * <span class="num">2</span>, nombres))
<span class="builtin">print</span>(doubles)   <span class="cm"># [2, 4, 6, 8, 10, 12]</span></pre>
  </div>

</div>

<div id="tab-par-comparaison" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-shuffle></use></svg> Le même problème, écrit dans deux styles</div>
    <div class="concept-body">
      Objectif : garder les carrés des nombres pairs d'une liste. En impératif, on décrit <strong>étape par étape</strong> comment construire le résultat. En fonctionnel, on décrit <strong>ce que l'on veut</strong>, en combinant des fonctions.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">deux_styles.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Style imperatif</span>
<span class="kw">def</span> <span class="fn">carres_pairs_imperatif</span>(nombres):
    resultat = []
    <span class="kw">for</span> n <span class="kw">in</span> nombres:
        <span class="kw">if</span> n % <span class="num">2</span> == <span class="num">0</span>:
            resultat.<span class="fn">append</span>(n * n)
    <span class="kw">return</span> resultat


<span class="cm"># Style fonctionnel</span>
<span class="kw">def</span> <span class="fn">carres_pairs_fonctionnel</span>(nombres):
    <span class="kw">return</span> <span class="builtin">list</span>(<span class="builtin">map</span>(<span class="kw">lambda</span> n: n * n, <span class="builtin">filter</span>(<span class="kw">lambda</span> n: n % <span class="num">2</span> == <span class="num">0</span>, nombres)))


<span class="builtin">print</span>(<span class="fn">carres_pairs_imperatif</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>]))     <span class="cm"># [4, 16, 36]</span>
<span class="builtin">print</span>(<span class="fn">carres_pairs_fonctionnel</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>]))   <span class="cm"># [4, 16, 36]</span></pre>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>En Python, la version la plus idiomatique tient souvent en une ligne grâce à une <strong>compréhension de liste</strong> (vue en Première) : <code>[n * n for n in nombres if n % 2 == 0]</code>. Elle emprunte d'ailleurs un peu aux deux styles.</span>
  </div>
  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Il n'y a pas de paradigme « meilleur » dans l'absolu : chacun a ses forces selon le problème. Savoir les reconnaître t'aide à lire du code écrit par quelqu'un d'autre, et à choisir le style le plus clair pour ce que <strong>toi</strong> tu es en train d'écrire.</span>
  </div>

</div>

`
  },

  trifusion: {
    title: "Tri Fusion",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-divide></use></svg> Tri Fusion</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 18</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~22 min</span>
  <span class="detail-meta-item" style="color:var(--red)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Difficile</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Les tris par insertion et par sélection, vus en Première, sont simples mais en O(n²) : dix fois plus de données, cent fois plus de temps. Le tri fusion utilise une autre stratégie (diviser pour régner) pour descendre en O(n log n), nettement plus rapide sur de grandes listes.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-tf-diviser')" role="tab" aria-selected="true" aria-controls="tab-tf-diviser">Diviser pour régner</button>
  <button class="tab" onclick="switchTab(this, 'tab-tf-fusion')" role="tab" aria-selected="false" aria-controls="tab-tf-fusion">Fusionner deux listes triées</button>
  <button class="tab" onclick="switchTab(this, 'tab-tf-complexite')" role="tab" aria-selected="false" aria-controls="tab-tf-complexite">Complexité</button>
</div>

<div id="tab-tf-diviser" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-scissors></use></svg> Le principe : diviser pour régner</div>
    <div class="concept-body">
      Le tri fusion attaque le problème autrement que les tris vus en Première : plutôt que de comparer les éléments un par un dans la liste entière, il applique trois étapes : <strong>diviser</strong> la liste en deux moitiés, <strong>régner</strong> en triant récursivement chaque moitié, puis <strong>combiner</strong> en fusionnant les deux moitiés triées.<br><br>
      Le cas de base est immédiat : une liste de 0 ou 1 élément est déjà triée, il n'y a rien à faire.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">tri_fusion.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">fusion</span>(gauche, droite):
    resultat = []
    i, j = <span class="num">0</span>, <span class="num">0</span>
    <span class="kw">while</span> i &lt; <span class="builtin">len</span>(gauche) <span class="kw">and</span> j &lt; <span class="builtin">len</span>(droite):
        <span class="kw">if</span> gauche[i] &lt;= droite[j]:
            resultat.<span class="fn">append</span>(gauche[i])
            i = i + <span class="num">1</span>
        <span class="kw">else</span>:
            resultat.<span class="fn">append</span>(droite[j])
            j = j + <span class="num">1</span>
    resultat = resultat + gauche[i:]   <span class="cm"># ce qu'il reste de gauche (s'il en reste)</span>
    resultat = resultat + droite[j:]   <span class="cm"># ce qu'il reste de droite (s'il en reste)</span>
    <span class="kw">return</span> resultat


<span class="kw">def</span> <span class="fn">tri_fusion</span>(liste):
    <span class="kw">if</span> <span class="builtin">len</span>(liste) &lt;= <span class="num">1</span>:                     <span class="cm"># cas de base : deja triee</span>
        <span class="kw">return</span> liste
    milieu = <span class="builtin">len</span>(liste) // <span class="num">2</span>
    gauche = <span class="fn">tri_fusion</span>(liste[:milieu])      <span class="cm"># trie recursivement la moitie gauche</span>
    droite = <span class="fn">tri_fusion</span>(liste[milieu:])      <span class="cm"># trie recursivement la moitie droite</span>
    <span class="kw">return</span> <span class="fn">fusion</span>(gauche, droite)             <span class="cm"># fusionne les deux moities triees</span>


<span class="builtin">print</span>(<span class="fn">tri_fusion</span>([<span class="num">5</span>, <span class="num">3</span>, <span class="num">8</span>, <span class="num">1</span>, <span class="num">9</span>, <span class="num">2</span>]))   <span class="cm"># [1, 2, 3, 5, 8, 9]</span></pre>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Ici, <code>fusion</code> est utilisée comme une boîte noire : « on suppose qu'elle sait fusionner deux listes déjà triées ». L'onglet suivant détaille exactement comment elle fonctionne.</span>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-git-branch></use></svg> Visualiser la récursion</div>
    <div class="concept-body">
      Sur <code>[5, 3, 8, 1]</code>, la liste est coupée en deux, encore en deux, jusqu'à des listes d'un seul élément (triées par définition) ; puis on fusionne en remontant.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">arbre_recursion</span></div>
    </div>
    <pre>tri_fusion([5, 3, 8, 1])
├─ tri_fusion([5, 3])          ├─ tri_fusion([8, 1])
│    ├─ tri_fusion([5]) = [5]  │    ├─ tri_fusion([8]) = [8]
│    └─ tri_fusion([3]) = [3]  │    └─ tri_fusion([1]) = [1]
│    fusion([5],[3]) = [3, 5]  │    fusion([8],[1]) = [1, 8]
└─ fusion([3, 5], [1, 8]) = [1, 3, 5, 8]</pre>
  </div>

</div>

<div id="tab-tf-fusion" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-link></use></svg> Fusionner deux listes déjà triées</div>
    <div class="concept-body">
      C'est le cœur de l'algorithme. Étant données <strong>deux listes déjà triées</strong>, on les parcourt chacune avec un indice (<code>i</code> pour la gauche, <code>j</code> pour la droite), on compare leurs deux éléments de tête, et on ajoute le plus petit au résultat en avançant l'indice correspondant.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">fusion.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">fusion</span>(gauche, droite):
    resultat = []
    i, j = <span class="num">0</span>, <span class="num">0</span>
    <span class="kw">while</span> i &lt; <span class="builtin">len</span>(gauche) <span class="kw">and</span> j &lt; <span class="builtin">len</span>(droite):
        <span class="kw">if</span> gauche[i] &lt;= droite[j]:
            resultat.<span class="fn">append</span>(gauche[i])
            i = i + <span class="num">1</span>
        <span class="kw">else</span>:
            resultat.<span class="fn">append</span>(droite[j])
            j = j + <span class="num">1</span>
    resultat = resultat + gauche[i:]   <span class="cm"># ce qu'il reste de gauche (s'il en reste)</span>
    resultat = resultat + droite[j:]   <span class="cm"># ce qu'il reste de droite (s'il en reste)</span>
    <span class="kw">return</span> resultat


<span class="builtin">print</span>(<span class="fn">fusion</span>([<span class="num">1</span>, <span class="num">4</span>, <span class="num">7</span>], [<span class="num">2</span>, <span class="num">3</span>, <span class="num">9</span>]))   <span class="cm"># [1, 2, 3, 4, 7, 9]</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-circle-help></use></svg> Pourquoi ça marche</div>
    <div class="concept-body">
      Comme les deux listes sont déjà triées individuellement, le plus petit élément restant, tous comptes faits, est forcément en tête de l'une des deux. Le comparer et le placer, encore et encore, reconstruit exactement l'ordre global. Dès qu'une des deux listes est épuisée, le reste de l'autre est déjà trié : on peut le recopier directement (les deux lignes après la boucle).
    </div>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Cette étape de fusion est, à elle seule, en <strong>O(n)</strong> : chaque élément des deux listes n'est examiné qu'une seule fois pour être placé dans le résultat.</span>
  </div>

</div>

<div id="tab-tf-complexite" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-trending-up></use></svg> Pourquoi O(n log n) ?</div>
    <div class="concept-body">
      À chaque niveau de la récursion, fusionner toutes les paires de sous-listes de ce niveau traite, au total, chacun des <code>n</code> éléments une fois : chaque niveau coûte <code>O(n)</code>. Combien y a-t-il de niveaux ? On coupe la liste en deux à chaque appel, jusqu'à atteindre des listes de taille 1 : il faut <code>log₂(n)</code> divisions. Au total : <code>O(n)</code> par niveau × <code>O(log n)</code> niveaux = <code>O(n log n)</code>.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-scale></use></svg> Comparaison avec les tris de Première</div>
    <div class="concept-body">
      Les tris par insertion et par sélection sont en <code>O(n²)</code>. Pour <code>n = 1000</code> : <code>n²</code> vaut un million d'opérations, alors que <code>n log₂(n)</code> n'en vaut qu'environ 10 000, cent fois moins. Sur de grandes données, cette différence devient énorme.
    </div>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Le tri fusion n'est pas gratuit : il construit de nouvelles listes à chaque fusion (<code>resultat = []</code>, puis des concaténations), ce qui consomme de la mémoire supplémentaire. Le tri par sélection, lui, trie <strong>en place</strong>, sans copie. C'est le compromis : plus rapide, mais pas sans coût en mémoire.</span>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>À retenir : <code>O(n²)</code> pour insertion/sélection, <code>O(n log n)</code> pour le tri fusion. C'est cette différence qui rend les tris « intelligents » indispensables dès que les données grossissent.</span>
  </div>

</div>

`
  },

  graphes: {
    title: "Graphes",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-network></use></svg> Graphes</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 19</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~30 min</span>
  <span class="detail-meta-item" style="color:var(--red)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Difficile</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Un arbre est en réalité un cas particulier de graphe. Un graphe est une structure plus générale : des éléments (sommets) reliés par des connexions (arêtes), sans la contrainte hiérarchique d'un arbre. C'est la structure pour modéliser des réseaux : routes, réseaux sociaux, plans de métro.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-gr-vocab')" role="tab" aria-selected="true" aria-controls="tab-gr-vocab">Vocabulaire & Représentations</button>
  <button class="tab" onclick="switchTab(this, 'tab-gr-parcours')" role="tab" aria-selected="false" aria-controls="tab-gr-parcours">Parcours (Largeur/Profondeur)</button>
  <button class="tab" onclick="switchTab(this, 'tab-gr-dijkstra')" role="tab" aria-selected="false" aria-controls="tab-gr-dijkstra">Plus court chemin (Dijkstra)</button>
</div>

<div id="tab-gr-vocab" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico style=color:var(--primary) aria-hidden=true><use href=#i-dot></use></svg> Sommets et arêtes</div>
    <div class="concept-body">
      Un <strong>graphe</strong> est constitué de <strong>sommets</strong> (les éléments) reliés par des <strong>arêtes</strong> (les connexions). Un arbre est en fait un cas particulier de graphe, mais un graphe est plus général : il peut avoir des cycles, et un sommet peut avoir n'importe quel nombre de voisins.<br><br>
      Un graphe est <strong>orienté</strong> si ses arêtes ont un sens (A → B ne veut pas dire B → A, comme des rues à sens unique), <strong>non orienté</strong> sinon. Il est <strong>pondéré</strong> si chaque arête porte un poids : une distance, un coût, un temps de trajet.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-folders></use></svg> Représenter un graphe en machine</div>
    <div class="concept-body">
      Deux représentations classiques. La <strong>liste (ou dictionnaire) d'adjacence</strong> associe à chaque sommet la liste de ses voisins : économe en mémoire, c'est la plus utilisée en Python. La <strong>matrice d'adjacence</strong> est un tableau 2D où la case <code>[i][j]</code> indique si les sommets <code>i</code> et <code>j</code> sont reliés : simple, mais elle utilise <code>O(n²)</code> cases même si le graphe a peu d'arêtes.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">liste_adjacence.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="cm"># Graphe non oriente et non pondere, sous forme de dictionnaire d'adjacence</span>
graphe = {
    <span class="str">"A"</span>: [<span class="str">"B"</span>, <span class="str">"C"</span>],
    <span class="str">"B"</span>: [<span class="str">"A"</span>, <span class="str">"D"</span>],
    <span class="str">"C"</span>: [<span class="str">"A"</span>, <span class="str">"D"</span>],
    <span class="str">"D"</span>: [<span class="str">"B"</span>, <span class="str">"C"</span>, <span class="str">"E"</span>],
    <span class="str">"E"</span>: [<span class="str">"D"</span>],
}

<span class="builtin">print</span>(graphe[<span class="str">"D"</span>])          <span class="cm"># ['B', 'C', 'E']  -- les voisins de D</span>
<span class="builtin">print</span>(<span class="str">"C"</span> <span class="kw">in</span> graphe[<span class="str">"A"</span>])   <span class="cm"># True : A et C sont relies</span></pre>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">matrice_adjacence.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre>sommets = [<span class="str">"A"</span>, <span class="str">"B"</span>, <span class="str">"C"</span>, <span class="str">"D"</span>, <span class="str">"E"</span>]
<span class="cm"># matrice[i][j] = 1 si une arete relie sommets[i] et sommets[j], sinon 0</span>
matrice = [
    [<span class="num">0</span>, <span class="num">1</span>, <span class="num">1</span>, <span class="num">0</span>, <span class="num">0</span>],   <span class="cm"># A</span>
    [<span class="num">1</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">1</span>, <span class="num">0</span>],   <span class="cm"># B</span>
    [<span class="num">1</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">1</span>, <span class="num">0</span>],   <span class="cm"># C</span>
    [<span class="num">0</span>, <span class="num">1</span>, <span class="num">1</span>, <span class="num">0</span>, <span class="num">1</span>],   <span class="cm"># D</span>
    [<span class="num">0</span>, <span class="num">0</span>, <span class="num">0</span>, <span class="num">1</span>, <span class="num">0</span>],   <span class="cm"># E</span>
]

i_D = sommets.<span class="fn">index</span>(<span class="str">"D"</span>)
i_E = sommets.<span class="fn">index</span>(<span class="str">"E"</span>)
<span class="builtin">print</span>(matrice[i_D][i_E])   <span class="cm"># 1 : D et E sont relies</span></pre>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>Les deux représentations décrivent le <strong>même</strong> graphe ci-dessus. Retiens surtout : dictionnaire d'adjacence → efficace en mémoire, pratique en Python ; matrice → accès direct en <code>O(1)</code> pour savoir si deux sommets sont reliés, mais coûteuse en mémoire si le graphe est « creux » (peu d'arêtes par rapport au nombre de sommets possibles).</span>
  </div>

</div>

<div id="tab-gr-parcours" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-arrow-left-right></use></svg> Parcours en largeur (BFS)</div>
    <div class="concept-body">
      Le parcours en largeur (<em>Breadth-First Search</em>) visite les sommets <strong>niveau par niveau</strong> : d'abord le départ, puis tous ses voisins directs, puis les voisins de ces voisins, etc. Il s'appuie sur une <strong>file</strong> : exactement la structure vue au chapitre Piles et Files.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">parcours_largeur.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">from</span> collections <span class="kw">import</span> deque

<span class="kw">def</span> <span class="fn">parcours_largeur</span>(graphe, depart):
    visites = [depart]
    file = <span class="fn">deque</span>([depart])
    <span class="kw">while</span> <span class="builtin">len</span>(file) &gt; <span class="num">0</span>:
        sommet = file.<span class="fn">popleft</span>()
        <span class="kw">for</span> voisin <span class="kw">in</span> graphe[sommet]:
            <span class="kw">if</span> voisin <span class="kw">not</span> <span class="kw">in</span> visites:
                visites.<span class="fn">append</span>(voisin)
                file.<span class="fn">append</span>(voisin)
    <span class="kw">return</span> visites


graphe = {
    <span class="str">"A"</span>: [<span class="str">"B"</span>, <span class="str">"C"</span>],
    <span class="str">"B"</span>: [<span class="str">"A"</span>, <span class="str">"D"</span>],
    <span class="str">"C"</span>: [<span class="str">"A"</span>, <span class="str">"D"</span>],
    <span class="str">"D"</span>: [<span class="str">"B"</span>, <span class="str">"C"</span>, <span class="str">"E"</span>],
    <span class="str">"E"</span>: [<span class="str">"D"</span>],
}

<span class="builtin">print</span>(<span class="fn">parcours_largeur</span>(graphe, <span class="str">"A"</span>))   <span class="cm"># ['A', 'B', 'C', 'D', 'E']</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-arrow-up-down></use></svg> Parcours en profondeur (DFS)</div>
    <div class="concept-body">
      Le parcours en profondeur (<em>Depth-First Search</em>) part au contraire aussi loin que possible le long d'un chemin avant de reculer (« backtracker ») pour explorer une autre branche. Il s'implémente naturellement avec de la <strong>récursivité</strong>, qui utilise elle-même une pile d'appels.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">parcours_profondeur.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">parcours_profondeur</span>(graphe, sommet, visites=<span class="kw">None</span>):
    <span class="kw">if</span> visites <span class="kw">is</span> <span class="kw">None</span>:
        visites = []
    visites.<span class="fn">append</span>(sommet)
    <span class="kw">for</span> voisin <span class="kw">in</span> graphe[sommet]:
        <span class="kw">if</span> voisin <span class="kw">not</span> <span class="kw">in</span> visites:
            <span class="fn">parcours_profondeur</span>(graphe, voisin, visites)
    <span class="kw">return</span> visites


graphe = {
    <span class="str">"A"</span>: [<span class="str">"B"</span>, <span class="str">"C"</span>],
    <span class="str">"B"</span>: [<span class="str">"A"</span>, <span class="str">"D"</span>],
    <span class="str">"C"</span>: [<span class="str">"A"</span>, <span class="str">"D"</span>],
    <span class="str">"D"</span>: [<span class="str">"B"</span>, <span class="str">"C"</span>, <span class="str">"E"</span>],
    <span class="str">"E"</span>: [<span class="str">"D"</span>],
}

<span class="builtin">print</span>(<span class="fn">parcours_profondeur</span>(graphe, <span class="str">"A"</span>))   <span class="cm"># ['A', 'B', 'D', 'C', 'E']</span></pre>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Un moyen mnémotechnique : <strong>largeur ↔ file</strong> (on épuise un niveau avant de passer au suivant, premier arrivé premier traité) ; <strong>profondeur ↔ pile</strong> (on va aussi loin que possible avant de reculer, dernier arrivé premier traité).</span>
  </div>

</div>

<div id="tab-gr-dijkstra" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-target></use></svg> Le problème du plus court chemin</div>
    <div class="concept-body">
      Dans un graphe <strong>pondéré</strong>, le plus court chemin n'est pas forcément celui qui passe par le moins de sommets : c'est celui dont la <strong>somme des poids</strong> est minimale. L'algorithme de <strong>Dijkstra</strong> calcule, depuis un sommet de départ, la distance la plus courte vers tous les autres sommets, à condition que tous les poids soient positifs ou nuls.
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-settings></use></svg> Le principe</div>
    <div class="concept-body">
      On maintient une distance connue pour chaque sommet (0 pour le départ, l'infini pour les autres au début). À chaque étape : on choisit, parmi les sommets pas encore traités, celui dont la distance connue est la plus petite ; on le marque traité ; puis on <strong>relâche</strong> ses arêtes : pour chaque voisin, si passer par le sommet courant donne un chemin plus court que ce qui était connu jusqu'ici, on met à jour.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">dijkstra.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">dijkstra</span>(graphe, depart):
    distances = {sommet: <span class="builtin">float</span>(<span class="str">"inf"</span>) <span class="kw">for</span> sommet <span class="kw">in</span> graphe}
    distances[depart] = <span class="num">0</span>
    non_visites = <span class="builtin">list</span>(graphe.<span class="fn">keys</span>())

    <span class="kw">while</span> <span class="builtin">len</span>(non_visites) &gt; <span class="num">0</span>:
        <span class="cm"># parmi les non-visites, celui de plus petite distance connue</span>
        sommet_actuel = non_visites[<span class="num">0</span>]
        <span class="kw">for</span> s <span class="kw">in</span> non_visites:
            <span class="kw">if</span> distances[s] &lt; distances[sommet_actuel]:
                sommet_actuel = s
        non_visites.<span class="fn">remove</span>(sommet_actuel)

        <span class="kw">for</span> voisin, poids <span class="kw">in</span> graphe[sommet_actuel].<span class="fn">items</span>():
            nouvelle_distance = distances[sommet_actuel] + poids
            <span class="kw">if</span> nouvelle_distance &lt; distances[voisin]:
                distances[voisin] = nouvelle_distance

    <span class="kw">return</span> distances


graphe_pondere = {
    <span class="str">"A"</span>: {<span class="str">"B"</span>: <span class="num">4</span>, <span class="str">"C"</span>: <span class="num">1</span>},
    <span class="str">"B"</span>: {<span class="str">"A"</span>: <span class="num">4</span>, <span class="str">"D"</span>: <span class="num">1</span>},
    <span class="str">"C"</span>: {<span class="str">"A"</span>: <span class="num">1</span>, <span class="str">"D"</span>: <span class="num">5</span>},
    <span class="str">"D"</span>: {<span class="str">"B"</span>: <span class="num">1</span>, <span class="str">"C"</span>: <span class="num">5</span>},
}

<span class="builtin">print</span>(<span class="fn">dijkstra</span>(graphe_pondere, <span class="str">"A"</span>))
<span class="cm"># {'A': 0, 'B': 4, 'C': 1, 'D': 5}</span></pre>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Dijkstra suppose des poids <strong>positifs ou nuls</strong>. Avec des poids négatifs, l'algorithme peut donner un résultat faux (d'autres algorithmes existent pour ce cas, hors programme).</span>
  </div>
  <div class="callout callout-info">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-lightbulb></use></svg></span>
    <span>La recherche du sommet non visité de distance minimale est ici faite « à la main », en <code>O(n)</code> à chaque étape. En pratique, on utilise souvent un <strong>tas</strong> (module <code>heapq</code>) pour accélérer cette recherche, une optimisation utile à connaître, mais pas indispensable pour comprendre le principe.</span>
  </div>

</div>

`
  },

  progdynamique: {
    title: "Programmation Dynamique",
    content: `
<button class="back-btn" onclick="backToList()"><svg class=ico aria-hidden=true><use href=#i-arrow-left></use></svg> Retour aux cours</button>
<div class="detail-title"><svg class=ico aria-hidden=true><use href=#i-brain></use></svg> Programmation Dynamique</div>
<div class="detail-meta">
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-book-open></use></svg> Chapitre 20</span>
  <span class="detail-meta-item"><svg class=ico aria-hidden=true><use href=#i-timer></use></svg> ~25 min</span>
  <span class="detail-meta-item" style="color:var(--red)"><svg class=ico aria-hidden=true><use href=#i-dot></use></svg> Avancé</span>
</div>

  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Au chapitre Récursivité, fibonacci recalculait plusieurs fois les mêmes valeurs. La programmation dynamique est une technique pour éviter exactement ce gaspillage : quand un problème se découpe en sous-problèmes qui se répètent, on mémorise leurs résultats une bonne fois pour toutes.</span>
  </div>

<div class="tabs" role="tablist">
  <button class="tab active" onclick="switchTab(this, 'tab-pd-principe')" role="tab" aria-selected="true" aria-controls="tab-pd-principe">Le principe (mémoïsation)</button>
  <button class="tab" onclick="switchTab(this, 'tab-pd-monnaie')" role="tab" aria-selected="false" aria-controls="tab-pd-monnaie">Rendu de monnaie</button>
  <button class="tab" onclick="switchTab(this, 'tab-pd-tabulation')" role="tab" aria-selected="false" aria-controls="tab-pd-tabulation">Fibonacci & Tabulation</button>
</div>

<div id="tab-pd-principe" class="tab-content active" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-repeat></use></svg> Des sous-problèmes qui se répètent</div>
    <div class="concept-body">
      Au chapitre Récursivité, <code>fibonacci(n)</code> recalculait plusieurs fois les mêmes valeurs : <code>fibonacci(4)</code> ET <code>fibonacci(5)</code> ont chacun besoin de <code>fibonacci(3)</code>, qui est donc recalculé deux fois, et ça empire très vite quand <code>n</code> grandit.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">redondance</span></div>
    </div>
    <pre>fibonacci(5)
├─ fibonacci(4)
│    ├─ fibonacci(3)
│    │    ├─ fibonacci(2) ...
│    │    └─ fibonacci(1)
│    └─ fibonacci(2) ...        &lt;- deja calcule plus haut !
└─ fibonacci(3)                  &lt;- deja calcule plus haut !
     ├─ fibonacci(2) ...
     └─ fibonacci(1)</pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-brain></use></svg> La mémoïsation</div>
    <div class="concept-body">
      La <strong>programmation dynamique</strong> exploite ces répétitions : dès qu'un résultat est calculé, on le range dans une mémoire (un dictionnaire). Avant de recalculer quoi que ce soit, on vérifie s'il n'est pas déjà dedans. Cette technique (garder la récursivité, mais avec une mémoire) s'appelle la <strong>mémoïsation</strong>.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">fibonacci_memo.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">fibonacci_memo</span>(n, memo=<span class="kw">None</span>):
    <span class="kw">if</span> memo <span class="kw">is</span> <span class="kw">None</span>:
        memo = {}
    <span class="kw">if</span> n <span class="kw">in</span> memo:                 <span class="cm"># deja calcule : on renvoie directement</span>
        <span class="kw">return</span> memo[n]
    <span class="kw">if</span> n == <span class="num">0</span>:
        resultat = <span class="num">0</span>
    <span class="kw">elif</span> n == <span class="num">1</span>:
        resultat = <span class="num">1</span>
    <span class="kw">else</span>:
        resultat = <span class="fn">fibonacci_memo</span>(n - <span class="num">1</span>, memo) + <span class="fn">fibonacci_memo</span>(n - <span class="num">2</span>, memo)
    memo[n] = resultat            <span class="cm"># on memorise avant de renvoyer</span>
    <span class="kw">return</span> resultat


<span class="builtin">print</span>(<span class="fn">fibonacci_memo</span>(<span class="num">30</span>))   <span class="cm"># 832040</span></pre>
  </div>
  <div class="callout callout-why">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-target></use></svg></span>
    <span>Sans mémoïsation, <code>fibonacci(30)</code> déclenche plus d'un million d'appels (complexité à peu près <code>O(2ⁿ)</code> : le nombre d'appels explose). Avec mémoïsation, chaque valeur de 0 à <code>n</code> n'est calculée qu'une seule fois : complexité <code>O(n)</code>.</span>
  </div>

</div>

<div id="tab-pd-monnaie" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-coins></use></svg> Le problème du rendu de monnaie</div>
    <div class="concept-body">
      Avec des pièces de valeurs données (par exemple 1, 2, 5, 10) disponibles en quantité illimitée, quel est le <strong>nombre minimum</strong> de pièces pour obtenir exactement une somme donnée ?
    </div>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-puzzle></use></svg> La relation de récurrence</div>
    <div class="concept-body">
      Idée clé : pour rendre la somme <code>S</code>, on choisit UNE pièce <code>p</code> à utiliser en premier, puis on résout le même problème pour <code>S - p</code>. Le nombre minimum de pièces pour <code>S</code> est donc <code>1 + le meilleur résultat obtenu en essayant chaque pièce possible</code>. Comme pour fibonacci, les mêmes sous-sommes reviennent sans cesse : la mémoïsation s'applique directement.
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">rendu_monnaie.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">rendu_monnaie</span>(somme, pieces, memo=<span class="kw">None</span>):
    <span class="kw">if</span> memo <span class="kw">is</span> <span class="kw">None</span>:
        memo = {}
    <span class="kw">if</span> somme == <span class="num">0</span>:
        <span class="kw">return</span> <span class="num">0</span>
    <span class="kw">if</span> somme <span class="kw">in</span> memo:
        <span class="kw">return</span> memo[somme]

    minimum = <span class="builtin">float</span>(<span class="str">"inf"</span>)
    <span class="kw">for</span> piece <span class="kw">in</span> pieces:
        <span class="kw">if</span> piece &lt;= somme:
            resultat = <span class="fn">rendu_monnaie</span>(somme - piece, pieces, memo)
            <span class="kw">if</span> resultat + <span class="num">1</span> &lt; minimum:
                minimum = resultat + <span class="num">1</span>

    memo[somme] = minimum
    <span class="kw">return</span> minimum


pieces_dispo = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">5</span>, <span class="num">10</span>]
<span class="builtin">print</span>(<span class="fn">rendu_monnaie</span>(<span class="num">13</span>, pieces_dispo))   <span class="cm"># 3  (10 + 2 + 1)</span></pre>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span>Ce raisonnement fonctionne parce qu'on essaie <strong>toutes</strong> les pièces à chaque étape, pas seulement la plus grande. Une stratégie « gourmande » (toujours prendre la plus grande pièce possible) peut échouer : avec les pièces 1, 3, 4 pour atteindre 6, la méthode gourmande prend 4 + 1 + 1 = 3 pièces, alors que 3 + 3 = 2 pièces suffisent.</span>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>Même principe que <code>fibonacci_memo</code> : un problème qui se découpe en sous-problèmes plus petits, dont certains reviennent plusieurs fois, mémorisés au fur et à mesure.</span>
  </div>

</div>

<div id="tab-pd-tabulation" class="tab-content" role="tabpanel">

  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-arrow-up></use></svg> Une autre approche : la tabulation</div>
    <div class="concept-body">
      Plutôt que de partir du problème global et de descendre par récursivité (mémoïsation, « top-down »), on peut partir des plus petits cas et <strong>remonter</strong> en construisant un tableau, sans aucune récursivité. Cette approche s'appelle la <strong>tabulation</strong> (« bottom-up »).
    </div>
  </div>
  <div class="code-block">
    <div class="code-header">
      <div class="code-header-left"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span><span class="code-label">fibonacci_tabulation.py</span></div>
      <button class="copy-btn" onclick="copyCode(this)">Copier</button>
    </div>
    <pre><span class="kw">def</span> <span class="fn">fibonacci_tabulation</span>(n):
    table = [<span class="num">0</span>] * (n + <span class="num">1</span>)
    <span class="kw">if</span> n &gt;= <span class="num">1</span>:
        table[<span class="num">1</span>] = <span class="num">1</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="builtin">range</span>(<span class="num">2</span>, n + <span class="num">1</span>):
        table[i] = table[i - <span class="num">1</span>] + table[i - <span class="num">2</span>]
    <span class="kw">return</span> table[n]


<span class="builtin">print</span>(<span class="fn">fibonacci_tabulation</span>(<span class="num">30</span>))   <span class="cm"># 832040 -- meme resultat que fibonacci_memo</span></pre>
  </div>
  <div class="concept">
    <div class="concept-title"><svg class=ico aria-hidden=true><use href=#i-scale></use></svg> Mémoïsation vs tabulation</div>
    <div class="concept-body">
      Les deux ont la même complexité en temps, <code>O(n)</code> ici. La mémoïsation ne calcule que ce dont on a vraiment besoin, mais paie le coût des appels récursifs. La tabulation calcule systématiquement tous les sous-problèmes dans l'ordre, sans récursivité, donc sans limite de profondeur d'appel.
    </div>
  </div>
  <div class="callout callout-warn">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-triangle-alert></use></svg></span>
    <span><code>fibonacci_memo(2000)</code> échouerait avec une <code>RecursionError</code> : la chaîne d'appels imbriqués descend jusqu'à environ 2000 niveaux, au-delà de la limite par défaut de Python (1000). <code>fibonacci_tabulation(2000)</code> n'a aucun souci : il n'y a pas de récursivité du tout.</span>
  </div>
  <div class="callout callout-tip">
    <span class="callout-icon"><svg class=ico aria-hidden=true><use href=#i-circle-check></use></svg></span>
    <span>En résumé : dès qu'un problème se recalcule plusieurs fois les mêmes sous-cas, pense programmation dynamique. Redescendre avec de la mémoire (mémoïsation) ou remonter depuis le bas (tabulation), le résultat est le même : chaque sous-problème n'est résolu qu'une seule fois.</span>
  </div>

</div>

`
  }
};
