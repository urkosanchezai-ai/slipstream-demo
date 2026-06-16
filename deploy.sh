#!/usr/bin/env bash
# Deploy de la demo Slipstream a GitHub (repo privado + push + Pages)
set -e

GH="$HOME/.local/bin/gh"
REPO="slipstream-demo"

echo "▸ Comprobando autenticación…"
"$GH" auth status >/dev/null 2>&1 || { echo "✗ No autenticado. Ejecuta: $GH auth login"; exit 1; }

USER=$("$GH" api user --jq .login)
echo "▸ Usuario: $USER"

echo "▸ Creando repo público '$REPO' y haciendo push…"
"$GH" repo create "$REPO" --public --source=. --remote=origin --push

echo "▸ Intentando activar GitHub Pages (rama main, raíz)…"
if "$GH" api -X POST "repos/$USER/$REPO/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null 2>&1; then
  echo "✓ Pages activado."
  echo "  Landing: https://$USER.github.io/$REPO/"
  echo "  CRM:     https://$USER.github.io/$REPO/app.html"
else
  echo "⚠ No se pudo activar Pages automáticamente (suele requerir plan de pago en repos privados)."
  echo "  El código YA está subido en: https://github.com/$USER/$REPO"
fi

echo "✓ Listo."
