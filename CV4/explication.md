# Comment fonctionne le CV4 — fond animé, thème clair/sombre, arcs magiques

Ce fichier explique les trois mécanismes techniques du CV4 : le fond animé,
le mode clair/sombre, et les éclairs de lame (arcs magiques). Tout le code
concerné est dans `style.css` et `script.js`.

---

## 1. Le fond animé

Le fond est construit en plusieurs couches empilées, du plus profond au plus
proche du contenu (via `z-index` négatifs, en `position: fixed` pour qu'elles
restent immobiles quand on scrolle) :

```
.bg-scene   (z-index: -4)  → les grands halos de couleur flous
.paper-grain(z-index: -1)  → le grain de toile peinte
#vfx        (z-index: -2)  → le canvas : particules + éclairs
```

### a. Les halos de couleur (`.blob`)

Ce sont simplement des `<div>` ronds (`border-radius: 50%`), remplis d'une
couleur unie, puis rendus flous avec `filter: blur(90px)`. C'est ce flou très
fort qui transforme un cercle plat en halo peint/dégradé.

```css
.blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5;
        animation: float 28s ease-in-out infinite; }

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(4%, 5%) scale(1.07); }
  66%      { transform: translate(-4%, -3%) scale(0.96); }
}
```

Chaque halo (`.b1`, `.b2`, `.b3`, `.b4`) a une couleur, une taille et surtout
une **durée d'animation différente** (28s, 32s, 36s, 30s…) : comme elles ne
sont jamais synchronisées, le mouvement paraît organique plutôt que
mécanique — c'est le seul vrai secret de cette technique.

### b. Le grain de toile peinte (`.paper-grain`)

Une texture de bruit générée directement en CSS, sans aucune image externe,
grâce à un filtre SVG `feTurbulence` encodé en `data:` URI :

```css
.paper-grain {
  background-image: url("data:image/svg+xml,...feTurbulence...");
  opacity: 0.05;
  mix-blend-mode: overlay;
}
```

Elle est posée par-dessus tout le reste avec une opacité très faible (5%) et
un `mix-blend-mode: overlay`, ce qui casse légèrement les aplats de couleur
et donne cette impression de surface peinte/texturée plutôt que d'écran lisse.

### c. Les particules ambiantes (canvas `#vfx`)

C'est du JavaScript qui dessine sur un `<canvas>` plein écran, à raison d'une
image par frame (`requestAnimationFrame`). La logique, dans `script.js` :

1. Au chargement (et à chaque redimensionnement de fenêtre), on calcule un
   nombre de particules proportionnel à la surface de l'écran, et on crée un
   tableau d'objets `{x, y, rayon, vitesse, couleur, ...}` à des positions
   aléatoires (`spawnParticle()`).
2. À chaque frame, `draw()` efface le canvas et redessine chaque particule
   sous forme d'un petit cercle semi-transparent.
3. Chaque particule remonte lentement (`p.y -= p.speed`) et dérive un peu sur
   les côtés. Quand elle sort de l'écran par le haut, elle est régénérée en
   bas — ce qui donne un flux continu, façon cendres/pétales qui s'élèvent.
4. Un `twinklePhase` (déphasage aléatoire) fait légèrement varier l'opacité
   de chaque particule dans le temps, pour un scintillement doux.

```js
function spawnParticle() {
  return { x: Math.random() * w, y: Math.random() * h,
           r: Math.random() * 2.2 + 0.8, speed: Math.random() * 0.3 + 0.08,
           color: ACCENTS[Math.floor(Math.random() * ACCENTS.length)], ... };
}
```

---

## 2. Le mode clair / sombre

Toute la palette de couleurs du site est déclarée sous forme de **variables
CSS** (`--text`, `--accent-pink`, `--bg-base`, etc.) posées sur `:root` dans
`style.css`. Aucune couleur n'est écrite "en dur" dans les règles des
composants : ils utilisent tous `var(--quelque-chose)`. C'est ce qui permet
de retourner toute la page d'un coup.

Ces variables sont définies **trois fois** :

