/* ============================================
   SLIPSTREAM · Set de iconos SVG (line-art técnico)
   Reemplaza los emojis por iconografía profesional.
   Uso: Icons['nombre'] devuelve el markup SVG.
   ============================================ */

window.Icons = (function () {
  const wrap = (paths) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  return {
    // --- Servicios ---
    engine:    wrap('<path d="M5 13v-2h3l2-2h4v2h3l2 2v4h-2v2h-4v-2H9l-2 2H5v-2H3v-4z"/><path d="M14 7V5h-3"/>'),
    chip:      wrap('<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 2.5v2M14 2.5v2M10 19.5v2M14 19.5v2M2.5 10h2M2.5 14h2M19.5 10h2M19.5 14h2"/>'),
    gauge:     wrap('<path d="M12 14l4-4"/><path d="M3.5 16a9 9 0 1 1 17 0"/><circle cx="12" cy="14" r="1.2" fill="currentColor"/>'),
    exhaust:   wrap('<path d="M3 14c0-1.5 1-2.5 2.5-2.5H13l4-3h4v9h-4l-4-3H5.5C4 11.5 3 12.5 3 14z"/><path d="M3 17.5h5"/>'),
    homolog:   wrap('<path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4"/><path d="M9.5 14l2 2 3.5-4"/>'),
    flag:      wrap('<path d="M5 21V4"/><path d="M5 4h13l-2.5 4L18 12H5"/>'),

    // --- Por qué nosotros ---
    award:     wrap('<circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5"/>'),
    dyno:      wrap('<path d="M4 19h16"/><path d="M4 19V9M9 19v-5M14 19V6M19 19v-9"/>'),
    shield:    wrap('<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 11.5l2 2 4-4.5"/>'),
    message:   wrap('<path d="M4 5h16v11H8l-4 3z"/><path d="M8 10h8M8 13h5"/>'),

    // --- Proceso ---
    clipboard: wrap('<rect x="6" y="4" width="12" height="17" rx="1.5"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h4"/>'),
    phone:     wrap('<path d="M6 3h3l1.5 4.5L8.5 9a11 11 0 0 0 5 5l1.5-2 4.5 1.5V18a2 2 0 0 1-2 2A15 15 0 0 1 4 5a2 2 0 0 1 2-2z"/>'),
    file:      wrap('<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h5M10 15h5M10 18h3"/>'),
    wrench:    wrap('<path d="M15 7a4 4 0 0 1-5.2 5.2L5 17l2 2 4.8-4.8A4 4 0 0 1 17 9l-2.2.2L13 7.4z"/>'),
    checkered: wrap('<rect x="4" y="4" width="16" height="13" rx="1"/><path d="M4 8h4v4h4V8h4v4h4M8 4v4M12 8v4M16 4v4M8 12v5"/>'),

    // --- UI ---
    check:     wrap('<path d="M5 12.5l4 4L19 7"/>'),
    lock:      wrap('<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
    inbox:     wrap('<path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1.5 3h5L16 13h5"/>'),
    car:       wrap('<path d="M3 15l1.5-6h15L21 15"/><path d="M3 15h18v3H3z"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/>'),

    // --- CRM ---
    dashboard: wrap('<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="5" rx="1"/><rect x="13" y="11" width="8" height="10" rx="1"/><rect x="3" y="14" width="8" height="7" rx="1"/>'),
    pipeline:  wrap('<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="9.5" y="4" width="5" height="11" rx="1"/><rect x="16" y="4" width="5" height="7" rx="1"/>'),
    users:     wrap('<circle cx="9" cy="8" r="3"/><path d="M4 20a5 5 0 0 1 10 0"/><path d="M16 6a3 3 0 0 1 0 6"/><path d="M17 14a5 5 0 0 1 3 6"/>'),
    zap:       wrap('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
    webhook:   wrap('<circle cx="12" cy="8" r="3"/><path d="M10.5 10.7L7 17"/><path d="M13.5 10.7L17 17"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    bell:      wrap('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
    cog:       wrap('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'),
  };
})();
