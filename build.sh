#!/bin/bash

# TechOn UI Build Script
# Bundles all JS and CSS into a single techon-ui.min.js

set -e

PROJECT_ROOT="/home/maksimian/projects/techone-ui"
BUILD_DIR="${PROJECT_ROOT}/build"
DIST_FILE="${BUILD_DIR}/techon-ui.min.js"
TMP_FILE="${BUILD_DIR}/_bundle.js"

echo "Building TechOn UI..."
echo "====================="

mkdir -p "${BUILD_DIR}"
cd "${PROJECT_ROOT}"

echo "Discovering files..."

CSS_FILES=$(find . -name "*.css" -not -name "*.min.css" -type f 2>/dev/null | sort)
JS_COMPONENTS=$(find src/components -name "*.js" -type f 2>/dev/null | sort)
JS_SYSTEMS=$(find src/systems -name "*.js" -type f 2>/dev/null | sort)

echo "Bundling CSS and JS..."

{
  echo "// TechOn UI - Bundled"
  echo ""
  
  echo "// CSS Injection"
  printf "var __css__="
  for f in $CSS_FILES; do
    cat "$f"
  done | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))'
  echo ";"
  echo "!function(){var s=document.createElement('style');s.id='techon-ui-styles';s.textContent=__css__;if(!document.getElementById('techon-ui-styles'))document.head.appendChild(s);}();"
  echo ""
  
  echo "// Main JS"
  cat main.js
  echo ""
  
  echo "// Systems JS"
  for f in $JS_SYSTEMS; do
    echo ""
    cat "$f"
  done
  
  echo ""
  
  echo "// Component JS"
  for f in $JS_COMPONENTS; do
    echo ""
    cat "$f"
  done
  
} > "${TMP_FILE}"

echo "Minifying with esbuild..."
esbuild "${TMP_FILE}" \
  --minify \
  --outfile="${DIST_FILE}" \
  --format=iife \
  --global-name=TechOnUI \
  2>&1 || true

rm -f "${TMP_FILE}"

if [ -f "${DIST_FILE}" ]; then
  SIZE=$(wc -c < "${DIST_FILE}")
  echo ""
  echo "Build complete!"
  echo "Output: ${DIST_FILE}"
  echo "Size: $((SIZE / 1024)) KB"
else
  echo "Build failed!"
  exit 1
fi