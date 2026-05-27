// ==========================================================================
// PLATEFORME HSE IM2S — DONNÉES
// ==========================================================================

// === 25 FICHES DE RISQUES (codes FR-01 à FR-25) ===
const FICHES = [
  // Famille F1 — Travail en hauteur
  { code: 'FR-01', famille: 'F1', titre: 'Chute de hauteur — toitures et exutoires', niveau: 'critical', gravite: 4, frequence: 3, ut: ['UT3','UT4','UT6'],
    description: 'Pose/maintenance d\'exutoires de désenfumage en toiture industrielle (cf. devis Sérigraphie Moderne SAS). Risque mortel par chute à l\'intérieur du bâtiment lors du percement de la toiture.',
    mesures: 'PEMP avec CACES R.486 cat. B + autorisation employeur ; harnais individuel attaché point ancrage ; protections collectives temporaires (filets, garde-corps temporaires) ; grilles anti-chute 1200 J ; interdiction par vent > 45 km/h.' },
  { code: 'FR-02', famille: 'F1', titre: 'Chute de hauteur — échelles et escabeaux', niveau: 'high', gravite: 3, frequence: 3, ut: ['UT3','UT4'],
    description: 'Utilisation d\'échelles pour interventions ponctuelles. L\'échelle est un moyen d\'accès, jamais un poste de travail.',
    mesures: 'Note interne d\'interdiction d\'usage comme poste de travail ; inventaire et marquage individuel ; vérification visuelle quotidienne ; PIRL préférée pour interventions < 3 m.' },
  { code: 'FR-03', famille: 'F1', titre: 'Chute de hauteur — échafaudages', niveau: 'high', gravite: 4, frequence: 2, ut: ['UT3','UT6'],
    description: 'Montage/démontage d\'échafaudages pour travaux en façade ou hauteur de plafond.',
    mesures: 'Formation R.408 CARSAT ; examen avant mise en service + journalier + trimestriel ; garde-corps + sous-lisse + plinthe ; ancrages calculés ; note de calcul > 24 m.' },
  // Famille F2 — Risque électrique
  { code: 'FR-04', famille: 'F2', titre: 'Électrisation/électrocution sur installation BT', niveau: 'critical', gravite: 4, frequence: 2, ut: ['UT3','UT4','UT6'],
    description: 'Interventions sur installations électriques BT pour raccordement CMSI, SDI, SSI, éclairage de sécurité.',
    mesures: 'Habilitations NF C 18-510 (B1V, B2V, BR, BC) recyclées tous les 3 ans ; procédure de consignation (SCIVM) ; VAT systématique ; EPI isolants 1000 V ; outils isolés certifiés.' },
  { code: 'FR-05', famille: 'F2', titre: '3 salariés non habilités (CR 19/01)', niveau: 'critical', gravite: 4, frequence: 4, ut: ['UT3','UT4'],
    description: '3 salariés sur 9 identifiés au CR du 19/01 n\'ont pas d\'habilitation électrique en cours de validité. Risque opérationnel + responsabilité du gérant.',
    mesures: 'IMMÉDIAT : interdiction formelle d\'accès aux installations électriques pour les 3 salariés concernés ; programmation de la formation NF C 18-510 dans les 30 jours ; trace écrite signée.' },
  { code: 'FR-06', famille: 'F2', titre: 'Arc électrique / brûlures', niveau: 'high', gravite: 4, frequence: 1, ut: ['UT3','UT4'],
    description: 'Risque d\'arc électrique lors d\'intervention en tableau ou armoire BT.',
    mesures: 'Vêtements anti-arc (NF EN 61482) ; casque isolant + écran facial ; mise hors tension préalable et VAT.' },
  // Famille F3 — Incendie & explosion
  { code: 'FR-07', famille: 'F3', titre: 'Travaux par point chaud chez le client', niveau: 'high', gravite: 4, frequence: 2, ut: ['UT3','UT4'],
    description: 'Perçage, meulage, soudure chez le client : risque d\'embrasement matières combustibles.',
    mesures: 'Permis de feu APSAD D9 systématique ; surveillance 2 h après-travaux ; extincteur eau pulvérisée 6 L à poste ; distance de sécurité 10 m matières combustibles ; couverture anti-feu.' },
  { code: 'FR-08', famille: 'F3', titre: 'Stockage batteries Li-ion (siège + véhicules)', niveau: 'medium', gravite: 3, frequence: 2, ut: ['UT2','UT3','UT4'],
    description: 'Batteries Li-ion pour outillage portatif : risque d\'emballement thermique en cas de choc ou court-circuit.',
    mesures: 'Stockage en armoire ignifuge ou bac à sable ; identification des défauts (gonflement, surchauffe) ; filière recyclage agréée ; sensibilisation.' },
  // Famille F4 — Manutention & TMS
  { code: 'FR-09', famille: 'F4', titre: 'Manutention de charges > 25 kg', niveau: 'high', gravite: 3, frequence: 4, ut: ['UT2','UT3','UT4'],
    description: 'Diagnostic Risqapp confirme port de charges > 55 kg, ce qui dépasse la VLEP. Lombalgie = 1ère MP du BTP. Aucune formation PRAP suivie.',
    mesures: 'IMMÉDIAT : formation PRAP pour tous les UT2-3-4 (durée 14 h initiale, 7 h MAC tous les 3 ans) ; aides mécaniques (diables, lève-vitre, sangles 2 personnes) ; pas de charge > 55 kg en solo.' },
  { code: 'FR-10', famille: 'F4', titre: 'Postures contraintes (faux-plafond, accroupi)', niveau: 'medium', gravite: 2, frequence: 4, ut: ['UT3','UT4'],
    description: 'Pose de détecteurs en faux-plafond ou au sol — postures bras levés ou accroupies prolongées.',
    mesures: 'Rotation des tâches ; plateforme stable plutôt que poutre ; genouillères ; pauses récupération.' },
  { code: 'FR-11', famille: 'F4', titre: 'Vibrations main-bras (perceuses, perforateurs)', niveau: 'medium', gravite: 2, frequence: 3, ut: ['UT3','UT4'],
    description: 'Outils électroportatifs utilisés régulièrement — risque de syndrome de Raynaud à long terme.',
    mesures: 'Outils certifiés à faible niveau de vibration ; gants antivibratiles NF EN ISO 10819 ; rotation des tâches ; surveillance médicale.' },
  // Famille F5 — Risque routier
  { code: 'FR-12', famille: 'F5', titre: 'Accident de mission / trajet', niveau: 'critical', gravite: 4, frequence: 3, ut: ['UT3','UT4','UT5','UT6'],
    description: 'Activité fortement itinérante en PACA. Diagnostic Risqapp = 54/100 (insuffisant). A8 + M6202 congestionnés.',
    mesures: 'Charte routière + interdiction téléphone au volant (kit main-libre inclus) ; formation post-permis ; analyse systématique des AT routiers + arbre des causes ; vérification annuelle permis ; CT à jour.' },
  { code: 'FR-13', famille: 'F5', titre: 'Arrimage charges dans VUL', niveau: 'medium', gravite: 3, frequence: 3, ut: ['UT3','UT4','UT5'],
    description: 'Risque de projection lors de freinage brutal — équipement SSI, bouteilles de gaz, batteries.',
    mesures: 'Formation arrimage CARSAT R.471 ; sangles NF EN 12195-2 étiquetées ; séparation habitacle/chargement ; bouteilles verticales (ADR).' },
  // Famille F6 — Risque chimique
  { code: 'FR-14', famille: 'F6', titre: 'Manipulation produits d\'entretien et solvants', niveau: 'low', gravite: 2, frequence: 2, ut: ['UT2','UT3','UT4'],
    description: 'Inventaire chimique bien tenu (Risqapp 87/100). Risque résiduel sur transvasement et nettoyage.',
    mesures: 'FDS < 5 ans, étiquetage CLP, gants nitrile, lunettes, douche oculaire à proximité, formation maniement.' },
  { code: 'FR-15', famille: 'F6', titre: 'Poussières silice/béton (perçage)', niveau: 'medium', gravite: 3, frequence: 3, ut: ['UT3','UT4'],
    description: 'Perçage de béton/cloisons pour pose détecteurs et raccordements. Silice cristalline = CMR (VLEP 0,1 mg/m³).',
    mesures: 'Perceuses avec aspiration à la source ; masques FFP3 ; perçage humide quand possible ; mesures empoussièrement si exposition régulière.' },
  // Famille F7 — Amiante & plomb
  { code: 'FR-16', famille: 'F7', titre: 'Découverte fortuite amiante (bâti < 1997)', niveau: 'critical', gravite: 4, frequence: 2, ut: ['UT3','UT4','UT6'],
    description: 'Intervention sur bâtiments anciens : risque d\'exposition à l\'amiante lors de percements. IM2S exige DTA (bonne pratique devis Sérigraphie) mais tous techniciens doivent être formés SS4.',
    mesures: 'Exigence DTA systématique avant intervention < 1997 ; refus chantier si DTA absent ; formation SS4 (R.4412-117) initiale 5 j + recyclage 3 ans pour tous techniciens ; masque TM3P + combinaison type 5 ; arrêt chantier si découverte + appel certifié SS3.' },
  // Famille F8 — Co-activité
  { code: 'FR-17', famille: 'F8', titre: 'Co-activité chez le client (ERP en exploitation)', niveau: 'high', gravite: 3, frequence: 4, ut: ['UT3','UT4','UT6'],
    description: 'Interventions en ERP/ERT en exploitation : risque pour les occupants et les techniciens. Aucun modèle de plan de prévention IM2S formalisé à ce jour.',
    mesures: 'Modèle de plan de prévention IM2S → client à formaliser ; inspection commune préalable systématique ; coordination avec responsable d\'exploitation ; balisage + signalisation ; maintien dégagements.' },
  { code: 'FR-18', famille: 'F8', titre: 'Sous-traitants — vérification compétences', niveau: 'medium', gravite: 3, frequence: 2, ut: ['UT6'],
    description: 'Pose et entretien partiellement sous-traités. Responsabilité solidaire en cas de non-conformité.',
    mesures: 'Vérification cartes BTP + attestations sociales/fiscales + habilitations électriques + RC ; plan de prévention IM2S ↔ sous-traitant signé.' },
  // Famille F9 — RPS
  { code: 'FR-19', famille: 'F9', titre: 'Charge mentale et astreintes 24/7', niveau: 'medium', gravite: 2, frequence: 4, ut: ['UT3','UT4','UT6'],
    description: 'Maintenance SSI ERP (hôpitaux, hôtels) implique astreintes et interventions hors heures. Vigilance + erreur potentielle = responsabilité pénale.',
    mesures: 'Cadre astreintes formalisé (rotation, indemnités) ; respect 11 h repos ; droit à la déconnexion (charte) ; entretien annuel charge de travail.' },
  { code: 'FR-20', famille: 'F9', titre: 'Travail isolé', niveau: 'medium', gravite: 3, frequence: 3, ut: ['UT3','UT4'],
    description: 'Techniciens itinérants seuls sur chantier ou maintenance nocturne.',
    mesures: 'DATI si exposition prolongée ; point téléphonique régulier ; identification sites sans réseau ; procédure de remontée.' },
  { code: 'FR-21', famille: 'F9', titre: 'Risques psycho-sociaux — environnement positif', niveau: 'low', gravite: 1, frequence: 1, ut: ['UT1','UT2','UT3','UT4','UT5','UT6'],
    description: 'Marque employeur positive : podcast interne « IM2S Morning », cahier de doléances, causeries, charte EPI, note 5/5 GoWork. Élément de prévention RPS à valoriser.',
    mesures: 'Maintenir et valoriser ces dispositifs ; encadrement formé à la détection RPS ; référent harcèlement désigné ; mécanisme d\'alerte surcharge.' },
  // Famille F10 — Ambiances physiques
  { code: 'FR-22', famille: 'F10', titre: 'Bruit (sirènes, perceuses, ERP)', niveau: 'medium', gravite: 2, frequence: 2, ut: ['UT3','UT4'],
    description: 'Tests de sirènes SSI, perçage, environnements industriels — exposition ponctuelle > 85 dB(A).',
    mesures: 'Bouchons d\'oreilles à poste ; mesures triennales ; audiogramme embauche + suivi ; achat outils faible bruit.' },
  { code: 'FR-23', famille: 'F10', titre: 'Travail par fortes chaleurs (toiture été)', niveau: 'medium', gravite: 3, frequence: 2, ut: ['UT3','UT4'],
    description: 'Pose en toiture l\'été à La Gaude/PACA : risque coup de chaleur, déshydratation.',
    mesures: 'Adaptation horaires été ; eau fraîche à proximité ; pauses fréquentes ; surveillance entre coéquipiers ; EPI adaptés.' },
  // Famille F11 — Organisation / formation
  { code: 'FR-24', famille: 'F11', titre: 'Absence de SST formé', niveau: 'high', gravite: 3, frequence: 3, ut: ['UT1','UT2','UT3','UT4','UT5','UT6'],
    description: 'CR 19/01 confirme : 0 SST dans l\'entreprise. Reco CNAMTS = 15% de l\'effectif (soit ~2 SST pour 14 ETP).',
    mesures: 'IMMÉDIAT : programmer formation SST (14 h initiale + MAC 7 h / 24 mois) pour au moins 2 salariés ; identification par badge ou affichage.' },
  { code: 'FR-25', famille: 'F11', titre: 'Formation EPI datant de 2015', niveau: 'high', gravite: 2, frequence: 4, ut: ['UT3','UT4'],
    description: 'Dernière formation port des EPI date de 2015 (CR 19/01) — 11 ans sans recyclage. Risque d\'usage incorrect ou inadapté.',
    mesures: 'Formation port des EPI à renouveler pour tous les techniciens ; vérification annuelle EPI antichute par personne compétente ; registre des réformes.' },
];

