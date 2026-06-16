/* ============================================
   SLIPSTREAM · Aplica config.js a la página
   No editar — la marca se cambia en config.js
   ============================================ */
(function () {
  'use strict';
  const C = window.SITE_CONFIG;
  if (!C) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // --- Color de acento ---
  if (C.accentColor) document.documentElement.style.setProperty('--c-red', C.accentColor);

  // --- Título de pestaña ---
  if (document.title.includes('RaceLab') || document.title.includes('Slipstream CRM')) {
    document.title = document.title.includes('CRM')
      ? `${C.shopName} · CRM`
      : `${C.shopName} · Preparación, electrónica y homologación`;
  }

  // --- Logo (todas las apariciones .brand) ---
  $$('.brand').forEach(b => {
    const mark = b.querySelector('.mark');
    b.innerHTML = '';
    if (mark) b.appendChild(mark);
    else { const m = document.createElement('span'); m.className = 'mark'; b.appendChild(m); }
    b.appendChild(document.createTextNode(C.brandPrefix));
    const sfx = document.createElement('span'); sfx.textContent = C.brandSuffix;
    b.appendChild(sfx);
  });

  // --- Sidebar del CRM ---
  const nm = $('.side-foot .nm'); if (nm) nm.textContent = C.shopName;
  const rl = $('.side-foot .rl'); if (rl) rl.textContent = C.tagline;

  // --- Teléfono ---
  $$('a[href^="tel:"]').forEach(a => { a.href = 'tel:' + C.phoneHref; a.textContent = '📞 ' + C.phone; });

  // --- Hero ---
  const h1 = $('.hero h1');
  if (h1) h1.innerHTML = `${C.heroTitleLine1}<br /><span class="accent">${C.heroTitleLine2}</span>`;
  const sub = $('.hero-sub'); if (sub) sub.textContent = C.heroSubtitle;
  const ctaP = $('.hero-actions .btn-primary'); if (ctaP) ctaP.textContent = C.ctaPrimary;
  const ctaS = $('.hero-actions .btn-ghost'); if (ctaS) ctaS.innerHTML = C.ctaSecondary + ' →';

  // --- Stats del hero ---
  const statEls = $$('.hero-stats .stat');
  C.stats.forEach((s, i) => {
    const el = statEls[i]; if (!el) return;
    el.querySelector('.num').setAttribute('data-count', s.count);
    el.querySelector('.num').innerHTML = `0<span>${s.suffix}</span>`;
    el.querySelector('.lbl').textContent = s.label;
  });

  // --- Servicios ---
  const servicesGrid = $('#cfg-services');
  if (servicesGrid) {
    servicesGrid.innerHTML = C.services.map(s =>
      `<div class="case reveal in"><div class="ic">${s.ic}</div><h3>${s.title}</h3><p>${s.desc}</p><span class="tag">${s.tag}</span></div>`
    ).join('');
  }

  // --- Por qué nosotros ---
  const whyGrid = $('#cfg-why');
  if (whyGrid) {
    whyGrid.innerHTML = C.whyUs.map(w =>
      `<div class="benefit reveal in"><div class="ic">${w.ic}</div><div><h3>${w.title}</h3><p>${w.desc}</p></div></div>`
    ).join('');
  }
  const whyEyebrow = $('#cfg-why-eyebrow'); if (whyEyebrow) whyEyebrow.textContent = `Por qué ${C.brandPrefix}${C.brandSuffix}`;

  // --- Proyectos ---
  const projGrid = $('#cfg-projects');
  if (projGrid) {
    projGrid.innerHTML = C.projects.map(p =>
      `<div class="case reveal in"><div class="ic">${p.ic}</div><h3>${p.title}</h3><p>${p.desc}</p><span class="tag">${p.tag}</span></div>`
    ).join('');
  }

  // --- Select de servicio en el formulario ---
  const serviceSelect = $('select[name="service"]');
  if (serviceSelect) serviceSelect.innerHTML = C.services.map(s => `<option>${s.title}</option>`).join('');

  // --- Confirmación tras enviar el formulario ---
  const confirmText = $('#cfg-confirm-text');
  if (confirmText) confirmText.textContent = `Gracias por confiar en ${C.brandPrefix}${C.brandSuffix}. Hemos recibido los datos de tu proyecto y te contactaremos en menos de 24 horas.`;

  // --- Footer ---
  const footP = $('.footer .footer-grid > div > p');
  if (footP) footP.textContent = 'Taller especializado en preparación, electrónica a medida, homologaciones y fabricación de escapes.';
  const footBot = $('#cfg-footer-bottom');
  if (footBot) footBot.innerHTML = `© 2026 ${C.shopName}. ${C.address}.`;
  const footNote = $('#cfg-footer-note');
  if (footNote) footNote.innerHTML = `${C.footerNote} <strong style="color:var(--c-red)">Slipstream</strong> · <a href="app.html" style="color:var(--c-text-dim)">Acceso taller</a>`;
})();
