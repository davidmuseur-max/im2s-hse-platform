# Dossier des documents téléchargeables

Placez ici vos fichiers DOCX / PDF / XLSX référencés par la bibliothèque documentaire de la plateforme.

## Fichiers attendus par la plateforme

La page `#bibliotheque` de l'`index.html` référence les fichiers suivants — copiez-les ici avant déploiement :

| Fichier | Source |
|---------|--------|
| `DUERP_IM2S_Protection_Incendie_Edition_2026_v2_2_ULTIME.docx` | Livrable principal |
| `DUERP_IM2S_Version_Externe_APST_Sambroni_2026-05-27.docx` | Version externe |
| `CR_Reunion_IM2S_2026-03-26_v4_ULTIME.docx` | Compte rendu |
| `Mail_Explicatif_Evolution_DUE_2016_vers_2026.docx` | Courrier explicatif |
| `Courrier_Pieces_A_Obtenir_IM2S_v2_par_urgence.docx` | Liste pièces |
| `Note_Synthese_Photos_IM2S_2026-05-27.docx` | Note photos |
| `Audit_BTP_SSI_IM2S_Edition_2026_v1.xlsx` | Audit Excel |
| `Risqapp_Diagnostic_des_Risques_Entreprise.pdf` | Source primaire |
| `DU_SARL_IM2S_PROTECTION_INCENDIE_8.pdf` | Source historique |

## Attention à la limite Vercel

Le tier gratuit Vercel impose une limite de **100 Mo par déploiement** et tend à rejeter les fichiers volumineux. Si la `Note de synthèse photos` (~74 Mo) provoque l'erreur, deux solutions :

### Option A — Compresser le DOCX

```bash
# Réduire les images embarquées dans le DOCX
cd assets/docs/
unzip Note_Synthese_Photos_IM2S_2026-05-27.docx -d note_unzip/
# Compresser les .png/.jpg du dossier word/media/ via Pillow / ImageMagick
# Re-zipper :
cd note_unzip/ && zip -r ../Note_Synthese_Photos_compressee.docx . && cd ..
```

### Option B — Hébergement externe

Déposer les gros fichiers sur Google Drive / Dropbox / S3 et modifier les liens du `index.html` (balises `<a href>` de la section `#bibliotheque`) pour pointer vers les URL externes plutôt que vers `assets/docs/`.