// === FAMILLES ===
const FAMILLES = [
  { code: 'F1', nom: 'Travail en hauteur', color: '#C62828' },
  { code: 'F2', nom: 'Risque électrique', color: '#FF9800' },
  { code: 'F3', nom: 'Incendie & explosion', color: '#F4511E' },
  { code: 'F4', nom: 'Manutention & TMS', color: '#FF6F00' },
  { code: 'F5', nom: 'Risque routier', color: '#E65100' },
  { code: 'F6', nom: 'Risque chimique', color: '#6A1B9A' },
  { code: 'F7', nom: 'Amiante & plomb', color: '#4527A0' },
  { code: 'F8', nom: 'Co-activité & plan de prévention', color: '#1565C0' },
  { code: 'F9', nom: 'RPS, charge mentale', color: '#0277BD' },
  { code: 'F10', nom: 'Ambiances physiques', color: '#00838F' },
  { code: 'F11', nom: 'Organisation / formation', color: '#2E7D32' },
];

// === PLAN D'ACTION PRIORISÉ ===
const PLAN_ACTION = [
  // IMMÉDIAT
  { code: 'A.01', priorite: 'IMMÉDIAT', echeance: '< 7 jours', action: 'Corriger formellement le DUERP Risqapp : déclarer le travail en hauteur (paradoxe identifié)', responsable: 'M. KNOLL', cout: '0 €', risques: ['FR-01'] },
  { code: 'A.02', priorite: 'IMMÉDIAT', echeance: '< 7 jours', action: 'Interdiction formelle d\'accès aux installations électriques pour les 3 salariés non habilités — trace écrite signée', responsable: 'M. KNOLL', cout: '0 €', risques: ['FR-05'] },
  { code: 'A.03', priorite: 'IMMÉDIAT', echeance: '< 30 jours', action: 'Programmation formation habilitation NF C 18-510 pour les 3 salariés concernés (B1V/B2V/BR)', responsable: 'M. KNOLL', cout: '1 500 - 2 500 €', risques: ['FR-05'] },
  { code: 'A.04', priorite: 'IMMÉDIAT', echeance: '< 30 jours', action: 'Vérification générale annuelle de tous les EPI antichute (harnais, longes, absorbeurs)', responsable: 'Chargé d\'affaires', cout: '300 - 600 €', risques: ['FR-01','FR-25'] },

  // 30 JOURS
  { code: 'A.05', priorite: '30 jours', echeance: '< 60 jours', action: 'Programmer formation SST 14 h initiale pour 2 salariés minimum', responsable: 'M. KNOLL', cout: '600 - 1 000 €', risques: ['FR-24'] },
  { code: 'A.06', priorite: '30 jours', echeance: '< 60 jours', action: 'Programmer formation PRAP gestes & postures pour tous UT2-3-4', responsable: 'M. KNOLL', cout: '2 500 - 4 000 €', risques: ['FR-09'] },
  { code: 'A.07', priorite: '30 jours', echeance: '< 60 jours', action: 'Formaliser un modèle de Plan de Prévention IM2S → client (le fichier .docm actuel est vide)', responsable: 'Cabinet HSE', cout: '0 € (inclus)', risques: ['FR-17'] },
  { code: 'A.08', priorite: '30 jours', echeance: '< 60 jours', action: 'Établir le tableau de bord nominatif des habilitations électriques (B0/B1V/B2V/BR/BC) avec dates de recyclage', responsable: 'Chargé d\'affaires', cout: '0 €', risques: ['FR-04','FR-05'] },
  { code: 'A.09', priorite: '30 jours', echeance: '< 60 jours', action: 'Renouveler la formation port des EPI (dernière en 2015)', responsable: 'M. KNOLL', cout: '1 200 - 2 000 €', risques: ['FR-25'] },

  // 3 MOIS
  { code: 'A.10', priorite: '3 mois', echeance: '< 90 jours', action: 'Formation Amiante SS4 (Art. R.4412-117) — 5 jours initiale pour tous techniciens', responsable: 'M. KNOLL', cout: '5 000 - 8 000 €', risques: ['FR-16'] },
  { code: 'A.11', priorite: '3 mois', echeance: '< 90 jours', action: 'Procédure systématique d\'exigence du DTA avant intervention bâti < 1997', responsable: 'Chargé d\'affaires', cout: '0 €', risques: ['FR-16'] },
  { code: 'A.12', priorite: '3 mois', echeance: '< 90 jours', action: 'Solliciter le médecin du travail pour établir la fiche d\'entreprise (Art. R.4624-46)', responsable: 'M. KNOLL', cout: '0 €', risques: ['FR-19','FR-21'] },
  { code: 'A.13', priorite: '3 mois', echeance: '< 90 jours', action: 'Désigner et afficher le référent harcèlement (Art. L.1153-5-1 obligatoire à 11 salariés)', responsable: 'M. KNOLL', cout: '0 €', risques: ['FR-21'] },
  { code: 'A.14', priorite: '3 mois', echeance: '< 90 jours', action: 'Charte des déplacements routiers professionnels rédigée et diffusée (Reco R.471)', responsable: 'Cabinet HSE', cout: '0 €', risques: ['FR-12'] },
  { code: 'A.15', priorite: '3 mois', echeance: '< 90 jours', action: 'Audit Q18 (installations électriques) et Q19 (SSI) par organisme agréé', responsable: 'M. KNOLL', cout: '1 500 - 2 500 €', risques: ['FR-04','FR-07'] },

  // 6 MOIS
  { code: 'A.16', priorite: '6 mois', echeance: '< 180 jours', action: 'Mise en place du DATI (dispositif alarme travailleur isolé) pour interventions nocturnes/isolées', responsable: 'Chargé d\'affaires', cout: '1 500 - 3 000 €', risques: ['FR-20'] },
  { code: 'A.17', priorite: '6 mois', echeance: '< 180 jours', action: 'Exercices d\'évacuation siège (2 / an)', responsable: 'M. KNOLL', cout: '0 €', risques: ['FR-07'] },
  { code: 'A.18', priorite: '6 mois', echeance: '< 180 jours', action: 'Mesures d\'exposition vibrations main-bras pour techniciens', responsable: 'Cabinet HSE', cout: '800 - 1 200 €', risques: ['FR-11'] },
  { code: 'A.19', priorite: '6 mois', echeance: '< 180 jours', action: 'Procédure formalisée pour pose détecteurs en faux-plafond (plateforme stable)', responsable: 'Chargé d\'affaires', cout: '0 €', risques: ['FR-02','FR-10'] },

  // 12 MOIS
  { code: 'A.20', priorite: '12 mois', echeance: '< 365 jours', action: 'Revue annuelle du DUERP — édition v1.2 avec intégration de toutes les pièces P1+P2 reçues', responsable: 'Cabinet HSE', cout: '0 € (inclus)', risques: [] },
  { code: 'A.21', priorite: '12 mois', echeance: '< 365 jours', action: 'Recyclage triennal des habilitations électriques (Art. NF C 18-510 § 5.6)', responsable: 'M. KNOLL', cout: '2 000 - 3 500 €', risques: ['FR-04'] },
];

