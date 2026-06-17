---
name: project-slipstream
description: "Estado técnico del proyecto Slipstream demo — archivos, arquitectura, deploy"
metadata: 
  node_type: memory
  type: project
  originSessionId: cb634048-52de-48cc-a02b-6433c8f3a94c
---

## Repo
- GitHub: `urkosanchezai-ai/slipstream-demo` (público)
- GitHub Pages: https://urkosanchezai-ai.github.io/slipstream-demo/
- Landing: `/` (index.html) — CRM: `/app.html`

## Stack
Pure HTML/CSS/JS, sin build step. CSS custom properties en `tokens.css`. No frameworks.

## Archivos clave
- `config.js` — config white-label (brandPrefix, shopName, accentColor, stats, services, whyUs, projects, **webhookUrl, leadsApiUrl**)
- `brand.js` — aplica config al DOM en runtime
- `data.js` — capa de datos con localStorage + `syncFromSheets()` para conectar con n8n/Sheets
- `landing.js` — formulario POST a webhook n8n si `webhookUrl` está configurado
- `crm.js` — CRM completo: kanban, tabla, drawer con edición inline de valor estimado
- `n8n/lead-classification-workflow.json` — workflow principal (Webhook → Code → Sheets → Switch → Gmail x3)
- `n8n/sheets-to-crm-workflow.json` — workflow GET (CRM ← n8n ← Sheets)

## Arquitectura de datos
- **Modo demo** (webhookUrl vacío): localStorage compartido entre landing y CRM (mismo origen)
- **Modo real** (webhookUrl configurado): landing POST a n8n → Sheets; CRM GET a n8n → lee Sheets

## Clasificación de leads (score 0-100)
- Servicio (max 35): hot=Swap/Electrónica/Competición, mid=Preparación/Escape/Reprogramación
- Teléfono válido (max 20)
- Urgencia/keywords en mensaje (max 25)
- Claridad del mensaje/longitud (max 20)
- Thresholds: ≥70 🔥 CALIENTE, 40-69 🌤️ TEMPLADO, <40 🧊 FRÍO

## n8n workflows
- **Email al taller**: `SHOP_EMAIL` está hardcodeado como constante al principio del nodo Code (no usar $env — n8n lo bloquea)
- Compatible con Tally (fields array) y JSON plano (nuestra landing)
- Google Sheets ID: `1Duyvpnz4ca4VMfDYSxUZc4S53GB9hDkWukTgwz6S99I` ("CRM Talleres")

## Deploy
- `git push origin main` → GitHub Actions publica en Pages automáticamente
- CDN Fastly con max-age=600 — cambios tardan hasta 10 min en verse; siempre probar en incógnito
- `gh` instalado en `~/.local/bin/gh`, autenticado como `urkosanchezai-ai`

## Why: objetivo de uso
Urko graba un vídeo del workflow funcionando en vivo y lo envía automáticamente a todos los que rellenen su landing de Slipstream (como prueba social/demostración a prospectos).
