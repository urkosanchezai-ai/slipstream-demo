---
name: feedback-workflow
description: Correcciones y preferencias de Urko sobre cómo trabajar juntos
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cb634048-52de-48cc-a02b-6433c8f3a94c
---

**Siempre hacer push después de cada cambio.**
**Why:** Urko prueba en la URL de GitHub Pages, no en local. Si no hay push, no ve nada y piensa que no funciona.
**How to apply:** Cada vez que se haga un commit, hacer `git push origin main` inmediatamente. No esperar a acumular commits.

---

**La landing es la web del taller (cliente de Slipstream), no la web de Slipstream.**
**Why:** Error de concepto inicial — la landing se instala al cliente, no es marketing de Slipstream.
**How to apply:** Siempre pensar en dos roles: el dueño del taller (usa el CRM) y el cliente del taller (rellena la landing).

---

**Cuando algo "sigue igual" visualmente, verificar primero si es caché de CDN antes de tocar código.**
**Why:** GitHub Pages usa Fastly CDN con max-age=600. Urko ha pensado varias veces que los fixes no funcionaban cuando era puro caché.
**How to apply:** Hacer `curl -sI URL | grep age` para ver si hay hit de caché. Recomendar incógnito siempre.

---

**No dividir repos landing/CRM mientras no haya backend real.**
**Why:** localStorage como data layer entre landing y CRM requiere mismo origen. Separar repos rompe la demo en vivo.
**How to apply:** Único repo hasta que n8n+Sheets esté activo como backend. Con webhookUrl configurado en config.js, ya pueden estar en dominios distintos.

---

**No usar $env en expresiones de nodos n8n.**
**Why:** n8n bloquea el acceso a variables de entorno desde expresiones de nodos por seguridad.
**How to apply:** Poner valores configurables como constantes al principio del nodo Code (ej: `const SHOP_EMAIL = '...'`) y referenciar `$json.shopEmail` desde otros nodos.

---

**Cuando el usuario pide "borra X", borrarlo completamente, no reposicionarlo.**
**Why:** El scroll hint se intentó reposicionar dos veces antes de que Urko dijera "borra scroll". Prefiere soluciones simples y directas.
**How to apply:** Si algo molesta visualmente y el usuario dice que lo quites, eliminar HTML + CSS + JS relacionado, no intentar arreglarlo.
