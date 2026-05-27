// ==========================================================================
// PLATEFORME HSE IM2S — APPLICATION JS
// Navigation SPA, audit interactif (localStorage), rendu dynamique
// ==========================================================================

(function() {
  'use strict';

  const { FICHES, FAMILLES, PLAN_ACTION, BIBLIOTHEQUE, KPIS, CONTACTS } = window.HSE_DATA;
  const STORAGE_KEY = 'im2s_hse_audit_v1';

  // ============================================================
  // NAVIGATION SPA
  // ============================================================
  function navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const target = document.getElementById('section-' + sectionId);
    const link = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
    if (target) target.classList.add('active');
    if (link) link.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Mobile : fermer le menu
    if (window.innerWidth < 900) {
      document.querySelector('.sidebar').style.display = 'none';
    }
    history.replaceState(null, '', '#' + sectionId);
  }

  function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        navigateTo(item.dataset.section);
      });
    });

    // Charger section depuis hash URL
    const hash = window.location.hash.replace('#', '');
    navigateTo(hash || 'accueil');

    // Toggle menu mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const sb = document.querySelector('.sidebar');
        sb.style.display = sb.style.display === 'block' ? 'none' : 'block';
      });
    }
  }

  // ============================================================
  // KPI CARDS (accueil)
  // ============================================================
  function renderKPI() {
    const grid = document.getElementById('kpi-grid');
    if (!grid) return;
    grid.innerHTML = KPIS.map(k => `
      <div class="kpi-card ${k.classe || ''}">
        <div class="label">${k.libelle}</div>
        <div class="value">${k.valeur}</div>
        <div class="sublabel">${k.sublabel}</div>
      </div>
    `).join('');
  }

  // ============================================================
  // FICHES DE RISQUE (cartographie)
  // ============================================================
  function renderRisques() {
    const root = document.getElementById('risques-content');
    if (!root) return;
    // Grouper par famille
    let html = '';
    for (const fam of FAMILLES) {
      const fiches = FICHES.filter(f => f.famille === fam.code);
      if (fiches.length === 0) continue;
      html += `
        <div class="card">
          <h2 style="color: ${fam.color}; border-bottom-color: ${fam.color};">
            ${fam.code} — ${fam.nom} <span style="font-size:14px;color:#888;font-weight:400">(${fiches.length} fiches)</span>
          </h2>
          <div class="grid grid-3">
            ${fiches.map(f => `
              <div class="risk-card ${f.niveau}">
                <div class="risk-code">${f.code} · UT: ${f.ut.join(', ')}</div>
                <h4>${f.titre}</h4>
                <p style="font-size:12px;color:#555;line-height:1.4;">${f.description}</p>
                <div class="risk-meta">
                  <span class="badge badge-${f.niveau === 'critical' ? 'critical' : f.niveau === 'high' ? 'high' : f.niveau === 'medium' ? 'medium' : 'low'}">
                    ${f.niveau === 'critical' ? 'CRITIQUE' : f.niveau === 'high' ? 'ÉLEVÉ' : f.niveau === 'medium' ? 'MODÉRÉ' : 'FAIBLE'}
                  </span>
                  &nbsp;G=${f.gravite}/4 · F=${f.frequence}/4
                </div>
                <div style="margin-top:10px;font-size:12px;line-height:1.5;">
                  <strong style="color:${fam.color};">Mesures :</strong> ${f.mesures}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    root.innerHTML = html;
  }

  // ============================================================
  // PLAN D'ACTION
  // ============================================================
  function renderPlanAction() {
    const root = document.getElementById('plan-content');
    if (!root) return;
    const priorites = ['IMMÉDIAT', '30 jours', '3 mois', '6 mois', '12 mois'];
    const priColors = { 'IMMÉDIAT': 'critical', '30 jours': 'high', '3 mois': 'medium', '6 mois': 'info', '12 mois': 'gray' };

    let html = '<div class="alert info"><div class="alert-title">📊 Plan d\'action priorisé</div>21 actions issues du DUERP v1.1, regroupées par échéance. Toutes les actions IMMÉDIAT doivent être engagées dans les 7 jours.</div>';

    for (const prio of priorites) {
      const actions = PLAN_ACTION.filter(a => a.priorite === prio);
      if (actions.length === 0) continue;
      html += `
        <div class="card">
          <h2><span class="badge badge-${priColors[prio]}">${prio}</span> &nbsp; ${actions.length} action${actions.length > 1 ? 's' : ''}</h2>
          <div class="table-wrap" style="box-shadow:none;">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Action</th>
                  <th>Échéance</th>
                  <th>Responsable</th>
                  <th>Coût</th>
                  <th>Risques liés</th>
                </tr>
              </thead>
              <tbody>
                ${actions.map(a => `
                  <tr>
                    <td><strong>${a.code}</strong></td>
                    <td>${a.action}</td>
                    <td>${a.echeance}</td>
                    <td>${a.responsable}</td>
                    <td>${a.cout}</td>
                    <td>${a.risques.join(', ') || '—'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    root.innerHTML = html;
  }

  // ============================================================
  // BIBLIOTHÈQUE DOCUMENTAIRE
  // ============================================================
  function renderBibliotheque() {
    const root = document.getElementById('biblio-content');
    if (!root) return;
    const iconType = { pdf: '📄', docx: '📝', xlsx: '📊' };
    let html = `
      <div class="alert info">
        <div class="alert-title">📁 Bibliothèque documentaire HSE</div>
        Tous les documents ci-dessous sont téléchargeables. Les pièces marquées « 40 ans » doivent être conservées au titre de l'Art. L.4121-3-1 du Code du travail.
      </div>
    `;
    for (const cat of BIBLIOTHEQUE) {
      html += `
        <div class="doc-category">
          <h3>${cat.categorie}</h3>
          <ul class="doc-list">
            ${cat.docs.map(d => `
              <li>
                <div class="doc-info">
                  <span class="doc-name">${iconType[d.type] || '📄'} ${d.nom}</span>
                  <span class="doc-meta">${d.type.toUpperCase()} · ${d.taille} · daté ${d.date} · ${d.conservation}</span>
                </div>
                <div class="doc-actions">
                  <a href="${d.url}" class="btn btn-small" download>Télécharger</a>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    root.innerHTML = html;
  }

  // ============================================================
  // AUDIT INTERACTIF (questions issues du Risqapp / brief Excel)
  // ============================================================
  const AUDIT_QUESTIONS = [
    { cat: 'A. Hauteur', items: [
      { code: 'A.1', q: 'CACES R.486 nacelles PEMP en cours de validité pour tous les utilisateurs ?' },
      { code: 'A.2', q: 'Autorisation de conduite délivrée par l\'employeur (distincte du CACES) ?' },
      { code: 'A.3', q: 'Harnais individuels avec vérification annuelle (date sur registre) ?' },
      { code: 'A.4', q: 'Protections collectives temporaires systématiques (filets, garde-corps) ?' },
      { code: 'A.5', q: 'DTA exigé du client avant intervention sur bâtiment < 1997 ?' },
    ]},
    { cat: 'B. Électricité', items: [
      { code: 'B.1', q: 'Tableau de bord nominatif des habilitations NF C 18-510 à jour ?' },
      { code: 'B.2', q: 'Recyclage triennal documenté pour tous les habilités ?' },
      { code: 'B.3', q: 'Procédure de consignation/déconsignation formalisée (SCIVM) ?' },
      { code: 'B.4', q: 'VAT (vérificateur absence de tension) avant chaque intervention ?' },
      { code: 'B.5', q: 'Q18 — Contrôle annuel installations électriques par organisme agréé ?' },
    ]},
    { cat: 'C. Incendie', items: [
      { code: 'C.1', q: 'Permis de feu systématique pour points chauds chez le client ?' },
      { code: 'C.2', q: 'Plan d\'évacuation siège affiché à chaque niveau ?' },
      { code: 'C.3', q: 'Exercices d\'évacuation au moins 2 fois par an ?' },
      { code: 'C.4', q: 'Vérification annuelle des extincteurs par organisme APSAD R4 ?' },
      { code: 'C.5', q: 'Q19 — Contrôle annuel SSI par organisme agréé ?' },
    ]},
    { cat: 'D. Manutention & TMS', items: [
      { code: 'D.1', q: 'Formation PRAP (gestes et postures) pour tous les manutentionnaires ?' },
      { code: 'D.2', q: 'Charges > 55 kg interdites sans aide mécanique ?' },
      { code: 'D.3', q: 'Aides mécaniques (diables, sangles 2 personnes) disponibles ?' },
      { code: 'D.4', q: 'Évaluation exposition vibrations main-bras VLEP 5 m/s² ?' },
    ]},
    { cat: 'E. Risque routier', items: [
      { code: 'E.1', q: 'Charte des déplacements routiers diffusée et signée ?' },
      { code: 'E.2', q: 'Vérification annuelle des permis de conduire ?' },
      { code: 'E.3', q: 'Formation arrimage des charges dans les VUL ?' },
      { code: 'E.4', q: 'Analyse systématique des AT routiers (arbre des causes) ?' },
    ]},
    { cat: 'F. Chimique', items: [
      { code: 'F.1', q: 'Inventaire chimique exhaustif avec FDS < 5 ans ?' },
      { code: 'F.2', q: 'Stockage en local dédié ventilé avec bacs de rétention ?' },
      { code: 'F.3', q: 'EPI chimiques adaptés (gants nitrile, lunettes) ?' },
      { code: 'F.4', q: 'Douche oculaire à proximité des zones d\'utilisation ?' },
    ]},
    { cat: 'G. Amiante', items: [
      { code: 'G.1', q: 'Formation SS4 (Art. R.4412-117) pour tous les techniciens ?' },
      { code: 'G.2', q: 'Recyclage SS4 tous les 3 ans ?' },
      { code: 'G.3', q: 'Refus chantier si DTA absent (bâti < 1997) ?' },
      { code: 'G.4', q: 'Mode opératoire SS4 documenté par chantier ?' },
    ]},
    { cat: 'H. Co-activité', items: [
      { code: 'H.1', q: 'Plan de prévention IM2S → client formalisé (modèle) ?' },
      { code: 'H.2', q: 'Inspection commune préalable systématique avec le client ?' },
      { code: 'H.3', q: 'Carte BTP (CIBTP) pour tous les salariés intervenant sur chantier ?' },
      { code: 'H.4', q: 'Vérification sous-traitants (cartes BTP, RC, attestations sociales) ?' },
    ]},
    { cat: 'I. RPS', items: [
      { code: 'I.1', q: 'RPS évalués dans le DUERP ?' },
      { code: 'I.2', q: 'Référent harcèlement désigné et affiché (Art. L.1153-5-1) ?' },
      { code: 'I.3', q: 'Cadre des astreintes formalisé (rotation, indemnités) ?' },
      { code: 'I.4', q: 'Cahier de doléances ouvert aux salariés ?' },
    ]},
    { cat: 'J. Ambiances', items: [
      { code: 'J.1', q: 'Mesures de bruit aux postes à risque (triennales) ?' },
      { code: 'J.2', q: 'Bouchons d\'oreilles à disposition pour > 80 dB(A) ?' },
      { code: 'J.3', q: 'Adaptation horaires en cas de canicule ?' },
    ]},
    { cat: 'K. Organisation', items: [
      { code: 'K.1', q: 'DUERP transcrit et mis à jour annuellement ?' },
      { code: 'K.2', q: 'Au moins 2 SST formés et en cours de validité ?' },
      { code: 'K.3', q: 'Accueil sécurité formalisé pour les nouveaux arrivants ?' },
      { code: 'K.4', q: 'Causeries sécurité ≥ 6 par an ?' },
      { code: 'K.5', q: 'Fiche d\'entreprise établie par le médecin du travail ?' },
    ]},
  ];

  function loadAudit() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch { return {}; }
  }

  function saveAudit(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function renderAudit() {
    const root = document.getElementById('audit-content');
    if (!root) return;
    const reponses = loadAudit();
    const totalQ = AUDIT_QUESTIONS.reduce((s, c) => s + c.items.length, 0);
    const repondues = Object.keys(reponses).length;
    const oui = Object.values(reponses).filter(v => v === 'yes').length;
    const non = Object.values(reponses).filter(v => v === 'no').length;
    const nr = Object.values(reponses).filter(v => v === 'nr').length;
    const pct = totalQ > 0 ? Math.round((repondues / totalQ) * 100) : 0;
    const score = (oui + non) > 0 ? Math.round((oui / (oui + non)) * 100) : 0;

    let html = `
      <div class="alert info">
        <div class="alert-title">🎯 Audit HSE interactif</div>
        Réponses sauvegardées automatiquement dans votre navigateur (localStorage). Cliquez sur l'une des options pour chaque question. Score recalculé en temps réel. Bouton « Réinitialiser » en bas pour effacer.
      </div>

      <div class="grid grid-4 mb-2">
        <div class="kpi-card"><div class="label">Questions</div><div class="value">${totalQ}</div><div class="sublabel">au total</div></div>
        <div class="kpi-card ${pct < 50 ? 'orange' : pct < 80 ? 'orange' : 'green'}"><div class="label">Répondues</div><div class="value">${pct}%</div><div class="sublabel">${repondues}/${totalQ}</div></div>
        <div class="kpi-card ${score < 50 ? 'alert' : score < 75 ? 'orange' : 'green'}"><div class="label">Score conformité</div><div class="value">${score}%</div><div class="sublabel">${oui} Oui / ${non} Non</div></div>
        <div class="kpi-card"><div class="label">Non renseigné</div><div class="value">${nr}</div><div class="sublabel">à compléter</div></div>
      </div>

      <div class="card">
        <h3>Progression</h3>
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        <p style="font-size:13px;color:#555;">${repondues} question(s) répondue(s) sur ${totalQ}</p>
      </div>
    `;

    for (const cat of AUDIT_QUESTIONS) {
      const catOui = cat.items.filter(i => reponses[i.code] === 'yes').length;
      const catNon = cat.items.filter(i => reponses[i.code] === 'no').length;
      const catScore = (catOui + catNon) > 0 ? Math.round((catOui / (catOui + catNon)) * 100) : 0;
      html += `
        <div class="card">
          <h2>${cat.cat} <span style="font-size:14px;font-weight:400;color:#888;">— ${catOui}/${cat.items.length} OK · score ${catScore}%</span></h2>
          ${cat.items.map(item => {
            const r = reponses[item.code];
            const cls = r === 'yes' ? 'answered-yes' : r === 'no' ? 'answered-no' : r === 'nr' ? 'answered-nr' : '';
            return `
              <div class="audit-question ${cls}" data-code="${item.code}">
                <div class="q-code">${item.code}</div>
                <div class="q-text">${item.q}</div>
                <div class="audit-options">
                  <button class="opt-btn ${r === 'yes' ? 'selected' : ''}" data-r="yes" data-code="${item.code}">✓ Oui (conforme)</button>
                  <button class="opt-btn ${r === 'no' ? 'selected' : ''}" data-r="no" data-code="${item.code}">✗ Non (non-conforme)</button>
                  <button class="opt-btn ${r === 'nr' ? 'selected' : ''}" data-r="nr" data-code="${item.code}">? Non renseigné</button>
                  <button class="opt-btn ${r === 'so' ? 'selected' : ''}" data-r="so" data-code="${item.code}">— Sans objet</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    html += `
      <div class="card text-center">
        <button class="btn btn-outline" id="audit-export">📥 Exporter en JSON</button>
        &nbsp;
        <button class="btn btn-gray" id="audit-reset">🗑 Réinitialiser l'audit</button>
      </div>
    `;
    root.innerHTML = html;

    // Bind events
    root.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const code = e.target.dataset.code;
        const r = e.target.dataset.r;
        const data = loadAudit();
        if (data[code] === r) delete data[code];
        else data[code] = r;
        saveAudit(data);
        renderAudit();
      });
    });

    const resetBtn = document.getElementById('audit-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      if (confirm('Effacer toutes les réponses ? Cette action est irréversible.')) {
        localStorage.removeItem(STORAGE_KEY);
        renderAudit();
      }
    });

    const exportBtn = document.getElementById('audit-export');
    if (exportBtn) exportBtn.addEventListener('click', () => {
      const data = loadAudit();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_hse_im2s_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // ============================================================
  // CONTACTS
  // ============================================================
  function renderContacts() {
    const root = document.getElementById('contacts-content');
    if (!root) return;
    let html = '<div class="alert warning"><div class="alert-title">⚠️ Numéros d\'urgence à connaître par cœur</div>Affichage obligatoire dans tous les locaux IM2S — Art. D.4711-1 du Code du travail.</div>';
    for (const cat of CONTACTS) {
      html += `
        <div class="card">
          <h2>${cat.categorie}</h2>
          <div class="table-wrap" style="box-shadow:none;">
            <table>
              <tbody>
                ${cat.items.map(it => `
                  <tr>
                    <td style="width:60%;"><strong>${it.libelle}</strong></td>
                    <td><a href="${it.valeur.includes('@') ? 'mailto:' : 'tel:'}${it.valeur.replace(/\s/g,'')}" style="color:#A00D1A;text-decoration:none;font-weight:600;">${it.valeur}</a></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    root.innerHTML = html;
  }

  // ============================================================
  // CHANTIERS
  // ============================================================
  function renderChantiers() {
    const root = document.getElementById('chantiers-content');
    if (!root) return;
    root.innerHTML = `
      <div class="alert info">
        <div class="alert-title">🏗 Carnet de chantiers + cartographie</div>
        Cette section liste les chantiers en cours et leur géolocalisation. À enrichir au fil des interventions par le chargé d'affaires.
      </div>

      <div class="card">
        <h2>Localisation du siège IM2S</h2>
        <div class="map-container">
          <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=7.165%2C43.685%2C7.205%2C43.735&amp;layer=mapnik&amp;marker=43.710%2C7.185" allowfullscreen></iframe>
        </div>
        <p style="font-size:13px;color:#666;margin-top:8px;">
          <strong>Astrae Center</strong> — 235 Allée Hector Pintus, 06610 La Gaude — coordonnées approx. 43.71°N, 7.18°E
        </p>
      </div>

      <div class="card">
        <h2>Carnet de chantiers (à compléter)</h2>
        <div class="table-wrap" style="box-shadow:none;">
          <table>
            <thead>
              <tr>
                <th>Référence</th><th>Client</th><th>Adresse</th><th>Type</th><th>Statut</th><th>Bâti < 1997 ?</th><th>DTA reçu ?</th><th>Plan de prévention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>CH-2026-001</strong></td>
                <td>SERIGRAPHIE MODERNE SAS</td>
                <td>La Trinité (06)</td>
                <td>Désenfumage naturel (voûtes Arcadef GD)</td>
                <td><span class="badge badge-medium">En cours</span></td>
                <td><span class="badge badge-high">À vérifier</span></td>
                <td><span class="badge badge-info">Demandé</span></td>
                <td>À signer</td>
              </tr>
              <tr>
                <td colspan="8" style="text-align:center;color:#888;font-style:italic;">Ajouter d'autres chantiers manuellement…</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2>Géographie d'intervention IM2S</h2>
        <p>Zone principale : <strong>Région PACA</strong> — prédominance Alpes-Maritimes (06).</p>
        <ul>
          <li>Axes routiers structurants : Autoroute A8 (congestion chronique), M6202 (vallée du Var).</li>
          <li>SDIS 06 le plus proche : Cagnes-sur-Mer / Vence (~10 km).</li>
          <li>Hôpital de référence : CHU Nice — Hôpital l'Archet (~15 km).</li>
        </ul>
      </div>
    `;
  }

  // ============================================================
  // HABILITATIONS
  // ============================================================
  function renderHabilitations() {
    const root = document.getElementById('habilitations-content');
    if (!root) return;
    root.innerHTML = `
      <div class="alert warning">
        <div class="alert-title">⚠️ Tableau de bord nominatif des habilitations</div>
        À compléter par le chargé d'affaires avec les informations de chaque salarié. Vérification trimestrielle des dates de recyclage. CR du 19/01/2026 : 3 salariés sur 9 sans habilitation électrique = risque critique à régulariser sous 30 jours.
      </div>

      <div class="card">
        <h2>Habilitations électriques NF C 18-510</h2>
        <div class="table-wrap" style="box-shadow:none;">
          <table>
            <thead>
              <tr>
                <th>Salarié</th><th>UT</th><th>Habilitation</th><th>Date délivrance</th><th>Date recyclage</th><th>Statut</th><th>Organisme</th>
              </tr>
            </thead>
            <tbody>
              <tr><td colspan="7" style="text-align:center;color:#888;font-style:italic;padding:20px;">À renseigner — voir Courrier P1 (pièces à obtenir) point I.2</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2>CACES R.486 — Nacelles PEMP</h2>
        <div class="table-wrap" style="box-shadow:none;">
          <table>
            <thead>
              <tr><th>Salarié</th><th>UT</th><th>Catégorie</th><th>Date délivrance</th><th>Date expiration (5 ans)</th><th>Autorisation conduite</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="6" style="text-align:center;color:#888;font-style:italic;padding:20px;">À renseigner</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2>Formations SST, PRAP, Amiante SS4</h2>
        <div class="table-wrap" style="box-shadow:none;">
          <table>
            <thead>
              <tr><th>Salarié</th><th>SST (validité 24 mois)</th><th>PRAP</th><th>Amiante SS4 (recyclage 3 ans)</th><th>Carte BTP</th></tr>
            </thead>
            <tbody>
              <tr><td colspan="5" style="text-align:center;color:#888;font-style:italic;padding:20px;">À renseigner</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2>Légende statuts</h2>
        <p>
          <span class="badge badge-low">À jour</span> Validité > 3 mois&nbsp;&nbsp;
          <span class="badge badge-medium">Échéance proche</span> Validité < 3 mois&nbsp;&nbsp;
          <span class="badge badge-high">Expiré</span> À renouveler immédiatement&nbsp;&nbsp;
          <span class="badge badge-critical">Inexistant</span> Risque opérationnel
        </p>
      </div>
    `;
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderKPI();
    renderRisques();
    renderPlanAction();
    renderBibliotheque();
    renderAudit();
    renderContacts();
    renderChantiers();
    renderHabilitations();
  });
})();