```css
:root { --text: #351b3e; --accent-pink: #ff5fa8; ... }          /* valeurs par défaut (clair) */

@media (prefers-color-scheme: dark) {
  :root { --text: #f7ecff; --accent-pink: #ff86c4; ... }        /* si l'OS est en sombre */
}

:root[data-theme="dark"]  { --text: #f7ecff;  ... }              /* si l'utilisateur force le sombre */
:root[data-theme="light"] { --text: #351b3e; ... }               /* si l'utilisateur force le clair */
```

- Par défaut, le thème suit les réglages du système (`prefers-color-scheme`).
- Le bouton en forme de soleil/lune dans la barre du haut permet de **forcer**
  un thème : au clic, le JS pose l'attribut `data-theme="dark"` ou
  `data-theme="light"` sur `<html>`. Comme un sélecteur `:root[data-theme=...]`
  est plus spécifique qu'une media query, il prend le dessus sur la
  préférence système dès qu'on a cliqué une fois.

```js
themeBtn.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
});
```

Petite subtilité : comme le canvas de particules dessine ses couleurs en
JavaScript (pas en CSS), il ne "voit" pas automatiquement le changement de
variable. La fonction `readAccentColors()` relit donc les valeurs actuelles
de `--accent-pink/violet/blue` à chaque bascule de thème pour que les
particules et les éclairs changent de couleur eux aussi.

*Remarque : le thème choisi n'est pas mémorisé d'une visite à l'autre (pas de
`localStorage`). Dites-le-moi si vous voulez que je l'ajoute.*

---

## 3. Les arcs magiques (éclairs de lame)

Toujours dans le même canvas `#vfx`, un deuxième système indépendant gère les
éclairs. L'idée : simuler la traînée lumineuse d'un coup de lame **sans
jamais dessiner de lame**, juste une courbe qui se trace très vite puis
s'efface.

**Déclenchement** — toutes les 6,5 à 9 secondes (aléatoire), `spawnSlash()`
crée un objet décrivant une courbe de Bézier quadratique : un point de départ,
un point de contrôle (qui donne la légère courbure/"bow"), un point d'arrivée,
une couleur (piochée dans la palette rose/violet/bleu) et une date de départ.

```js
function spawnSlash() {
  ...
  slashes.push({ x0, y0, cx, cy, x1, y1, color, start: performance.now(), duration: 850 });
}
```

**Dessin, image par image** — `drawSlash()` calcule une progression
`t = (maintenant - début) / durée` (donc de 0 à 1 sur 850 ms), puis la
découpe en deux phases :

- **0% → 32% du temps** : `drawT` grimpe de 0 à 1. On échantillonne 26 points
  le long de la courbe de Bézier (fonction `bezierPoint`) entre 0 et `drawT`,
  et on les relie avec `lineTo`. Comme on ne dessine que le **début** de la
  courbe au début de l'animation, ça donne l'impression que le trait "se
  trace" très vite, comme un geste de lame.
- **32% → 100% du temps** : la courbe est entièrement tracée, et `fadeT`
  redescend de 1 à 0 : le trait s'efface en fondu.

```js
const drawT = Math.min(1, t / 0.32);                      // vitesse du tracé
const fadeT = t < 0.32 ? 1 : Math.max(0, 1 - (t - 0.32) / 0.68); // fondu ensuite
```

Le trait est dessiné avec `shadowBlur` (halo lumineux) et sa couleur vient de
la palette du thème actif. Juste après le tracé (entre 22% et 50% du temps),
un petit dégradé radial ("burst") apparaît brièvement à la pointe de la
courbe pour simuler un éclat d'impact — encore une fois, uniquement de la
lumière, jamais de forme d'arme.

Les éclairs trop vieux (`t > 1`) sont retirés du tableau `slashes` à chaque
frame, et on ne garde jamais plus de 4 éclairs en mémoire à la fois.

---

## 4. D'où viennent les icônes

Aucune icône n'est téléchargée ni chargée depuis un service extérieur (pas de
police d'icônes, pas de CDN, pas de fichier image) : ce sont de simples
**SVG écrits à la main**, stockés comme du texte dans un objet JavaScript
`ICONS` en haut de `script.js` :

```js
const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ...>...</svg>',
  phone: '<svg ...>...</svg>',
  linkedin: '<svg ...>...</svg>',
  globe: '<svg ...>...</svg>',
  pin: '<svg ...>...</svg>',
};
```

