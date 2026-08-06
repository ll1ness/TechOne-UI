import { defineConfig } from 'vite';
import { copyFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function copyDirSync(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Copies static assets into the dist/ folder after the custom build.js runs.
 * The custom build.js produces techon-ui.min.js + index.html in dist/.
 * This plugin adds component previews, fonts, and other static files.
 */
function staticAssetsPlugin() {
  return {
    name: 'static-assets',
    closeBundle() {
      const outDir = join(__dirname, 'dist');

      // Remove the empty Vite entry chunk (not needed for production)
      const assetsDir = join(outDir, 'assets');
      if (existsSync(assetsDir)) {
        rmSync(assetsDir, { recursive: true, force: true });
      }

      // Copy component preview HTML files (for fetch() calls in production)
      const srcComponents = join(__dirname, 'src', 'components');
      const distComponents = join(outDir, 'components');
      if (existsSync(srcComponents)) {
        copyDirSync(srcComponents, distComponents);
        console.log('  ✓ Components copied to dist/components/');
      }

      // Copy TTF fonts
      const srcTtf = join(__dirname, 'ttf');
      const distTtf = join(outDir, 'ttf');
      if (existsSync(srcTtf)) {
        copyDirSync(srcTtf, distTtf);
        console.log('  ✓ Fonts copied to dist/ttf/');
      }

      // Copy root static assets
      const assets = ['favicon.ico', 'icon.png', 'banner.png', 'components.json', 'robots.txt', 'sitemap.xml', 'yandex_4e4fba2bf080d628.html'];
      for (const asset of assets) {
        const src = join(__dirname, asset);
        if (existsSync(src)) {
          copyFileSync(src, join(outDir, asset));
        }
      }
      console.log('  ✓ Static assets copied');
    }
  };
}

export default defineConfig({
  root: '.',
  publicDir: false,
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: join(__dirname, 'vite-entry.js'),
      output: {
        entryFileNames: 'assets/vite-entry.js',
      },
    },
  },
  plugins: [staticAssetsPlugin()],
});