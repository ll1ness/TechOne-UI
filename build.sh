#!/bin/bash

# TechOn UI Build Script
# Auto-discovers and bundles all JS and CSS into a single techon-ui.min.js

set -e

PROJECT_ROOT="/home/maksimian/projects/techone-ui"
BUILD_DIR="${PROJECT_ROOT}/build"
DIST_FILE="${BUILD_DIR}/techon-ui.min.js"
TMP_DIR="${BUILD_DIR}/_tmp"

echo "Building TechOn UI..."
echo "====================="

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

cd "${PROJECT_ROOT}"

echo "Discovering components..."
ROOT_CSS=$(find . -maxdepth 1 -name "*.css" -type f ! -name "*.min.css" 2>/dev/null | sort)
COMP_JS=$(find src -name "*.js" -type f 2>/dev/null | sort)
COMP_CSS=$(find src -name "*.css" -type f 2>/dev/null | sort)

echo "Combining CSS..."
{
  echo "/* TechOn UI Styles */"
  for f in $ROOT_CSS; do echo ""; cat "$f"; done
  for f in $COMP_CSS; do echo ""; cat "$f"; done
} > "${TMP_DIR}/all.css"

echo "Bundling JS..."
{
  echo "// TechOn UI"
  cat main.js
  echo ""
  for f in $COMP_JS; do
    echo ""
    cat "$f"
  done
} > "${TMP_DIR}/bundle.js"

echo "Adding CSS injection..."
CSS_STRING=$(cat "${TMP_DIR}/all.css" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')

cat >> "${TMP_DIR}/bundle.js" << INJEOF
;var __css__=${CSS_STRING};(function(){var s=document.createElement('style');s.id='techon-ui-styles';s.textContent=__css__;if(!document.getElementById('techon-ui-styles'))document.head.appendChild(s);})();
INJEOF

echo "Minifying..."
esbuild "${TMP_DIR}/bundle.js" \
  --minify \
  --outfile="${DIST_FILE}" \
  --format=iife \
  --global-name=TechOnUI \
  2>&1 | grep -E "^(✘|⚡)" || true

rm -rf "${TMP_DIR}"

if [ -f "${DIST_FILE}" ]; then
  SIZE=$(wc -c < "${DIST_FILE}")
  echo ""
  echo "Build complete!"
  echo "Output: ${DIST_FILE}"
  echo "Size: $((SIZE / 1024)) KB"
fi