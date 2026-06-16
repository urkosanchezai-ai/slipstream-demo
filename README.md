# Slipstream · Demo de producto para talleres motorsport

Sistema de **captación + CRM** en marca blanca para talleres especializados en
preparación de motor, electrónica a medida, homologaciones y fabricación de escapes.

La demo está pensada para **enseñarla a talleres y vender el servicio**: se instala
a cada cliente con su propia marca.

## Qué incluye

- **Landing del taller** ([index.html](index.html)) — web de captación orientada al
  cliente final (dueños de coches). Demo con la marca ficticia *RaceLab Performance*.
- **CRM del taller** ([app.html](app.html)) — herramienta interna: dashboard, pipeline
  kanban con drag & drop, ficha de cliente y simulación de automatización.

Los leads que entran por el formulario de la landing aparecen automáticamente en el
CRM (vía `localStorage`), demostrando el flujo **Formulario → Webhook → n8n → CRM →
Notificación**.

## Tecnología

HTML + CSS + JavaScript puro. Sin dependencias ni build. Solo abrir en el navegador.

```
demo/
├── index.html          # Landing del taller
├── app.html            # CRM
└── assets/
    ├── css/  tokens · base · landing · app
    └── js/   data · landing · crm
```

## Uso local

```bash
python3 -m http.server 4173
# Landing → http://localhost:4173/index.html
# CRM     → http://localhost:4173/app.html
```

---

Producto de **Slipstream** — automatización y sistemas digitales para el mundo del motor.
