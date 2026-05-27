/* ============================================================
   AUDIT INTERACTIF HSE BTP-SSI — DONNÉES
   60 critères, 6 catégories, sectoriel IM2S Protection Incendie
   ============================================================ */

(function () {
  'use strict';

  const AUDIT = [
    {
      cat: 'A. Travail en hauteur',
      ref: 'TH',
      questions: [
        'Les interventions à plus de 3 m sont-elles toutes précédées d\'une analyse de risque écrite ?',
        'Les techniciens disposent-ils d\'un harnais antichute individuel à leur nom ?',
        'Le contrôle annuel des EPI antichute par un organisme agréé est-il à jour ?',
        'Un permis de travail en hauteur est-il établi pour chaque chantier en toiture ?',
        'Les échelles HYMER font-elles l\'objet d\'une vérification semestrielle tracée ?',
        'Les techniciens sont-ils formés au montage / démontage de leurs équipements antichute ?',
        'La déclaration Risqapp 2026 reflète-t-elle correctement l\'exposition au risque hauteur ?',
        'Un secouriste formé est-il systématiquement présent sur les chantiers en hauteur ?',
        'Les points d\'ancrage sont-ils certifiés conformes (EN 795) sur tous les sites ?',
        'Un plan de sauvetage en cas de suspension est-il défini et formalisé ?',
      ],
    },
    {
      cat: 'B. Risques électriques',
      ref: 'EL',
      questions: [
        'Les habilitations électriques des techniciens sont-elles à jour (H0B0, B1V, etc.) ?',
        'Le registre des contrôles électriques périodiques de l\'atelier est-il tenu ?',
        'Les EPI électriques (gants isolants, vêtements) sont-ils vérifiés tous les 6 mois ?',
        'Les consignations électriques font-elles l\'objet d\'une procédure écrite ?',
        'Les armoires SSI clients sont-elles intervenues hors tension par défaut ?',
        'Les ouvriers du BTP non-électriciens connaissent-ils la conduite à tenir en cas d\'arc ?',
        'Un VAT (vérificateur d\'absence de tension) est-il disponible dans chaque véhicule ?',
        'Les outils à main utilisés sur installations électriques sont-ils isolés 1000 V ?',
        'Le recyclage des habilitations a-t-il lieu tous les 3 ans pour l\'ensemble du personnel concerné ?',
        'Un titulaire chargé d\'exploitation électrique est-il désigné par écrit ?',
      ],
    },
    {
      cat: 'C. Risques chimiques',
      ref: 'CH',
      questions: [
        'L\'inventaire complet des produits chimiques (extincteurs, mousses, solvants) est-il tenu ?',
        'Les fiches de données de sécurité (FDS) sont-elles accessibles aux salariés ?',
        'Les EPI chimiques (gants nitrile, lunettes, masques) sont-ils fournis et utilisés ?',
        'Le stockage des produits respecte-t-il les incompatibilités (rétention, ventilation) ?',
        'Les VLEP (valeurs limites d\'exposition professionnelle) sont-elles connues du personnel exposé ?',
        'Le tri et l\'élimination des déchets dangereux suivent-ils un BSD (bordereau) ?',
        'Le REX charbon actif (chantier Sérigraphie Moderne) est-il documenté comme procédure type ?',
        'Les femmes enceintes ou allaitantes sont-elles exclues des expositions chimiques ?',
        'La fiche d\'exposition individuelle aux agents chimiques dangereux est-elle remplie ?',
        'Les douches de sécurité et rince-œil sont-ils présents dans les zones de risque ?',
      ],
    },
    {
      cat: 'D. Manutention et TMS',
      ref: 'MN',
      questions: [
        'Les charges supérieures à 25 kg sont-elles manutentionnées à deux ou avec aide mécanique ?',
        'Le personnel est-il formé aux gestes et postures (PRAP par exemple) ?',
        'Les chariots / diables / sangles sont-ils disponibles en quantité suffisante ?',
        'Les véhicules disposent-ils de hayons élévateurs pour les charges lourdes ?',
        'Les TMS déclarés font-ils l\'objet d\'un suivi médecin du travail (APST BTP 06) ?',
        'Un poste de manutention douteux fait-il l\'objet d\'une analyse ergonomique ?',
        'Les pauses sont-elles organisées pour limiter les efforts répétitifs ?',
        'Les ouvriers de plus de 50 ans sont-ils suivis spécifiquement (visites renforcées) ?',
        'Les femmes du service technique sont-elles affectées à des tâches adaptées si nécessaire ?',
        'Le matériel de levage (treuils, palans) fait-il l\'objet d\'une VGP annuelle ?',
      ],
    },
    {
      cat: 'E. Risques routiers et déplacements',
      ref: 'RT',
      questions: [
        'Le carnet d\'entretien des véhicules est-il tenu pour chaque véhicule ?',
        'La revue véhicules hebdomadaire constatée le 26/03 est-elle pérennisée par écrit ?',
        'Les permis de conduire des techniciens sont-ils vérifiés annuellement ?',
        'Les véhicules sont-ils équipés de kits de premiers secours et triangles ?',
        'Les conducteurs sont-ils sensibilisés à la conduite préventive (formation initiale) ?',
        'Les outils et matériels sont-ils arrimés dans les véhicules pour éviter les projectiles ?',
        'Les itinéraires longs distance font-ils l\'objet d\'une planification (pauses, hôtels) ?',
        'L\'usage du téléphone au volant est-il interdit par procédure interne ?',
        'Les accidents de trajet sont-ils analysés et tracés dans le DUERP ?',
        'Le contrôle technique et l\'assurance des véhicules sont-ils à jour ?',
      ],
    },
    {
      cat: 'F. Organisation, formation, RPS',
      ref: 'OR',
      questions: [
        'Le DUERP est-il mis à jour annuellement (Art. R.4121-2) ?',
        'Le DUERP est-il cosigné par un consultant externe (opposabilité renforcée) ?',
        'Le plan d\'action annuel est-il établi et communiqué aux salariés ?',
        'Le registre du personnel (DPAE, contrats) est-il à jour ?',
        'Les visites médicales d\'embauche et périodiques sont-elles toutes effectuées ?',
        'Le podcast interne IM2S Morning est-il identifié comme outil RPS dans le DUERP ?',
        'L\'approche RPS du gérant est-elle formalisée par écrit (protocole) ?',
        'La tablette « L\'Enaxie » est-elle déployée sur l\'ensemble des unités de travail ?',
        'Un référent harcèlement (CSE ou désigné) est-il identifié et connu ?',
        'Le compte personnel de prévention (C2P) est-il alimenté pour les expositions concernées ?',
      ],
    },
  ];

  // Génération HTML
  function buildAudit() {
    const root = document.getElementById('audit-root');
    if (!root) return;

    const html = AUDIT.map((cat, ci) => {
      const qHtml = cat.questions.map((q, qi) => {
        const qid = `${cat.ref}-${(qi + 1).toString().padStart(2, '0')}`;
        return `
          <div class="audit-q" data-qid="${qid}">
            <div class="audit-q-text"><span style="font-family:var(--font-mono); font-size:11px; color:var(--im2s-red); margin-right:8px;">${qid}</span>${q}</div>
            <div class="audit-choices">
              <button class="audit-choice" data-val="oui">Oui</button>
              <button class="audit-choice" data-val="partiel">Partiel</button>
              <button class="audit-choice" data-val="non">Non</button>
              <button class="audit-choice" data-val="na">N/A</button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="audit-cat" id="audit-cat-${ci}">
          <div class="audit-cat-header">
            <div class="audit-cat-title">${cat.cat} <span style="font-family:var(--font-mono); font-size:12px; color:var(--im2s-gray-light); font-weight:normal;">— ${cat.questions.length} questions</span></div>
            <button class="audit-cat-toggle" type="button">−</button>
          </div>
          ${qHtml}
        </div>
      `;
    }).join('');

    root.innerHTML = html;

    // Re-attacher les handlers (puisque le HTML est injecté APRES initAudit)
    if (window.__reinitAudit) window.__reinitAudit();
  }

  // Injection au DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildAudit);
  } else {
    buildAudit();
  }
})();