// === BIBLIOTHÈQUE DOCUMENTAIRE ===
const BIBLIOTHEQUE = [
  { categorie: 'DUERP — édition ULTIME v2.2', docs: [
    { nom: 'DUERP IM2S Édition 2026 v2.2 ULTIME (avec tableau A.1-A.10 + indicateurs de preuve)', type: 'docx', taille: '99 Ko', date: '27/05/2026', url: 'assets/docs/DUERP_IM2S_v2_2_ULTIME.docx', conservation: 'À conserver 40 ans (Art. L.4121-3-1)' },
    { nom: 'DUERP IM2S Édition 2026 v2.1 DÉFINITIVE', type: 'docx', taille: '96 Ko', date: '27/05/2026', url: 'assets/docs/DUERP_IM2S_v2_1_DEFINITIF.docx', conservation: 'Version intermédiaire archivée' },
    { nom: 'DUERP IM2S Édition 2026 v2.0 FINAL', type: 'docx', taille: '94 Ko', date: '27/05/2026', url: 'assets/docs/DUERP_IM2S_v2_0_FINAL.docx', conservation: 'Version intermédiaire archivée' },
    { nom: 'DUERP IM2S v1.1 — édition cosignée', type: 'docx', taille: '85 Ko', date: '27/05/2026', url: 'assets/docs/DUERP_IM2S_Protection_Incendie_Edition_2026_v1_1.docx', conservation: 'Version intermédiaire archivée' },
    { nom: 'DUERP — Version externe APST / Sambroni', type: 'docx', taille: '91 Ko', date: '27/05/2026', url: 'assets/docs/DUERP_Version_Externe_APST.docx', conservation: 'Version pour transmission externe' },
  ]},
  { categorie: 'Comptes rendus et analyses', docs: [
    { nom: 'CR réunion 26/03/2026 — v4 ULTIME (consolidé + tableau A.1-A.10 + indicateurs de preuve + photos)', type: 'docx', taille: '26,7 Mo', date: '27/05/2026', url: 'assets/docs/CR_Reunion_26mars_v4_ULTIME.docx', conservation: 'Pièce probante DÉFINITIVE' },
    { nom: 'CR réunion 26/03/2026 — v3 (visite pièce par pièce)', type: 'docx', taille: '12,6 Mo', date: '27/05/2026', url: 'assets/docs/CR_Reunion_26mars_v3_DEFINITIF.docx', conservation: 'Version intermédiaire' },
    { nom: 'CR réunion 26/03/2026 — v2', type: 'docx', taille: '8,4 Mo', date: '27/05/2026', url: 'assets/docs/CR_Reunion_26mars_v2.docx', conservation: 'Version intermédiaire' },
    { nom: 'Note de synthèse photographique (24 photos)', type: 'docx', taille: '74 Mo', date: '27/05/2026', url: 'assets/docs/Note_Synthese_Photos.docx', conservation: 'Pièce probante' },
    { nom: 'Mail explicatif — évolution DUE 2016 → 2026', type: 'docx', taille: '22 Ko', date: '27/05/2026', url: 'assets/docs/Mail_Evolution_DUE.docx', conservation: 'Pièce d\u2019accompagnement' },
  ]},
  { categorie: 'Pièces administratives', docs: [
    { nom: 'Courrier des pièces à obtenir — v2 (par degré d\u2019urgence P1/P2/P3)', type: 'docx', taille: '21 Ko', date: '27/05/2026', url: 'assets/docs/Courrier_Pieces_v2_par_urgence.docx', conservation: 'Pièce de travail' },
    { nom: 'Courrier des pièces à obtenir — v1', type: 'docx', taille: '20 Ko', date: '27/05/2026', url: 'assets/docs/Courrier_Pieces_A_Obtenir_IM2S_2026-05-27.docx', conservation: 'Pièce de travail (v1)' },
  ]},
  { categorie: 'Référentiels d\u2019audit', docs: [
    { nom: 'Audit Excel sectoriel BTP-SSI v1 — 397 critères', type: 'xlsx', taille: '69 Ko', date: '27/05/2026', url: 'assets/docs/Audit_BTP_SSI_IM2S_Edition_2026_v1.xlsx', conservation: 'Pièce de travail — révision annuelle' },
  ]},
  { categorie: 'Historique — DUERP antérieurs (pièces probantes 40 ans)', docs: [
    { nom: 'DU Matrice G×F — Évaluation 07/12/2015 (Riskattitude)', type: 'pdf', taille: '1,6 Mo', date: '07/12/2015', url: 'assets/docs/DU_Matrice_GF_2015.pdf', conservation: 'À conserver 40 ans' },
    { nom: 'DU Riskattitude — édition 01/02/2016 (note 14,46/20)', type: 'pdf', taille: '5,8 Mo', date: '01/02/2016', url: 'assets/docs/DU_Riskattitude_2016.pdf', conservation: 'À conserver 40 ans' },
    { nom: 'Liste des risques (export DU 2016)', type: 'pdf', taille: '202 Ko', date: '01/02/2016', url: 'assets/docs/Liste_risques_2016.pdf', conservation: 'Pièce probante' },
  ]},
  { categorie: 'Diagnostics et auto-évaluations', docs: [
    { nom: 'Diagnostic Risqapp/SecureMetrix 19/05/2026 — note 53/100', type: 'pdf', taille: '9,5 Mo', date: '19/05/2026', url: 'assets/docs/Risqapp_Diagnostic_2026.pdf', conservation: 'Pièce probante' },
  ]},
];

