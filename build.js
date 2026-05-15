import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, 'dist');

console.log('Building TechOn UI...');
console.log('===================');

rmSync(DIST_DIR, { recursive: true, force: true });
mkdirSync(DIST_DIR, { recursive: true });

copyDir('src/components', join(DIST_DIR, 'components'));
copyDir('ttf', join(DIST_DIR, 'ttf'));
copyFileSync('src/styles.css', join(DIST_DIR, 'styles.css'));
copyFileSync('src/main.js', join(DIST_DIR, 'main.js'));

const cssFiles = getFiles('src', 'css').filter(f => !f.includes('.min.css') && !f.includes('/dist/'));
const jsComponents = getFiles('src/components', 'js');
const jsSystems = getFiles('src/systems', 'js').filter(f => !f.includes('dist'));

let cssContent = '';
for (const f of cssFiles) {
  if (!f.includes('dist')) cssContent += readFileSync(f, 'utf8') + '\n';
}

let jsContent = `
(function() {
  var __css__ = ${JSON.stringify(cssContent)};
  var style = document.createElement('style');
  style.id = 'techon-ui-styles';
  style.textContent = __css__;
  if (!document.getElementById('techon-ui-styles')) document.head.appendChild(style);
})();
`;

jsContent += '\n' + readFileSync('src/main.js', 'utf8');

for (const f of jsSystems) {
  jsContent += '\n' + readFileSync(f, 'utf8');
}

for (const f of jsComponents) {
  jsContent += '\n' + readFileSync(f, 'utf8');
}

writeFileSync(join(DIST_DIR, '_bundle.js'), jsContent);

await esbuild.build({
  entryPoints: [join(DIST_DIR, '_bundle.js')],
  bundle: true,
  minify: true,
  outfile: join(DIST_DIR, 'techon-ui.min.js'),
  format: 'iife',
  globalName: 'TechOnUI',
  logLevel: 'silent'
});

const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechOn UI - Component Preview</title>
    <link rel="stylesheet" href="styles.css">
    <script src="techon-ui.min.js" defer></script>
</head>
<body>
    <h1>TechOn UI Component Preview</h1>
    <div class="components-grid" id="components-container">
        <div class="loading">Loading components...</div>
    </div>
</body>
</html>`;

writeFileSync(join(DIST_DIR, 'index.html'), html);

rmSync(join(DIST_DIR, '_bundle.js'), { force: true });
console.log('\nBuild complete!');
console.log('Output: dist/');
console.log('Size: ' + Math.round(readFileSync(join(DIST_DIR, 'techon-ui.min.js')).length / 1024) + ' KB');

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function getFiles(dir, ext) {
  const files = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getFiles(full, ext));
    else if (entry.name.endsWith('.' + ext)) files.push(full);
  }
  return files.sort();
}