Chaque icône est ensuite injectée dans le HTML au bon endroit via un simple
`${ICONS.mail}` dans les templates (`renderHero()`, `renderContact()`, etc.).

**Pourquoi ce style-là ?** Je les ai dessinées en suivant une convention très
répandue dans le design d'interface — celle des jeux d'icônes "outline"
open-source du type Feather / Lucide : un carré de référence `24×24`,
un tracé simple (`stroke`, jamais de remplissage), une épaisseur de trait
fixe (`stroke-width="2"`) et des extrémités arrondies
(`stroke-linecap="round"` / `stroke-linejoin="round"`). En gardant ces
mêmes réglages pour toutes les icônes, elles ont toutes le même "poids"
visuel et s'accordent naturellement entre elles, même si elles ne viennent
pas d'une bibliothèque unique.

L'autre détail important : elles utilisent `stroke="currentColor"` plutôt
qu'une couleur fixe. `currentColor` va chercher la couleur du texte définie
par CSS à cet endroit (`color: ...`) — c'est pour ça qu'une icône change de
couleur toute seule selon le thème clair/sombre, ou au survol d'un bouton
(`.icon-btn:hover { color: var(--accent-pink); }`), sans qu'on ait besoin de
dupliquer l'icône pour chaque couleur.

**Pour ajouter une nouvelle icône** (ex. Instagram, un CV en anglais, etc.) :
1. Trouver ou dessiner un SVG au format `24x24`, en `stroke` (pas en `fill`) —
   les jeux d'icônes [Feather](https://feathericons.com) ou
   [Lucide](https://lucide.dev) (libres de droits, licence MIT) sont une
   bonne source, dans le même esprit que celles déjà présentes ici.
2. Ajouter une entrée dans l'objet `ICONS`, avec la même structure
   `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"`.
3. L'appeler où on veut avec `${ICONS.nomDeLIcone}`.
4. Sa taille à l'affichage est gérée par CSS (par ex. `.btn svg { width: 16px; height: 16px; }`), pas par le SVG lui-même — donc pas besoin de resize le fichier.

---

## 5. Le CV3 : états (normal / hover / active), losanges, glassmorphism

Le CV3 (dossier `CV3`) est le plus "riche" en petits effets d'état. Voici
comment chacun fonctionne, avec les extraits exacts de `CV3/style.css`.

### a. Trois états, trois manières de les déclencher

En CSS il y a trois façons de faire réagir un élément, qu'on retrouve toutes
dans le CV3 :

- **Normal** : le style de base d'un élément, appliqué tout le temps (sa
  couleur, sa taille, son opacité par défaut).
- **`:hover`** : un style qui ne s'applique **que pendant que la souris
  survole** l'élément. Il redevient normal dès que le curseur s'en va — géré
  entièrement par le navigateur, aucun JavaScript nécessaire.
- **`.active`** : contrairement à `:hover`, ce n'est pas un état automatique
  du navigateur mais une **classe CSS ordinaire** que le JavaScript ajoute ou
  retire lui-même (`classList.toggle("active", ...)`) — utile quand on veut
  qu'un style "reste allumé" après un clic, ou pour indiquer où on en est
  (ex. le lien de la section actuellement visible dans le menu).

Exemple avec les liens de la barre de navigation :

```css
.topbar a:hover, .topbar a.active { color: var(--text); }
.topbar a:hover::after, .topbar a.active::after { width: 60%; }
```

`:hover` et `.active` sont regroupés dans le même sélecteur : le lien survolé
et le lien "actif" (celui de la section qu'on est en train de lire, détecté
par un `IntersectionObserver` en JS quand on scrolle) ont exactement le même
style — un petit soulignement en dégradé qui s'étire de 0 à 60% de largeur.

Autres exemples d'états dans le CV3 :
- `.panel:hover .corner { opacity: 0.95; color: var(--accent-pink); }` → les
  ornements filigranés dans les coins d'une carte sont discrets (opacité
  0.55) au repos, et s'illuminent en rose au survol de toute la carte.
- `.contact-pill:hover { transform: translateY(-2px); box-shadow: ...; }` →
  les boutons de contact se soulèvent légèrement au survol.