// === Anciennes bibliothèque (gardée pour référence)
const _OLD_BIBLIO = [
  { categorie: 'DUERP — éditions en vigueur', docs: [
    { nom: 'DUERP IM2S Édition 2026 v1.1 — version courante', type: 'docx', taille: '85 Ko', date: '27/05/2026', url: 'assets/docs/DUERP_IM2S_Protection_Incendie_Edition_2026_v1_1.docx', conservation: 'À conserver 40 ans (Art. L.4121-3-1)' },
  ]},
  { categorie: 'Pièces administratives à transmettre', docs: [
    { nom: 'Courrier des pièces à obtenir d\'IM2S — 2026-05-27', type: 'docx', taille: '20 Ko', date: '27/05/2026', url: 'assets/docs/Courrier_Pieces_A_Obtenir_IM2S_2026-05-27.docx', conservation: 'Pièce de travail' },
  ]},
  { categorie: 'Référentiels d\'audit', docs: [
    { nom: 'Audit Excel sectoriel BTP-SSI v1 — 397 critères', type: 'xlsx', taille: '69 Ko', date: '27/05/2026', url: 'assets/docs/Audit_BTP_SSI_IM2S_Edition_2026_v1.xlsx', conservation: 'Pièce de travail — révision annuelle' },
  ]},
  { categorie: 'Historique — DUERP antérieurs (pièces probantes)', docs: [
    { nom: 'DU Matrice G×F — Évaluation 07/12/2015 (Riskattitude)', type: 'pdf', taille: '1,6 Mo', date: '07/12/2015', url: 'assets/docs/DU_Matrice_GF_2015.pdf', conservation: 'À conserver 40 ans (Art. L.4121-3-1)' },
    { nom: 'DU Riskattitude — édition 01/02/2016 (note 14,46/20)', type: 'pdf', taille: '5,8 Mo', date: '01/02/2016', url: 'assets/docs/DU_Riskattitude_2016.pdf', conservation: 'À conserver 40 ans (Art. L.4121-3-1)' },
    { nom: 'Liste des risques (export DU 2016)', type: 'pdf', taille: '202 Ko', date: '01/02/2016', url: 'assets/docs/Liste_risques_2016.pdf', conservation: 'Pièce probante' },
  ]},
  { categorie: 'Diagnostics et auto-évaluations', docs: [
    { nom: 'Diagnostic Risqapp/SecureMetrix 19/05/2026 — note 53/100', type: 'pdf', taille: '9,5 Mo', date: '19/05/2026', url: 'assets/docs/Risqapp_Diagnostic_2026.pdf', conservation: 'Pièce probante' },
  ]},
];

