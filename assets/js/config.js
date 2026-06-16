/* ============================================
   SLIPSTREAM · Config de marca blanca
   Para instalar un taller nuevo: edita SOLO este
   archivo. No hace falta tocar HTML/CSS/JS.
   ============================================ */

window.SITE_CONFIG = {
  // --- Identidad ---
  brandPrefix: 'BOOST',     // primera parte del logo (color blanco)
  brandSuffix: 'GARAGE',    // segunda parte del logo (color acento)
  shopName: 'Boost Garage Drift & Competición',
  tagline: 'Plan Pro · Demo',
  accentColor: '#ff8a00',   // naranja turbo — cambia esto para re-marcar todo el sitio

  // --- Contacto ---
  phone: '622 44 55 66',
  phoneHref: '+34622445566',
  address: 'Circuito Industrial, nave 7',

  // --- Hero ---
  heroTitleLine1: 'Drift.',
  heroTitleLine2: 'Sin límites.',
  heroSubtitle: 'Especialistas en preparación para drift y competición, electrónica standalone, turbos a medida y puesta a punto en bancada. Tu coche, listo para la pista.',
  ctaPrimary: 'Solicita presupuesto',
  ctaSecondary: 'Ver proyectos',

  stats: [
    { count: 280, suffix: '+', label: 'coches preparados' },
    { count: 900, suffix: ' cv', label: 'récord en bancada' },
    { count: 8, suffix: ' años', label: 'en competición' },
  ],

  // --- Servicios (también alimenta el <select> del formulario) ---
  services: [
    { ic: '🌀', title: 'Preparación drift', desc: 'Builds de drift completos: turbo, diferencial, suspensión y ángulo de giro a medida.', tag: 'Drift · Track' },
    { ic: '💻', title: 'Electrónica standalone', desc: 'Centralitas Link, Haltech y MoTeC programadas para uso en pista y competición.', tag: 'ECU · Standalone' },
    { ic: '🧠', title: 'Mapeo en bancada', desc: 'Puesta a punto en dyno para sacar el máximo rendimiento con total fiabilidad.', tag: 'Dyno · Mapeo' },
    { ic: '🔩', title: 'Escapes de competición', desc: 'Líneas a medida en inox y titanio, diseñadas para máximo flujo en pista.', tag: 'Inox · Titanio' },
    { ic: '🛠️', title: 'Suspensión y chasis', desc: 'Coilovers, barras y refuerzos de chasis para control total en derrape.', tag: 'Coilover · Chasis' },
    { ic: '🏎️', title: 'Swaps de competición', desc: 'Swaps completos de motor y jaulas homologadas para Time Attack y drift.', tag: 'Swap · Jaula' },
  ],

  // --- Por qué nosotros ---
  whyUs: [
    { ic: '🏆', title: 'Pilotos y mecánicos', desc: 'El equipo compite. Sabemos lo que necesita un coche de verdad en pista.' },
    { ic: '📊', title: 'Banco de potencia propio', desc: 'Cada preparación se valida en dyno antes de salir del taller.' },
    { ic: '🛡️', title: 'Piezas de competición', desc: 'Solo trabajamos con componentes probados en circuito, con garantía.' },
    { ic: '💬', title: 'Seguimiento en cada fase', desc: 'Sabrás siempre en qué punto está tu proyecto.' },
  ],

  // --- Proyectos / Garage ---
  projects: [
    { ic: '🟧', title: 'Nissan S15 Silvia · Drift Pro', desc: 'Swap SR20 turbo, diferencial bloqueado y kit de ángulo extremo.', tag: 'Drift Pro' },
    { ic: '⬛', title: 'BMW E92 · Time Attack', desc: 'Preparación completa de chasis, suspensión y mapeo para circuito.', tag: 'Time Attack' },
    { ic: '🟥', title: 'Toyota Supra Mk4', desc: 'Turbo big single y electrónica standalone para más de 700 cv.', tag: '700+ cv' },
  ],

  footerNote: 'Sistema de captación by',
};
