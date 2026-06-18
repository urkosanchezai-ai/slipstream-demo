/* ============================================
   SLIPSTREAM · Capa de datos (fuente de verdad)
   Persiste en localStorage para conectar
   la Landing con el CRM.
   ============================================ */

window.Slipstream = (function () {
  const KEY = 'slipstream_leads_v1';

  const STAGES = [
    { id: 'new',       label: 'Nuevo Lead',        color: 'var(--c-new)' },
    { id: 'contacted', label: 'Contactado',        color: 'var(--c-contacted)' },
    { id: 'quote',     label: 'Presupuesto Enviado',color: 'var(--c-quote)' },
    { id: 'pending',   label: 'Pendiente Respuesta',color: 'var(--c-pending)' },
    { id: 'confirmed', label: 'Proyecto Confirmado',color: 'var(--c-confirmed)' },
    { id: 'done',      label: 'Finalizado',        color: 'var(--c-done)' },
  ];

  // Misma lógica de puntuación que el nodo Code de n8n,
  // para que la demo refleje la clasificación real del lead.
  const TEMPS = {
    caliente: { ic: '🔥', label: 'Caliente' },
    templado: { ic: '🌤️', label: 'Templado' },
    frio:     { ic: '🧊', label: 'Frío' },
  };

  function calcTemperature(lead) {
    let score = 0;
    const service = lead.service || '';
    const hot = ['Swap', 'Electrónica', 'Competición'];
    const mid = ['Preparación', 'Escape', 'Reprogramación'];
    if (hot.some(s => service.includes(s))) score += 4;
    else if (mid.some(s => service.includes(s))) score += 2;
    else score += 1;

    const digits = (lead.phone || '').replace(/\D/g, '');
    if (digits.length >= 9) score += 2;

    const msg = (lead.detail || '').toLowerCase();
    const urgentWords = ['presupuesto', 'precio', 'cuanto', 'cuánto', 'fecha', 'urgente'];
    if (urgentWords.some(w => msg.includes(w))) score += 2;

    const wordCount = msg.split(/\s+/).filter(Boolean).length;
    if (wordCount > 15) score += 1;
    if (wordCount > 0 && wordCount < 5) score -= 2;

    if (score >= 6) return 'caliente';
    if (score >= 3) return 'templado';
    return 'frio';
  }

  const SEED = [
    { id: 'l1', name: 'Iván Soler', shop: '', vehicle: 'Honda Civic Type R FK8', phone: '611 204 887', service: 'Preparación Performance', detail: 'Stage 2 + admisión + downpipe. Busca ~360 cv fiables para uso mixto calle/track.', value: 2400, stage: 'new', source: 'Instagram', date: '2026-06-15', priority: 'alta', notes: [
        { t: '2026-06-15 09:12', x: 'Lead entrado vía formulario web.' } ] },
    { id: 'l2', name: 'Marc Vidal', shop: '', vehicle: 'BMW M2 G87', phone: '622 553 109', service: 'Fabricación de escape', detail: 'Escape valvulado a medida en inox 304. Quiere sonido pero homologable.', value: 1850, stage: 'new', source: 'WhatsApp', date: '2026-06-15', priority: 'media', notes: [
        { t: '2026-06-15 11:40', x: 'Pregunta por plazos de fabricación.' } ] },
    { id: 'l3', name: 'Laura Méndez', shop: '', vehicle: 'VW Golf GTI Mk7', phone: '633 871 220', service: 'Reprogramación', detail: 'Stage 1 + decat. Coche de diario.', value: 890, stage: 'quote', source: 'Web', date: '2026-06-13', priority: 'media', notes: [
        { t: '2026-06-13 10:02', x: 'Lead entrado.' }, { t: '2026-06-13 16:30', x: 'Llamada hecha, interesada.' }, { t: '2026-06-14 09:00', x: 'Presupuesto enviado: €890.' } ] },
    { id: 'l4', name: 'Adrián Costa', shop: '', vehicle: 'Subaru Impreza GD', phone: '644 309 551', service: 'Electrónica a medida', detail: 'Cableado completo + ECU standalone Haltech para motor preparado.', value: 4200, stage: 'quote', source: 'Recomendación', date: '2026-06-12', priority: 'alta', notes: [
        { t: '2026-06-12 12:15', x: 'Proyecto grande, requiere visita.' }, { t: '2026-06-13 18:00', x: 'Presupuesto detallado enviado.' } ] },
    { id: 'l5', name: 'Nuria Pérez', shop: '', vehicle: 'Audi S3 8V', phone: '655 118 743', service: 'Reprogramación', detail: 'Stage 2, ya tiene downpipe e intercooler.', value: 950, stage: 'pending', source: 'Instagram', date: '2026-06-10', priority: 'media', notes: [
        { t: '2026-06-10 09:30', x: 'Presupuesto enviado.' }, { t: '2026-06-12 11:00', x: 'Seguimiento: pendiente de confirmar fecha.' } ] },
    { id: 'l6', name: 'Dani Romero', shop: '', vehicle: 'Nissan 350Z', phone: '666 442 018', service: 'Swap / Competición', detail: 'Swap completo 2JZ-GTE. Proyecto de competición Time Attack.', value: 11500, stage: 'confirmed', source: 'Recomendación', date: '2026-06-05', priority: 'alta', notes: [
        { t: '2026-06-05 10:00', x: 'Reunión inicial.' }, { t: '2026-06-07 17:00', x: 'Presupuesto aceptado.' }, { t: '2026-06-09 09:00', x: 'Seña recibida, proyecto confirmado.' } ] },
    { id: 'l7', name: 'Carlos Ruiz', shop: '', vehicle: 'Toyota GR Yaris', phone: '677 902 334', service: 'Preparación Performance', detail: 'Pack admisión + escape + reprogramación Stage 1.', value: 2100, stage: 'confirmed', source: 'Web', date: '2026-06-06', priority: 'media', notes: [
        { t: '2026-06-06 14:00', x: 'Presupuesto aceptado.' }, { t: '2026-06-08 10:00', x: 'Cita agendada para el 20/06.' } ] },
    { id: 'l8', name: 'Sergio Lara', shop: '', vehicle: 'BMW M3 E46', phone: '688 215 660', service: 'Homologación', detail: 'Homologación de suspensión coilover y escape para ITV.', value: 650, stage: 'done', source: 'WhatsApp', date: '2026-05-28', priority: 'baja', notes: [
        { t: '2026-05-28 09:00', x: 'Documentación recibida.' }, { t: '2026-06-02 12:00', x: 'Reforma legalizada, ITV pasada. Cerrado ✓.' } ] },
    { id: 'l9', name: 'Pau Ferrer', shop: '', vehicle: 'Mazda MX-5 NC', phone: '699 330 471', service: 'Fabricación de escape', detail: 'Escape completo cat-back en inox.', value: 780, stage: 'done', source: 'Instagram', date: '2026-05-25', priority: 'baja', notes: [
        { t: '2026-05-25 11:00', x: 'Fabricado y montado. Cliente satisfecho.' } ] },
    { id: 'l10', name: 'Elena Gil', shop: '', vehicle: 'Ford Fiesta ST Mk8', phone: '610 559 802', service: 'Reprogramación', detail: 'Stage 1. Primera consulta.', value: 450, stage: 'contacted', source: 'Instagram', date: '2026-06-14', priority: 'baja', notes: [
        { t: '2026-06-14 13:20', x: 'Lead entrado.' }, { t: '2026-06-15 10:00', x: 'Contactada por WhatsApp, esperando datos del coche.' } ] },
  ];

  function withTemperature(leads) {
    leads.forEach(l => { if (!l.temperature) l.temperature = calcTemperature(l); });
    return leads;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return withTemperature(JSON.parse(raw));
    } catch (e) {}
    const seeded = withTemperature(JSON.parse(JSON.stringify(SEED)));
    localStorage.setItem(KEY, JSON.stringify(seeded));
    return seeded;
  }

  function save(leads) { localStorage.setItem(KEY, JSON.stringify(leads)); }

  function all() { return load(); }

  // Sincroniza el CRM con Google Sheets vía n8n.
  // Llama a esto desde crm.js al iniciar si hay leadsApiUrl configurada.
  async function syncFromSheets(onDone) {
    const url = window.SITE_CONFIG?.leadsApiUrl;
    if (!url) { onDone && onDone(load()); return; }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const rows = await res.json();
      // Normalizar columnas de Sheets al formato interno del CRM
      const leads = rows.map((r, i) => ({
        id:          r.id || ('sheet_' + i),
        name:        r.Nombre || r.nombre || '—',
        phone:       r.WhatsApp || r.telefono || '—',
        vehicle:     r.Vehiculo || r.vehiculo || '—',
        service:     r['Servicio solicitado'] || r.servicio || 'Consulta',
        detail:      r.Comentarios || r.mensaje || '',
        shop:        r.Taller || r.taller || '',
        source:      r.Origen || r.origen || 'Web',
        date:        r.Fecha || r.fecha || new Date().toISOString().slice(0, 10),
        stage:       (r.Estado || r.estado || 'new').toLowerCase() === 'nuevo' ? 'new' : (r.Estado || r.estado || 'new').toLowerCase(),
        value:       Number(r.Valor || r.valor || 0),
        priority:    r.Prioridad || r.priority || 'media',
        temperature: r.Temperatura || r.leadType || null,
        notes:       [],
      }));
      withTemperature(leads);
      save(leads);
      onDone && onDone(leads);
    } catch (e) {
      console.warn('[Slipstream] No se pudo leer de Sheets, usando datos locales.', e);
      onDone && onDone(load());
    }
  }

  function add(lead) {
    const leads = load();
    const now = new Date();
    const full = Object.assign({
      id: 'l' + Date.now(),
      shop: '', vehicle: '—', phone: '—', service: 'Consulta',
      detail: '', value: 0, stage: 'new', source: 'Web',
      date: now.toISOString().slice(0, 10),
      priority: 'alta',
      notes: [{ t: now.toISOString().slice(0,16).replace('T',' '), x: 'Lead entrado vía formulario web (demo en vivo).' }],
    }, lead);
    full.temperature = calcTemperature(full);
    leads.unshift(full);
    save(leads);
    return full;
  }

  function update(id, patch) {
    const leads = load();
    const i = leads.findIndex(l => l.id === id);
    if (i > -1) { leads[i] = Object.assign(leads[i], patch); save(leads); return leads[i]; }
  }

  function setStage(id, stage) { return update(id, { stage }); }

  function remove(id) {
    const leads = load().filter(l => l.id !== id);
    save(leads);
  }

  function reset() { localStorage.removeItem(KEY); return load(); }

  return { STAGES, TEMPS, all, add, update, setStage, remove, reset, syncFromSheets };
})();
