# Plateforme HSE — IM2S Protection Incendie

> **Édition v5 — Reconstruction « déploiement garanti »**  
> Production : LENAXIS / SECURE — David MUSEUR — 27 mai 2026

Plateforme HSE statique consolidant le dossier IM2S Protection Incendie :
DUERP 2026, audit interactif BTP-SSI, plan d'action priorisé, chronologie
2011-2026, bibliothèque documentaire.

---

## ⚡ Architecture

- **Statique pur** — HTML + CSS + JS vanilla (pas de build, pas de framework)
- **Léger** — moins de 1 Mo pour le squelette
- **11 sections** — sidebar + main content, scroll-spy, hash routing
- **Audit interactif** avec persistance `localStorage`
- **Bibliothèque** documentaire filtrable par catégorie
- **Logo officiel** IM2S intégré (PNG 12 Ko + version HiDPI)
- **Responsive** — sidebar repliable sur mobile

```
plateforme_im2s/
├── index.html              # Page unique, 11 sections
├── vercel.json             # Configuration déploiement
├── css/styles.css          # Charte IM2S — rouge officiel + gris anthracite
├── js/
│   ├── app.js              # Navigation, audit, filtres, mobile
│   └── audit-data.js       # 60 questions sur 6 catégories
└── assets/
    ├── img/
    │   ├── logo_im2s.png       # Logo officiel
    │   ├── logo_im2s@2x.png    # Version HiDPI
    │   └── favicon.png
    └── docs/               # ← À remplir avec vos DOCX/PDF
        └── README.md
```

---

## 🚀 Déploiement Vercel — 3 méthodes

### Méthode 1 : drag & drop (la plus simple)

1. Dézippez le ZIP livré.
2. Allez sur https://vercel.com/new
3. Glissez/déposez le dossier `plateforme_im2s/` complet.
4. Cliquez « Deploy ».

### Méthode 2 : CLI Vercel (recommandée pour les mises à jour)

```bash
# Installer le CLI une fois
npm i -g vercel

# Depuis le dossier dézippé
cd plateforme_im2s/
vercel             # première fois — création projet
vercel --prod      # déploiement en production
```

### Méthode 3 : Git (pour versionner)

1. Créez un repo Git (GitHub, GitLab).
2. Connectez-le à Vercel.
3. Push → déploiement automatique à chaque commit.

---

## ⚠️ Si Vercel a déjà refusé un déploiement

Causes habituelles et solutions :

| Symptôme | Cause probable | Solution |
|----------|---------------|----------|
| **File too large** | Un fichier dans `assets/docs/` dépasse 100 Mo | Compresser le DOCX ou héberger ailleurs (voir `assets/docs/README.md`) |
| **Deployment size limit** | Total > 100 Mo | Ne pas embarquer les photos haute définition ; les externaliser |
| **Build failed** | Vercel essaye de builder | Ce projet est **statique pur** — aucun build nécessaire. Vérifier l'absence de `package.json`. |
| **Format not supported** | Extension inhabituelle | Tous les fichiers ici sont .html / .css / .js / .png / .json — formats standards. |

Le présent kit ne contient pas de DOCX/PDF embarqués dans le ZIP — vous les
ajoutez vous-même dans `assets/docs/` après dézippage, ce qui permet de
contrôler la taille totale.

---

## 🔧 Personnalisation rapide

| Élément | Fichier | Ligne / repère |
|---------|---------|---------------|
| Couleurs IM2S | `css/styles.css` | bloc `:root` (variables `--im2s-red`, `--im2s-gray`) |
| Polices | `css/styles.css` | `--font-display`, `--font-body`, `--font-mono` |
| Sections (textes) | `index.html` | balise `<section id="…">` correspondante |
| Questions audit | `js/audit-data.js` | tableau `AUDIT` |
| Liens documents | `index.html` | section `<section id="bibliotheque">` |
| Photos galerie | `index.html` | section `<section id="galerie">` (remplacer les placeholders par `<img>`) |

---

## 📦 Livré avec

- Logo officiel IM2S (extrait de la capture authentique fournie le 27/05)
- Charte graphique cohérente sur l'ensemble
- 60 questions d'audit BTP-SSI sectoriel pré-rédigées
- Plan d'action A.1 → A.10 entièrement détaillé
- Chronologie 2011-2026 documentée
- Format facts / hypothèses / recommandations sur le dashboard (consigne LENAXIS n°6)

---

**Cabinet LENAXIS / SECURE** — David MUSEUR  
Conformité HSE & Risk Management
