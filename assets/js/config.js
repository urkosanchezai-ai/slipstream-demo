/* ============================================
   SLIPSTREAM · Config de marca blanca
   Para instalar un taller nuevo: edita SOLO este
   archivo. No hace falta tocar HTML/CSS/JS.
   ============================================ */

window.SITE_CONFIG = {
  // --- n8n (dejar vacío = modo demo local con localStorage) ---
  webhookUrl: 'https://urkosancheai-n8n.iwvkxj.easypanel.host/webhook/slipstream-lead',
  leadsApiUrl: '',  // URL GET del webhook de n8n (CRM ← n8n ← Sheets)

  // --- Identidad ---
  brandPrefix: 'RACE',      // primera parte del logo (color blanco)
  brandSuffix: 'LAB',       // segunda parte del logo (color acento)
  shopName: 'RaceLab Performance',
  tagline: 'Plan Pro · Demo',
  accentColor: '#e10600',   // rojo motorsport — cambia esto para re-marcar todo el sitio

  // --- Contacto ---
  phone: '631 00 00 00',
  phoneHref: '+34600000000',
  address: 'Pol. Ind. Motor, nave 14',

  // --- Hero ---
  heroTitleLine1: 'Tu coche.',
  heroTitleLine2: 'Al límite.',
  heroSubtitle: 'Especialistas en preparación de motor, electrónica a medida, reprogramaciones y fabricación de escapes. Proyectos de calle, track y competición ejecutados con precisión de ingeniería.',
  ctaPrimary: 'Solicita tu presupuesto',
  ctaSecondary: 'Ver proyectos',

  stats: [
    { count: 450, suffix: '+', label: 'proyectos entregados' },
    { count: 1200, suffix: ' cv', label: 'récord en bancada' },
    { count: 12, suffix: ' años', label: 'en el mundo del motor' },
  ],

  // --- Servicios (también alimenta el <select> del formulario) ---
  services: [
    { ic: '🔧', title: 'Preparación de motor', desc: 'Builds completos por fases: admisión, turbo, internos forjados y puesta a punto en bancada.', tag: 'Stage 1·2·3' },
    { ic: '💻', title: 'Electrónica a medida', desc: 'Cableados, centralitas programables y standalone (Haltech, MoTeC, Link) para cualquier proyecto.', tag: 'ECU · Standalone' },
    { ic: '🧠', title: 'Reprogramaciones', desc: 'Mapas a medida en banco de potencia. Más potencia, mejor respuesta y total fiabilidad.', tag: 'Dyno · Custom maps' },
    { ic: '🔩', title: 'Fabricación de escapes', desc: 'Líneas completas a medida en inox 304 y titanio. Sonido, flujo y acabado de competición.', tag: 'Inox · Titanio' },
    { ic: '📋', title: 'Homologaciones', desc: 'Legalizamos tus reformas y te lo dejamos listo para pasar la ITV sin sorpresas.', tag: 'Reformas · ITV' },
    { ic: '🏎️', title: 'Swaps y competición', desc: 'Proyectos integrales: swap de motor, jaulas, preparación para Time Attack y drift.', tag: 'Swap · Track' },
  ],

  // --- Por qué nosotros ---
  whyUs: [
    { ic: '🏆', title: 'Especialistas reales', desc: '12 años centrados exclusivamente en performance. No somos un taller generalista.' },
    { ic: '📊', title: 'Banco de potencia propio', desc: 'Cada preparación se valida en dyno. Números reales, no promesas.' },
    { ic: '🛡️', title: 'Trabajo garantizado', desc: 'Componentes de primeras marcas y garantía por escrito en cada proyecto.' },
    { ic: '💬', title: 'Seguimiento constante', desc: 'Te mantenemos informado del avance de tu coche en cada fase.' },
  ],

  // --- Proyectos / Garage ---
  projects: [
    { ic: '🟥', title: 'Honda Civic Type R FK8', desc: 'Stage 2 + admisión + downpipe. 360 cv fiables para calle y track.', tag: '+92 cv' },
    { ic: '⬛', title: 'Nissan 350Z · Time Attack', desc: 'Swap completo 2JZ-GTE, electrónica standalone y jaula homologada.', tag: 'Swap 2JZ' },
    { ic: '⬜', title: 'BMW M2 G87', desc: 'Escape valvulado a medida en inox 304, homologable y con sonido brutal.', tag: 'Escape custom' },
  ],

  footerNote: 'Sistema de captación by',
};
