#!/usr/bin/env bash
# ============================================================
# Pré-déploiement IM2S — vérification taille et intégrité
# Lancer ce script depuis le dossier plateforme_im2s/
# ============================================================
set -e

echo "🔍 Vérification pré-déploiement Vercel — IM2S"
echo "================================================"

# 1. Taille totale
TOTAL_KB=$(du -sk . | cut -f1)
TOTAL_MB=$((TOTAL_KB / 1024))
echo "Taille totale : ${TOTAL_KB} Ko (${TOTAL_MB} Mo)"
if [ $TOTAL_MB -gt 95 ]; then
  echo "❌ DANGER : > 95 Mo, Vercel va probablement refuser."
  echo "   → externalisez les gros fichiers de assets/docs/"
  exit 1
else
  echo "✅ OK — bien sous la limite Vercel (100 Mo)"
fi
echo ""

# 2. Fichiers volumineux (> 10 Mo)
echo "🔍 Fichiers > 10 Mo :"
big=$(find . -type f -size +10M 2>/dev/null)
if [ -z "$big" ]; then
  echo "  ✅ aucun fichier > 10 Mo"
else
  echo "$big" | while read f; do
    size=$(du -h "$f" | cut -f1)
    echo "  ⚠️  $f ($size)"
  done
fi
echo ""

# 3. Présence des fichiers critiques
echo "🔍 Fichiers critiques :"
for f in index.html vercel.json css/styles.css js/app.js js/audit-data.js assets/img/logo_im2s.png; do
  if [ -f "$f" ]; then
    echo "  ✅ $f"
  else
    echo "  ❌ MANQUANT : $f"
    exit 1
  fi
done
echo ""

# 4. Validation JSON
echo "🔍 vercel.json :"
if python3 -c "import json; json.load(open('vercel.json'))" 2>/dev/null; then
  echo "  ✅ JSON valide"
else
  echo "  ❌ JSON invalide"
  exit 1
fi
echo ""

# 5. Documents bibliothèque
echo "🔍 Documents dans assets/docs/ :"
nb_docs=$(find assets/docs/ -type f ! -name 'README*' 2>/dev/null | wc -l)
echo "  📄 $nb_docs document(s) prêt(s) au téléchargement"
if [ $nb_docs -eq 0 ]; then
  echo "  ℹ️  La plateforme se déploiera, mais les boutons de téléchargement renverront 404."
  echo "     Placez vos DOCX/PDF dans assets/docs/ pour les activer."
fi
echo ""

echo "================================================"
echo "✅ Prêt pour déploiement"
echo ""
echo "Étape suivante :"
echo "  vercel --prod"
echo ""