// === INDICATEURS KPI ===
const KPIS = [
  { libelle: 'Effectif au 26/03/2026', valeur: '18', sublabel: '13 H + 5 F (dont 1 longue maladie) — vers 19', classe: '' },
  { libelle: 'Effectif moyen 2022 (ETP)', valeur: '14', sublabel: '10 ouvriers + 4 employés', classe: '' },
  { libelle: 'Note globale Risqapp 2026', valeur: '53/100', sublabel: 'Maturité modérée', classe: 'orange' },
  { libelle: 'Habilitations BS/BR', valeur: 'OK 2027', sublabel: '3 nouveaux + 1 à former rentrée', classe: '' },
  { libelle: 'SST formés', valeur: '0', sublabel: 'Objectif ≥ 2', classe: 'alert' },
  { libelle: 'Formation EPI', valeur: '2015', sublabel: 'À renouveler', classe: 'alert' },
  { libelle: 'Formation PRAP', valeur: '0', sublabel: 'Jamais réalisée', classe: 'alert' },
  { libelle: 'Note risque chimique', valeur: '87/100', sublabel: 'Bonne maturité', classe: 'green' },
  { libelle: 'Score circulations', valeur: '34/100', sublabel: 'Maturité insuffisante', classe: 'alert' },
  { libelle: 'CA 2022', valeur: '1,65 M€', sublabel: 'Bénéfice : 158 k€', classe: 'green' },
  { libelle: 'Note publique GoWork', valeur: '5/5', sublabel: 'Marque employeur', classe: 'green' },
  { libelle: 'Fiches de risque', valeur: '25', sublabel: '11 familles', classe: '' },
  { libelle: 'Actions priorisées', valeur: '21', sublabel: '4 immédiates + 5/30j + 6/3m + 6/6-12m', classe: '' },
];

