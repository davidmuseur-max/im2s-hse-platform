/* ============================================================
   PLATEFORME HSE IM2S — APPLICATION JS
   - Navigation par sections
   - Audit interactif avec localStorage
   - Filtres bibliothèque documentaire
   - Mobile burger
   ============================================================ */

(function () {
  'use strict';

  // ------------------------------------------------------------
  // NAVIGATION : highlight section active dans la sidebar
  // ------------------------------------------------------------
  function initNav() {
    const links = document.querySelectorAll('.sidebar-nav a[data-target]');
    const sections = document.querySelectorAll('section[id]');
    const crumbs = document.getElementById('crumbs-current');

    function setActive(id) {
      links.forEach(a => a.classList.toggle('active', a.dataset.target === id));
      const activeLink = document.querySelector(`.sidebar-nav a[data-target="${id}"]`);
      if (activeLink && crumbs) crumbs.textContent = activeLink.textContent.trim();
    }

    // Click handler
    links.forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.dataset.target;
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActive(id);
          history.replaceState(null, '', '#' + id);
          // Close mobile sidebar
          document.querySelector('.sidebar')?.classList.remove('open');
        }
      });
    });

    // Scroll spy
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));

    // Initial hash
    if (location.hash) {
      const id = location.hash.slice(1);
      const target = document.getElementById(id);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }), 100);
    } else if (sections.length) {
      setActive(sections[0].id);
    }
  }

  // ------------------------------------------------------------
  // MOBILE BURGER
  // ------------------------------------------------------------
  function initBurger() {
    const burger = document.getElementById('burger');
    const sidebar = document.querySelector('.sidebar');
    if (!burger || !sidebar) return;
    burger.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!sidebar.contains(e.target) && !burger.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ------------------------------------------------------------
  // AUDIT INTERACTIF avec localStorage
  // ------------------------------------------------------------
  const AUDIT_STORE_KEY = 'im2s_audit_v1';

  function loadAuditState() {
    try {
      return JSON.parse(localStorage.getItem(AUDIT_STORE_KEY) || '{}');
    } catch { return {}; }
  }

  function saveAuditState(state) {
    try { localStorage.setItem(AUDIT_STORE_KEY, JSON.stringify(state)); } catch {}
  }

  function initAudit() {
    const auditRoot = document.getElementById('audit-root');
    if (!auditRoot) return;

    const state = loadAuditState();

    // Catégories repliables
    document.querySelectorAll('.audit-cat-header').forEach(h => {
      h.addEventListener('click', () => {
        const cat = h.closest('.audit-cat');
        cat.classList.toggle('audit-cat-collapsed');
        const toggle = h.querySelector('.audit-cat-toggle');
        if (toggle) toggle.textContent = cat.classList.contains('audit-cat-collapsed') ? '+' : '−';
      });
    });

    // Choix oui/non/na/partiel
    document.querySelectorAll('.audit-q').forEach(q => {
      const qid = q.dataset.qid;
      if (!qid) return;
      // Restaurer la sélection
      if (state[qid]) {
        const btn = q.querySelector(`.audit-choice[data-val="${state[qid]}"]`);
        if (btn) btn.classList.add('sel-' + state[qid]);
      }
      q.querySelectorAll('.audit-choice').forEach(btn => {
        btn.addEventListener('click', () => {
          // Désélectionner les autres
          q.querySelectorAll('.audit-choice').forEach(b => {
            ['sel-oui','sel-non','sel-na','sel-partiel'].forEach(c => b.classList.remove(c));
          });
          // Sélectionner
          btn.classList.add('sel-' + btn.dataset.val);
          state[qid] = btn.dataset.val;
          saveAuditState(state);
          updateAuditScore();
        });
      });
    });

    updateAuditScore();

    // Bouton reset
    document.getElementById('audit-reset')?.addEventListener('click', () => {
      if (!confirm('Réinitialiser toutes les réponses ?')) return;
      localStorage.removeItem(AUDIT_STORE_KEY);
      document.querySelectorAll('.audit-choice').forEach(b => {
        ['sel-oui','sel-non','sel-na','sel-partiel'].forEach(c => b.classList.remove(c));
      });
      updateAuditScore();
    });

    // Bouton export JSON
    document.getElementById('audit-export')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(loadAuditState(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_im2s_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function updateAuditScore() {
    const state = loadAuditState();
    const total = document.querySelectorAll('.audit-q').length;
    const answered = Object.keys(state).length;
    const conformes = Object.values(state).filter(v => v === 'oui').length;
    const partiels = Object.values(state).filter(v => v === 'partiel').length;
    const na = Object.values(state).filter(v => v === 'na').length;
    const denominator = total - na;
    const score = denominator > 0
      ? Math.round(((conformes + partiels * 0.5) / denominator) * 100)
      : 0;

    const bar = document.getElementById('audit-progress-bar');
    if (bar) bar.style.width = (total ? (answered / total) * 100 : 0) + '%';

    const scoreEl = document.getElementById('audit-score');
    if (scoreEl) scoreEl.textContent = score + ' / 100';

    const stats = document.getElementById('audit-stats');
    if (stats) stats.textContent = `${answered} / ${total} répondues — ${conformes} conformes`;
  }

  // ------------------------------------------------------------
  // FILTRES BIBLIOTHÈQUE
  // ------------------------------------------------------------
  function initLibFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const docs = document.querySelectorAll('.doc');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const f = b.dataset.filter;
        docs.forEach(d => {
          d.style.display = (f === 'all' || d.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  }

  // ------------------------------------------------------------
  // INIT
  // ------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initBurger();
    initAudit();
    initLibFilters();
    // Année footer
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
