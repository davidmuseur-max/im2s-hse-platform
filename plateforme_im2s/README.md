# Plateforme HSE — IM2S Protection Incendie

**Édition 2026 v1** — Établie par LENAXIS / SECURE (David MUSEUR) — 27 mai 2026

Plateforme web statique de gestion HSE pour IM2S Protection Incendie : DUERP, cartographie des risques, plan d'action, audit interactif, bibliothèque documentaire, habilitations, contacts d'urgence.

## Architecture technique

- **HTML/CSS/JS vanilla** — aucune dépendance, aucun framework, aucun backend
- **Site statique** — déployable sur Vercel, Netlify, GitHub Pages, OVH, etc.
- **Audit interactif** — persistance via `localStorage` (navigateur de l'utilisateur)
- **RGPD-compatible** — aucun tracking, aucun cookie, aucune donnée envoyée à un serveur tiers
- **Responsive** — adapté mobile (breakpoint 900 px)
- **Charte IM2S** — rouge `#A00D1A`, gris `#5A5B5C`

## Structure du dossier

```
plateforme_im2s/
├── index.html                  # Page unique (SPA avec 11 sections)
├── vercel.json                 # Configuration Vercel (headers sécurité, cache)
├── README.md                   # Ce fichier
└── assets/
    ├── style.css               # Charte graphique IM2S complète (~580 lignes)
    ├── data.js                 # Données : 25 fiches risques, 21 actions, KPI, contacts
    ├── app.js                  # Navigation SPA + audit interactif + rendu dynamique
    ├── img/
    │   └── logo_im2s.jpg       # Logo officiel IM2S
    └── docs/                   # Bibliothèque documentaire (7 documents)
        ├── DUERP_IM2S_Protection_Incendie_Edition_2026_v1_1.docx
        ├── Courrier_Pieces_A_Obtenir_IM2S_2026-05-27.docx
        ├── Audit_BTP_SSI_IM2S_Edition_2026_v1.xlsx
        ├── DU_Matrice_GF_2015.pdf
        ├── DU_Riskattitude_2016.pdf
        ├── Risqapp_Diagnostic_2026.pdf
        └── Liste_risques_2016.pdf
```

## Déploiement sur Vercel — 3 méthodes

### Méthode 1 — Drag & drop (la plus rapide, ~2 minutes)

1. Créer un compte Vercel gratuit sur https://vercel.com/signup (avec votre e-mail ou compte GitHub).
2. Une fois connecté, cliquer sur **Add New… > Project**.
3. Sur la page d'import, cliquer sur le lien **« Import Third-Party Git Repository »** OU faire **glisser-déposer le dossier `plateforme_im2s/` entier** sur la zone d'upload.
4. Vercel détecte automatiquement le site statique (pas de framework). Cliquer sur **Deploy**.
5. En 30 secondes, votre plateforme est en ligne avec une URL du type `https://im2s-hse-platform-xxx.vercel.app`.
6. Vous pouvez ensuite associer un nom de domaine personnalisé dans les **Settings > Domains** (ex. `hse.im2s.fr`).

### Méthode 2 — CLI Vercel (recommandée pour mises à jour fréquentes)

```bash
# Installation unique du CLI Vercel
npm install -g vercel

# Dans le dossier plateforme_im2s/
cd plateforme_im2s
vercel login          # première fois seulement
vercel                # déploiement de pré-production
vercel --prod         # déploiement de production
```

### Méthode 3 — Via Git (pour collaboration et historique)

```bash
# Initialiser un dépôt git
cd plateforme_im2s
git init
git add .
git commit -m "Initial deployment - HSE platform v1"

# Créer un dépôt GitHub privé et y pousser
git remote add origin https://github.com/<votre-compte>/im2s-hse-platform.git
git push -u origin main

# Sur vercel.com : Add New > Project > Import Git Repository > choisir le dépôt
# Chaque git push déclenche un déploiement automatique
```

## Personnalisation

### Ajouter une nouvelle fiche de risque

Éditer `assets/data.js`, dans le tableau `FICHES` :

```javascript
{
  code: 'FR-26', famille: 'F11',
  titre: 'Nouveau risque identifié',
  niveau: 'medium',  // 'critical' | 'high' | 'medium' | 'low'
  gravite: 3, frequence: 2,
  ut: ['UT3', 'UT4'],
  description: 'Description du risque…',
  mesures: 'Mesures de prévention…'
},
```

### Ajouter un document à la bibliothèque

1. Déposer le fichier dans `assets/docs/`.
2. Éditer `assets/data.js`, tableau `BIBLIOTHEQUE`, ajouter une entrée :

```javascript
{
  nom: 'Nom du document',
  type: 'pdf',
  taille: '500 Ko',
  date: '01/06/2026',
  url: 'assets/docs/mon_document.pdf',
  conservation: 'À conserver 40 ans'
}
```

### Modifier les couleurs de la charte

Éditer `assets/style.css`, bloc `:root` (premières lignes) — modifier les variables CSS.

### Ajouter une question à l'audit interactif

Éditer `assets/app.js`, tableau `AUDIT_QUESTIONS`, ajouter une question dans la catégorie souhaitée.

## Maintenance recommandée

| Périodicité | Action |
|-------------|--------|
| **Mensuelle** | Vérifier les liens de téléchargement de la bibliothèque |
| **Trimestrielle** | Mettre à jour le tableau des habilitations |
| **Annuelle** | Réviser le DUERP (Art. R.4121-2) — produire l'édition v1.2 |
| **Continue** | Ajouter les chantiers en cours dans la section dédiée |

## Sécurité et RGPD

- **Aucune donnée personnelle** n'est collectée par la plateforme.
- L'audit interactif stocke les réponses uniquement dans le navigateur de l'utilisateur (`localStorage`), pas sur un serveur.
- Les en-têtes HTTP de sécurité sont configurés dans `vercel.json` (X-Frame-Options, X-Content-Type-Options, etc.).
- La carte de la section « Chantiers » utilise OpenStreetMap (pas de tracking Google).

## Conservation des documents (Art. L.4121-3-1 CT)

Tous les DUERP successifs (édition 2015, 2016, 2026 v1, v1.1, v1.2 à venir, etc.) doivent être conservés pendant **40 ans**. La bibliothèque documentaire de cette plateforme assure cette conservation pour les versions à date. Penser à archiver les versions antérieures à chaque révision annuelle.

## Support et évolutions

Pour toute évolution ou question technique, contacter :

**David MUSEUR**  
Consultant senior HSE — LENAXIS / SECURE  
✉️ david.museur@lenaxis-secure.fr

---

© 2026 IM2S Protection Incendie — Plateforme conçue par LENAXIS / SECURE