- `.btn:hover { transform: translateY(-2px); }` → même principe sur les
  boutons.

### b. Les losanges

Trois endroits utilisent un losange plutôt qu'un rond ou un carré classique,
et c'est à chaque fois **le même trick** : un carré tourné à 45° avec
`transform: rotate(45deg)`.

```css
/* Le point de statut ("Disponible en freelance") */
.status-diamond { width: 8px; height: 8px; background: var(--accent-grad);
                   transform: rotate(45deg); box-shadow: 0 0 8px var(--accent-pink); }

/* Les nœuds de la timeline "journal de quêtes" */
.tl-dot { width: 11px; height: 11px; background: var(--accent-grad);
          transform: rotate(45deg); box-shadow: 0 0 10px var(--accent-pink), 0 0 0 4px var(--bg-base); }

/* Le repère au bout de chaque jauge de compétence */
.skill-bar-fill::after {
  content: ""; position: absolute; right: -4px; top: 50%;
  width: 8px; height: 8px; background: #fff; border: 2px solid var(--accent-pink);
  transform: translateY(-50%) rotate(45deg);
}
```

Aucune de ces formes n'est une image ni un caractère spécial : ce sont des
`<div>` ou des pseudo-éléments `::after` tout bêtes, carrés à la base, que
`rotate(45deg)` transforme visuellement en losange. Le `box-shadow` (souvent
sans `blur` de décalage, juste un flou) ajoute la petite lueur autour.

### c. Le glassmorphism ("effet verre")

C'est l'effet visuel commun à CV1, CV3 et CV4 : des panneaux qui semblent
être en verre dépoli, laissant deviner le fond flou derrière eux. Il repose
sur une seule classe, `.glass`, empilant quatre propriétés :

```css
.glass {
  background: var(--glass-bg);                          /* 1. fond semi-transparent */
  border: 1px solid var(--glass-border);                 /* 2. liseré clair */
  border-radius: var(--radius-lg);                       /* coins arrondis */
  backdrop-filter: blur(18px) saturate(150%);             /* 3. flou de CE QUI EST DERRIÈRE */
  -webkit-backdrop-filter: blur(18px) saturate(150%);     /* (idem, pour Safari) */
  box-shadow: 0 10px 34px var(--glass-shadow);            /* 4. ombre douce et colorée */
}
```

Le détail qui fait tout le travail, c'est **`backdrop-filter`** : contrairement
à `filter` (qui floute l'élément lui-même), `backdrop-filter` floute
uniquement **ce qui se trouve derrière** l'élément — ici, les halos de
couleur du fond. Le `background` du panneau est volontairement semi-transparent
(`rgba(255,255,255,0.5)` en clair, `rgba(28,17,46,0.55)` en sombre — voir les
variables `--glass-bg` dans le CSS) pour laisser ce flou transparaître tout
en gardant le texte lisible par-dessus. Le `saturate(150%)` en plus du `blur`
intensifie légèrement les couleurs qui transparaissent, pour un rendu plus
vivant qu'un simple flou gris.

L'ombre (`box-shadow`) utilise elle aussi une variable de couleur teintée
(violette) plutôt qu'un gris neutre : c'est ce qui donne cette impression de
"lueur" douce autour des cartes plutôt qu'une ombre plate classique.

`.glass` est ensuite combinée à d'autres classes selon l'élément (`class="hero glass"`,
`class="skill-card glass"`, etc.) : elle ne s'occupe que de l'effet verre,
la mise en page (tailles, marges internes) est gérée par les classes voisines.

---

## Pour aller plus loin

- **Intensité** : réduire la fréquence des éclairs → augmenter les valeurs
  dans `setInterval(spawnSlash, 6500 + ...)`. Réduire le nombre de particules
  → augmenter le diviseur dans `(w * h) / 24000`.
- **Accessibilité** : tout le mouvement (halos, particules, éclairs) est
  coupé automatiquement si l'utilisateur a activé "réduire les animations"
  dans son système (`prefers-reduced-motion`), géré via la variable
  `prefersReducedMotion` en JS et le bloc `@media (prefers-reduced-motion: reduce)`
  en CSS.
