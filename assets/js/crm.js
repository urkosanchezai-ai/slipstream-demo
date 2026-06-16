/* ============================================
   SLIPSTREAM · CRM — lógica
   ============================================ */
(function () {
  'use strict';
  const S = window.Slipstream;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const eur = n => '€' + (n || 0).toLocaleString('es-ES');
  const stageOf = id => S.STAGES.find(s => s.id === id);

  let search = '';

  /* ---------- Toast ---------- */
  function toast({ title, text, icon = '✅' }) {
    const wrap = $('#toast-wrap');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="ti">${icon}</span><div><div class="tt">${title}</div><div class="tx">${text}</div></div>`;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 4000);
  }

  /* ---------- Navegación de vistas ---------- */
  const titles = { dashboard: 'Dashboard', pipeline: 'Pipeline', clientes: 'Clientes', automatizacion: 'Automatización' };
  function showView(v) {
    $$('.view').forEach(el => el.hidden = el.id !== 'view-' + v);
    $$('#side-nav a').forEach(a => a.classList.toggle('active', a.dataset.view === v));
    $('#view-title').textContent = titles[v];
    const mv = $('#mobile-view'); if (mv) mv.value = v;
    if (v === 'dashboard') renderDashboard();
    if (v === 'pipeline') renderBoard();
    if (v === 'clientes') renderClients();
  }
  $('#side-nav').addEventListener('click', e => { const a = e.target.closest('a'); if (a) showView(a.dataset.view); });
  $('#mobile-view')?.addEventListener('change', e => showView(e.target.value));

  /* ---------- Dashboard ---------- */
  function renderDashboard() {
    const leads = S.all();
    const count = id => leads.filter(l => l.stage === id).length;
    const active = leads.filter(l => !['done'].includes(l.stage));
    const pipelineValue = active.reduce((s, l) => s + (l.value || 0), 0);
    const won = leads.filter(l => l.stage === 'done').reduce((s, l) => s + (l.value || 0), 0);

    $('#kpis').innerHTML = [
      { v: count('new'), l: 'Leads nuevos', ic: '🆕', d: 'Sin contactar aún', col: 'var(--c-new)' },
      { v: count('quote') + count('pending'), l: 'Presupuestos abiertos', ic: '📄', d: 'Esperando respuesta', col: 'var(--c-quote)' },
      { v: count('confirmed'), l: 'Proyectos en curso', ic: '🔧', d: 'En el taller', col: 'var(--c-confirmed)' },
      { v: eur(pipelineValue), l: 'Pipeline activo', ic: '📈', d: eur(won) + ' ya facturado', col: 'var(--c-text)' },
    ].map(k => `<div class="kpi"><span class="ic">${k.ic}</span><div class="v" style="color:${k.col}">${k.v}</div><div class="l">${k.l}</div><div class="d">${k.d}</div></div>`).join('');

    const total = leads.length || 1;
    $('#pipeline-bars').innerHTML = S.STAGES.map(st => {
      const c = count(st.id);
      return `<div class="bar-item"><div class="top"><span>${st.label}</span><span class="c">${c} lead${c !== 1 ? 's' : ''}</span></div><div class="bar-track"><div class="bar-fill" style="width:${(c / total) * 100}%;background:${st.color}"></div></div></div>`;
    }).join('');

    const feed = [];
    leads.forEach(l => (l.notes || []).forEach(n => feed.push({ name: l.name, t: n.t, x: n.x })));
    feed.sort((a, b) => b.t.localeCompare(a.t));
    $('#feed').innerHTML = feed.slice(0, 7).map(f =>
      `<div class="feed-item"><span class="fi">•</span><div><div class="ft"><strong>${f.name}</strong> — ${f.x}</div><div class="fd">${f.t}</div></div></div>`
    ).join('') || '<p style="color:var(--c-text-dim)">Sin actividad.</p>';
  }

  /* ---------- Card HTML ---------- */
  function cardHTML(l) {
    const temp = S.TEMPS[l.temperature] || S.TEMPS.frio;
    return `<div class="card prio-${l.priority || 'baja'}" draggable="true" data-id="${l.id}">
      <div class="c-top"><span class="c-name">${temp.ic} ${l.name}</span>${l.value ? `<span class="c-val">${eur(l.value)}</span>` : ''}</div>
      <div class="c-veh">${l.vehicle}</div>
      <div class="c-foot"><span class="c-serv">${l.service}</span><span class="c-src">${l.source}</span></div>
    </div>`;
  }

  /* ---------- Kanban ---------- */
  function renderBoard() {
    const leads = filtered(S.all());
    $('#board').innerHTML = S.STAGES.map(st => {
      const cards = leads.filter(l => l.stage === st.id);
      return `<div class="column"><div class="col-head"><span class="ct"><span class="dot" style="background:${st.color}"></span>${st.label}</span><span class="count">${cards.length}</span></div>
        <div class="col-body" data-stage="${st.id}">${cards.map(cardHTML).join('')}</div></div>`;
    }).join('');
    bindDnD();
    bindCardClicks();
  }

  function bindCardClicks() {
    $$('.card').forEach(c => c.addEventListener('click', () => { if (!c.classList.contains('dragging')) openDrawer(c.dataset.id); }));
  }

  /* ---------- Drag & Drop ---------- */
  let dragId = null;
  function bindDnD() {
    $$('.card').forEach(card => {
      card.addEventListener('dragstart', () => { dragId = card.dataset.id; card.classList.add('dragging'); });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
    });
    $$('.col-body').forEach(col => {
      col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
      col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
      col.addEventListener('drop', e => {
        e.preventDefault(); col.classList.remove('drag-over');
        const stage = col.dataset.stage;
        if (dragId) {
          const lead = S.all().find(l => l.id === dragId);
          if (lead && lead.stage !== stage) {
            S.setStage(dragId, stage);
            addNote(dragId, `Movido a "${stageOf(stage).label}".`);
            toast({ icon: '🔄', title: 'Lead actualizado', text: `${lead.name} → ${stageOf(stage).label}` });
          }
          renderBoard();
        }
        dragId = null;
      });
    });
  }

  function addNote(id, text) {
    const lead = S.all().find(l => l.id === id);
    const notes = lead.notes || [];
    notes.unshift({ t: new Date().toISOString().slice(0, 16).replace('T', ' '), x: text });
    S.update(id, { notes });
  }

  /* ---------- Clientes (tabla) ---------- */
  function renderClients() {
    const leads = filtered(S.all());
    $('#client-rows').innerHTML = leads.map(l => {
      const st = stageOf(l.stage);
      const temp = S.TEMPS[l.temperature] || S.TEMPS.frio;
      return `<tr data-id="${l.id}">
        <td><strong>${l.name}</strong><br><span style="color:var(--c-text-dim);font-size:0.8rem">${l.phone}</span></td>
        <td>${l.vehicle}</td>
        <td>${l.service}</td>
        <td>${temp.ic} ${temp.label}</td>
        <td><span class="pill"><span class="dot" style="background:${st.color}"></span>${st.label}</span></td>
        <td>${l.value ? eur(l.value) : '—'}</td>
        <td>${l.source}</td>
      </tr>`;
    }).join('');
    $$('#client-rows tr').forEach(r => r.addEventListener('click', () => openDrawer(r.dataset.id)));
  }

  function filtered(leads) {
    if (!search) return leads;
    const q = search.toLowerCase();
    return leads.filter(l => (l.name + l.vehicle + l.service).toLowerCase().includes(q));
  }

  /* ---------- Drawer detalle ---------- */
  function openDrawer(id) {
    const l = S.all().find(x => x.id === id);
    if (!l) return;
    $('#d-name').textContent = l.name;
    $('#d-veh').textContent = l.vehicle + (l.shop ? ' · ' + l.shop : '');
    $('#drawer-body').innerHTML = `
      <div class="d-section">
        <h4>Estado</h4>
        <select class="d-stage-select" id="d-stage">
          ${S.STAGES.map(s => `<option value="${s.id}" ${s.id === l.stage ? 'selected' : ''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="d-section">
        <h4>Datos</h4>
        <div class="d-grid">
          <div class="d-field"><div class="k">Teléfono</div><div class="v">${l.phone}</div></div>
          <div class="d-field"><div class="k">Servicio</div><div class="v">${l.service}</div></div>
          <div class="d-field"><div class="k">Valor estimado</div><div class="v">${l.value ? eur(l.value) : '—'}</div></div>
          <div class="d-field"><div class="k">Origen</div><div class="v">${l.source}</div></div>
          <div class="d-field"><div class="k">Temperatura</div><div class="v">${(S.TEMPS[l.temperature] || S.TEMPS.frio).ic} ${(S.TEMPS[l.temperature] || S.TEMPS.frio).label}</div></div>
          <div class="d-field"><div class="k">Prioridad</div><div class="v" style="text-transform:capitalize">${l.priority || '—'}</div></div>
          <div class="d-field"><div class="k">Fecha entrada</div><div class="v">${l.date}</div></div>
        </div>
      </div>
      <div class="d-section">
        <h4>Detalle de la solicitud</h4>
        <div class="d-detail">${l.detail || 'Sin detalles.'}</div>
      </div>
      <div class="d-section">
        <h4>Historial</h4>
        <div class="timeline" id="d-timeline">
          ${(l.notes || []).map(n => `<div class="tl-item"><div class="tlt">${n.t}</div><div class="tlx">${n.x}</div></div>`).join('')}
        </div>
        <div class="note-add">
          <input id="d-note" placeholder="Añadir comentario…" />
          <button class="btn btn-primary btn-sm" id="d-note-add">Añadir</button>
        </div>
      </div>`;

    $('#d-stage').addEventListener('change', e => {
      S.setStage(id, e.target.value);
      addNote(id, `Estado cambiado a "${stageOf(e.target.value).label}".`);
      toast({ icon: '🔄', title: 'Estado actualizado', text: `${l.name} → ${stageOf(e.target.value).label}` });
      refreshCurrent();
      openDrawer(id);
    });
    $('#d-note-add').addEventListener('click', () => {
      const val = $('#d-note').value.trim();
      if (!val) return;
      addNote(id, val);
      openDrawer(id);
      refreshCurrent();
    });
    $('#d-note').addEventListener('keydown', e => { if (e.key === 'Enter') $('#d-note-add').click(); });

    $('#drawer').classList.add('show');
    $('#drawer-bg').classList.add('show');
  }
  function closeDrawer() { $('#drawer').classList.remove('show'); $('#drawer-bg').classList.remove('show'); }
  $('#d-close').addEventListener('click', closeDrawer);
  $('#drawer-bg').addEventListener('click', closeDrawer);

  function refreshCurrent() {
    const active = $$('.view').find(v => !v.hidden);
    if (!active) return;
    if (active.id === 'view-dashboard') renderDashboard();
    if (active.id === 'view-pipeline') renderBoard();
    if (active.id === 'view-clientes') renderClients();
  }

  /* ---------- Nuevo lead manual ---------- */
  $('#new-lead-btn').addEventListener('click', () => {
    const name = prompt('Nombre del cliente:');
    if (!name) return;
    const vehicle = prompt('Vehículo:') || '—';
    const service = prompt('Servicio (Preparación, Electrónica, Homologación, Escape, Reprogramación, Swap):') || 'Consulta';
    const lead = S.add({ name, vehicle, service, source: 'Manual', detail: 'Lead añadido manualmente desde el CRM.' });
    toast({ icon: '➕', title: 'Lead creado', text: `${name} añadido a "Nuevo Lead".` });
    showView('pipeline');
    setTimeout(() => { const c = $(`.card[data-id="${lead.id}"]`); if (c) c.classList.add('new-pop'); }, 50);
  });

  /* ---------- Buscador ---------- */
  $('#search').addEventListener('input', e => { search = e.target.value; refreshCurrent(); });

  /* ---------- Reset ---------- */
  $('#reset-data').addEventListener('click', () => {
    if (confirm('¿Reiniciar los datos de la demo a su estado original?')) {
      S.reset(); search = ''; $('#search').value = ''; showView('dashboard');
      toast({ icon: '↻', title: 'Datos reiniciados', text: 'La demo vuelve a su estado original.' });
    }
  });

  /* ---------- Simulación automatización ---------- */
  $('#sim-auto')?.addEventListener('click', () => {
    const steps = $$('#auto-steps-app .auto-step');
    steps.forEach(s => s.classList.remove('active', 'done'));
    let i = 0;
    const next = () => {
      if (i > 0) steps[i - 1].classList.add('done');
      if (i < steps.length) { steps[i].classList.add('active'); i++; setTimeout(next, 720); }
      else {
        const names = ['Jordi · Clio RS', 'Aitor · WRX STI', 'Berta · Mini JCW'];
        const pick = names[Math.floor(Math.random() * names.length)];
        const [n, v] = pick.split(' · ');
        S.add({ name: n, vehicle: v, service: 'Reprogramación', source: 'Web', detail: 'Lead generado por la simulación de automatización.', value: 600 });
        toast({ icon: '🔔', title: 'Nuevo lead recibido', text: `${pick} entró en el CRM automáticamente.` });
      }
    };
    setTimeout(next, 300);
  });

  /* ---------- Init ---------- */
  if (window.SITE_CONFIG?.leadsApiUrl) {
    S.syncFromSheets(() => showView('dashboard'));
  } else {
    S.all(); // siembra con datos demo
    showView('dashboard');
  }

  // Si venimos de la landing con un lead recién creado, avisamos.
  const last = S.all()[0];
  if (last && last.source === 'Web' && last.notes?.[0]?.x?.includes('demo en vivo')) {
    const t = S.TEMPS[last.temperature] || S.TEMPS.frio;
    setTimeout(() => toast({ icon: '🎉', title: '¡Tu lead llegó!', text: `${last.name} entró clasificado como ${t.ic} ${t.label}.` }), 600);
  }
})();
