import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, 'build');
const DIST_FILE = join(BUILD_DIR, 'techon-ui.min.js');
const isDev = process.argv.includes('--dev');

console.log('Building TechOn UI...');
console.log('===================');

if (!existsSync(BUILD_DIR)) mkdirSync(BUILD_DIR, { recursive: true });

const cssFiles = getFiles('.', 'css').filter(f => !f.includes('.min.css'));
const jsComponents = getFiles('src/components', 'js');
const jsSystems = getFiles('src/systems', 'js');

let cssContent = '';
for (const f of cssFiles) {
  cssContent += readFileSync(f, 'utf8') + '\n';
}

let jsContent = `
// TechOn UI - Bundled
(function() {
  var __css__ = ${JSON.stringify(cssContent)};
  var style = document.createElement('style');
  style.id = 'techon-ui-styles';
  style.textContent = __css__;
  if (!document.getElementById('techon-ui-styles')) document.head.appendChild(style);
})();
`;

jsContent += '\n' + readFileSync('main.js', 'utf8');

for (const f of jsSystems) {
  jsContent += '\n' + readFileSync(f, 'utf8');
}

for (const f of jsComponents) {
  jsContent += '\n' + readFileSync(f, 'utf8');
}

writeFileSync(join(BUILD_DIR, '_bundle.js'), jsContent);

await esbuild.build({
  entryPoints: [join(BUILD_DIR, '_bundle.js')],
  bundle: true,
  minify: !isDev,
  outfile: DIST_FILE,
  format: 'iife',
  globalName: 'TechOnUI',
  logLevel: 'silent'
});

const size = readFileSync(DIST_FILE).length;
console.log(`\nBuild ${isDev ? 'dev' : 'complete'}!`);
console.log(`Output: ${DIST_FILE}`);
console.log(`Size: ${Math.round(size / 1024)} KB`);

function getFiles(dir, ext) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFiles(full, ext));
    } else if (entry.name.endsWith('.' + ext)) {
      files.push(full);
    }
  }
  return files.sort();
}