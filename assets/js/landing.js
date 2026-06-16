/* ============================================
   SLIPSTREAM · Landing — interacciones
   ============================================ */
(function () {
  'use strict';

  /* --- Nav scroll state --- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal on scroll --- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), (i % 4) * 70);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* --- Contadores del hero --- */
  function animateCount(el) {
    const target = +el.dataset.count;
    const suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
    let cur = 0;
    const step = Math.max(1, Math.round(target / 38));
    const tick = () => {
      cur = Math.min(target, cur + step);
      el.firstChild.textContent = cur;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  }
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

  /* --- Toast --- */
  function toast({ title, text, icon = '✅' }) {
    const wrap = document.getElementById('toast-wrap');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="ti">${icon}</span><div><div class="tt">${title}</div><div class="tx">${text}</div></div>`;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 4200);
  }

  /* --- Formulario → crea lead + automatización --- */
  const form = document.getElementById('lead-form');
  const overlay = document.getElementById('auto-overlay');
  const steps = [...document.querySelectorAll('.auto-step')];

  function runAutomation() {
    overlay.classList.add('show');
    steps.forEach(s => s.classList.remove('active', 'done'));
    let i = 0;
    const next = () => {
      if (i > 0) steps[i - 1].classList.add('done');
      if (i < steps.length) {
        steps[i].classList.add('active');
        i++;
        setTimeout(next, 720);
      } else {
        toast({ icon: '✅', title: 'Solicitud registrada', text: 'Te contactaremos en menos de 24 h.' });
      }
    };
    setTimeout(next, 350);
  }

  if (form) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const payload = {
        name:    fd.get('name')    || 'Cliente demo',
        phone:   fd.get('phone')   || '—',
        shop:    fd.get('shop')    || '',
        vehicle: fd.get('vehicle') || '—',
        service: fd.get('service') || 'Consulta',
        detail:  fd.get('message') || 'Solicitud de información desde la web.',
        source:  'Web',
      };

      // Guardar en localStorage siempre (CRM demo local)
      window.Slipstream.add({ ...payload, value: 0 });

      // Si hay webhook configurado, enviar también a n8n (modo real)
      const url = window.SITE_CONFIG?.webhookUrl;
      if (url) {
        try {
          await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } catch (e) {
          console.warn('[Slipstream] Webhook no disponible, datos guardados solo en local.', e);
        }
      }

      form.reset();
      runAutomation();
    });
  }

  document.getElementById('auto-close')?.addEventListener('click', () => overlay.classList.remove('show'));
  overlay?.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('show'); });

  /* --- Nav móvil --- */
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
  });
})();