// === CONTACTS / URGENCES ===
const CONTACTS = [
  { categorie: 'Urgences (24/7)', items: [
    { libelle: 'SAMU', valeur: '15' },
    { libelle: 'Pompiers (SDIS 06)', valeur: '18' },
    { libelle: 'Numéro européen d\'urgence', valeur: '112' },
    { libelle: 'Police', valeur: '17' },
    { libelle: 'Centre antipoison Marseille', valeur: '04 91 75 25 25' },
  ]},
  { categorie: 'Établissements de santé locaux', items: [
    { libelle: 'CHU Nice — Hôpital l\'Archet', valeur: '04 92 03 55 55' },
    { libelle: 'Clinique Saint-Jean (Cagnes-sur-Mer)', valeur: '04 93 73 27 00' },
    { libelle: 'CHU Pasteur 2 (Nice)', valeur: '04 92 03 77 77' },
  ]},
  { categorie: 'Autorités compétentes HSE', items: [
    { libelle: 'DREETS PACA - Inspection du travail (Nice)', valeur: '04 93 72 76 00' },
    { libelle: 'CARSAT Sud-Est - Prévention BTP', valeur: '04 91 85 85 85' },
    { libelle: 'OPPBTP Délégation PACA', valeur: '04 91 35 64 33' },
  ]},
  { categorie: 'Internes IM2S', items: [
    { libelle: 'Gérant - M. Stéphane KNOLL', valeur: '04 93 58 75 38' },
    { libelle: 'Standard IM2S', valeur: '04 93 58 75 38' },
    { libelle: 'Fax', valeur: '04 93 58 61 18' },
    { libelle: 'E-mail général', valeur: 'contact@im2s.fr' },
  ]},
  { categorie: 'Consultant HSE externe', items: [
    { libelle: 'David MUSEUR — LENAXIS/SECURE', valeur: 'david.museur@lenaxis-secure.fr' },
  ]},
];

// === EXPORT ===
window.HSE_DATA = { FICHES, FAMILLES, PLAN_ACTION, BIBLIOTHEQUE, KPIS, CONTACTS };
